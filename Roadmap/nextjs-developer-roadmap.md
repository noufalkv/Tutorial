# Next.js Developer Roadmap

> Based on the Next.js Developer roadmap from [roadmap.sh](https://roadmap.sh/nextjs).
>
> A practical learning checklist for becoming a Next.js developer, covering the framework and its ecosystem in 2026.

## 1. Prerequisites

Before starting Next.js, be comfortable with:

### JavaScript / TypeScript
- Variables, functions, closures
- Destructuring, spread/rest
- Modules (import/export)
- Promises, `async`/`await`
- ES6+ features
- TypeScript basics

```typescript
interface Post {
  id: number;
  title: string;
  content: string;
}

const fetchPost = async (id: number): Promise<Post> => {
  const res = await fetch(`/api/posts/${id}`);
  return res.json();
};
```

### React Fundamentals
- Components and JSX
- Props and state
- Hooks (useState, useEffect, useContext)
- Component composition
- Conditional rendering and lists

```jsx
const PostCard = ({ title, excerpt }) => (
  <article>
    <h2>{title}</h2>
    <p>{excerpt}</p>
  </article>
);
```

### Web Fundamentals
- HTTP methods and status codes
- Client-server model
- REST APIs
- Basic CSS/HTML

---

## 2. Next.js Fundamentals

- [ ] Why Next.js (vs plain React)
- [ ] Create a Next.js project (`create-next-app`)
- [ ] Project structure
- [ ] File-based routing
- [ ] Pages vs App Router
- [ ] Development server & Fast Refresh
- [ ] `next.config.js`

```bash
npx create-next-app@latest my-app --typescript --app --tailwind
cd my-app
npm run dev
```

```text
app/
├── layout.tsx      # Root layout (required)
├── page.tsx        # Home page (/)
├── about/
│   └── page.tsx     # /about
├── blog/
│   ├── page.tsx      # /blog
│   └── [slug]/
│       └── page.tsx  # /blog/:slug
└── globals.css
```

---

## 3. App Router

- [ ] File conventions (`page`, `layout`, `loading`, `error`, `not-found`)
- [ ] Nested layouts
- [ ] Route groups `(group)`
- [ ] Dynamic segments `[slug]`
- [ ] Catch-all segments `[...slug]`
- [ ] Optional catch-all `[[...slug]]`
- [ ] Parallel routes `@slot`
- [ ] Intercepting routes `(.)folder`
- [ ] Route handlers (`route.ts`)

```tsx
// app/layout.tsx - Root layout
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}

// app/blog/[slug]/page.tsx - Dynamic route
export default function BlogPost({ params }: { params: { slug: string } }) {
  return <h1>Post: {params.slug}</h1>;
}

// app/blog/loading.tsx - Loading UI
export default function Loading() {
  return <p>Loading posts...</p>;
}

// app/blog/error.tsx - Error UI
'use client';
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <p>Something went wrong: {error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}

// app/blog/not-found.tsx
export default function NotFound() {
  return <h2>Post not found</h2>;
}
```

---

## 4. Server Components and Client Components

- [ ] Understand Server Components (default)
- [ ] `'use client'` directive
- [ ] When to use Client Components
- [ ] Composing server & client components
- [ ] Passing props/data between them
- [ ] Avoid unnecessary client bundles

```tsx
// Server Component (default) - runs on server, no JS shipped to client
async function ProductList() {
  const products = await db.product.findMany();

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}

// Client Component - interactive, ships JS to browser
'use client';

import { useState } from 'react';

export function AddToCartButton({ productId }: { productId: string }) {
  const [added, setAdded] = useState(false);

  return (
    <button onClick={() => setAdded(true)}>
      {added ? 'Added ✓' : 'Add to Cart'}
    </button>
  );
}

// Composing: Server Component renders Client Component
async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  return (
    <div>
      <h1>{product.name}</h1>
      <AddToCartButton productId={product.id} />
    </div>
  );
}
```

---

## 5. Routing and Navigation

- [ ] `Link` component
- [ ] `useRouter` hook
- [ ] `usePathname` / `useSearchParams`
- [ ] `redirect()` / `notFound()`
- [ ] Programmatic navigation
- [ ] Active link styling
- [ ] Prefetching

```tsx
'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export function Nav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav>
      <Link href="/" className={pathname === '/' ? 'active' : ''}>
        Home
      </Link>
      <Link href="/blog">Blog</Link>
      <button onClick={() => router.push('/dashboard')}>
        Go to Dashboard
      </button>
    </nav>
  );
}

// Server-side redirect
import { redirect } from 'next/navigation';

async function ProfilePage() {
  const user = await getUser();
  if (!user) redirect('/login');

  return <div>Welcome {user.name}</div>;
}
```

---

## 6. Data Fetching

- [ ] `fetch` in Server Components
- [ ] Request memoization
- [ ] Static vs dynamic rendering
- [ ] `generateStaticParams`
- [ ] Streaming with `Suspense`
- [ ] Parallel vs sequential data fetching
- [ ] Client-side fetching (TanStack Query, SWR)

```tsx
// Fetching in a Server Component
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 }, // ISR: revalidate every hour
  });
  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();
  return posts.map((post) => <PostCard key={post.id} {...post} />);
}

// generateStaticParams - pre-render dynamic routes at build time
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// Parallel data fetching
async function Page() {
  const [posts, user] = await Promise.all([getPosts(), getUser()]);
  return <Dashboard posts={posts} user={user} />;
}

// Streaming with Suspense
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<p>Loading stats...</p>}>
        <SlowStats /> {/* Streams in when ready */}
      </Suspense>
    </div>
  );
}

// Client-side fetching with TanStack Query
'use client';
import { useQuery } from '@tanstack/react-query';

export function LiveStats() {
  const { data } = useQuery({
    queryKey: ['stats'],
    queryFn: () => fetch('/api/stats').then((r) => r.json()),
    refetchInterval: 5000,
  });

  return <p>Active users: {data?.count}</p>;
}
```

---

## 7. Rendering Strategies

- [ ] Static Rendering (SSG)
- [ ] Dynamic Rendering (SSR)
- [ ] Incremental Static Regeneration (ISR)
- [ ] Client-side Rendering (CSR)
- [ ] `revalidate` / `dynamic` route segment config
- [ ] `force-static` / `force-dynamic`

```tsx
// Static by default - cached at build time
export default async function StaticPage() {
  const data = await fetch('https://api.example.com/data');
  return <div>{/* ... */}</div>;
}

// Force dynamic rendering (SSR on every request)
export const dynamic = 'force-dynamic';

export default async function DynamicPage() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'no-store',
  });
  return <div>{/* ... */}</div>;
}

// ISR - revalidate every 60 seconds
export const revalidate = 60;

export default async function ISRPage() {
  const data = await fetch('https://api.example.com/data');
  return <div>{/* ... */}</div>;
}
```

---

## 8. Server Actions

- [ ] `'use server'` directive
- [ ] Form submissions
- [ ] Mutating data
- [ ] `revalidatePath` / `revalidateTag`
- [ ] Progressive enhancement
- [ ] Error handling in actions
- [ ] `useFormStatus` / `useFormState`

```tsx
// app/actions.ts
'use server';

import { revalidatePath } from 'next/cache';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  await db.post.create({ data: { title, content } });

  revalidatePath('/blog'); // Refresh cached blog list
}

// app/blog/new/page.tsx
import { createPost } from '../../actions';

export default function NewPostPage() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Title" required />
      <textarea name="content" placeholder="Content" required />
      <SubmitButton />
    </form>
  );
}

// Client component using useFormStatus for pending state
'use client';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Saving...' : 'Save Post'}
    </button>
  );
}
```

---

## 9. API Routes / Route Handlers

- [ ] `route.ts` conventions
- [ ] HTTP methods (GET, POST, PUT, DELETE)
- [ ] Request/Response objects
- [ ] Dynamic API routes
- [ ] Middleware for API routes
- [ ] CORS handling
- [ ] Webhooks

```tsx
// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const posts = await db.post.findMany();
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const post = await db.post.create({ data: body });
  return NextResponse.json(post, { status: 201 });
}

// app/api/posts/[id]/route.ts - Dynamic API route
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const post = await db.post.findUnique({ where: { id: params.id } });
  if (!post) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(post);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await db.post.delete({ where: { id: params.id } });
  return new NextResponse(null, { status: 204 });
}
```

---

## 10. Layouts and Templates

- [ ] Root layout
- [ ] Nested layouts
- [ ] Shared UI across routes
- [ ] Templates (`template.tsx`)
- [ ] Metadata API
- [ ] `generateMetadata`

```tsx
// app/blog/layout.tsx - Shared layout for all /blog/* routes
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="blog-layout">
      <aside>Sidebar</aside>
      <main>{children}</main>
    </div>
  );
}

// Static metadata
export const metadata = {
  title: 'Blog | My Site',
  description: 'Latest articles and updates',
};

// Dynamic metadata
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { images: [post.coverImage] },
  };
}
```

---

## 11. Styling

- [ ] CSS Modules
- [ ] Global CSS
- [ ] Tailwind CSS
- [ ] CSS-in-JS (styled-components, Emotion)
- [ ] `next/font` for font optimization
- [ ] Sass support

```tsx
// CSS Modules
// styles/Button.module.css
// .primary { background: blue; color: white; }

import styles from './Button.module.css';
export const Button = () => <button className={styles.primary}>Click</button>;

// Tailwind CSS
export const Card = () => (
  <div className="rounded-lg shadow-md p-4 bg-white dark:bg-gray-800">
    <h2 className="text-xl font-bold">Title</h2>
  </div>
);

// next/font - optimized, self-hosted fonts
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

---

## 12. Images and Assets

- [ ] `next/image` component
- [ ] Image optimization
- [ ] Responsive images
- [ ] Lazy loading
- [ ] Remote images configuration
- [ ] `next/script` for third-party scripts

```tsx
import Image from 'next/image';

export const Hero = () => (
  <Image
    src="/hero.jpg"
    alt="Hero banner"
    width={1200}
    height={600}
    priority // Load immediately (above the fold)
  />
);

// Remote images - configure in next.config.js
// module.exports = { images: { remotePatterns: [{ hostname: 'cdn.example.com' }] } };

export const Avatar = ({ url }: { url: string }) => (
  <Image src={url} alt="Avatar" width={40} height={40} className="rounded-full" />
);

// next/script - control third-party script loading
import Script from 'next/script';

export const Analytics = () => (
  <Script src="https://analytics.example.com/script.js" strategy="lazyOnload" />
);
```

---

## 13. State Management

- [ ] Local component state
- [ ] Context API
- [ ] Server state vs client state
- [ ] Zustand / Jotai
- [ ] Redux Toolkit
- [ ] URL state (search params)

```tsx
'use client';
import { create } from 'zustand';

interface CartStore {
  items: string[];
  addItem: (id: string) => void;
}

const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (id) => set((state) => ({ items: [...state.items, id] })),
}));

export const CartCount = () => {
  const items = useCartStore((state) => state.items);
  return <span>{items.length} items</span>;
};

// URL state with search params
'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export const SortSelect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <select onChange={(e) => handleSort(e.target.value)}>
      <option value="newest">Newest</option>
      <option value="popular">Popular</option>
    </select>
  );
};
```

---

## 14. Forms

- [ ] Server Actions for forms
- [ ] Client-side validation
- [ ] React Hook Form
- [ ] Zod schema validation
- [ ] `useFormState` for error handling
- [ ] File uploads

```tsx
// Form with Server Action + validation
// app/actions.ts
'use server';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  message: z.string().min(10),
});

export async function submitContact(prevState: any, formData: FormData) {
  const result = schema.safeParse({
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  await db.contact.create({ data: result.data });
  return { success: true };
}

// Client component
'use client';
import { useFormState } from 'react-dom';
import { submitContact } from '../actions';

export function ContactForm() {
  const [state, formAction] = useFormState(submitContact, {});

  return (
    <form action={formAction}>
      <input name="email" type="email" />
      {state.errors?.email && <p>{state.errors.email[0]}</p>}
      <textarea name="message" />
      <button type="submit">Send</button>
    </form>
  );
}
```

---

## 15. Authentication

- [ ] Session management
- [ ] JWT handling
- [ ] Middleware-based auth checks
- [ ] Protected routes/layouts
- [ ] OAuth providers
- [ ] NextAuth.js / Auth.js
- [ ] Cookies (`next/headers`)

```tsx
// middleware.ts - Protect routes
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};

// Reading cookies in Server Components
import { cookies } from 'next/headers';

export default async function DashboardPage() {
  const token = cookies().get('token')?.value;
  const user = await verifyToken(token);

  return <div>Welcome {user.name}</div>;
}

// NextAuth.js setup
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';

const handler = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
});

export { handler as GET, handler as POST };
```

---

## 16. Middleware

- [ ] `middleware.ts` conventions
- [ ] Request/response manipulation
- [ ] Redirects and rewrites
- [ ] Header manipulation
- [ ] A/B testing
- [ ] Geolocation-based routing
- [ ] Matcher configuration

```tsx
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Rewrite based on geolocation
  const country = request.geo?.country || 'US';
  if (country === 'GB' && !request.nextUrl.pathname.startsWith('/uk')) {
    return NextResponse.rewrite(new URL('/uk' + request.nextUrl.pathname, request.url));
  }

  // Add custom header
  const response = NextResponse.next();
  response.headers.set('x-custom-header', 'value');
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

---

## 17. Caching

- [ ] Request memoization
- [ ] Data Cache (`fetch` cache)
- [ ] Full Route Cache
- [ ] Router Cache (client)
- [ ] `revalidatePath` / `revalidateTag`
- [ ] `unstable_cache`
- [ ] Cache invalidation strategies

```tsx
// Tagged caching for fine-grained invalidation
async function getPost(id: string) {
  const res = await fetch(`https://api.example.com/posts/${id}`, {
    next: { tags: [`post-${id}`] },
  });
  return res.json();
}

// Revalidate specific tag after mutation
'use server';
import { revalidateTag } from 'next/cache';

export async function updatePost(id: string, data: FormData) {
  await db.post.update({ where: { id }, data: Object.fromEntries(data) });
  revalidateTag(`post-${id}`);
}

// unstable_cache for non-fetch data (e.g. database calls)
import { unstable_cache } from 'next/cache';

const getCachedUsers = unstable_cache(
  async () => db.user.findMany(),
  ['users-list'],
  { revalidate: 3600, tags: ['users'] }
);
```

---

## 18. Performance Optimization

- [ ] Code splitting (automatic per route)
- [ ] `next/dynamic` for lazy loading
- [ ] Bundle analysis
- [ ] Font optimization
- [ ] Image optimization
- [ ] `React.memo` / `useMemo` / `useCallback`
- [ ] Lighthouse / Core Web Vitals

```tsx
// Dynamic import - code splitting for heavy components
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('../components/HeavyChart'), {
  loading: () => <p>Loading chart...</p>,
  ssr: false, // Skip server-side rendering for this component
});

export default function AnalyticsPage() {
  return (
    <div>
      <h1>Analytics</h1>
      <HeavyChart />
    </div>
  );
}

// Bundle analysis
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer({});

// Run: ANALYZE=true npm run build
```

---

## 19. Testing

- [ ] Jest / Vitest setup
- [ ] React Testing Library
- [ ] Testing Server Components
- [ ] Testing Server Actions
- [ ] Playwright / Cypress E2E
- [ ] API route testing

```tsx
// Component test
import { render, screen } from '@testing-library/react';
import { PostCard } from './PostCard';

test('renders post title', () => {
  render(<PostCard title="Hello World" excerpt="First post" />);
  expect(screen.getByText('Hello World')).toBeInTheDocument();
});

// E2E test with Playwright
import { test, expect } from '@playwright/test';

test('user can create a blog post', async ({ page }) => {
  await page.goto('/blog/new');
  await page.fill('input[name="title"]', 'My New Post');
  await page.fill('textarea[name="content"]', 'Post content here');
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('/blog');
  await expect(page.getByText('My New Post')).toBeVisible();
});
```

---

## 20. Deployment

- [ ] Vercel deployment
- [ ] Self-hosting (Node.js server)
- [ ] Docker deployment
- [ ] Static export (`output: 'export'`)
- [ ] Environment variables
- [ ] Edge Runtime vs Node.js Runtime
- [ ] CI/CD pipelines

```bash
# Deploy to Vercel
vercel --prod

# Environment variables (.env.local)
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-secret
NEXT_PUBLIC_API_URL=https://api.example.com   # exposed to browser
```

```dockerfile
# Dockerfile - self-hosted deployment
FROM node:18-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

```typescript
// Edge Runtime for a route handler
export const runtime = 'edge';

export async function GET() {
  return new Response('Hello from the Edge');
}
```

---

## 21. SEO

- [ ] Metadata API
- [ ] `sitemap.xml` generation
- [ ] `robots.txt`
- [ ] Open Graph tags
- [ ] Structured data (JSON-LD)
- [ ] Canonical URLs

```tsx
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://example.com', lastModified: new Date() },
    { url: 'https://example.com/blog', lastModified: new Date() },
  ];
}

// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://example.com/sitemap.xml',
  };
}

// Structured data (JSON-LD)
export default function ProductPage({ product }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    offers: { '@type': 'Offer', price: product.price },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1>{product.name}</h1>
    </>
  );
}
```

---

## 22. Internationalization (i18n)

- [ ] Locale routing (`[locale]` segment)
- [ ] `next-intl` / `next-i18next`
- [ ] Locale detection middleware
- [ ] Translated metadata
- [ ] Date/number formatting per locale

```tsx
// middleware.ts - detect and route locale
import { NextResponse } from 'next/server';

const locales = ['en', 'fr', 'es'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hasLocale = locales.some((l) => pathname.startsWith(`/${l}`));

  if (!hasLocale) {
    return NextResponse.redirect(new URL(`/en${pathname}`, request.url));
  }
}

// app/[locale]/page.tsx
export default function Page({ params }: { params: { locale: string } }) {
  return <h1>Locale: {params.locale}</h1>;
}
```

---

## 23. Error Handling and Monitoring

- [ ] `error.tsx` boundaries
- [ ] `global-error.tsx`
- [ ] Sentry / logging integration
- [ ] `not-found.tsx`
- [ ] Try/catch in Server Actions
- [ ] Error reporting in production

```tsx
// app/global-error.tsx - catches errors in root layout
'use client';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={reset}>Try again</button>
      </body>
    </html>
  );
}

// Sentry integration
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

---

## 24. Advanced Topics

- [ ] Turbopack
- [ ] Instrumentation (`instrumentation.ts`)
- [ ] Partial Prerendering (PPR)
- [ ] Custom server (advanced use cases)
- [ ] Monorepos with Next.js (Turborepo)
- [ ] Multi-zone applications
- [ ] `after()` API for post-response work

```tsx
// Partial Prerendering (experimental)
// next.config.js
module.exports = { experimental: { ppr: 'incremental' } };

// app/dashboard/page.tsx
export const experimental_ppr = true;

export default function Dashboard() {
  return (
    <div>
      <StaticHeader /> {/* Prerendered instantly */}
      <Suspense fallback={<Skeleton />}>
        <DynamicUserData /> {/* Streamed in */}
      </Suspense>
    </div>
  );
}
```

---

# Practical Project Path

## Beginner
- [ ] Personal portfolio site
- [ ] Markdown blog (SSG)
- [ ] Weather app with API routes
- [ ] Recipe finder

## Intermediate
- [ ] E-commerce storefront
- [ ] Multi-author blog with CMS
- [ ] SaaS landing page + auth
- [ ] Dashboard with charts

## Advanced
- [ ] Full-stack app with database + auth + payments
- [ ] Real-time collaboration tool
- [ ] Multi-tenant SaaS platform
- [ ] Headless CMS-powered site with ISR

## Production-Level Project

Build one complete application with:

- [ ] Next.js App Router + TypeScript
- [ ] Authentication (NextAuth.js)
- [ ] Database (Prisma + PostgreSQL)
- [ ] Server Actions for mutations
- [ ] Payments (Stripe)
- [ ] SEO (metadata, sitemap, structured data)
- [ ] Testing (unit + E2E)
- [ ] CI/CD (GitHub Actions + Vercel)
- [ ] Monitoring (Sentry)

---

# Recommended Learning Order

```text
JavaScript/TypeScript
        ↓
React Fundamentals
        ↓
Next.js Basics & Routing
        ↓
Server vs Client Components
        ↓
Data Fetching & Rendering Strategies
        ↓
Server Actions & Forms
        ↓
API Routes / Route Handlers
        ↓
Styling & Images
        ↓
State Management
        ↓
Authentication & Middleware
        ↓
Caching & Performance
        ↓
Testing
        ↓
SEO & i18n
        ↓
Deployment & CI/CD
        ↓
Production Projects
```

---

# Quick Reference: Essential Imports

```typescript
// Navigation
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams, redirect, notFound } from 'next/navigation';

// Optimization
import Image from 'next/image';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';

// Server-side
import { cookies, headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag, unstable_cache } from 'next/cache';

// Types
import type { Metadata } from 'next';
```

---

# Progress Tracker

| Area | Status |
|---|---|
| JavaScript/TypeScript | ⬜ |
| React Fundamentals | ⬜ |
| App Router | ⬜ |
| Server/Client Components | ⬜ |
| Data Fetching | ⬜ |
| Rendering Strategies | ⬜ |
| Server Actions | ⬜ |
| Route Handlers | ⬜ |
| Styling | ⬜ |
| State Management | ⬜ |
| Forms | ⬜ |
| Authentication | ⬜ |
| Middleware | ⬜ |
| Caching | ⬜ |
| Performance | ⬜ |
| Testing | ⬜ |
| SEO | ⬜ |
| Deployment | ⬜ |
| Production Project | ⬜ |

## Reference

- Next.js Developer Roadmap: https://roadmap.sh/nextjs
- Next.js official documentation: https://nextjs.org/docs

> Note: This roadmap is a structured learning checklist based on the roadmap.sh Next.js roadmap and the Next.js App Router ecosystem. Next.js evolves quickly, so check the official docs for the latest APIs.
