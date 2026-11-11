# VoltPop

A playful bilingual storefront landing page for Adam and his friend's power bank project. Product listings are intentionally empty until the makers add their creations.

## Run locally

1. Install Node.js 22 or newer.
2. Copy `.env.example` to `.env.local` if you want to use the Neon account forms locally.
3. Run `npm install`, then `npm run dev`.

The site uses Neon Managed Better Auth for real email/password accounts and email verification codes. The Neon Auth URL is public client configuration, not a database connection string or secret.

## Publish with GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` builds and deploys the site on every push to `main`. In the repository, open **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**. The public site URL will be `https://binz2008-star.github.io/voltpop/`.

The contact link points to the official WhatsApp number shown on the page: 058 588 1180.
