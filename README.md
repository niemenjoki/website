# niemenjoki.fi

Source code for [niemenjoki.fi](https://www.niemenjoki.fi), my personal website and technical playground.

The site is primarily a Finnish-language blog about building automation, heat pumps, control logic, and adjacent practical engineering topics. It also includes project pages, a small collection of browser-based tools, and a few interactive elements embedded directly into content.

This is a solo project. I am not actively looking for contributors, but the repository is public for anyone interested in how the site is built.

## What the site includes

- MDX-based blog posts under `/blogi`
- Project pages under `/projektit`
- Interactive building automation tools under `/projektit/rau-tyokalut`
- Structured metadata and JSON-LD for pages and posts
- Automatically generated `sitemap.xml` and RSS feed
- Guard rails for internal links and image paths
- Production-only analytics and consent-gated AdSense ads

## Tech stack

- Next.js 15 App Router
- React 19
- MDX via `next-mdx-remote`
- `rehype-pretty-code` + `shiki` for code blocks
- CSS Modules
- Sharp for image optimization
- Vercel Analytics and Speed Insights

## Local development

### Requirements

- Node.js `22.x`
- npm

### Install

```bash
npm install
```

### Start the dev server

```bash
npm run dev
```

The dev server runs on `0.0.0.0`, and `predev` automatically:

- optimizes image assets
- regenerates safe image and route manifests
- validates metadata
- runs Prettier

No environment variables are required for local development in the current setup.

## Available scripts

- `npm run dev` - start the local Next.js dev server
- `npm run build` - run the prebuild pipeline and create a production build
- `npm run start` - serve the production build
- `npm run lint` - run Next.js linting
- `npm run format` - format the repository with Prettier
- `npm run format:check` - check formatting without writing changes
- `npm run log:tags` - print all discovered post tags
- `npm run log:metadata` - print page metadata information for inspection

## Content model

Blog posts live in `content/posts/<slug>/` and are split into three files:

```text
content/posts/example-post/
  content.mdx
  data.json
  structuredData.json
```

### `data.json`

Post metadata is stored in `data.json`. A typical file contains:

- `title`
- `description`
- `date`
- `updated`
- `tags`
- `keywords`
- `language`

### `content.mdx`

Post bodies are written in MDX. The post renderer exposes a few custom components inside MDX, including:

- `SafeLink`
- `SafeImage`
- `InfoBox`
- `Advert`
- `DhwPidSimulator`

### `structuredData.json`

Each post has a separate JSON-LD payload used for search-friendly structured data.

## Project-specific architecture

This repository has a few intentional safeguards and automation steps that are worth knowing about.

### Safe links and safe images

`SafeLink` only allows internal links that exist in `data/generated/safeRoutes.json`.

`SafeImage` only allows images that exist in `data/generated/safeImagePaths.json`.

Both manifests are generated automatically during the prebuild step. This helps catch broken or accidental paths early, especially inside MDX content.

### Prebuild pipeline

The prebuild pipeline lives in `lib/prebuild/` and runs before both `dev` and `build`.

It currently does four things:

1. Converts and resizes images in `public/images` into optimized AVIF assets when needed
2. Regenerates the safe image path manifest
3. Regenerates the safe internal route manifest from `app/` and content-derived routes
4. Verifies metadata quality and consistency

### Metadata checks

`lib/prebuild/verifyMetadata.mjs` validates things like:

- title length
- description length
- existence of required metadata files
- route and metadata consistency

The goal is to make SEO and social metadata part of the normal development workflow instead of an afterthought.

## Production behavior

- Ads are disabled in development
- Vercel Analytics and Speed Insights are disabled in development
- AdSense is only loaded after consent has been granted
- `app/rss/route.js` generates the RSS feed
- `app/sitemap.js` generates the sitemap and validates generated URLs against the safe route manifest

## Repository structure

```text
app/                Next.js routes and page-level metadata
components/         Reusable UI, content helpers, and client tools
content/posts/      MDX blog posts and per-post metadata
data/               Site-wide constants, metadata defaults, generated manifests
hooks/              Small reusable React hooks
lib/content/        Content loading, pagination, tags, recommendations
lib/mdx/            MDX-specific helpers
lib/prebuild/       Asset generation and validation scripts
lib/routes/         Static route discovery
public/             Static assets
```

## Notable sections of the site

- `/blogi` for published posts
- `/projektit/rau-tyokalut` for Fidelix-oriented building automation tools
- `/projektit/compress-create-react-app` for the `compress-create-react-app` project page
- `/projektit/lieromaa` for the Lieromaa side project page
- `/tietoa` for the about page
- `/tietosuoja` for the privacy policy

## Notes

The site content and UI are primarily in Finnish, even though parts of the codebase and tooling are named in English.

This project is intentionally a bit over-engineered in places. That is partly the point: the site is both a publishing platform and a way for me to learn, test ideas, and refine patterns I care about.

The idea of publishing Fidelix-oriented helper tools here was partly inspired by [Jani Kauppila's site](https://janikauppila.fi), although the tools and code are different.

## License

The source code is licensed under MIT, while the website content is licensed separately under Creative Commons. See [LICENSE.md](./LICENSE.md) for details.
