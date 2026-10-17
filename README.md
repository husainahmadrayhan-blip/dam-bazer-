# 🛒 বাজার দর | BazarDor

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দাম এক নজরে দেখা, দাম বৃদ্ধি-হ্রাস বোঝা এবং বিভিন্ন বাজারের দামের তুলনা করার জন্য একটি responsive web application। এটি B14-A7 assignment requirements অনুযায়ী তৈরি।

## Features

- **আজকের বাজারদর:** BazarDor API থেকে পণ্যের তালিকা, বর্তমান দাম ও দাম পরিবর্তনের তথ্য।
- **দাম বৃদ্ধি ও হ্রাস:** পরিবর্তনের শতাংশ অনুসারে সেরা ৬টি পণ্য আলাদা সেকশনে।
- **পণ্যের বিস্তারিত:** সর্বনিম্ন, সর্বোচ্চ, গড় এবং API-তে থাকলে বাজারভিত্তিক দাম।
- **ক্যাটাগরি ও sorting:** ক্যাটাগরি পেজ এবং সংখ্যাভিত্তিক কম থেকে বেশি / বেশি থেকে কম সাজানো।
- **Authentication:** Better Auth email/password sign in ও sign up; Google/GitHub OAuth credentials দিলে social login।
- **Protected product details:** পণ্যের বিস্তারিত দেখতে সাইন ইন প্রয়োজন।
- **Profile update:** নিজের নাম আপডেট করা যায়।
- **Responsive UI:** mobile, tablet ও desktop layout, Bengali numerals, loading skeleton, toast, 404 page এবং scrolling price ticker।
- **API fallback:** মূল API অনুপলব্ধ হলে README-তে তালিকাভুক্ত বিকল্প API-গুলো চেষ্টা করা হয়।

## Tech stack

- Next.js App Router 15
- React 19 + TypeScript
- Tailwind CSS 4 (base tooling) and custom responsive CSS
- Better Auth + PostgreSQL + Drizzle ORM
- Lucide React icons, React Hot Toast

## Requirements

- Node.js 20.9 or later
- PostgreSQL database for real sign in/sign up and user profile updates
- BazarDor API access (the app tries the provided API URLs automatically)

## Run locally

1. Extract this project and open a terminal in the project folder.
2. Install packages:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env.local` and set `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, and `DATABASE_URL`.
4. Run `database/schema.sql` once against your PostgreSQL database. For example, with `psql`:

   ```bash
   psql "$DATABASE_URL" -f database/schema.sql
   ```

5. Start the app:

   ```bash
   npm run dev
   ```

6. Open `http://localhost:3000`.

## Social login setup (optional)

Create OAuth applications with Google and/or GitHub and set the corresponding client ID and secret in `.env.local`.

- Google callback URL: `http://localhost:3000/api/auth/callback/google`
- GitHub callback URL: `http://localhost:3000/api/auth/callback/github`

For production, replace `localhost:3000` with your deployed domain and update `BETTER_AUTH_URL` accordingly. If provider credentials are blank, social login buttons will show a setup error instead of pretending to authenticate.

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. Import the repository in Vercel.
3. Add all required environment variables from `.env.example` to Vercel Project Settings.
4. Provision PostgreSQL (Neon, Supabase, or another managed PostgreSQL service) and run `database/schema.sql` against it.
5. Set `BETTER_AUTH_URL` to the final HTTPS deployment URL, and configure OAuth callback URLs if used.
6. Deploy. Next.js App Router dynamic paths such as `/category/[slug]` and `/product/[slug]` are handled by the app router, including direct navigation and refresh.

## API endpoints used

- `https://openapi.programming-hero.com/api/bazardor/products`
- `https://api.api-store.workers.dev/api/bazardor/products`
- `https://api.abcz.workers.dev/api/bazardor/products`

The first successful response is normalized to a shared product model. Market-specific prices are shown only when present in the API response. Prices should be treated as indicative and may change by market and time.

## Notes

- Authentication cannot persist real accounts until a working PostgreSQL `DATABASE_URL` is configured and the schema has been created.
- Google/GitHub login requires provider credentials. These are intentionally not embedded in source code.
- The app does not implement email verification or password reset, as specified in the assignment.
- Before submission, make at least 8 meaningful commits and add your actual live URL and repository URL to the assignment submission form.

## Windows quick start

You can also run `RUN-WEBSITE.bat` after Node.js 20.9+ is installed. For authentication, configure `.env.local` and the PostgreSQL schema first.
