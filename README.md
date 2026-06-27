# React Bundle App

A multi-step product bundle builder for a Wyze-style security system. Users step through cameras, plans, sensors, and accessories, pick variants and quantities, see a live-updating review with totals/savings, and optionally save the configuration to come back to later.

Built with **React 19 + TypeScript + Vite + Tailwind v4 + TanStack Query**.

---

## Running the Project

### 1. Install dependencies

From the project root:

```bash
npm install
```

### 2. Start the dev server

```bash
npm run dev
```

Open the URL printed in the terminal (default: **http://localhost:5173**) in your browser. The page hot-reloads as you edit files.

### Prerequisites

- **Node.js** 20 or higher — check with `node -v`
- **npm** 10 or higher (ships with Node) — check with `npm -v`

### All available scripts

| Command           | What it does                                                   |
| ----------------- | -------------------------------------------------------------- |
| `npm run dev`     | Start Vite dev server with hot reload                          |
| `npm run build`   | Type-check (`tsc -b`) and create a production build in `dist/` |
| `npm run preview` | Serve the built `dist/` locally                                |
| `npm run lint`    | Run ESLint across the project                                  |

---

## Features

- **Multi-step accordion flow** — Cameras, Plan, Sensors, Accessories. Multiple sections can be open at once; the first opens by default.
- **Per-variant quantity tracking** — Products with color/option variants keep an independent quantity for each variant (e.g. 2 black + 1 white camera).
- **Live review panel** — A sidebar (or full-width row on very large screens) recomputes line totals, before/after pricing, monthly financing estimate, and total savings as the user changes selections.
- **Two-way quantity controls** — Steppers on each product card and on each review row are wired to the same state, so adjusting one updates the other instantly.
- **Save for later** — Clicking _Save my system for later_ persists the current bundle to `localStorage`. Refreshing without saving discards in-progress changes; refreshing after saving restores the bundle.
- **"Next" step shortcut** — Each step has a _Next: <next step title>_ button that opens the following accordion.
- **Responsive layout**
  - Mobile: stacked single column.
  - Desktop (`lg`): two-column grid with sticky review sidebar.
  - Ultrawide (`3xl`, 1736 px+): five-column product grid with the review moved below the steps as a two-panel row.
- **Custom design system** — Gilroy webfont (5 weights), brand purple `#4E2FD2`, surface blue `#EDF4FF`, success green `#0AA288`, danger red `#D8392B`, dividers `#0B0D10`.
- **Mocked data layer with simulated latency** — Steps, products, and product options are served by mock services that resolve after a short `setTimeout`, so loading states are exercised in development.

---

## Tech Stack

| Layer         | Choice                                       |
| ------------- | -------------------------------------------- |
| Framework     | React 19                                     |
| Bundler       | Vite                                         |
| Language      | TypeScript                                   |
| Styling       | Tailwind CSS v4 (via `@tailwindcss/vite`)    |
| Icons         | `@tabler/icons-react`                        |
| Data fetching | TanStack Query v5                            |
| State         | React state + `localStorage` (explicit save) |

---

## Project Structure

```
src/
├── components/         # Reusable UI: Accordion, Card, StepIcon
├── screens/
│   ├── Bundle.tsx      # Top-level page, owns open-accordion state
│   ├── Review.tsx      # Right-side / bottom review panel
│   └── partials/
│       ├── StepSection.tsx   # One accordion + its product grid + Next button
│       └── ProductCard.tsx   # Card wired to the bundle (variant + qty)
├── hooks/
│   ├── useBundle.ts        # Local bundle state + explicit save()
│   ├── useBundleReview.ts  # Computes review lines and totals
│   ├── useSteps.ts         # React Query: list of steps
│   ├── useProducts.ts      # React Query: products per step
│   └── useProductOptions.ts# React Query: variants per product
├── services/           # Mock async data sources (simulate API latency)
├── mockData/           # Static fixtures: steps, products, options
└── index.css           # Tailwind v4 @theme tokens + Gilroy @font-face
public/
├── fonts/              # Gilroy WOFF files
├── products/           # Product images
├── shipping.png        # Fast-shipping icon
└── satisfaction-guarantee.png
```

---

## Data Fetching with TanStack Query

All "remote" data — steps, products per step, and per-product variants — is loaded through **TanStack Query (`@tanstack/react-query`) v5**, even though the backing source is a local mock. This keeps the code one swap away from a real API and gives us caching, loading states, and request deduplication for free.

### Query keys

| Key                              | Hook                           | Source                                  |
| -------------------------------- | ------------------------------ | --------------------------------------- |
| `["steps"]`                      | `useSteps()`                   | `src/services/stepsService.ts`          |
| `["products", "byStep", stepId]` | `useProducts(stepId)`          | `src/services/productsService.ts`       |
| `["productOptions", productId]`  | `useProductOptions(productId)` | `src/services/productOptionsService.ts` |

### Defaults

- `staleTime: 5 * 60 * 1000` — data is considered fresh for 5 minutes, so navigating around doesn't refetch immediately.
- Loading states drive the "Loading…" placeholders in `Bundle.tsx` and `Review.tsx`.

### Why React Query here?

- **Caching** — Reopening an accordion or remounting a card doesn't re-trigger the mock latency.
- **Parallel fetching** — `useQueries` is used internally where multiple products need their options at once (review building).
- **Single source of truth for async data** — Component code never touches `useEffect` + `useState` for fetching; it just reads `{ data, isLoading }`.

### The `QueryClient` is provisioned at the app root

See `src/main.tsx` for the `<QueryClientProvider>` wrapper that exposes the client to the whole tree.

---

## Local State & Persistence

`useBundle()` owns the user's selections in plain React state:

```ts
{
  quantities: { [productId]: { [variant]: number } },
  active: { [productId]: variant }
}
```

- **In-progress changes are NOT auto-saved.** They live in memory only.
- **`bundle.save()`** writes the current state to `localStorage` under the key `bundle:v1`. This is called when the user clicks **Save my system for later**.
- **On mount**, the hook reads `localStorage` and seeds state. So saved bundles survive refresh; unsaved ones don't.
