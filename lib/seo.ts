import { fashionConfig } from "@/data/fashion";
import type { Product, Collection } from "@/types/fashion";

export function generateMetadata() {
  const { brand, products } = fashionConfig;

  return {
    title: `${brand.name} | ${brand.tagline}`,
    description: brand.description,
    keywords: [
      "luxury fashion",
      "premium clothing",
      "sustainable fashion",
      "ethical clothing",
      "designer apparel",
      "capsule collections",
      brand.name.toLowerCase()
    ].join(", "),
    openGraph: {
      title: `${brand.name} | ${brand.tagline}`,
      description: brand.description,
      url: "https://neo-threads.vercel.app/",
      siteName: brand.name,
      images: [
        {
          url: "/hero2.jpeg",
          width: 1200,
          height: 630,
          alt: `${brand.name} Collection`
        }
      ],
      locale: "en_US",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: `${brand.name} | ${brand.tagline}`,
      description: brand.description,
      images: [
        "/hero.jpeg"
      ]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        maxVideoPreview: -1,
        maxImagePreview: "large",
        maxSnippet: -1
      }
    },
    verification: {
      google: "your-google-verification-code"
    }
  };
}

export function generateProductSchema(product: Product) {
  const { brand } = fashionConfig;
  const activeVariant = product.colorVariants[0];

  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: [activeVariant.imagePrimary, activeVariant.imageSecondary],
    brand: {
      "@type": "Brand",
      name: brand.name
    },
    offers: {
      "@type": "Offer",
      url: `https://neo-threads.vercel.app/products/${product.id}`,
      priceCurrency: "USD",
      price: product.discountPrice || product.price,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      availability: product.stockQuantity > 0 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "42"
    }
  };
}

export function generateCollectionSchema(collection: Collection) {
  const { brand, products } = fashionConfig;
  const collectionProducts = products.filter(p => collection.productIds.includes(p.id));

  return {
    "@context": "https://schema.org/",
    "@type": "CollectionPage",
    name: collection.name,
    description: collection.description,
    image: collection.image,
    publisher: {
      "@type": "Organization",
      name: brand.name,
      logo: brand.logo
    },
    hasPart: collectionProducts.map(product => generateProductSchema(product))
  };
}

export function generateBrandSchema() {
  const { brand, contact } = fashionConfig;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    description: brand.description,
    url: "https://neo-threads.vercel.app/",
    logo: brand.logo,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: contact.supportPhone,
      contactType: "customer service",
      email: contact.customerCareEmail,
      areaServed: "US",
      availableLanguage: "English"
    },
    sameAs: brand.socialLinks.map(link => link.url),
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.returnsHubAddress
    }
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; item: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item
    }))
  };
}

export function generateWebsiteSchema() {
  const { brand } = fashionConfig;

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.name,
    url: "https://neo-threads.vercel.app/",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://neo-threads.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
}
