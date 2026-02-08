# 🎮 Vietnamese History Picture Quiz Game

A fun and educational picture quiz game designed for Vietnamese middle school students. This interactive classroom game helps students learn about Vietnamese history through visual clues while being hosted by a teacher who controls the game flow.

![Game Screenshot](placeholder-screenshot.png)

## 🎯 Features

### Core Gameplay
- **4 Historical Topics**: Việt Nam, Phong trào Cần Vương, Khởi nghĩa Yên Thế, Ba nước Đông Dương
- **Visual Learning**: 2-5 chibi-style images per level as visual clues
- **Teacher-Controlled**: Host uses "Đúng" (Correct) and "Sai" (Wrong) buttons
- **Scoring System**: +10 points for each correct answer
- **Smooth Animations**: Framer Motion animations for engaging user experience

### Design Highlights
- 🎨 **Cute Chibi Style**: Friendly, educational aesthetic
- 🌈 **Pastel Color Palette**: Soft, appealing colors (#FFE5E5, #E5F3FF, #FFF9E5)
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- ♿ **Accessible**: ARIA labels and keyboard navigation support

### Audio System
- 🎵 Background music with volume control
- 🔊 Sound effects for correct/wrong answers
- 🎚️ Separate BGM and SFX volume controls
- 🎶 Multiple track selection (ready for custom audio)

### Hidden Admin Features
Press **Ctrl + Shift + A** to toggle the admin panel:
- Jump to any level
- Reset score
- Toggle answer visibility (debug mode)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd chip
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in your browser**
   Navigate to http://localhost:5173/

## 🎮 How to Play

### For Teachers (Game Host)

1. **Display the game** on a projector or shared screen
2. **Show the images** to students
3. Students **guess the answer verbally** (no text input needed)
4. Use the control buttons:
   - **"Đúng"** (Correct): Reveals the answer with celebration animation, adds +10 points
   - **"Sai"** (Wrong): Shakes the images as visual feedback
5. **Navigate** to the next level using the "Tiếp theo" button (enabled after correct answer)
6. Use the **← button** (top-left) to go back to previous levels if needed
7. Complete all 4 levels to see the final score

### Audio Controls (Top-Right)
- 🔊/🔇 Toggle background music
- **BGM slider**: Adjust background music volume
- **SFX slider**: Adjust sound effects volume

## 🏗️ Project Structure

```
chip/
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx       # Score, level, audio controls
│   │   ├── ImageGrid.tsx    # Image display with animations
│   │   ├── HostControls.tsx # Đúng/Sai buttons
│   │   ├── NavigationButtons.tsx
│   │   ├── AnswerReveal.tsx # Modal for answer display
│   │   ├── GameComplete.tsx # End screen
│   │   └── AdminPanel.tsx   # Hidden admin controls
│   ├── hooks/
│   │   ├── useGameState.ts  # Game state management
│   │   └── useAudio.ts      # Audio system
│   ├── data.ts              # Game levels data
│   ├── types.ts             # TypeScript interfaces
│   ├── App.tsx              # Main app component
│   ├── index.css            # Tailwind styles
│   └── main.tsx             # App entry point
├── public/                  # Static assets
├── tailwind.config.js       # Tailwind configuration
├── vite.config.ts           # Vite configuration
└── package.json
```

## 🎨 Customization

### Replace Placeholder Images

Currently using Unsplash placeholder images. To use custom chibi illustrations:

1. Add your images to the `public/images/` folder
2. Update `src/data.ts`:

```typescript
export const LEVELS: Level[] = [
  {
    id: 1,
    answer: 'Việt Nam',
    imageCount: 3,
    images: [
      '/images/chibi-vietnam-flag.png',      // TODO: Replace
      '/images/chibi-vietnam-map.png',       // TODO: Replace
      '/images/chibi-vietnam-culture.png',   // TODO: Replace
    ],
  },
  // ... update other levels
];
```

### Add Custom Audio

To add custom background music and sound effects:

1. Add audio files to `public/audio/` folder:
   - `bgm-track-1.mp3` - Background music track 1
   - `bgm-track-2.mp3` - Background music track 2 (optional)
   - `correct-ding.mp3` - Correct answer sound
   - `wrong-buzz.mp3` - Wrong answer sound
   - `level-complete.mp3` - Level completion jingle

2. Update `src/data.ts` with the correct paths (already configured)

3. Uncomment the audio initialization code in `src/hooks/useAudio.ts`:
   - Remove `//` from lines that create Audio objects
   - The system will automatically use the files from `/public/audio/`

### Add More Levels

Edit `src/data.ts` and add new level objects:

```typescript
{
  id: 5,
  answer: 'Your New Topic',
  imageCount: 3,
  images: [
    '/images/clue1.png',
    '/images/clue2.png',
    '/images/clue3.png',
  ],
}
```

## 📦 Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

## 🌐 Deploy to Vercel

### Method 1: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. Follow the prompts to complete deployment

### Method 2: Vercel Dashboard

1. **Push to GitHub** (create a repository and push your code)

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Vite settings
   - Click "Deploy"

3. **Your game is live!** 🎉

### Vercel Configuration
The project uses default Vite settings. No additional configuration needed.

**Build Command**: `npm run build`  
**Output Directory**: `dist`  
**Install Command**: `npm install`

## 🧪 Testing

### Manual Testing Checklist
- [ ] All 4 levels load correctly
- [ ] "Đúng" button reveals answer and adds +10 points
- [ ] "Sai" button triggers shake animation
- [ ] Navigation buttons work (previous/next)
- [ ] Answer reveal modal animates smoothly
- [ ] Game complete screen shows at the end
- [ ] Admin panel toggles with Ctrl+Shift+A
- [ ] Responsive on mobile (375px) and tablet (768px)
- [ ] Audio controls work (when audio files are added)

## 🛠️ Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Comic Neue Font** - Friendly typography

## ♿ Accessibility

- Keyboard navigation support (Tab + Enter)
- ARIA labels for screen readers
- Live regions for score announcements
- Touch targets ≥ 44x44px for mobile
- High contrast considerations

## 📝 Development Notes

### Console Logging
Host actions are logged to the console for debugging:
```
[HOST ACTION] Đúng clicked - Revealing answer and adding +10 points
[HOST ACTION] Sai clicked - Shaking images
[HOST ACTION] Next level clicked
[ADMIN] Admin panel toggled
```

### Admin Shortcuts
- **Ctrl + Shift + A**: Toggle admin panel
- Jump to any level from admin panel
- Reset score without restarting
- Show/hide answers for debugging

## 📄 License

This project is designed for educational purposes.

## 🤝 Contributing

Feel free to fork this project and customize it for your classroom needs!

---

**Made with ❤️ for Vietnamese students learning history**
