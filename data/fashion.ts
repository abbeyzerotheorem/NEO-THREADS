import { FashionConfig } from "@/types/fashion";

export const fashionConfig: FashionConfig = {
  brand: {
    name: "NEO-THREADS",
    tagline: "Unfiltered Expressions. Premium Silhouettes.",
    description: "NEO-THREADS represents the convergence of avant-garde design and uncompromising quality. Each piece is meticulously crafted in our atelier using ethically sourced materials from Italian and Japanese mills. Our commitment to sustainable luxury drives every decision, from fabric selection to final stitch.",
    logo: "/logo.svg",
    socialLinks: [
      {
        platform: "instagram",
        url: "https://instagram.com/neothreads",
        handle: "@neothreads"
      },
      {
        platform: "twitter",
        url: "https://twitter.com/neothreads",
        handle: "@neothreads"
      },
      {
        platform: "tiktok",
        url: "https://tiktok.com/@neothreads",
        handle: "@neothreads"
      }
    ],
    dropStatus: "active"
  },
  dropTimer: {
    enabled: true,
    targetDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000 + 35 * 60 * 1000).toISOString(),
    bannerText: "SUMMER CAPSULE DROP LIVE IN:",
    alertText: "Free express shipping on all orders over $250"
  },
  products: [
    {
      id: "NT-001",
      title: "Obsidian Wool Overcoat",
      price: 890,
      description: "A masterfully tailored overcoat in premium Italian wool blend. Features structured shoulders, a single-breasted silhouette, and our signature hand-finished interior lining. Perfect for transitional seasons and urban elegance.",
      category: "outerwear",
      sizesAvailable: [
        { name: "XS", stock: 3 },
        { name: "S", stock: 5 },
        { name: "M", stock: 8 },
        { name: "L", stock: 4 },
        { name: "XL", stock: 2 }
      ],
      colorVariants: [
        {
          id: "black",
          name: "Obsidian Black",
          hexCode: "#0F0F0F",
          imagePrimary: "/ObsidianWool.jpeg",
          imageSecondary: "/ObsidianWoolOvercoat.jpeg"
        },
        {
          id: "charcoal",
          name: "Deep Charcoal",
          hexCode: "#2C2C2C",
          imagePrimary: "/ObsidianWoolcharcoal.jpeg",
          imageSecondary: "/ObsidianWoolcharcoal2.jpeg"
        }
      ],
      stockQuantity: 22,
      imagePrimary: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
      imageSecondary: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
      labels: ["New Drop", "Bestseller"],
      isNew: true,
      isBestseller: true,
      material: "85% Italian Wool, 15% Cashmere",
      careInstructions: ["Dry clean only", "Do not bleach", "Cool iron if needed", "Store on padded hanger"]
    },
    {
      id: "NT-002",
      title: "Structure Blazer",
      price: 650,
      discountPrice: 520,
      description: "Our architectural blazer redefines power dressing. Crafted from Japanese technical fabric with a structured yet relaxed fit. Features notched lapels, functional button cuffs, and our signature interior pocket system.",
      category: "tailoring",
      sizesAvailable: [
        { name: "XS", stock: 4 },
        { name: "S", stock: 6 },
        { name: "M", stock: 10 },
        { name: "L", stock: 5 },
        { name: "XL", stock: 3 }
      ],
      colorVariants: [
        {
          id: "navy",
          name: "Midnight Navy",
          hexCode: "#1A237E",
          imagePrimary: "/StructureBlazer.avif",
          imageSecondary: "/StructureBlazer2.avif"
        },
        {
          id: "cream",
          name: "Stone Cream",
          hexCode: "#F5F5DC",
          imagePrimary: "/StructureBlazer.jpeg",
          imageSecondary: "/StructureBlazer2.jpeg"
        }
      ],
      stockQuantity: 28,
      imagePrimary: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
      imageSecondary: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
      labels: ["Limited Edition", "Low Stock"],
      isNew: false,
      isBestseller: true,
      material: "100% Japanese Technical Cotton",
      careInstructions: ["Dry clean recommended", "Do not tumble dry", "Steam to refresh"]
    },
    {
      id: "NT-003",
      title: "Essential Cotton Tee",
      price: 145,
      description: "The foundation of every wardrobe. Our essential tee is crafted from 400gsm Portuguese cotton for substantial weight and perfect drape. Pre-shrunk with a relaxed fit that maintains its shape wear after wear.",
      category: "essentials",
      sizesAvailable: [
        { name: "XS", stock: 15 },
        { name: "S", stock: 20 },
        { name: "M", stock: 25 },
        { name: "L", stock: 18 },
        { name: "XL", stock: 12 }
      ],
      colorVariants: [
        {
          id: "white",
          name: "Studio White",
          hexCode: "#FFFFFF",
          imagePrimary: "/EssentialCottonTee.jpeg",
          imageSecondary: "/EssentialCottonTee2.jpeg"
        },
        {
          id: "black",
          name: "Carbon Black",
          hexCode: "#1A1A1A",
          imagePrimary: "/EssentialCotton.jpeg",
          imageSecondary: "/EssentialCotton2.jpeg"
        }
      ],
      stockQuantity: 90,
      imagePrimary: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      imageSecondary: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
      labels: ["Bestseller"],
      isNew: false,
      isBestseller: true,
      material: "100% Organic Portuguese Cotton",
      careInstructions: ["Machine wash cold", "Tumble dry low", "Do not bleach", "Iron medium heat"]
    },
    {
      id: "NT-004",
      title: "Technical Cargo Pant",
      price: 385,
      description: "Engineered for the modern nomad. Our technical cargo pant features water-resistant Japanese fabric, articulated knees for unrestricted movement, and strategically placed pockets. The perfect blend of utility and refinement.",
      category: "essentials",
      sizesAvailable: [
        { name: "28", stock: 5 },
        { name: "30", stock: 8 },
        { name: "32", stock: 12 },
        { name: "34", stock: 7 },
        { name: "36", stock: 4 }
      ],
      colorVariants: [
        {
          id: "olive",
          name: "Military Olive",
          hexCode: "#556B2F",
          imagePrimary: "/TechnicalCargoPant.jpeg",
          imageSecondary: "/TechnicalCargoPant2.jpeg"
        },
        {
          id: "black",
          name: "Tactical Black",
          hexCode: "#0F0F0F",
          imagePrimary: "/TechnicalCargo.jpeg",
          imageSecondary: "/TechnicalCargo2.jpeg"
        }
      ],
      stockQuantity: 36,
      imagePrimary: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
      imageSecondary: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
      labels: ["New Drop"],
      isNew: true,
      isBestseller: false,
      material: "88% Nylon, 12% Elastane",
      careInstructions: ["Machine wash cold", "Do not bleach", "Tumble dry low", "Do not dry clean"]
    },
    {
      id: "NT-005",
      title: "Archive Leather Boot",
      price: 720,
      description: "Handcrafted in Portugal using full-grain Italian leather. Our archive boot features a commando sole, Goodyear welt construction, and our signature hardware. Built to last a lifetime and age beautifully with wear.",
      category: "footwear",
      sizesAvailable: [
        { name: "40", stock: 3 },
        { name: "41", stock: 4 },
        { name: "42", stock: 6 },
        { name: "43", stock: 5 },
        { name: "44", stock: 3 },
        { name: "45", stock: 2 }
      ],
      colorVariants: [
        {
          id: "brown",
          name: "Cognac Brown",
          hexCode: "#9F7B4F",
          imagePrimary: "/ArchiveLeatherBoot.jpeg",
          imageSecondary: "/ArchiveLeatherBoot2.jpeg"
        },
        {
          id: "black",
          name: "Matte Black",
          hexCode: "#1A1A1A",
          imagePrimary: "/LeatherBoot.jpeg",
          imageSecondary: "/LeatherBoot2.jpeg"
        }
      ],
      stockQuantity: 23,
      imagePrimary: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80",
      imageSecondary: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
      labels: ["Exclusive", "Low Stock"],
      isNew: false,
      isBestseller: true,
      material: "100% Full-Grain Italian Leather",
      careInstructions: ["Clean with soft brush", "Condition monthly", "Store with shoe trees", "Avoid water exposure"]
    },
    {
      id: "NT-006",
      title: "Minimalist Leather Belt",
      price: 185,
      description: "The perfect finishing touch. Our minimalist belt features vegetable-tanned Italian leather, brushed brass hardware, and a clean silhouette without unnecessary bulk. Each belt develops a unique patina over time.",
      category: "accessories",
      sizesAvailable: [
        { name: "S", stock: 8 },
        { name: "M", stock: 12 },
        { name: "L", stock: 10 },
        { name: "XL", stock: 6 }
      ],
      colorVariants: [
        {
          id: "brown",
          name: "Natural Tan",
          hexCode: "#D2B48C",
          imagePrimary: "/MinimalistLeatherBelt.jpeg",
          imageSecondary: "/MinimalistLeatherBelt2.jpeg"
        },
        {
          id: "black",
          name: "Jet Black",
          hexCode: "#0F0F0F",
          imagePrimary: "/LeatherBelt.jpeg",
          imageSecondary: "/LeatherBelt2.jpeg"
        }
      ],
      stockQuantity: 36,
      imagePrimary: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
      imageSecondary: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80",
      labels: [],
      isNew: false,
      isBestseller: false,
      material: "100% Vegetable-Tanned Italian Leather",
      careInstructions: ["Wipe clean with damp cloth", "Condition quarterly", "Store flat when not in use"]
    },
    {
      id: "NT-007",
      title: "Structured Knit Sweater",
      price: 420,
      description: "A contemporary take on the classic knit. Our structured sweater features a boxy fit, dropped shoulders, and ribbed detailing. Crafted from extra-fine merino wool for exceptional softness and temperature regulation.",
      category: "essentials",
      sizesAvailable: [
        { name: "XS", stock: 4 },
        { name: "S", stock: 7 },
        { name: "M", stock: 10 },
        { name: "L", stock: 6 },
        { name: "XL", stock: 3 }
      ],
      colorVariants: [
        {
          id: "grey",
          name: "Heather Grey",
          hexCode: "#808080",
          imagePrimary: "/StructuredKnitSweater.avif",
          imageSecondary: "/StructuredKnitSweater.jpeg"
        },
        {
          id: "navy",
          name: "Deep Navy",
          hexCode: "#1A237E",
          imagePrimary: "/KnitSweater.jpeg",
          imageSecondary: "/KnitSweater2.jpeg"
        }
      ],
      stockQuantity: 30,
      imagePrimary: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
      imageSecondary: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
      labels: ["New Drop"],
      isNew: true,
      isBestseller: false,
      material: "100% Extra-Fine Merino Wool",
      careInstructions: ["Dry clean only", "Do not bleach", "Lay flat to dry", "Store folded"]
    },
    {
      id: "NT-008",
      title: "Quilted Field Jacket",
      price: 580,
      description: "Our interpretation of the classic field jacket. Features quilted insulation, a water-resistant shell, and our signature utility pocket configuration. Perfect for layering during transitional weather.",
      category: "outerwear",
      sizesAvailable: [
        { name: "XS", stock: 2 },
        { name: "S", stock: 4 },
        { name: "M", stock: 6 },
        { name: "L", stock: 4 },
        { name: "XL", stock: 2 }
      ],
      colorVariants: [
        {
          id: "green",
          name: "Forest Green",
          hexCode: "#228B22",
          imagePrimary: "/QuiltedFieldJacket2.jpeg",
          imageSecondary: "/QuiltedFieldJacket.jpeg"
        },
        {
          id: "black",
          name: "Stealth Black",
          hexCode: "#0F0F0F",
          imagePrimary: "/QuiltedField.jpg",
          imageSecondary: "/QuiltedField.jpeg"
        }
      ],
      stockQuantity: 18,
      imagePrimary: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
      imageSecondary: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
      labels: ["Limited Edition", "Low Stock"],
      isNew: false,
      isBestseller: false,
      material: "Shell: 100% Nylon, Insulation: 100% Polyester",
      careInstructions: ["Machine wash cold", "Do not bleach", "Tumble dry low", "Do not dry clean"]
    }
  ],
  collections: [
    {
      id: "COL-001",
      name: "Outerwear",
      description: "Statement pieces engineered for protection and style. Our outerwear collection combines technical performance with refined aesthetics.",
      image: "/Outerwear.jpeg",
      productIds: ["NT-001", "NT-008"],
      order: 1
    },
    {
      id: "COL-002",
      name: "Essentials",
      description: "The foundation of every modern wardrobe. Timeless pieces crafted from premium materials for everyday wear.",
      image: "/Essentials.jpeg",
      productIds: ["NT-003", "NT-004", "NT-007"],
      order: 2
    },
    {
      id: "COL-003",
      name: "Tailoring",
      description: "Contemporary silhouettes that redefine power dressing. Precision-cut garments for the modern professional.",
      image: "/Tailoring.jpeg",
      productIds: ["NT-002"],
      order: 3
    },
    {
      id: "COL-004",
      name: "Footwear",
      description: "Handcrafted footwear built to last. Each pair represents the pinnacle of Italian craftsmanship.",
      image: "/Footwear.jpeg",
      productIds: ["NT-005"],
      order: 4
    }
  ],
  lookbooks: [
    {
      id: "LB-001",
      title: "Summer Capsule 2024",
      description: "Our summer collection explores the intersection of utility and elegance. Lightweight fabrics and relaxed silhouettes designed for the modern nomad.",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80",
      hotspots: [
        {
          id: "HS-001",
          productId: "NT-001",
          x: 25,
          y: 35,
          label: "Obsidian Wool Overcoat"
        },
        {
          id: "HS-002",
          productId: "NT-003",
          x: 65,
          y: 55,
          label: "Essential Cotton Tee"
        },
        {
          id: "HS-003",
          productId: "NT-005",
          x: 45,
          y: 75,
          label: "Archive Leather Boot"
        }
      ]
    },
    {
      id: "LB-002",
      title: "Urban Utility",
      description: "Technical meets tailored in our urban utility edit. Pieces designed for the city that never sleeps.",
      image: "/SummerCapsule.jpeg",
      hotspots: [
        {
          id: "HS-004",
          productId: "NT-002",
          x: 30,
          y: 40,
          label: "Structure Blazer"
        },
        {
          id: "HS-005",
          productId: "NT-004",
          x: 60,
          y: 60,
          label: "Technical Cargo Pant"
        }
      ]
    }
  ],
  reviews: [
    {
      id: "REV-001",
      productId: "NT-001",
      customerName: "Alexandra M.",
      rating: 5,
      title: "Exceptional quality and fit",
      content: "The wool overcoat exceeded all my expectations. The fabric is incredibly luxurious, and the tailoring is impeccable. I've received countless compliments whenever I wear it. Worth every penny.",
      date: "2024-01-15",
      verified: true,
      helpfulCount: 24
    },
    {
      id: "REV-002",
      productId: "NT-003",
      customerName: "James K.",
      rating: 5,
      title: "The perfect essential tee",
      content: "Finally found a tee that doesn't lose its shape after washing. The weight is substantial, and the fit is relaxed but not sloppy. I've ordered three in different colors.",
      date: "2024-01-10",
      verified: true,
      helpfulCount: 18
    },
    {
      id: "REV-003",
      productId: "NT-005",
      customerName: "Sophie L.",
      rating: 5,
      title: "Investment piece that delivers",
      content: "These boots are craftsmanship at its finest. The leather quality is outstanding, and they're comfortable right out of the box. I can tell these will last a lifetime.",
      date: "2024-01-08",
      verified: true,
      helpfulCount: 31
    },
    {
      id: "REV-004",
      productId: "NT-002",
      customerName: "Marcus T.",
      rating: 4,
      title: "Sharp blazer, runs slightly large",
      content: "Beautiful blazer with excellent fabric. The structured look is exactly what I wanted. I'd recommend sizing down if you prefer a slimmer fit. Otherwise, perfect.",
      date: "2024-01-05",
      verified: true,
      helpfulCount: 12
    },
    {
      id: "REV-005",
      productId: "NT-004",
      customerName: "Nina R.",
      rating: 5,
      title: "Function meets fashion",
      content: "These cargo pants are perfect for my lifestyle. The fabric is water-resistant which is great for city living, and they look sophisticated enough for work. The pockets are actually functional!",
      date: "2024-01-03",
      verified: true,
      helpfulCount: 15
    }
  ],
  faqs: [
    {
      id: "FAQ-001",
      question: "When will my order ship?",
      answer: "Orders placed before 2 PM EST ship the same business day. Standard delivery takes 3-5 business days, while express shipping delivers within 1-2 business days. You'll receive a tracking number via email as soon as your order ships.",
      category: "shipping"
    },
    {
      id: "FAQ-002",
      question: "What is your return policy?",
      answer: "We offer free returns within 30 days of purchase. Items must be unworn, unwashed, and in original packaging with tags attached. Simply use our prepaid return label, and we'll process your refund within 5-7 business days of receiving your return.",
      category: "returns"
    },
    {
      id: "FAQ-003",
      question: "How do I determine my size?",
      answer: "Each product page includes detailed measurements and a size guide. We recommend measuring your favorite similar garment and comparing to our size chart. If you're between sizes, we generally recommend sizing up for a more relaxed fit.",
      category: "sizing"
    },
    {
      id: "FAQ-004",
      question: "Do you ship internationally?",
      answer: "Yes, we ship to over 50 countries worldwide. International shipping costs and delivery times vary by destination. Customs fees and import duties are the responsibility of the customer and will be collected at delivery.",
      category: "shipping"
    },
    {
      id: "FAQ-005",
      question: "How do drop day releases work?",
      answer: "Our capsule drops are released at specific times announced in advance. Quantities are limited, and items are available on a first-come, first-served basis. We recommend creating an account and saving your payment information in advance for the fastest checkout experience.",
      category: "drop-day"
    },
    {
      id: "FAQ-006",
      question: "Are your materials sustainable?",
      answer: "Sustainability is at the core of our brand. We source materials from certified suppliers who meet strict environmental and ethical standards. Our wool is mulesing-free, our cotton is organic, and our leather is vegetable-tanned using traditional methods.",
      category: "general"
    },
    {
      id: "FAQ-007",
      question: "Can I modify or cancel my order?",
      answer: "Orders can be modified or cancelled within 1 hour of placing them. After that time, our warehouse begins processing and we cannot make changes. If you need assistance, contact our customer care team immediately at care@neothreads.com.",
      category: "returns"
    },
    {
      id: "FAQ-008",
      question: "How should I care for my garments?",
      answer: "Each product includes specific care instructions. As a general rule, we recommend following the care label precisely. For wool and cashmere items, dry cleaning is preferred. For cotton and technical fabrics, machine washing on cold with like colors is typically safe.",
      category: "general"
    }
  ],
  contact: {
    customerCareEmail: "care@neothreads.com",
    returnsHubAddress: "NEO-THREADS Returns Hub, 123 Fashion District, New York, NY 10018",
    supportPhone: "+1 (888) 555-NEO"
  },
  shipping: [
    {
      name: "Standard Shipping",
      price: 0,
      estimatedDays: "3-5 business days",
      countries: ["United States"]
    },
    {
      name: "Express Shipping",
      price: 15,
      estimatedDays: "1-2 business days",
      countries: ["United States", "Canada"]
    },
    {
      name: "International Standard",
      price: 25,
      estimatedDays: "7-14 business days",
      countries: ["United Kingdom", "France", "Germany", "Italy", "Spain", "Japan", "Australia"]
    },
    {
      name: "International Express",
      price: 45,
      estimatedDays: "3-5 business days",
      countries: ["United Kingdom", "France", "Germany", "Italy", "Spain", "Japan", "Australia"]
    }
  ],
  sustainability: [
    {
      label: "Carbon Neutral",
      value: "2024",
      description: "We achieved carbon neutrality across our entire supply chain through renewable energy investments and offset programs."
    },
    {
      label: "Water Usage",
      value: "-40%",
      description: "Our manufacturing processes use 40% less water than industry standards through innovative dyeing techniques."
    },
    {
      label: "Recycled Materials",
      value: "35%",
      description: "35% of our materials are recycled or upcycled, with a goal of reaching 50% by 2026."
    },
    {
      label: "Fair Trade",
      value: "100%",
      description: "All our manufacturing partners are Fair Trade certified, ensuring fair wages and safe working conditions."
    }
  ],
  footerLinks: {
    shop: [
      { name: "New Arrivals", href: "#shop" },
      { name: "Bestsellers", href: "#shop" },
      { name: "Collections", href: "#collections" },
      { name: "Sale", href: "#shop" }
    ],
    support: [
      { name: "Contact Us", href: "#contact" },
      { name: "FAQs", href: "#faq" },
      { name: "Shipping Info", href: "#faq" },
      { name: "Returns", href: "#faq" }
    ],
    company: [
      { name: "About Us", href: "#about" },
      { name: "Sustainability", href: "#about" },
      { name: "Careers", href: "#contact" },
      { name: "Press", href: "#contact" }
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "Accessibility", href: "#" }
    ]
  }
};
