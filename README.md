# Mahdi Zaied — Portfolio

Welcome to my portfolio! This project presents who I am, the technologies I work with, and the products I build across web, mobile, and backend development.

The portfolio includes an interactive introduction, an animated technology showcase, and selected work across web, mobile, and backend development.

## Technologies Used

- **React 19:** Powers the portfolio's interactive user interface.
- **TypeScript:** Provides reliable, strongly typed application code.
- **Vinext and Vite:** Provide the development environment and optimized production build.
- **Motion:** Creates page transitions, scroll reveals, technology-card effects, and interactive animations.
- **Lucide React:** Supplies the interface icons used throughout the site.
- **CSS:** Defines the custom responsive design, dark and light themes, and visual effects.

## Features

- **Personal Introduction:** Clearly presents my name, occupation, and full-stack focus from the first screen.
- **Interactive Hero:** Features a custom pixel-art character who walks to his desk and looks up on hover or keyboard focus.
- **Animated Technology Showcase:** Highlights my main technologies through interactive cards and motion effects.
- **Dark and Light Themes:** Uses a dark coding theme by default with a persistent theme switcher.
- **Selected Work:** Presents my full-stack work through an interactive project case study.
- **Responsive Design:** Adapts across mobile devices, laptops, and large monitors.
- **Accessibility:** Supports keyboard navigation and reduced-motion preferences.

## Getting Started

To get a local copy running, follow these steps.

### Prerequisites

- [Node.js](https://nodejs.org/) 22.13.0 or newer
- npm, which is included with Node.js

### Installation

1. Clone the repository:

   ~~~bash
   git clone https://github.com/Mahdizaied1/portfolio-mahdi.git
   ~~~

2. Enter the project directory:

   ~~~bash
   cd portfolio-mahdi
   ~~~

3. Install the dependencies:

   ~~~bash
   npx --yes pnpm@11.19.0 install
   ~~~

4. Start the development server:

   ~~~bash
   npm run dev
   ~~~

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

~~~bash
npm run dev      # Start the development server
npm run build    # Create the production build
npm run start    # Run the production build locally
npm run deploy   # Build and deploy directly to Cloudflare Workers
npm run deploy:dry-run # Build and validate without uploading
npm run lint     # Check the source code
npm run format   # Format the source code
~~~

## Deployment

The portfolio is hosted on Cloudflare Workers under the Worker name `mahdi-portfolio`.

Visit the live portfolio at [mahdi-portfolio.mahdizaied.workers.dev](https://mahdi-portfolio.mahdizaied.workers.dev).

Deployment uploads the built site, not the Git repository or its history.

Sign in to your own Cloudflare account once:

~~~bash
npx wrangler login
~~~

To check the deployment without uploading:

~~~bash
npm run deploy:dry-run
~~~

To build and publish:

~~~bash
npm run deploy
~~~

Wrangler prints the public `workers.dev` URL after a successful deployment. Hosting credentials belong in your local Wrangler login, never in the repository. The local pixel-art playground is excluded from uploaded assets.

Social-preview links default to the live portfolio URL. If you add a custom domain later, set `SITE_URL` to that URL before building and deploying. To run alongside another app on port 3000, use `npm run dev -- --port 3001`.

## Author

**Mahdi Zaied**
Full-Stack Developer

- [GitHub](https://github.com/Mahdizaied1)
- [LinkedIn](https://www.linkedin.com/in/mahdi-zaied-41666a155/)
- Email: [mahdizaied.21@gmail.com](mailto:mahdizaied.21@gmail.com)
