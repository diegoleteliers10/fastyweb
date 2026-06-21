# fastyweb

Marketing site for [Fasty](https://github.com/diegoleteliers10/fasty), a GPU-accelerated terminal emulator written in Rust on `wgpu` and `winit`.

## Stack

- [Astro 6](https://astro.build) — static site, zero JS by default
- Vanilla CSS with custom properties (no Tailwind, no CSS-in-JS)
- [Geist](https://vercel.com/font) + [JetBrains Mono](https://www.jetbrains.com/lp/mono/) via `@fontsource-variable`
- Vanilla TypeScript for the small interactive bits (theme picker, tab indicator, copy-to-clipboard)

## Develop

```bash
bun install
bun run dev
```

Server starts at <http://localhost:4321> (or the next free port — check the terminal output).

## Build

```bash
bun run build
bun run preview
```

Output goes to `./dist/` as a fully static site.

## Project layout

```
src/
├── components/
│   ├── Nav.astro              # sticky header with live GitHub star count
│   ├── Footer.astro
│   └── sections/
│       ├── Hero.astro         # hero + animated terminal mock
│       ├── Features.astro      # alternating copy + code blocks
│       ├── Performance.astro   # cargo bench output + E2E comparison
│       ├── Themes.astro        # interactive theme switcher
│       └── Install.astro       # tabbed install commands
├── layouts/
│   └── Layout.astro
├── lib/
│   └── repo.ts                # GitHub API fetch (version + stars)
├── pages/
│   └── index.astro
└── styles/
    ├── tokens.css             # design tokens (colors, type, spacing)
    └── global.css             # base + animations
```

## Design system

Tokens live in `src/styles/tokens.css`. Neutrals are tinted toward the brand hue (warm amber), never pure black or white. One accent color (`--voltage-orange`) carries 30–60% of the surface.

Typography pair:
- **Geist Variable** — UI text, headings
- **JetBrains Mono Variable** — terminal mockups, code blocks, meta labels

## Live data

The nav pulls two things from the GitHub API at build time:

- **Latest release tag** — shown as the version pill (`v0.4.1`)
- **Star count** — shown in the GitHub badge

Both calls live in `src/lib/repo.ts`. If the API fails, the build falls back to a hard-coded version and hides the star count.

## Interactive bits

There are exactly three pieces of client JS on the page:

1. **Theme switcher** (`Themes.astro`) — click a theme in the registry list, both the featured preview and the hero terminal swap to that palette. Selection persists in `localStorage`.
2. **Install tabs** (`Install.astro`) — tab indicator slides between buttons; `Copy` button swaps to a checkmark on success.
3. **Hero terminal** (`Hero.astro`) — types commands, reveals output, resets. Loops. Respects `prefers-reduced-motion`.

All transitions use a single custom easing curve, `cubic-bezier(0.23, 1, 0.32, 1)`, declared in `tokens.css` as `--ease-out`.

## Conventions

- No comments in code (the code should be self-documenting)
- No utility CSS, no Tailwind
- Cards only when they're the right affordance — nested cards are never right
- Side-stripe borders (`border-left` as a colored accent) are banned
- Gradient text is banned — use a single solid color and weight/size for emphasis
- The hero-metric template (big number / small label / supporting stats) is banned — show real `cargo bench` output instead

## License

MIT. Fasty itself is at [github.com/diegoleteliers10/fasty](https://github.com/diegoleteliers10/fasty).
