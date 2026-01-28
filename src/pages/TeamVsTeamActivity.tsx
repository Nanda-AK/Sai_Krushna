import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lightbulb, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { questions, type Difficulty, type Question } from "@/data/questions";

type TeamKey = "A" | "B";

type Phase = "setup" | "quiz" | "results";

type PerQuestionResult = {
  questionId: number;
  selectedA: number | null;
  selectedB: number | null;
  correctIndex: number;
  correctA: boolean;
  correctB: boolean;
};

function optionLabel(i: number) {
  return String.fromCharCode(65 + i);
}

function shuffle<T>(arr: T[]) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a;
}

function OptionRow({
  label,
  text,
  selected,
  disabled,
  state,
  onClick,
}: {
  label: string;
  text: string;
  selected: boolean;
  disabled: boolean;
  state: "idle" | "correct" | "wrong" | "correct-answer";
  onClick: () => void;
}) {
  const base = "w-full flex items-center gap-3 rounded-md border px-4 py-3 text-left text-sm transition";
  const cursor = disabled ? "cursor-not-allowed opacity-70" : "hover:bg-slate-50";
  const selectedCls = selected ? "border-indigo-400 bg-indigo-50" : "border-slate-200 bg-white";

  const stateCls =
    state === "correct"
      ? "border-emerald-400 bg-emerald-50"
      : state === "wrong"
        ? "border-rose-400 bg-rose-50"
        : state === "correct-answer"
          ? "border-emerald-300 bg-emerald-50/50"
          : selectedCls;

  return (
    <button type="button" className={`${base} ${cursor} ${stateCls}`} onClick={disabled ? undefined : onClick}>
      <div className="text-slate-600 font-semibold text-xs w-10 shrink-0">{label}</div>
      <div className="text-slate-800 font-medium">{text}</div>
    </button>
  );
}

function TeamPanel({
  team,
  q,
  selected,
  checked,
  onSelect,
  onCheck,
  onSkip,
  onHint,
}: {
  team: TeamKey;
  q: Question;
  selected: number | null;
  checked: boolean;
  onSelect: (idx: number) => void;
  onCheck: () => void;
  onSkip: () => void;
  onHint: () => void;
}) {
  const isDone = checked;
  const canCheck = selected !== null && !checked;

  return (
    <Card className="border-slate-200 shadow-sm rounded-2xl">
      <CardContent className="p-5">
        <div className="text-sm font-semibold text-slate-800 mb-4">Select your Option</div>

        <div className="space-y-2">
          {q.options.map((opt, i) => {
            let state: "idle" | "correct" | "wrong" | "correct-answer" = "idle";
            if (checked) {
              if (i === q.correctAnswer) state = "correct-answer";
              if (selected === i && i === q.correctAnswer) state = "correct";
              if (selected === i && i !== q.correctAnswer) state = "wrong";
            }

            return (
              <OptionRow
                key={i}
                label={`${optionLabel(i)}.`}
                text={opt}
                selected={selected === i}
                disabled={isDone}
                state={state}
                onClick={() => onSelect(i)}
              />
            );
          })}
        </div>

        <div className="flex items-center justify-between mt-4">
          <Button
            type="button"
            size="sm"
            className="h-6 px-3 text-[11px] font-bold rounded-md bg-indigo-500 hover:bg-indigo-600"
          >
            TEAM {team}
          </Button>

          <button
            type="button"
            className="text-xs text-slate-600 hover:text-slate-900 inline-flex items-center gap-2"
            onClick={onSkip}
          >
            <SkipForward className="w-4 h-4" />
            Skip
          </button>

          <button
            type="button"
            className="text-xs text-amber-700 hover:text-amber-900 inline-flex items-center gap-2"
            onClick={onHint}
          >
            <Lightbulb className="w-4 h-4" />
            Hint
          </button>
        </div>

        <Button
          type="button"
          className="w-full mt-4 rounded-md bg-indigo-300 hover:bg-indigo-400 text-white"
          disabled={!canCheck}
          onClick={onCheck}
        >
          Check Answer
        </Button>
      </CardContent>
    </Card>
  );
}

const TeamVsTeamActivity = () => {
  const navigate = useNavigate();

  const [phase, setPhase] = useState<Phase>("setup");
  const [setupError, setSetupError] = useState<string>("");
  const [difficulty, setDifficulty] = useState<Difficulty>("moderate");
  const [topics, setTopics] = useState<string[]>([]);
  const [chapter, setChapter] = useState<string>("");

  const chapterOptions = useMemo(() => {
    const set = new Set<string>();
    for (const q of questions) {
      if (q.chapter && typeof q.chapter === "string") set.add(q.chapter);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  useEffect(() => {
    if (!chapter && chapterOptions.length > 0) setChapter(chapterOptions[0]);
  }, [chapter, chapterOptions]);

  const chapterTopics = useMemo(() => {
    const map = new Map<string, Set<string>>();
    for (const q of questions) {
      const ch = (q.chapter || "").trim();
      const tp = (q.topic || "").trim();
      if (!ch || !tp) continue;
      if (!map.has(ch)) map.set(ch, new Set());
      map.get(ch)!.add(tp);
    }
    const obj: Record<string, string[]> = {};
    for (const [ch, set] of map.entries()) {
      obj[ch] = Array.from(set).sort((a, b) => a.localeCompare(b));
    }
    return obj;
  }, []);

  const availableSubtopics = useMemo(() => chapterTopics[chapter] || [], [chapter, chapterTopics]);
  const toggleSubtopic = (t: string) => setTopics(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  useEffect(() => {
    if (!chapter) { setTopics([]); return; }
    setTopics(prev => prev.filter(t => availableSubtopics.includes(t)));
  }, [chapter, availableSubtopics]);

  const [quiz, setQuiz] = useState<Question[]>([]);

  const [idx, setIdx] = useState(0);
  const [selectedA, setSelectedA] = useState<number | null>(null);
  const [selectedB, setSelectedB] = useState<number | null>(null);
  const [checkedA, setCheckedA] = useState(false);
  const [checkedB, setCheckedB] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [history, setHistory] = useState<PerQuestionResult[]>([]);

  const q = quiz[idx];

  const recordAndNext = (final: boolean) => {
    const correctA = selectedA !== null && selectedA === q.correctAnswer;
    const correctB = selectedB !== null && selectedB === q.correctAnswer;

    setHistory(prev => [
      ...prev,
      {
        questionId: q.id,
        selectedA,
        selectedB,
        correctIndex: q.correctAnswer,
        correctA,
        correctB,
      },
    ]);

    if (final) {
      setPhase("results");
      return;
    }

    setIdx(v => v + 1);
    setSelectedA(null);
    setSelectedB(null);
    setCheckedA(false);
    setCheckedB(false);
    setShowHint(false);
  };

  const checkA = () => {
    if (checkedA || selectedA === null) return;
    setCheckedA(true);
    if (selectedA === q.correctAnswer) setScoreA(s => s + 1);
  };

  const checkB = () => {
    if (checkedB || selectedB === null) return;
    setCheckedB(true);
    if (selectedB === q.correctAnswer) setScoreB(s => s + 1);
  };

  const canNext = checkedA && checkedB;

  const onNext = () => {
    if (!canNext) return;
    const isLast = idx >= quiz.length - 1;
    recordAndNext(isLast);
  };

  const onSkip = () => {
    const isLast = idx >= quiz.length - 1;
    recordAndNext(isLast);
  };

  const restart = () => {
    setIdx(0);
    setSelectedA(null);
    setSelectedB(null);
    setCheckedA(false);
    setCheckedB(false);
    setShowHint(false);
    setScoreA(0);
    setScoreB(0);
    setHistory([]);
    setPhase("quiz");
  };

  const startQuiz = () => {
    setSetupError("");

    let pool = questions.filter(q => Array.isArray(q.options) && q.options.length >= 2);
    if (chapter) pool = pool.filter(q => (q.chapter || "") === chapter);
    if (topics.length > 0) pool = pool.filter(q => topics.includes((q.topic || "").trim()));
    if (difficulty) pool = pool.filter(q => q.difficulty === difficulty);

    if (pool.length === 0) {
      setSetupError("No questions match the selected filters. Try changing chapter/topics/difficulty.");
      return;
    }

    const picked = shuffle(pool).slice(0, Math.min(10, pool.length));
    setQuiz(picked);
    setIdx(0);
    setSelectedA(null);
    setSelectedB(null);
    setCheckedA(false);
    setCheckedB(false);
    setShowHint(false);
    setScoreA(0);
    setScoreB(0);
    setHistory([]);
    setPhase("quiz");
  };

  if (phase === "setup") {
    return (
      <div className="min-h-[100svh] md:min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-emerald-50">
        <div className="container mx-auto px-4 py-10 max-w-5xl">
          <div className="bg-white border rounded-2xl shadow-sm px-6 sm:px-10 py-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-lg font-bold text-slate-900">Team A Vs Team B</div>
                <div className="text-xs text-slate-500 mt-0.5">Choose chapter, topics and difficulty</div>
              </div>
              <Button variant="outline" size="sm" className="rounded-full" onClick={() => navigate("/portal/classroom-activity")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs text-muted-foreground">Chapter</label>
                <select
                  className="w-full border rounded-md h-10 px-2 bg-white"
                  value={chapter}
                  onChange={e => setChapter(e.target.value)}
                >
                  {chapterOptions.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>

                <div className="mt-5">
                  <div className="text-xs font-semibold text-muted-foreground mb-2">Difficulty</div>
                  <div className="grid grid-cols-3 gap-2">
                    {(["easy", "moderate", "difficult"] as Difficulty[]).map(d => (
                      <Button
                        key={d}
                        variant={difficulty === d ? "default" : "outline"}
                        className="h-10"
                        onClick={() => setDifficulty(d)}
                      >
                        {d === "easy" ? "Easy" : d === "moderate" ? "Moderate" : "Hard"}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-muted-foreground">Topics in Chapter (optional)</div>
                {availableSubtopics.length === 0 ? (
                  <div className="text-xs text-muted-foreground mt-2">No topics found for this chapter.</div>
                ) : (
                  <div className="mt-2 rounded-xl border bg-white p-2 shadow-sm">
                    <ScrollArea className="h-56">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pr-2">
                        {availableSubtopics.map(tp => (
                          <label key={tp} className="flex items-center gap-3 p-2.5 rounded-lg border bg-white hover:bg-gray-50 transition cursor-pointer select-none">
                            <Checkbox className="h-5 w-5" checked={topics.includes(tp)} onCheckedChange={() => toggleSubtopic(tp)} />
                            <span className="truncate text-sm font-medium" title={tp}>{tp}</span>
                          </label>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                )}

                <div className="flex items-center justify-between mt-2">
                  <div className="text-xs text-muted-foreground">Choose one or more topics</div>
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" size="sm" className="rounded-full" onClick={() => setTopics([])}>Clear</Button>
                    <Button type="button" variant="outline" size="sm" className="rounded-full" onClick={() => setTopics([...availableSubtopics])}>Select All</Button>
                  </div>
                </div>
              </div>
            </div>

            {setupError ? (
              <div className="mt-5 text-sm text-rose-700 border border-rose-200 bg-rose-50 rounded-xl px-4 py-3">
                {setupError}
              </div>
            ) : null}

            <div className="mt-6 flex items-center justify-between">
              <div className="text-xs text-slate-500">Questions will be picked randomly from your question bank.</div>
              <Button className="rounded-full px-10" onClick={startQuiz} disabled={!chapter}>
                Start
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "results") {
    const winner = scoreA === scoreB ? "Draw" : scoreA > scoreB ? "Team A" : "Team B";

    return (
      <div className="min-h-[100svh] md:min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-emerald-50">
        <div className="container mx-auto px-4 py-10 max-w-4xl">
          <div className="bg-white border rounded-xl shadow-sm p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="text-xl font-bold text-slate-900">Results</div>
              <Button variant="outline" size="sm" className="rounded-full" onClick={() => navigate("/portal/classroom-activity")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>

            <div className="rounded-xl border bg-indigo-50 p-5 mb-6">
              <div className="text-sm font-semibold text-slate-700">Winner</div>
              <div className="text-2xl font-black text-indigo-700 mt-1">{winner}</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border p-5">
                <div className="text-xs font-semibold text-slate-500">TEAM A</div>
                <div className="text-3xl font-black text-slate-900 mt-2">{scoreA}</div>
                <div className="text-xs text-slate-600 mt-1">Correct answers</div>
              </div>
              <div className="rounded-xl border p-5">
                <div className="text-xs font-semibold text-slate-500">TEAM B</div>
                <div className="text-3xl font-black text-slate-900 mt-2">{scoreB}</div>
                <div className="text-xs text-slate-600 mt-1">Correct answers</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button className="rounded-full" onClick={startQuiz}>Restart</Button>
              <Button variant="outline" className="rounded-full" onClick={() => setPhase("setup")}>Change Filters</Button>
              <Button variant="outline" className="rounded-full" onClick={() => navigate("/portal/classroom-activity")}>Choose Another Activity</Button>
            </div>

            <div className="mt-8">
              <div className="text-sm font-semibold text-slate-800 mb-3">Quick Review</div>
              <div className="space-y-2">
                {history.map((h, i) => (
                  <div key={`${h.questionId}-${i}`} className="flex items-center justify-between rounded-lg border px-4 py-3">
                    <div className="text-sm text-slate-700">Question {i + 1}</div>
                    <div className="flex items-center gap-3 text-xs">
                      <div className={`px-2 py-1 rounded-md border ${h.correctA ? "bg-emerald-50 border-emerald-300 text-emerald-700" : "bg-rose-50 border-rose-300 text-rose-700"}`}>
                        A: {h.correctA ? "Correct" : "Wrong"}
                      </div>
                      <div className={`px-2 py-1 rounded-md border ${h.correctB ? "bg-emerald-50 border-emerald-300 text-emerald-700" : "bg-rose-50 border-rose-300 text-rose-700"}`}>
                        B: {h.correctB ? "Correct" : "Wrong"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100svh] md:min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-emerald-50">
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <div className="bg-white/80 backdrop-blur border rounded-2xl shadow-sm px-6 sm:px-10 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-lg font-bold text-slate-900">Team A Vs Team B</div>
              <div className="text-xs text-slate-500 mt-0.5">Question {idx + 1} of {quiz.length} • Score A: {scoreA} • Score B: {scoreB}</div>
            </div>
            <Button variant="outline" size="sm" className="rounded-full" onClick={() => navigate("/portal/classroom-activity")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>

          <div className="rounded-2xl border bg-indigo-50/70 px-5 py-4 mb-8">
            <div className="flex gap-3 items-start">
              <div className="w-10 h-10 rounded-full bg-indigo-200 text-indigo-800 flex items-center justify-center font-black text-sm">🦉</div>
              <div className="flex-1 text-sm sm:text-base font-semibold text-slate-800 leading-relaxed">{q.question}</div>
            </div>
            {showHint && (
              <div className="mt-3 text-xs text-slate-700 border-t border-indigo-200/80 pt-3">
                <span className="font-semibold">Hint:</span> {q.hint}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TeamPanel
              team="A"
              q={q}
              selected={selectedA}
              checked={checkedA}
              onSelect={setSelectedA}
              onCheck={checkA}
              onSkip={onSkip}
              onHint={() => setShowHint(v => !v)}
            />
            <TeamPanel
              team="B"
              q={q}
              selected={selectedB}
              checked={checkedB}
              onSelect={setSelectedB}
              onCheck={checkB}
              onSkip={onSkip}
              onHint={() => setShowHint(v => !v)}
            />
          </div>

          <div className="flex items-center justify-center mt-6">
            <Button
              className="rounded-full px-10"
              disabled={!canNext}
              onClick={onNext}
            >
              {idx >= quiz.length - 1 ? "Finish" : "Next Question"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamVsTeamActivity;
