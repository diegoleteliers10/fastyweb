export type ReleaseDownload = {
  platform: string;
  arch: string;
  os: "macos" | "linux" | "windows";
  filename: string;
  url: string;
};

export type ReleaseItem = {
  version: string;
  tag: string;
  date: string;
  title: string;
  isLatest?: boolean;
  highlights: string[];
  downloads: ReleaseDownload[];
  changes: {
    features?: string[];
    fixes?: string[];
    performance?: string[];
    chores?: string[];
  };
};

const GITHUB_REPO = "diegoleteliers10/fasty";
const BASE_DOWNLOAD_URL = `https://github.com/${GITHUB_REPO}/releases/download`;

export const createDownloads = (tag: string): ReleaseDownload[] => [
  {
    platform: "macOS",
    arch: "Apple Silicon (aarch64)",
    os: "macos",
    filename: "fastty-aarch64-apple-darwin.tar.gz",
    url: `${BASE_DOWNLOAD_URL}/${tag}/fastty-aarch64-apple-darwin.tar.gz`,
  },
  {
    platform: "macOS",
    arch: "Intel (x86_64)",
    os: "macos",
    filename: "fastty-x86_64-apple-darwin.tar.gz",
    url: `${BASE_DOWNLOAD_URL}/${tag}/fastty-x86_64-apple-darwin.tar.gz`,
  },
  {
    platform: "Linux",
    arch: "x86_64 (glibc)",
    os: "linux",
    filename: "fastty-x86_64-unknown-linux-gnu.tar.gz",
    url: `${BASE_DOWNLOAD_URL}/${tag}/fastty-x86_64-unknown-linux-gnu.tar.gz`,
  },
  {
    platform: "Windows",
    arch: "x86_64",
    os: "windows",
    filename: "fastty-x86_64-pc-windows-msvc.zip",
    url: `${BASE_DOWNLOAD_URL}/${tag}/fastty-x86_64-pc-windows-msvc.zip`,
  },
];

export const FALLBACK_RELEASES: ReleaseItem[] = [
  {
    version: "0.7.3",
    tag: "v0.7.3",
    date: "2026-08-30",
    title: "Mission Control, Multi-Tab Search, Mux Semantics, Workspace Persistence & Kitty Graphics",
    isLatest: true,
    highlights: [
      "Mission Control / Tab Peek Grid View (⌘⇧O / Ctrl+Shift+M)",
      "Global Multi-Tab Search (⌘⇧F / Ctrl+Shift+F) powered by fff-search",
      "Lightweight Workspace & Split Persistence (~/.config/fastty/sessions/)",
      "SSH Manager with Mux Semantics, Environment Tags & 1-Key Reconnect",
      "Dynamic Deck process icons (nvim, cargo, node, git, ssh, docker)",
      "Config Importer for Ghostty, Alacritty, Kitty, tmux, and WezTerm",
      "Keybinding Presets (Default, Ghostty, tmux, iTerm2)",
      "Hardware-accelerated Kitty Graphics Protocol inline rendering",
    ],
    downloads: createDownloads("v0.7.3"),
    changes: {
      features: [
        "Added Mission Control / Tab Peek grid view overlay (⌘⇧O) with live buffer snapshots.",
        "Added Unified Multi-Tab Search (⌘⇧F) searching across all tab scrollbacks concurrently.",
        "Added Workspace Snapshot saving and recursive split tree restoring from Command Palette.",
        "Added SSH host tag detection (#prod, #dev, #aws), active indicators and resilient keepalive reconnect loop.",
        "Added 1-click config importer for Ghostty, Alacritty, Kitty, tmux, and WezTerm in Settings.",
        "Added keybinding preset switcher (Default, Ghostty, tmux, iTerm2).",
        "Added Kitty Graphics protocol decoding and GPU rendering in cell grid.",
        "Increased default scrollback buffer to 10,000 lines (up to 100,000) with memory estimator.",
      ],
      fixes: [
        "Fixed mouse tracking state deactivation when exiting interactive TUIs.",
        "Fixed scrollback clamping and live resize synchronization.",
        "Fixed Settings window initial width and Mission Control traffic lights clearance.",
      ],
    },
  },
  {
    version: "0.7.1",
    tag: "v0.7.1",
    date: "2026-08-28",
    title: "Vertical Sidebar Tabs, Resizable Pane Splits & Image Paste",
    highlights: [
      "Vertical Tab Sidebar mode (⌘B / tab_layout = 'vertical')",
      "Full clipboard image paste support and file URI decoding",
      "Interactive resizable directional pane splits",
      "Cross-platform unified window dragging behavior",
    ],
    downloads: createDownloads("v0.7.1"),
    changes: {
      features: [
        "Added vertical tab sidebar toggle (⌘B / Ctrl+Shift+B).",
        "Added clipboard image paste directly into shell prompts.",
        "Added drag handle resizing for split terminal panes.",
        "Added support for file URI decoding during drop actions.",
      ],
      fixes: [
        "Fixed cross-platform topbar dragging inconsistencies.",
        "Fixed PTY event cycle handling on high frame rate displays.",
      ],
    },
  },
  {
    version: "0.7.0",
    tag: "v0.7.0",
    date: "2026-08-23",
    title: "Dedicated Settings Window, Live Config Sync & Logo Menu",
    highlights: [
      "Native dedicated settings window",
      "Multi-window live configuration synchronization",
      "Topbar brand logo menu with fast actions",
    ],
    downloads: createDownloads("v0.7.0"),
    changes: {
      features: [
        "Dedicated graphical settings window with instant preview.",
        "Topbar logo context menu with version details and quick access.",
        "Atomic live config synchronization across all open windows.",
      ],
      fixes: [
        "Fixed config watcher debounce on rapid external modifications.",
      ],
    },
  },
  {
    version: "0.6.14",
    tag: "v0.6.14",
    date: "2026-08-23",
    title: "Drag & Drop Files, File URI Decoding & Clipboard Pasting",
    highlights: [
      "Native OS drag-and-drop support into terminal tabs",
      "Automatic URL and URI escaping for pasted paths",
    ],
    downloads: createDownloads("v0.6.14"),
    changes: {
      features: [
        "Added drag-and-drop file support to paste sanitized paths into prompt.",
        "Added automatic quotation for file paths with spaces.",
      ],
    },
  },
  {
    version: "0.6.13",
    tag: "v0.6.13",
    date: "2026-08-21",
    title: "Kitty Graphics Protocol & Complete Cursor Shapes",
    highlights: [
      "Kitty Graphics Protocol implementation for inline terminal images",
      "Support for beam, block, underline, and hollow block cursor shapes",
    ],
    downloads: createDownloads("v0.6.13"),
    changes: {
      features: [
        "Added Kitty Graphics protocol decoding and GPU quad rendering.",
        "Added configurable cursor shapes (beam, block, underline, hollow_block).",
      ],
      fixes: [
        "Fixed cursor blink interval reset when typing actively.",
      ],
    },
  },
  {
    version: "0.6.12",
    tag: "v0.6.12",
    date: "2026-08-20",
    title: "Windows Native Controls, ConPTY Tab Moves & Dead Keys",
    highlights: [
      "Windows ConPTY tab migration fixes",
      "Latin AltGr dead keys composition support on Windows",
      "Suppression of background console flash windows",
    ],
    downloads: createDownloads("v0.6.12"),
    changes: {
      fixes: [
        "Fixed topbar dragging on Windows with high-DPI scaling.",
        "Fixed AltGr and dead key composition on Windows international keyboards.",
        "Eliminated background cmd.exe window flashes during startup.",
      ],
    },
  },
  {
    version: "0.6.11",
    tag: "v0.6.11",
    date: "2026-08-20",
    title: "Continuous Drag Auto-Scroll & Selection Classifier",
    highlights: [
      "Auto-scroll buffer when dragging text selection past viewport edges",
      "Mouse release event safety guarantees",
    ],
    downloads: createDownloads("v0.6.11"),
    changes: {
      features: [
        "Added continuous scrollback acceleration during active drag selection.",
        "Added mouse release detection outside window bounds.",
      ],
    },
  },
  {
    version: "0.6.10",
    tag: "v0.6.10",
    date: "2026-08-19",
    title: "OSC Sequence Expansion & Windows Chrome Layout",
    highlights: [
      "Expanded ANSI OSC escape sequences support",
      "Pixel-aligned Windows chrome layout",
    ],
    downloads: createDownloads("v0.6.10"),
    changes: {
      features: [
        "Added support for OSC 8 hyperlinks and OSC 52 clipboard sequences.",
      ],
      fixes: [
        "Aligned Windows border padding and caption button offsets.",
      ],
    },
  },
  {
    version: "0.6.9",
    tag: "v0.6.9",
    date: "2026-08-19",
    title: "Directional Terminal Panes & Right-Click Context Menu",
    highlights: [
      "Directional split panes (horizontal & vertical)",
      "Per-pane independent scrollbars and PTY sessions",
      "Right-click context menu for tabs and terminal buffer",
    ],
    downloads: createDownloads("v0.6.9"),
    changes: {
      features: [
        "Added directional pane splitting (⌘D / ⌘⇧D).",
        "Added per-pane scrollbar tracks and viewport hit-testing.",
        "Added right-click context menu (Copy, Paste, Split, Close).",
      ],
    },
  },
  {
    version: "0.6.8",
    tag: "v0.6.8",
    date: "2026-08-18",
    title: "Smooth Scrolling & Bottombar Git Worktree Switcher",
    highlights: [
      "Kinetic smooth scrolling in terminal viewport",
      "Interactive branch and worktree dropdown menu in bottom bar",
    ],
    downloads: createDownloads("v0.6.8"),
    changes: {
      features: [
        "Added interactive git branch switcher dropdown from bottom bar widget.",
        "Added sub-pixel smooth scroll interpolation.",
      ],
    },
  },
  {
    version: "0.6.5",
    tag: "v0.6.5",
    date: "2026-08-17",
    title: "GPUI Paint API Migration & Geometric Glyph Synthesis",
    highlights: [
      "Complete renderer migration to GPUI Paint API",
      "Geometric synthesis for box-drawing and block characters without hairline gaps",
      "Enhanced contrast in modal dialogs and command palette",
    ],
    downloads: createDownloads("v0.6.5"),
    changes: {
      performance: [
        "Reduced draw call overhead via batched quad painting.",
        "Eliminated font fallback latency for standard box drawing glyphs.",
      ],
    },
  },
  {
    version: "0.6.4",
    tag: "v0.6.4",
    date: "2026-08-16",
    title: "macOS IME Dead Keys, Bracketed Paste & option_as_meta",
    highlights: [
      "Full Latin keyboard dead key composition support on macOS",
      "Configurable option_as_meta setting for Emacs/Vim keybindings",
      "Bracketed paste mode (DEC Mode 2004) support",
    ],
    downloads: createDownloads("v0.6.4"),
    changes: {
      features: [
        "Added option_as_meta configuration option.",
        "Added native macOS input method composition handler.",
        "Added bracketed paste wrapping for TUI safety.",
      ],
    },
  },
  {
    version: "0.6.3",
    tag: "v0.6.3",
    date: "2026-08-16",
    title: "Synchronized Output (DEC 2026) & Full TUI Compatibility",
    highlights: [
      "Zero-tearing synchronized output (DEC Mode 2026)",
      "Pixel-perfect rendering for OpenCode, Claude Code, Lazygit, and htop",
    ],
    downloads: createDownloads("v0.6.3"),
    changes: {
      features: [
        "Implemented DEC Mode 2026 synchronized output.",
        "Added proper double-width emoji cell sizing.",
      ],
    },
  },
  {
    version: "0.6.1",
    tag: "v0.6.1",
    date: "2026-08-16",
    title: "In-App Release Auto-Updater & Shell PATH Discovery",
    highlights: [
      "Automatic background update checking against GitHub releases",
      "Deterministic macOS login-shell environment loading",
    ],
    downloads: createDownloads("v0.6.1"),
    changes: {
      features: [
        "Added built-in update notification and download mechanism.",
      ],
      fixes: [
        "Fixed login shell PATH resolution when launched from macOS Finder / .app.",
      ],
    },
  },
  {
    version: "0.5.8",
    tag: "v0.5.8",
    date: "2026-07-09",
    title: "Memory Optimization & Texture Atlas Efficiency",
    highlights: [
      "Reduced texture atlas VRAM footprint",
      "Hyperlink cache memory leak elimination",
    ],
    downloads: createDownloads("v0.5.8"),
    changes: {
      performance: [
        "Optimized font glyph caching memory usage by 40%.",
        "Fixed memory leak in long-running scrollback link classifier.",
      ],
    },
  },
  {
    version: "0.5.6",
    tag: "v0.5.6",
    date: "2026-07-08",
    title: "Smooth Cross-Platform Window Resizing",
    highlights: [
      "Platform-specific resize event pacing",
      "GPU timeout recovery during window drag resize",
    ],
    downloads: createDownloads("v0.5.6"),
    changes: {
      fixes: [
        "Eliminated resize stutter on Wayland and macOS Metal layer.",
      ],
    },
  },
  {
    version: "0.4.7",
    tag: "v0.4.7",
    date: "2026-07-04",
    title: "Native macOS Traffic Lights & Window Session Restore",
    highlights: [
      "Native macOS window chrome controls",
      "Automatic session state, window size and position persistence",
    ],
    downloads: createDownloads("v0.4.7"),
    changes: {
      features: [
        "Integrated native macOS traffic lights controls.",
        "Saved and restored window geometry across restarts.",
      ],
    },
  },
  {
    version: "0.4.0",
    tag: "v0.4.0",
    date: "2026-06-20",
    title: "Startup Optimization, Sub-1% CPU Idle & E2E Benchmarks",
    highlights: [
      "Warm startup under 80ms on Apple Silicon",
      "Sub-1% CPU utilization at idle",
      "Automated Criterion benchmark suite",
    ],
    downloads: createDownloads("v0.4.0"),
    changes: {
      performance: [
        "Optimized cold startup by eliminating redundant font enumeration.",
        "Achieved 23.8 µs parser throughput on Apple Silicon M-series.",
      ],
    },
  },
  {
    version: "0.3.3",
    tag: "v0.3.3",
    date: "2026-06-10",
    title: "Project Jumper, Git Worktrees & Snippet Engine",
    highlights: [
      "Project Jumper (⌘J) for fast folder hopping",
      "Git Worktree switcher (⌘⌥W)",
      "Snippets engine with Tab expansion and VSCode-style variables",
    ],
    downloads: createDownloads("v0.3.3"),
    changes: {
      features: [
        "Introduced Project Jumper modal (⌘J).",
        "Introduced Git Worktree picker (⌘⌥W).",
        "Introduced ~/.config/fastty/snippets.toml expansion system.",
      ],
    },
  },
  {
    version: "0.3.0",
    tag: "v0.3.0",
    date: "2026-06-07",
    title: "Git Status Bottombar & Built-in SSH Host Manager",
    highlights: [
      "Configurable bottombar with Git branch and status widgets",
      "SSH Host Manager (⌘O)",
    ],
    downloads: createDownloads("v0.3.0"),
    changes: {
      features: [
        "Added customizable bottombar widget bar.",
        "Added SSH connection manager parsing ~/.ssh/config.",
      ],
    },
  },
  {
    version: "0.2.8",
    tag: "v0.2.8",
    date: "2026-06-04",
    title: "TOML Configuration System & Live Reload",
    highlights: [
      "fastty.toml configuration format with live file watcher reload",
      "Command Palette (⌘P)",
      "Custom color themes and buffer search (⌘F)",
    ],
    downloads: createDownloads("v0.2.8"),
    changes: {
      features: [
        "Migrated configuration to fastty.toml with instant live reload.",
        "Added in-buffer search modal (⌘F).",
        "Added Command Palette (⌘P).",
      ],
    },
  },
  {
    version: "0.1.0",
    tag: "v0.1.0",
    date: "2026-05-30",
    title: "Initial Public Release",
    highlights: [
      "GPU-accelerated terminal emulator core",
      "GPUI & Alacritty Terminal parser",
      "Cross-platform support for macOS, Linux, and Windows",
    ],
    downloads: createDownloads("v0.1.0"),
    changes: {
      features: [
        "Initial release with tabs, GPU quad rasterization, and PTY management.",
      ],
    },
  },
];

type GitHubAsset = {
  name: string;
  browser_download_url: string;
  size: number;
};

type GitHubRelease = {
  tag_name: string;
  name: string | null;
  published_at: string;
  body: string | null;
  assets: GitHubAsset[];
};

function parseBodyToChanges(body: string | null): {
  highlights: string[];
  changes: ReleaseItem["changes"];
} {
  if (!body) {
    return {
      highlights: ["Automatic release update with latest performance improvements and bug fixes."],
      changes: {
        features: ["See repository commits for full details."],
      },
    };
  }

  const lines = body
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("-") || l.startsWith("*"));

  const cleaned = lines.map((l) => l.replace(/^[-*]\s*/, ""));
  const features: string[] = [];
  const fixes: string[] = [];
  const performance: string[] = [];
  const chores: string[] = [];

  for (const item of cleaned) {
    const lower = item.toLowerCase();
    if (lower.startsWith("fix") || lower.includes("bug")) {
      fixes.push(item);
    } else if (lower.startsWith("perf") || lower.includes("speed") || lower.includes("memory")) {
      performance.push(item);
    } else if (lower.startsWith("chore") || lower.startsWith("build") || lower.startsWith("ci")) {
      chores.push(item);
    } else {
      features.push(item);
    }
  }

  const highlights = cleaned.slice(0, 4);

  return {
    highlights: highlights.length > 0 ? highlights : ["Performance and stability improvements."],
    changes: {
      features: features.length > 0 ? features : undefined,
      fixes: fixes.length > 0 ? fixes : undefined,
      performance: performance.length > 0 ? performance : undefined,
      chores: chores.length > 0 ? chores : undefined,
    },
  };
}

let cachedReleases: Promise<ReleaseItem[]> | null = null;

export const fetchReleases = async (): Promise<ReleaseItem[]> => {
  if (cachedReleases) return cachedReleases;

  cachedReleases = (async (): Promise<ReleaseItem[]> => {
    try {
      const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases?per_page=50`, {
        headers: { Accept: "application/vnd.github+json", "User-Agent": "fasty-site" },
      });

      if (!res.ok) {
        return FALLBACK_RELEASES;
      }

      const ghReleases = (await res.json()) as GitHubRelease[];
      if (!Array.isArray(ghReleases) || ghReleases.length === 0) {
        return FALLBACK_RELEASES;
      }

      const fallbackMap = new Map<string, ReleaseItem>();
      for (const rel of FALLBACK_RELEASES) {
        fallbackMap.set(rel.tag, rel);
      }

      const merged: ReleaseItem[] = ghReleases.map((gh, index) => {
        const tag = gh.tag_name;
        const version = tag.replace(/^v/, "");
        const date = gh.published_at ? gh.published_at.slice(0, 10) : new Date().toISOString().slice(0, 10);
        const known = fallbackMap.get(tag);

        let downloads: ReleaseDownload[];
        if (gh.assets && gh.assets.length > 0) {
          const armMac = gh.assets.find((a) => a.name.includes("aarch64-apple-darwin"));
          const intelMac = gh.assets.find((a) => a.name.includes("x86_64-apple-darwin"));
          const linux = gh.assets.find((a) => a.name.includes("unknown-linux-gnu"));
          const windows = gh.assets.find((a) => a.name.includes("windows-msvc"));

          downloads = [
            {
              platform: "macOS",
              arch: "Apple Silicon (aarch64)",
              os: "macos",
              filename: armMac?.name ?? "fastty-aarch64-apple-darwin.tar.gz",
              url: armMac?.browser_download_url ?? `${BASE_DOWNLOAD_URL}/${tag}/fastty-aarch64-apple-darwin.tar.gz`,
            },
            {
              platform: "macOS",
              arch: "Intel (x86_64)",
              os: "macos",
              filename: intelMac?.name ?? "fastty-x86_64-apple-darwin.tar.gz",
              url: intelMac?.browser_download_url ?? `${BASE_DOWNLOAD_URL}/${tag}/fastty-x86_64-apple-darwin.tar.gz`,
            },
            {
              platform: "Linux",
              arch: "x86_64 (glibc)",
              os: "linux",
              filename: linux?.name ?? "fastty-x86_64-unknown-linux-gnu.tar.gz",
              url: linux?.browser_download_url ?? `${BASE_DOWNLOAD_URL}/${tag}/fastty-x86_64-unknown-linux-gnu.tar.gz`,
            },
            {
              platform: "Windows",
              arch: "x86_64",
              os: "windows",
              filename: windows?.name ?? "fastty-x86_64-pc-windows-msvc.zip",
              url: windows?.browser_download_url ?? `${BASE_DOWNLOAD_URL}/${tag}/fastty-x86_64-pc-windows-msvc.zip`,
            },
          ];
        } else {
          downloads = createDownloads(tag);
        }

        if (known) {
          return {
            ...known,
            date: date || known.date,
            isLatest: index === 0,
            downloads,
          };
        }

        const { highlights, changes } = parseBodyToChanges(gh.body);
        const title = gh.name && gh.name !== tag ? gh.name.replace(/^Release\s+/i, "") : `Fastty ${tag}`;

        return {
          version,
          tag,
          date,
          title,
          isLatest: index === 0,
          highlights,
          downloads,
          changes,
        };
      });

      return merged;
    } catch {
      return FALLBACK_RELEASES;
    }
  })();

  return cachedReleases;
};
