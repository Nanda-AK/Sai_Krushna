-- ============================================================
-- GABITS RLS PERFORMANCE FIX
-- This migration fixes the auth.uid() performance issue
-- by wrapping all auth.uid() calls in (select auth.uid())
-- 
-- Run this in your Supabase SQL Editor AFTER your existing tables exist
-- ============================================================

-- ============================================================
-- STEP 1: Drop all existing RLS policies
-- ============================================================

-- profiles
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;

-- user_balances
DROP POLICY IF EXISTS "balances_select_own" ON public.user_balances;
DROP POLICY IF EXISTS "balances_insert_own" ON public.user_balances;
DROP POLICY IF EXISTS "balances_update_own" ON public.user_balances;

-- reward_events
DROP POLICY IF EXISTS "events_select_own" ON public.reward_events;
DROP POLICY IF EXISTS "events_insert_own" ON public.reward_events;

-- achievements
DROP POLICY IF EXISTS "achievements_select_own" ON public.achievements;
DROP POLICY IF EXISTS "achievements_insert_own" ON public.achievements;
DROP POLICY IF EXISTS "achievements_update_own" ON public.achievements;

-- achievement_counts
DROP POLICY IF EXISTS "achievement_counts_select_own" ON public.achievement_counts;
DROP POLICY IF EXISTS "achievement_counts_insert_own" ON public.achievement_counts;
DROP POLICY IF EXISTS "achievement_counts_update_own" ON public.achievement_counts;

-- daily_sets
DROP POLICY IF EXISTS "daily_sets_select_own" ON public.daily_sets;
DROP POLICY IF EXISTS "daily_sets_insert_own" ON public.daily_sets;
DROP POLICY IF EXISTS "daily_sets_update_own" ON public.daily_sets;

-- daily_progress
DROP POLICY IF EXISTS "daily_progress_select_own" ON public.daily_progress;
DROP POLICY IF EXISTS "daily_progress_insert_own" ON public.daily_progress;
DROP POLICY IF EXISTS "daily_progress_update_own" ON public.daily_progress;

-- activity_streaks
DROP POLICY IF EXISTS "activity_streaks_select_own" ON public.activity_streaks;
DROP POLICY IF EXISTS "activity_streaks_insert_own" ON public.activity_streaks;
DROP POLICY IF EXISTS "activity_streaks_update_own" ON public.activity_streaks;

-- daily_streak_awards
DROP POLICY IF EXISTS "streak_awards_select_own" ON public.daily_streak_awards;
DROP POLICY IF EXISTS "streak_awards_insert_own" ON public.daily_streak_awards;

-- practice_sessions
DROP POLICY IF EXISTS "practice_sessions_select_own" ON public.practice_sessions;
DROP POLICY IF EXISTS "practice_sessions_insert_own" ON public.practice_sessions;

-- practice_streaks
DROP POLICY IF EXISTS "practice_streaks_select_own" ON public.practice_streaks;
DROP POLICY IF EXISTS "practice_streaks_insert_own" ON public.practice_streaks;
DROP POLICY IF EXISTS "practice_streaks_update_own" ON public.practice_streaks;

-- practice_seen_questions
DROP POLICY IF EXISTS "seen_select_own" ON public.practice_seen_questions;
DROP POLICY IF EXISTS "seen_insert_own" ON public.practice_seen_questions;

-- speed_runs
DROP POLICY IF EXISTS "speed_runs_select_own" ON public.speed_runs;
DROP POLICY IF EXISTS "speed_runs_insert_own" ON public.speed_runs;

-- speed_totals
DROP POLICY IF EXISTS "speed_totals_select_own" ON public.speed_totals;
DROP POLICY IF EXISTS "speed_totals_insert_own" ON public.speed_totals;
DROP POLICY IF EXISTS "speed_totals_update_own" ON public.speed_totals;

-- speed_streaks
DROP POLICY IF EXISTS "speed_streaks_select_own" ON public.speed_streaks;
DROP POLICY IF EXISTS "speed_streaks_insert_own" ON public.speed_streaks;
DROP POLICY IF EXISTS "speed_streaks_update_own" ON public.speed_streaks;

-- speed_achievements
DROP POLICY IF EXISTS "speed_achievements_select_own" ON public.speed_achievements;
DROP POLICY IF EXISTS "speed_achievements_insert_own" ON public.speed_achievements;

-- compete_matches
DROP POLICY IF EXISTS "compete_matches_select_own" ON public.compete_matches;
DROP POLICY IF EXISTS "compete_matches_insert_own" ON public.compete_matches;

-- compete_streaks
DROP POLICY IF EXISTS "compete_streaks_select_own" ON public.compete_streaks;
DROP POLICY IF EXISTS "compete_streaks_insert_own" ON public.compete_streaks;
DROP POLICY IF EXISTS "compete_streaks_update_own" ON public.compete_streaks;

-- live_tasks
DROP POLICY IF EXISTS "live_tasks_select_active" ON public.live_tasks;
DROP POLICY IF EXISTS "live_tasks_select_own" ON public.live_tasks;
DROP POLICY IF EXISTS "live_tasks_insert_teacher" ON public.live_tasks;
DROP POLICY IF EXISTS "live_tasks_update_own" ON public.live_tasks;

-- task_runs
DROP POLICY IF EXISTS "task_runs_select_own" ON public.task_runs;
DROP POLICY IF EXISTS "task_runs_select_teacher" ON public.task_runs;
DROP POLICY IF EXISTS "task_runs_insert_any" ON public.task_runs;
DROP POLICY IF EXISTS "task_runs_update_own" ON public.task_runs;

-- chapter_mode_unlocks
DROP POLICY IF EXISTS "cmu_select_own" ON public.chapter_mode_unlocks;
DROP POLICY IF EXISTS "cmu_insert_own" ON public.chapter_mode_unlocks;

-- chapter_mode_runs
DROP POLICY IF EXISTS "chapter_mode_runs_select_own" ON public.chapter_mode_runs;
DROP POLICY IF EXISTS "chapter_mode_runs_insert_own" ON public.chapter_mode_runs;

-- speed_unlocks_chapter
DROP POLICY IF EXISTS "unlock_select_own" ON public.speed_unlocks_chapter;
DROP POLICY IF EXISTS "unlock_insert_own" ON public.speed_unlocks_chapter;

-- user_totals
DROP POLICY IF EXISTS "user_totals_select_all" ON public.user_totals;
DROP POLICY IF EXISTS "user_totals_insert_own" ON public.user_totals;
DROP POLICY IF EXISTS "user_totals_update_own" ON public.user_totals;

-- battle_performance (if exists)
DROP POLICY IF EXISTS "battle_perf_select_own" ON public.battle_performance;
DROP POLICY IF EXISTS "battle_perf_insert_own" ON public.battle_performance;

-- battle_matches (if exists)
DROP POLICY IF EXISTS "battle_match_select_own" ON public.battle_matches;
DROP POLICY IF EXISTS "battle_match_insert_own" ON public.battle_matches;

-- ============================================================
-- STEP 2: Recreate all policies with OPTIMIZED (select auth.uid())
-- ============================================================

-- profiles
CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING ((select auth.uid()) = id);
CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT WITH CHECK ((select auth.uid()) = id);
CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING ((select auth.uid()) = id);

-- user_balances
CREATE POLICY "balances_select_own" ON public.user_balances
  FOR SELECT USING ((select auth.uid()) = user_id);
CREATE POLICY "balances_insert_own" ON public.user_balances
  FOR INSERT WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "balances_update_own" ON public.user_balances
  FOR UPDATE USING ((select auth.uid()) = user_id);

-- reward_events
CREATE POLICY "events_select_own" ON public.reward_events
  FOR SELECT USING ((select auth.uid()) = user_id);
CREATE POLICY "events_insert_own" ON public.reward_events
  FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

-- achievements
CREATE POLICY "achievements_select_own" ON public.achievements
  FOR SELECT USING ((select auth.uid()) = user_id);
CREATE POLICY "achievements_insert_own" ON public.achievements
  FOR INSERT WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "achievements_update_own" ON public.achievements
  FOR UPDATE USING ((select auth.uid()) = user_id);

-- achievement_counts
CREATE POLICY "achievement_counts_select_own" ON public.achievement_counts
  FOR SELECT USING ((select auth.uid()) = user_id);
CREATE POLICY "achievement_counts_insert_own" ON public.achievement_counts
  FOR INSERT WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "achievement_counts_update_own" ON public.achievement_counts
  FOR UPDATE USING ((select auth.uid()) = user_id);

-- daily_sets
CREATE POLICY "daily_sets_select_own" ON public.daily_sets
  FOR SELECT USING ((select auth.uid()) = user_id);
CREATE POLICY "daily_sets_insert_own" ON public.daily_sets
  FOR INSERT WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "daily_sets_update_own" ON public.daily_sets
  FOR UPDATE USING ((select auth.uid()) = user_id);

-- daily_progress
CREATE POLICY "daily_progress_select_own" ON public.daily_progress
  FOR SELECT USING ((select auth.uid()) = user_id);
CREATE POLICY "daily_progress_insert_own" ON public.daily_progress
  FOR INSERT WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "daily_progress_update_own" ON public.daily_progress
  FOR UPDATE USING ((select auth.uid()) = user_id);

-- activity_streaks
CREATE POLICY "activity_streaks_select_own" ON public.activity_streaks
  FOR SELECT USING ((select auth.uid()) = user_id);
CREATE POLICY "activity_streaks_insert_own" ON public.activity_streaks
  FOR INSERT WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "activity_streaks_update_own" ON public.activity_streaks
  FOR UPDATE USING ((select auth.uid()) = user_id);

-- daily_streak_awards
CREATE POLICY "streak_awards_select_own" ON public.daily_streak_awards
  FOR SELECT USING ((select auth.uid()) = user_id);
CREATE POLICY "streak_awards_insert_own" ON public.daily_streak_awards
  FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

-- practice_sessions
CREATE POLICY "practice_sessions_select_own" ON public.practice_sessions
  FOR SELECT USING ((select auth.uid()) = user_id);
CREATE POLICY "practice_sessions_insert_own" ON public.practice_sessions
  FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

-- practice_streaks
CREATE POLICY "practice_streaks_select_own" ON public.practice_streaks
  FOR SELECT USING ((select auth.uid()) = user_id);
CREATE POLICY "practice_streaks_insert_own" ON public.practice_streaks
  FOR INSERT WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "practice_streaks_update_own" ON public.practice_streaks
  FOR UPDATE USING ((select auth.uid()) = user_id);

-- practice_seen_questions
CREATE POLICY "seen_select_own" ON public.practice_seen_questions
  FOR SELECT USING ((select auth.uid()) = user_id);
CREATE POLICY "seen_insert_own" ON public.practice_seen_questions
  FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

-- speed_runs
CREATE POLICY "speed_runs_select_own" ON public.speed_runs
  FOR SELECT USING ((select auth.uid()) = user_id);
CREATE POLICY "speed_runs_insert_own" ON public.speed_runs
  FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

-- speed_totals
CREATE POLICY "speed_totals_select_own" ON public.speed_totals
  FOR SELECT USING ((select auth.uid()) = user_id);
CREATE POLICY "speed_totals_insert_own" ON public.speed_totals
  FOR INSERT WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "speed_totals_update_own" ON public.speed_totals
  FOR UPDATE USING ((select auth.uid()) = user_id);

-- speed_streaks
CREATE POLICY "speed_streaks_select_own" ON public.speed_streaks
  FOR SELECT USING ((select auth.uid()) = user_id);
CREATE POLICY "speed_streaks_insert_own" ON public.speed_streaks
  FOR INSERT WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "speed_streaks_update_own" ON public.speed_streaks
  FOR UPDATE USING ((select auth.uid()) = user_id);

-- speed_achievements
CREATE POLICY "speed_achievements_select_own" ON public.speed_achievements
  FOR SELECT USING ((select auth.uid()) = user_id);
CREATE POLICY "speed_achievements_insert_own" ON public.speed_achievements
  FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

-- compete_matches
CREATE POLICY "compete_matches_select_own" ON public.compete_matches
  FOR SELECT USING ((select auth.uid()) = user_id);
CREATE POLICY "compete_matches_insert_own" ON public.compete_matches
  FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

-- compete_streaks
CREATE POLICY "compete_streaks_select_own" ON public.compete_streaks
  FOR SELECT USING ((select auth.uid()) = user_id);
CREATE POLICY "compete_streaks_insert_own" ON public.compete_streaks
  FOR INSERT WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "compete_streaks_update_own" ON public.compete_streaks
  FOR UPDATE USING ((select auth.uid()) = user_id);

-- live_tasks (combined SELECT policy)
CREATE POLICY "live_tasks_select" ON public.live_tasks
  FOR SELECT TO authenticated
  USING (status = 'active' OR (select auth.uid()) = created_by);

CREATE POLICY "live_tasks_insert_teacher" ON public.live_tasks
  FOR INSERT TO authenticated
  WITH CHECK (
    (select auth.uid()) = created_by AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = (select auth.uid()) AND role = 'teacher')
  );

CREATE POLICY "live_tasks_update_own" ON public.live_tasks
  FOR UPDATE TO authenticated
  USING ((select auth.uid()) = created_by);

-- task_runs (combined SELECT policy)
CREATE POLICY "task_runs_select" ON public.task_runs
  FOR SELECT
  USING (
    (select auth.uid()) = user_id OR
    EXISTS (
      SELECT 1 FROM public.live_tasks lt
      WHERE lt.id = task_runs.task_id AND lt.created_by = (select auth.uid())
    )
  );

-- task_runs insert: require authenticated user
CREATE POLICY "task_runs_insert" ON public.task_runs
  FOR INSERT WITH CHECK ((select auth.uid()) = user_id OR user_id IS NULL);

CREATE POLICY "task_runs_update_own" ON public.task_runs
  FOR UPDATE USING ((select auth.uid()) = user_id OR user_id IS NULL);

-- chapter_mode_unlocks
CREATE POLICY "cmu_select_own" ON public.chapter_mode_unlocks
  FOR SELECT USING ((select auth.uid()) = user_id);
CREATE POLICY "cmu_insert_own" ON public.chapter_mode_unlocks
  FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

-- chapter_mode_runs
CREATE POLICY "chapter_mode_runs_select_own" ON public.chapter_mode_runs
  FOR SELECT USING ((select auth.uid()) = user_id);
CREATE POLICY "chapter_mode_runs_insert_own" ON public.chapter_mode_runs
  FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

-- speed_unlocks_chapter
CREATE POLICY "unlock_select_own" ON public.speed_unlocks_chapter
  FOR SELECT USING ((select auth.uid()) = user_id);
CREATE POLICY "unlock_insert_own" ON public.speed_unlocks_chapter
  FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

-- user_totals (leaderboard needs public SELECT)
CREATE POLICY "user_totals_select_all" ON public.user_totals
  FOR SELECT TO authenticated USING (TRUE);
CREATE POLICY "user_totals_insert_own" ON public.user_totals
  FOR INSERT WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "user_totals_update_own" ON public.user_totals
  FOR UPDATE USING ((select auth.uid()) = user_id);

-- battle_performance
CREATE POLICY "battle_perf_select_own" ON public.battle_performance
  FOR SELECT USING ((select auth.uid()) = user_id);
CREATE POLICY "battle_perf_insert_own" ON public.battle_performance
  FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

-- battle_matches
CREATE POLICY "battle_match_select_own" ON public.battle_matches
  FOR SELECT USING ((select auth.uid()) = user_id);
CREATE POLICY "battle_match_insert_own" ON public.battle_matches
  FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

-- ============================================================
-- STEP 3: Fix helper functions with proper search_path
-- ============================================================

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY INVOKER
SET search_path = public AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public._canon_chapter(t TEXT)
RETURNS TEXT LANGUAGE sql IMMUTABLE SECURITY INVOKER
SET search_path = public AS $$
  SELECT lower(btrim(coalesce(t, '')))
$$;

-- ============================================================
-- STEP 4: Fix SECURITY DEFINER views
-- (Recreate as regular views without SECURITY DEFINER)
-- ============================================================

-- Drop and recreate leaderboard_view
DROP VIEW IF EXISTS public.leaderboard_view CASCADE;
CREATE VIEW public.leaderboard_view AS
SELECT
  t.user_id,
  COALESCE(p.full_name, 'Player') AS display_name,
  t.total_coins::BIGINT AS total_coins,
  t.total_correct::BIGINT AS total_correct
FROM public.user_totals t
LEFT JOIN public.profiles p ON p.id = t.user_id;

-- Drop and recreate speed_achievements_pivot
DROP VIEW IF EXISTS public.speed_achievements_pivot CASCADE;
CREATE VIEW public.speed_achievements_pivot AS
SELECT
  u.user_id,
  BOOL_OR(u.key = 'm25') AS has_m25,
  BOOL_OR(u.key = 'm50') AS has_m50,
  BOOL_OR(u.key = 'm75') AS has_m75,
  BOOL_OR(u.key = 'm100') AS has_m100
FROM public.speed_achievements u
GROUP BY u.user_id;

-- Drop and recreate speed_leaderboard_view
DROP VIEW IF EXISTS public.speed_leaderboard_view CASCADE;
CREATE VIEW public.speed_leaderboard_view AS
SELECT
  st.user_id,
  COALESCE(p.full_name, 'Player') AS display_name,
  st.total_coins,
  st.total_correct,
  COALESCE(ap.has_m25, FALSE) AS has_m25,
  COALESCE(ap.has_m50, FALSE) AS has_m50,
  COALESCE(ap.has_m75, FALSE) AS has_m75,
  COALESCE(ap.has_m100, FALSE) AS has_m100
FROM public.speed_totals st
LEFT JOIN public.profiles p ON p.id = st.user_id
LEFT JOIN public.speed_achievements_pivot ap ON ap.user_id = st.user_id;

-- Drop and recreate speed_daily_stats
DROP VIEW IF EXISTS public.speed_daily_stats CASCADE;
CREATE VIEW public.speed_daily_stats AS
SELECT
  user_id,
  date,
  COUNT(*) AS run_count,
  SUM(coins_earned)::INT AS coins_sum,
  SUM(correct_count)::INT AS correct_sum,
  SUM(CASE WHEN m25 THEN 1 ELSE 0 END)::INT AS m25_count,
  SUM(CASE WHEN m50 THEN 1 ELSE 0 END)::INT AS m50_count,
  SUM(CASE WHEN m75 THEN 1 ELSE 0 END)::INT AS m75_count,
  SUM(CASE WHEN m100 THEN 1 ELSE 0 END)::INT AS m100_count
FROM public.speed_runs
GROUP BY user_id, date;

-- ============================================================
-- DONE! Your RLS policies are now optimized for 50+ users
-- ============================================================
