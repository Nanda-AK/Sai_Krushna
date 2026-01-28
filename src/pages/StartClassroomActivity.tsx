import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const StartClassroomActivity = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100svh] md:min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <div className="bg-white border rounded-xl shadow-sm px-6 sm:px-10 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-lg sm:text-xl font-bold text-slate-900">Start Classroom Activity</h1>
            <Button variant="outline" size="sm" className="rounded-full" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>

          <div className="text-xs font-semibold text-slate-600 mb-4">Select Activity Type</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card
              role="button"
              tabIndex={0}
              className="overflow-hidden border shadow-sm rounded-xl cursor-pointer hover:shadow-md hover:border-slate-300 transition"
              onClick={() => navigate("/modes/compete/ai?from=portal")}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate("/modes/compete/ai?from=portal"); }}
            >
              <img
                src="/class-room-activity-img/classVSai.png"
                alt="Class Vs AI"
                className="w-full aspect-[16/9] object-cover"
                draggable={false}
              />
              <CardContent className="p-5">
                <div className="text-[10px] font-semibold text-slate-500 mb-2">Cooperative Mode</div>
                <div className="text-base font-bold text-slate-900 mb-1">Class Vs AI</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The entire class works together to outsmart the AI in a series of fun challenges and quizzes.
                </p>
              </CardContent>
            </Card>

            <Card
              role="button"
              tabIndex={0}
              className="overflow-hidden border shadow-sm rounded-xl cursor-pointer hover:shadow-md hover:border-slate-300 transition"
              onClick={() => navigate("/portal/classroom-activity/team-vs-team")}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate("/portal/classroom-activity/team-vs-team"); }}
            >
              <img
                src="/class-room-activity-img/teamVSteam.png"
                alt="Team A Vs Team B"
                className="w-full aspect-[16/9] object-cover"
                draggable={false}
              />
              <CardContent className="p-5">
                <div className="text-[10px] font-semibold text-slate-500 mb-2">Competitive Mode</div>
                <div className="text-base font-bold text-slate-900 mb-1">Team A Vs Team B</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Split the class into two teams for a head-to-head battle of knowledge and speed.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartClassroomActivity;
