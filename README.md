# NEO-THREADS

A premium, production-ready luxury fashion e-commerce template built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4.

## Features

### Premium Conversion Features
- **Dynamic Drop Countdown Timer**: Urgency-driving countdown banner for capsule collection releases
- **Quick-Add Mini-Cart Flyout**: Slide-out cart drawer with variant and quantity adjustment
- **Interactive Lookbook Hotspots**: Full-bleed editorial imagery with hover hotspots linking to products
- **Smart Fit Predictor**: Accordion component for personalized size recommendations

### Design System
- **Avant-Garde Editorial Minimalism**: High-contrast studio white background with deep charcoal text
- **Premium Typography**: Space Grotesk for display headings, Inter for body text, JetBrains Mono for technical specs
- **Industrial Grid System**: Razor-thin borders, generous whitespace, asymmetric layouts
- **Cinematic Animations**: Framer Motion-powered staggered fade-ins and smooth transitions

### Performance & Accessibility
- **Lighthouse Target**: 95+ score with zero Cumulative Layout Shift
- **Mobile-First Design**: Sticky mobile navigation with commerce ribbon for one-handed browsing
- **AAA Color Contrast**: Full compliance with WCAG AAA standards
- **Semantic HTML5**: Comprehensive keyboard navigability and ARIA labels
- **Reduced Motion Support**: Respects user preferences for reduced motion

### Technical Architecture
- **Next.js 16 App Router**: Latest React framework with server components
- **TypeScript**: Full type safety across the entire codebase
- **Tailwind CSS v4**: Utility-first CSS with custom design system
- **Framer Motion**: Production-ready animation library
- **Lucide React**: Modern icon library
- **Modular Structure**: Strict separation of data, components, and sections

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Configuration

All content is managed through `/data/fashion.ts`. Update this file to customize:

- Brand metadata and social links
- Drop timer configuration
- Product catalog (prices, descriptions, images, stock)
- Collections and lookbooks
- Customer reviews and FAQs
- Shipping tiers and sustainability metrics

## Project Structure

```
neo-threads/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with fonts and SEO
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── DropCountdown.tsx  # Dynamic countdown timer
│   ├── CartFlyout.tsx     # Mini-cart drawer
│   ├── LookbookHotspots.tsx # Interactive lookbook
│   ├── FitPredictor.tsx   # Size recommendation
│   └── MobileNavigation.tsx # Mobile commerce ribbon
├── sections/             # Page sections
│   ├── Hero.tsx          # Asymmetrical hero
│   ├── Collections.tsx   # Curated collections grid
│   ├── ProductGrid.tsx   # Editorial product catalog
│   ├── Sustainability.tsx # Brand manifesto
│   ├── Reviews.tsx       # Customer reviews
│   ├── FAQ.tsx          # Interactive FAQ
│   └── Footer.tsx       # Industrial footer
├── data/                 # Content management
│   └── fashion.ts       # Single source of truth
├── types/               # TypeScript definitions
│   └── fashion.ts       # Data interfaces
├── lib/                 # Utilities
│   ├── utils.ts         # Helper functions
│   └── seo.ts           # SEO generators
└── public/              # Static assets
```

## Customization

### Updating Products

Edit `/data/fashion.ts` to modify products:

```typescript
products: [
  {
    id: "NT-001",
    title: "Product Name",
    price: 890,
    description: "Product description...",
    category: "outerwear",
    sizesAvailable: [
      { name: "XS", stock: 3 },
      { name: "S", stock: 5 }
    ],
    colorVariants: [
      {
        id: "black",
        name: "Obsidian Black",
        hexCode: "#0F0F0F",
        imagePrimary: "url...",
        imageSecondary: "url..."
      }
    ],
    // ... more fields
  }
]
```

### Modifying Design System

Update `tailwind.config.ts` to customize colors, fonts, and spacing:

```typescript
theme: {
  extend: {
    colors: {
      background: "#FFFFFF",
      primary: "#0F0F0F",
      accent: "#0047FF",
      // ... more colors
    },
    fontFamily: {
      display: ["var(--font-display)", "sans-serif"],
      body: ["var(--font-body)", "sans-serif"],
      mono: ["var(--font-mono)", "monospace"],
    }
  }
}
```

## SEO & Metadata

The template includes comprehensive SEO optimization:

- Dynamic metadata generation
- JSON-LD structured data (Brand, Product, CollectionPage)
- Open Graph and Twitter cards
- Breadcrumb schema
- Search action schema

## Performance Optimization

- Next.js Image optimization with AVIF/WebP formats
- Font optimization with `next/font`
- Lazy loading for images
- Code splitting by route
- Optimized package imports

## Accessibility

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- Reduced motion preferences

## License

This is a premium commercial template. All rights reserved.

## Support

For support inquiries, contact the development team or refer to the documentation.

---

Built with precision for luxury fashion brands.
