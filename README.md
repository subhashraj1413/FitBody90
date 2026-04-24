# FitBody90 - 90-Day Fitness Transformation App

A complete Expo React Native TypeScript fitness transformation app designed to help you achieve your fitness goals in 90 days. Built with a dark theme and modern mobile UI.

## Features

### 📊 Dashboard
- Current weight tracking (82 kg → Goal 72 kg)
- Day counter (out of 90)
- Daily checklist with progress tracking:
  - Workout completion
  - 8,000 steps target
  - 150g protein intake
  - 3L water consumption
  - 7 hours sleep
- Motivational messages based on your progress
- Real-time progress percentage

### 💪 Workout
- 4-day gym split system:
  - **Day 1 - Push**: Bench Press, Incline DB Press, Shoulder Press, Triceps, Pushups
  - **Day 2 - Pull**: Lat Pulldown, Rows, Face Pulls, Biceps Curls
  - **Day 3 - Legs + Core**: Leg Press, RDL, Lunges, Planks, Leg Raises
  - **Day 4 - Full Body**: Deadlifts, DB Press, Cable Row, Farmer Carries, Treadmill
- Exercise tracking with completion checkboxes
- Sets and reps information
- Workout progress visualization
- Motivational workout tips

### 🥗 Nutrition
- Calorie tracking (1900-2100 kcal target)
- Protein tracking (150g daily)
- Water intake monitoring (3L daily)
- Meal suggestions for breakfast, lunch, snacks, and dinner
- Non-veg meal recommendations
- Daily nutrition logging
- Progress visualization with graphs

### 📈 Progress
- Weight tracking and history
- Waist measurement logging
- Progress notes
- Target milestones (82kg → 72kg over 90 days)
- Weekly targets:
  - Month 1: 82kg → 79.5kg
  - Month 2: 79.5kg → 77.5kg
  - Month 3: 77.5kg → 75.5kg
  - Month 4: 75.5kg → 74kg
- Progress history with all previous entries
- Visual progress percentage

### 🎯 Plan
- Complete 90-day roadmap
- 5 phases of transformation:
  - **Foundation Building (Weeks 1-4)**: Build gym habit, walk 8k steps, eliminate sugar
  - **Intensity Building (Weeks 5-8)**: Increase weights, add cardio, tighten diet
  - **Transformation Peak (Weeks 9-12)**: Push intensity, prioritize sleep, take progress photos
  - **Fine-tuning (Weeks 13-20)**: Maintain muscle, focus on fat loss
  - **Final Polish (Weeks 21-25)**: Achieve final goal, develop athletic physique
- Weekly focus areas
- Success factors and tips

## Tech Stack

- **Framework**: Expo with React Native
- **Language**: TypeScript
- **Navigation**: React Navigation (Bottom Tabs)
- **Storage**: AsyncStorage (local data persistence)
- **Styling**: React Native StyleSheet with custom dark theme
- **UI Components**: Custom-built components for cards, checkboxes, progress bars

## Project Structure

```
FitBody90/
├── app/
│   ├── (tabs)/                 # Bottom tab navigation
│   │   ├── _layout.tsx        # Tab navigator configuration
│   │   ├── dashboard.tsx      # Dashboard tab screen
│   │   ├── workout.tsx        # Workout tab screen
│   │   ├── nutrition.tsx      # Nutrition tab screen
│   │   ├── progress.tsx       # Progress tab screen
│   │   └── plan.tsx           # Plan tab screen
│   ├── screens/               # Screen components
│   │   ├── Dashboard.tsx
│   │   ├── Workout.tsx
│   │   ├── Nutrition.tsx
│   │   ├── Progress.tsx
│   │   └── Plan.tsx
│   ├── _layout.tsx            # Root layout
│   └── modal.tsx              # Modal screen
├── components/
│   └── UI.tsx                 # Reusable UI components
├── constants/
│   └── colors.ts              # Theme colors and gradients
├── utils/
│   ├── storage.ts             # AsyncStorage utilities
│   └── calculations.ts        # Fitness calculations
├── package.json
├── tsconfig.json
└── app.json
```

## Installation & Setup

### Prerequisites
- Node.js 16+ installed
- Expo CLI: `npm install -g expo-cli`
- Expo Go app installed on your phone (iOS or Android)

### Steps

1. **Clone/Navigate to project directory:**
   ```bash
   cd /Users/subhashraj/MyDocs/ReactNative/FitBody90/FitBody90
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the Expo development server:**
   ```bash
   npm start
   ```

4. **Open in Expo Go:**
   - On **iOS**: Open Camera app and scan the QR code, or use the Expo Go app to scan
   - On **Android**: Open Expo Go app and scan the QR code
   - Or use the terminal commands:
     - Press `i` for iOS simulator
     - Press `a` for Android emulator
     - Press `w` for web

## How to Run in Expo Go

When you run `npm start`, you'll see output like:

```
› Metro waiting on exp://10.168.24.46:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)
```

### On iOS:
1. Open your Camera app
2. Point it at the QR code displayed in the terminal
3. Tap the notification to open in Expo Go

### On Android:
1. Open the Expo Go app
2. Tap "Scan QR code"
3. Point your camera at the QR code
4. The app will load automatically

### Web (Development):
```bash
npm start
# Then press 'w' in the terminal
```

## Key Features

### Dark Theme
- Custom dark color palette optimized for fitness tracking
- Primary accent color: Coral Red (#FF6B6B)
- Secondary accent: Teal (#4ECDC4)
- Better for evening workouts and tracking

### Local Data Persistence
- All data saved locally using AsyncStorage
- No backend required
- Works offline
- Data persists between app sessions

### Comprehensive Tracking
- Automatic day counter (0-90)
- Weekly workout cycle tracking
- Daily macronutrient and hydration logging
- Weight and measurements history
- Progress photos timeline support

### User-Centric Design
- Clean, modern UI
- Easy-to-use form inputs
- Visual progress indicators
- Motivational messages
- Expandable sections for more details

## Usage Tips

1. **Set your start date**: The app automatically counts days from when you first use it
2. **Daily checklist**: Complete the daily checklist to track your progress
3. **Workout tracking**: Check off exercises as you complete them in the gym
4. **Nutrition logging**: Log your meals and macros at the end of the day
5. **Weekly weigh-in**: Record your weight and waist measurement once a week
6. **Review your plan**: Check the Plan tab for current phase goals and targets

## Customization

You can customize:
- Calorie and macro targets in the Nutrition screen
- Workout exercises in the Workout screen constants
- Weight targets in the Progress screen
- Daily targets in the Dashboard checklist

Edit these in the respective screen component files.

## Troubleshooting

### App won't load
1. Make sure you're on the same WiFi network as your computer
2. Try clearing Metro cache: Press `shift+c` in the terminal
3. Kill the server and restart: `npm start`

### Data not persisting
1. Check that AsyncStorage is properly initialized
2. Clear app cache: Quit Expo Go and reopen
3. Check browser console for errors

### Performance issues
1. Make sure you have enough RAM available
2. Close other resource-heavy apps
3. Clear Metro cache: `npx expo start --clear`

## Commands

```bash
# Start development server
npm start

# Run linter
npm run lint

# Reset project to defaults
npm run reset-project

# Build for production
npx eas build

# Development on specific platforms
npm run ios      # iOS simulator
npm run android  # Android emulator
npm run web      # Web browser
```

## Next Steps (Post 90 Days)

1. **Measure Results**: Compare starting and ending measurements
2. **Take Photos**: Compile before/after photos
3. **Plan Next Phase**: Set new goals for the next 90 days
4. **Maintenance**: Switch to a maintenance plan to sustain results
5. **Share Results**: Track your transformation journey

## Support & Notes

- This app is designed for a specific user profile (37-year-old, 5'8", 82kg → 72kg)
- Caloric targets and macros are customized for this profile
- Adjust targets based on your personal needs and goals
- Consult a fitness professional before starting any new program

## License

This project is created for personal fitness tracking purposes.

---

**Happy Training! 💪 Get to your FitBody90 Goal!** 🎯
