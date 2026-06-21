---
name: High-Velocity Terminal
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#dac2ad'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#a28d79'
  outline-variant: '#544433'
  surface-tint: '#ffb869'
  primary: '#ffc485'
  on-primary: '#482900'
  primary-container: '#ff9d00'
  on-primary-container: '#663c00'
  inverse-primary: '#885200'
  secondary: '#fff0c8'
  on-secondary: '#3b2f00'
  secondary-container: '#fdd000'
  on-secondary-container: '#6e5900'
  tertiary: '#d1cece'
  on-tertiary: '#313030'
  tertiary-container: '#b5b3b3'
  on-tertiary-container: '#464545'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdcbb'
  primary-fixed-dim: '#ffb869'
  on-primary-fixed: '#2c1700'
  on-primary-fixed-variant: '#673d00'
  secondary-fixed: '#ffe07c'
  secondary-fixed-dim: '#ecc200'
  on-secondary-fixed: '#231b00'
  on-secondary-fixed-variant: '#564500'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  terminal-main:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  terminal-bold:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.5'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  container-margin: 24px
  gutter: 12px
---

## Brand & Style
This design system is built for speed, precision, and technical rigor. It targets developers and power users who demand a distraction-free environment that feels both high-performance and premium.

The aesthetic follows a **Modern Minimalist** philosophy with a **Technical** edge. By utilizing a deep, near-black canvas punctuated by high-energy amber accents, the UI evokes the feeling of a sophisticated command center. Visual hierarchy is achieved through stark contrast and purposeful whitespace rather than decorative elements. The mood is focused, professional, and unapologetically digital.

## Colors
The palette is centered on a "Voltage" gradient inspired by the brand logo, transitioning from a deep saturated orange (`#FF9D00`) to a bright electric yellow (`#FFD200`). 

- **Primary Canvas**: The interface uses a deep terminal black (`#080808`) to ensure maximum screen contrast and reduce eye strain during long sessions.
- **Accents**: The primary orange is used sparingly for active states, cursors, and critical notifications.
- **Surfaces**: Secondary surfaces and sidebars use a slightly lighter gray (`#1A1A1A`) to create subtle depth without breaking the minimalist aesthetic.
- **Data Visualization**: Syntax highlighting and terminal output should prioritize high-readability tints of the primary colors, alongside neutral whites and muted grays.

## Typography
The system employs a dual-font strategy to separate administrative UI from technical output:

- **Geist**: Used for all functional UI elements, menus, and headings. It provides a modern, geometric clarity that feels contemporary.
- **JetBrains Mono**: The workhorse for the terminal emulator itself and code-related labels. This monospaced font ensures perfect alignment for data-heavy views.

For mobile viewports, `headline-lg` scales down to `24px` to maintain information density. Line heights are kept generous in the terminal view to improve scanability of long logs.

## Layout & Spacing
The layout uses a **Fluid Grid** model with high-density margins. 

- **The Terminal Workspace**: Uses a "Safe Zone" approach where terminal content is inset by `24px` from the window edges to prevent visual crowding.
- **Sidebars & Panels**: Fixed-width sidebars (default 240px) utilize a 4px base unit for all internal padding.
- **Rhythm**: Spacing is aggressive and tight within groups (4px or 8px) but expansive between major sections (24px+) to create "islands" of focus.
- **Responsive**: On mobile, sidebars collapse into bottom sheets or full-screen overlays, and container margins reduce to 16px.

## Elevation & Depth
In this system, depth is communicated through **Tonal Layers** rather than shadows. 

- **Level 0 (Background)**: `#080808` - The main terminal workspace.
- **Level 1 (Sub-surfaces)**: `#121212` - Sidebars and secondary navigation.
- **Level 2 (Overlays)**: `#1A1A1A` - Modals and dropdown menus.

To maintain a "High-Contrast" feel, use **Low-contrast outlines** (`#222222`) to define boundaries between panels. Active states are indicated by an inner glow or a solid 2px border using the primary orange accent, rather than traditional drop shadows.

## Shapes
The shape language is "Soft-Technical." Elements use a subtle `0.25rem` (4px) corner radius to keep the design feeling precise and architectural without the harshness of 90-degree corners.

Large containers like the terminal window or main cards use `rounded-lg` (8px). Interactive elements like buttons and chips remain at the base `rounded` (4px) setting to signify utility.

## Components
- **Buttons**: Primary buttons are solid black with a 1px orange border and orange text. Hover states should fill the button with the orange-to-yellow gradient and switch text to black.
- **Terminal Cursor**: A solid orange block (`#FF9D00`) with a subtle flicker animation.
- **Input Fields**: Minimalist design; no background, just a bottom border that glows orange when focused.
- **Chips/Badges**: Small, monospaced text with a dark gray background (`#1A1A1A`) and white text. Use primary colors for status indicators (e.g., orange for 'Warning').
- **Tabs**: Tab items are separated by vertical lines. The active tab is indicated by a top-aligned 2px orange stroke.
- **Cards**: Used only in settings or dashboard views. They should have no background (transparent) and a 1px border of `#1A1A1A`.