# 🎮 Gabits - Math Quest Adventure

> A gamified math learning platform where students earn coins, unlock badges, and compete with friends!

## 🌟 For Students: How to Play

### 🎯 Game Modes

| Mode | How to Play | Unlock Requirement |
|------|-------------|-------------------|
| **Practice** 📚 | Answer 10 questions at your own pace. Use hints (50 coins) when stuck! | Always Open |
| **Speed Drive** ⚡ | Race against the clock! 60 seconds, faster = more coins | Score 80%+ in 3 Practice sessions |
| **AI Battle** 🤖 | Challenge a smart AI opponent. Who solves faster wins! | Score 80%+ in 3 Speed sessions |
| **Friends Battle** 👥 | Create a room code, invite your friend, compete live! | Score 80%+ in 3 AI battles |

---

## 💰 How to Earn Coins

### Practice Mode
| What You Do | Coins Earned |
|-------------|--------------|
| Easy question correct | +3 coins 🟢 |
| Moderate question correct | +5 coins 🟡 |
| Difficult question correct | +8 coins 🔴 |
| Use a hint | -50 coins 💡 |

### Speed Mode
| Achievement | Coins |
|-------------|-------|
| Each correct answer | +10 coins |
| 25% milestone (Silver) | +25 bonus |
| 50% milestone (Gold) | +50 bonus |
| 75% milestone (Platinum) | +75 bonus |
| 100% milestone (Diamond) | +100 bonus |

### Battle Modes (AI & Friends)
| Result | Coins |
|--------|-------|
| Participation | +5 coins |
| Victory | +15 bonus coins |
| Draw | +10 coins |

### Weekend Bonus 🎉
Play on Saturday or Sunday = **+20% bonus coins** on all rewards!

---

## 🔥 Streaks - Play Every Day!

| Streak Days | Daily Bonus |
|-------------|-------------|
| Day 1 | +3 coins |
| Day 2 | +5 coins |
| Day 3 | +8 coins + 🏅 Focused Learner badge |
| Day 4+ | +10 coins |
| Day 5+ (same topic) | +15 coins + 🏅 Math Explorer badge |

> **Tip**: Play any mode daily to keep your streak alive!

---

## ⭐ XP Points - The Leaderboard Score

**XP Formula**: 
```
XP = Coins ÷ 50 + (Gems × 2) + Badges
```

| What | XP Value |
|------|----------|
| 50 Coins | +1 XP |
| 1 Gem | +2 XP |
| 1 Badge | +1 XP |

The monthly leaderboard ranks by XP. Be #1!

---

## 💎 Earning Gems

| How | Gems |
|-----|------|
| Speed Mode: 100% accuracy | +3 gems |
| Speed Mode: 70%+ accuracy | +2 gems |
| 3-win streak in AI | +3 gems |
| 3-win streak in Friends | +5 gems |

---

## 🏅 Badges - Show Off Your Skills!

| Badge | How to Earn | Image |
|-------|-------------|-------|
| **Focused Learner** | 3-day practice streak | ![](/assets/focused_learner.png) |
| **Math Explorer** | 5-day same topic streak | ![](/assets/math_explorer.png) |
| **Speed Master** | 3× Fast & Flawless in Speed | ![](/assets/speed_master.png) |
| **AI Challenger** | Win 10 AI battles | ![](/assets/ai_challenger.png) |
| **Social Legend** | Win 10 Friend battles | ![](/assets/social_legend.png) |

---

## 🔓 Mode Unlock System

```
Practice (Always Open)
    ↓ Score 80%+ in 3 sessions
Speed Drive 🔒
    ↓ Score 80%+ in 3 speed runs
AI Battle 🔒
    ↓ Score 80%+ in 3 AI matches
Friends Battle 🔒
```

> **Note**: Unlocks are PER CHAPTER. Master "Fractions" to unlock Fractions Speed Mode!

---

## 👤 Your Profile

- **Avatar**: Your unique avatar is auto-generated based on your name
- **XP Unlocks**: Earn XP to unlock new avatar styles (coming soon!)
- **Treasure Page**: See all your coins, gems, badges, and weekly progress

---

## 🛠️ Technical Info

### Tech Stack
- React 18 + TypeScript + Vite
- Supabase (Auth, Database, Realtime)
- Tailwind CSS + shadcn/ui
- Deployed on Vercel

### Running Locally
```bash
npm install
npm run dev
```

### Environment Variables
Create `.env` with:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

---

## 📊 For Teachers

1. Login as a teacher (role = "teacher")
2. Access `/teacher` portal
3. Create live tasks for your class
4. Students join via Tasks Hub
5. View real-time student progress

---

## 📱 Works Great On

- ✅ Desktop computers
- ✅ Tablets
- ✅ Mobile phones (high-end preferred)

---

## 📄 License

MIT License - Built with ❤️ for learning
