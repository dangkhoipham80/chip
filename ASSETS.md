# 📁 Asset Replacement Guide

This guide helps you replace placeholder assets with custom content for your Vietnamese History Picture Quiz Game.

## 🖼️ Image Assets

### Current Status
- Currently using **Unsplash placeholder images**
- Images automatically load from `https://source.unsplash.com/`

### Steps to Add Custom Chibi Images

1. **Create the images folder**
   ```
   public/
   └── images/
       ├── level1/
       ├── level2/
       ├── level3/
       └── level4/
   ```

2. **Prepare your images**
   - Format: PNG or JPG (PNG recommended for transparency)
   - Recommended size: 400x400px or larger (square aspect ratio)
   - Style: Chibi/cute illustrations as per design spec
   - Compression: Optimize for web (use TinyPNG or similar)

3. **File naming convention** (suggested):
   ```
   Level 1 (Việt Nam):
   - vietnam-flag.png
   - vietnam-map.png
   - vietnam-culture.png

   Level 2 (Phong trào Cần Vương):
   - can-vuong-emperor.png
   - can-vuong-resistance.png
   - can-vuong-1885.png

   Level 3 (Khởi nghĩa Yên Thế):
   - yen-the-mountain.png
   - hoang-hoa-tham.png

   Level 4 (Ba nước Đông Dương):
   - vietnam-map.png
   - laos-map.png
   - cambodia-map.png
   ```

4. **Update src/data.ts**:
   ```typescript
   export const LEVELS: Level[] = [
     {
       id: 1,
       answer: 'Việt Nam',
       imageCount: 3,
       images: [
         '/images/level1/vietnam-flag.png',
         '/images/level1/vietnam-map.png',
         '/images/level1/vietnam-culture.png',
       ],
     },
     {
       id: 2,
       answer: 'Phong trào Cần Vương',
       imageCount: 3,
       images: [
         '/images/level2/can-vuong-emperor.png',
         '/images/level2/can-vuong-resistance.png',
         '/images/level2/can-vuong-1885.png',
       ],
     },
     {
       id: 3,
       answer: 'Khởi nghĩa Yên Thế',
       imageCount: 2,
       images: [
         '/images/level3/yen-the-mountain.png',
         '/images/level3/hoang-hoa-tham.png',
       ],
     },
     {
       id: 4,
       answer: 'Ba nước Đông Dương',
       imageCount: 3,
       images: [
         '/images/level4/vietnam-map.png',
         '/images/level4/laos-map.png',
         '/images/level4/cambodia-map.png',
       ],
     },
   ];
   ```

## 🎵 Audio Assets

### Current Status
- Audio system is **implemented but uses placeholders**
- Code comments indicate where audio files should be placed

### Steps to Add Custom Audio Files

1. **Create the audio folder**
   ```
   public/
   └── audio/
       ├── bgm-track-1.mp3
       ├── bgm-track-2.mp3 (optional)
       ├── correct-ding.mp3
       ├── wrong-buzz.mp3
       └── level-complete.mp3
   ```

2. **Audio file specifications**:
   
   **Background Music (BGM)**:
   - Format: MP3 or WAV
   - Duration: 2-3 minutes (will loop)
   - Style: Upbeat, educational, friendly
   - Volume: Normalize to -14 LUFS
   - File size: Keep under 5MB

   **Sound Effects (SFX)**:
   - Format: MP3 or WAV
   - Duration:
     * `correct-ding.mp3`: 0.5-1 second (cheerful "ding" sound)
     * `wrong-buzz.mp3`: 0.3-0.5 second (soft "buzz" sound)
     * `level-complete.mp3`: 2-3 seconds (victory jingle)
   - Volume: Normalize to -10 LUFS
   - File size: Keep under 100KB each

3. **Activate audio in src/hooks/useAudio.ts**

   Find and uncomment these lines (remove `//`):

   ```typescript
   // Line ~16-18 in useAudio.ts
   useEffect(() => {
     // Initialize BGM (will be replaced with actual audio file)
     bgmRef.current = new Audio(AUDIO_TRACKS.bgm[audioConfig.currentTrack]); // UNCOMMENT THIS
     bgmRef.current.loop = true;                                              // UNCOMMENT THIS
     bgmRef.current.volume = audioConfig.bgmVolume;                          // UNCOMMENT THIS

     return () => {
       if (bgmRef.current) {
         bgmRef.current.pause();
       }
     };
   }, []);

   // Line ~56-59 in useAudio.ts
   const playSFX = useCallback((sfxType: 'correct' | 'wrong' | 'levelComplete') => {
     // TODO: Implement with actual audio files
     console.log(`[AUDIO] Playing SFX: ${sfxType}`);
     const sfx = new Audio(AUDIO_TRACKS.sfx[sfxType]);                       // UNCOMMENT THIS
     sfx.volume = audioConfig.sfxVolume;                                     // UNCOMMENT THIS
     sfx.play().catch(err => console.log('SFX playback failed:', err));      // UNCOMMENT THIS
   }, []);
   ```

4. **Test audio on different browsers**
   - Chrome/Edge: Should work without issues
   - Safari/iOS Safari: Requires user interaction before playing (handled automatically)
   - Firefox: Test volume controls
   - Mobile browsers: Test audio playback during gameplay

### Where to Find Free Audio

**Background Music**:
- [Incompetech](https://incompetech.com/) - Royalty-free music
- [Bensound](https://www.bensound.com/) - Free music for education
- [FreePD](https://freepd.com/) - Public domain music

**Sound Effects**:
- [Freesound](https://freesound.org/) - Creative Commons sounds
- [Zapsplat](https://www.zapsplat.com/) - Free SFX (attribution required)
- [Mixkit](https://mixkit.co/free-sound-effects/) - Free sound effects

## 🎨 Optional: Custom Styling

### Change Color Palette

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      'pastel-pink': '#YOUR_COLOR',    // Currently #FFE5E5
      'pastel-blue': '#YOUR_COLOR',    // Currently #E5F3FF
      'pastel-yellow': '#YOUR_COLOR',  // Currently #FFF9E5
    },
  },
}
```

### Change Font

1. Import your font in `src/index.css`:
   ```css
   @import url('https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;700&display=swap');
   ```

2. Update Tailwind config:
   ```javascript
   fontFamily: {
     'comic': ['"Your Font"', 'cursive', 'system-ui'],
   },
   ```

## ✅ Testing Your Assets

After replacing assets:

1. **Clear browser cache**: Ctrl + Shift + R (or Cmd + Shift + R on Mac)
2. **Check console**: Look for 404 errors indicating missing files
3. **Test each level**: Ensure all images load
4. **Test audio**: Try all sound effects and background music
5. **Mobile testing**: Test on actual mobile devices

## 🚨 Common Issues

**Images not loading**:
- Check file paths (case-sensitive on Linux/Mac)
- Ensure files are in `public/` folder
- Clear browser cache
- Check browser console for errors

**Audio not playing**:
- Check if files are in correct format (MP3/WAV)
- Ensure audio code is uncommented in `useAudio.ts`
- Test on different browsers
- Check browser console for errors
- On mobile, audio requires user interaction (first click enables it)

**Performance issues**:
- Optimize images (use ImageOptim, TinyPNG, or Squoosh)
- Compress audio files
- Consider using WebP format for images
- Use lazy loading (already implemented)

---

**Need help?** Check the console logs for detailed error messages!
