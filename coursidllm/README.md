# CoursidLLM

An AI-augmented online learning platform combining structured course delivery with LLM-powered tutoring, skills gap analysis, and career path recommendations.

## Stack

- **Frontend:** Next.js 15 (App Router), Tailwind CSS v4, TypeScript
- **Backend:** Next.js API Routes, Prisma ORM, NextAuth.js v5
- **AI:** Anthropic Claude (claude-sonnet-4-6) via streaming API
- **Database:** PostgreSQL (Supabase)
- **Payments:** Stripe
- **Storage:** Cloudflare R2

## Getting Started

### 1. Clone and install
```bash
git clone https://github.com/baskajustin/CoursidLLM.git
cd CoursidLLM
npm install
```

### 2. Set up environment variables
```bash
cp .env.local.example .env.local
# Fill in your Supabase, Stripe, Anthropic, and other keys
```

### 3. Set up the database
```bash
npx prisma generate
npx prisma db push
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages and API routes
│   ├── (marketing)/       # Homepage
│   ├── (auth)/            # Login, signup
│   ├── catalog/           # Course catalogue
│   ├── course/[slug]/     # Course detail
│   ├── learn/[slug]/      # Video player + AI chat
│   ├── dashboard/         # Learner dashboard
│   ├── skills/            # Skills Builder
│   ├── careers/           # Career Builder
│   ├── admin/             # Admin panel
│   └── api/               # API routes (chat, courses, payments, webhooks)
├── components/            # React components
│   ├── SiteHeader.tsx     # Two-tier sticky header
│   ├── SiteFooter.tsx
│   ├── CourseCard.tsx
│   ├── LLMChat.tsx        # AI tutor chat panel
│   └── ui/               # Button, Badge, Modal
├── lib/                   # Singleton clients (Prisma, Anthropic, Stripe, Auth)
├── hooks/                 # useCourseProgress, useLLMStream
├── store/                 # Zustand stores (cart, user)
└── types/                 # TypeScript types
prisma/
└── schema.prisma          # Full database schema (11 models)
```

## Key Features

- **AI Tutor:** Per-lesson Claude AI chat with streaming responses
- **Two-tier Header:** Audience bar (Individuals/Businesses/Universities/Governments) + full nav
- **Course Catalogue:** Filterable by category, level, price
- **Skills Builder:** Skills assessment → personalised learning path
- **Career Builder:** Role matching → course recommendations
- **Auth:** Email/password + Google + GitHub OAuth
- **Payments:** Stripe integration with webhook handling

## Environment Variables

See `.env.local.example` for all required variables.
