# Sports Articles Service

A production-ready full-stack application for managing sports articles, built as a technical assessment. 

> **Live Demo:** [https://sports-articles.bilous.dev/](https://sports-articles.bilous.dev/)  
> **GraphQL Playground:** [https://sports-articles-graphql.bilous.dev/graphql](https://sports-articles-graphql.bilous.dev/graphql)  
> **Status:** 🟢 Stable

## 🚀 Getting Started

### Prerequisites
* Node.js v20+
* pnpm v9+
* Docker & Docker Compose

### 1. Installation & Infrastructure
Clone the repository and install dependencies from the root:

```bash
git clone https://github.com/Amigos466/sports-articles.git
cd sports-articles
docker-compose up -d
pnpm install
pnpm seed
```

### 2.Run locally
```bash
pnpm dev
```

### 3.Run production
```bash
pnpm build
pnpm start
```

### 4.Run separately
```bash
pnpm --filter backend dev
pnpm --filter frontend dev
```
---

## Tech Stack

**Monorepo Strategy:**
* **Manager:** `pnpm` workspaces
* **Structure:** `/apps/backend` (API) & `/apps/frontend` (UI)

**Backend:**
* **Runtime:** Node.js (Express) + Apollo Server v4
* **ORM:** TypeORM + PostgreSQL
* **Port:** **4002**

**Frontend:**
* **Framework:** Next.js 16 (App Router)
* **State:** Apollo Client (with RSC support)
* **Ports:** **3000** (Dev) / **3002** (Prod)
* **Styling:** Tailwind CSS

---

##  Architectural Decisions & Trade-offs

### 1. Modern Architecture: Next.js 16 App Router
Although the assessment requirements mentioned legacy `getServerSideProps` (Pages Router), I implemented the solution using **Next.js 16 App Router**.

* **Reasoning:** The Pages Router is considered legacy for new projects in 2026.
* **SSR Compliance:** I utilized **React Server Components (RSC)** for the list and detail pages. This achieves high-performance SEO-friendly rendering without the overhead of the legacy `getServerSideProps` pattern.
* **Data Streaming:** Leveraging Next.js 16 features to optimize hydration and provide a seamless user experience.

### 2. Pagination & Hybrid Loading
The initial schema requirements were insufficient for the "Clean Infinite Loading" evaluation criterion.
* **Solution:** I extended the GraphQL schema to support offset-based pagination (`skip`, `take`).
* **Hybrid Implementation:** The first 10 articles are fetched on the server (RSC) for immediate Largest Contentful Paint (LCP). Subsequent articles are hydrated via Apollo Client on user interaction using an "Infinite Scroll" pattern.

### 3. Database Integrity
* **Singleton Pattern:** Implemented a singleton DataSource initialization for TypeORM to prevent connection leaks during Next.js Hot Module Replacement (HMR).
* **Soft Deletes:** Global filters ensure deleted articles (where `deletedAt` is present) are excluded from queries by default.
