# Background Music for Property Reels

Drop royalty-free music tracks here. They'll be available via `staticFile("music/track-name.mp3")`.

## Recommended Tracks (Pixabay — Free, No Attribution)

Download these from Pixabay and rename them:

1. **upbeat.mp3** — "Corporate Upbeat" by DELOSound
   https://pixabay.com/music/electronic-corporate-upbeat-471123/
   Use for: Standard property reels, carousel slideshows

2. **luxury.mp3** — "Diamond" by Grand_Project
   https://pixabay.com/music/search/luxury%20cinematic/
   Use for: Villa reels, luxury property showcases

3. **chill.mp3** — Summer acoustic / chill track
   https://pixabay.com/music/search/summer%20chill%20acoustic/
   Use for: Area guide carousels, lifestyle content

## Usage

### In Remotion Studio
Set the `musicTrack` prop to the filename:
```
musicTrack: "music/upbeat.mp3"
```

### In render scripts
```bash
npx tsx src/scripts/render-property.ts N9499 --music=music/upbeat.mp3
```

### In theme configs
The generate-themes script automatically assigns:
- `music/upbeat.mp3` → standard property reels & carousels
- `music/luxury.mp3` → luxury/villa themes
- `music/chill.mp3` → area guides, best value themes

### Via URL (no download needed)
You can also pass a direct URL:
```
musicTrack: "https://cdn.pixabay.com/audio/..."
```

## File Format
- MP3 format recommended (smaller files, faster renders)
- Keep tracks under 2MB
- Tracks loop automatically if shorter than the video
