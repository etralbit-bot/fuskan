import type { TypedObject } from "@portabletext/types";

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  featured?: boolean;
  shortDescription: string;
  description?: string;
  /** Legacy HTML fallback */
  descriptionRichHtml?: string;
  /** Sanity rich text blocks */
  descriptionRich?: TypedObject[];
  /** Sanity rich text blocks */
  detailsRich?: TypedObject[];
  images: string[];
  image?: string;
};

export type Category = {
  name: string;
  slug: string;
  description: string;
  image: string;
  sortOrder?: number;
  catalogueFileUrl?: string;
  catalogueFileName?: string;
};

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
};

export const categories: Category[] = [
  {
    name: "Leather jackets",
    slug: "leather-jackets",
    description:
      "Biker, bomber, and casual leather jacket lines with custom fittings and trims.",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Leather bags & travel",
    slug: "leather-bags-travel",
    description:
      "Backpacks, duffle bags, and crossbody designs for retail and wholesale programs.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Wallets, belts & accessories",
    slug: "wallets-belts-accessories",
    description:
      "Everyday leather accessories with custom branding, packaging, and export finishing.",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1200&q=80",
  },
];

export const products: Product[] = [
  {
    id: "prod_001",
    name: "Classic biker leather jacket",
    slug: "classic-biker-leather-jacket",
    category: "Leather jackets",
    categorySlug: "leather-jackets",
    featured: true,
    shortDescription: "Premium biker jacket with custom lining, hardware, and brand detailing.",
    description:
      "Built from genuine leather with durable stitching and clean finishing for private label programs.",
    descriptionRichHtml: `
      <h3>Product overview</h3>
      <p>Our <strong>classic biker leather jacket</strong> is built for durability, fit, and premium finish across export batches.</p>
      <h3>Manufacturing notes</h3>
      <ul>
        <li><strong>Leather type selection</strong> based on target market and price point.</li>
        <li><strong>Custom hardware</strong> including zippers, buttons, and pullers.</li>
        <li><strong>Branding</strong> through labels, embossing, and lining customization.</li>
      </ul>
      <h3>Ideal for</h3>
      <p>Fashion brands, retailers, and private label outerwear collections.</p>
    `,
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "prod_002",
    name: "Leather travel duffle bag",
    slug: "leather-travel-duffle-bag",
    category: "Leather bags & travel",
    categorySlug: "leather-bags-travel",
    featured: true,
    shortDescription: "Travel-ready leather duffle bag with reinforced handles and strap options.",
    description:
      "Spacious duffle construction with strong handles, premium fittings, and export-grade finishing.",
    descriptionRichHtml: `
      <h3>Product overview</h3>
      <p>Our leather duffle bags are built for <strong>daily durability</strong> and <strong>premium market appeal</strong>.</p>
      <h3>What we configure</h3>
      <ul>
        <li>Leather grain and thickness options</li>
        <li>Interior compartments and lining choices</li>
        <li>Metal accessories and shoulder strap variants</li>
      </ul>
      <h3>Ideal for</h3>
      <p>Travel collections, retail bag programs, and gifting lines.</p>
    `,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1575844264771-892081089af5?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "prod_003",
    name: "Bi-fold leather wallet",
    slug: "bi-fold-leather-wallet",
    category: "Wallets, belts & accessories",
    categorySlug: "wallets-belts-accessories",
    featured: true,
    shortDescription: "Slim bi-fold wallet with multiple card slots and custom logo branding.",
    description:
      "Compact wallet build with quality leather, edge painting, and reliable stitching.",
    descriptionRichHtml: `
      <h3>Product overview</h3>
      <p>Wallet production focuses on <strong>precision cutting</strong> and <strong>clean edge finishing</strong> for a premium final product.</p>
      <h3>Decoration</h3>
      <ul>
        <li>Embossed, debossed, or foil logo options</li>
        <li>Custom card-slot layouts and cash sections</li>
        <li>Gift box and retail packaging support</li>
      </ul>
      <h3>Ideal for</h3>
      <p>Retail chains, private labels, and corporate gifting programs.</p>
    `,
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517254797898-04edd251b9f3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "prod_004",
    name: "Leather belt with metal buckle",
    slug: "leather-belt-metal-buckle",
    category: "Wallets, belts & accessories",
    categorySlug: "wallets-belts-accessories",
    featured: true,
    shortDescription: "Classic leather belt with customizable buckle finishes and sizing.",
    description:
      "Durable leather belt with smooth finishing and multiple buckle/fitting options.",
    descriptionRichHtml: `
      <h3>Product overview</h3>
      <p>Our leather belts are made with attention to <strong>consistency</strong> and <strong>long-term wear</strong>.</p>
      <h3>Branding options</h3>
      <ul>
        <li>Buckle plating options in silver, antique, or matte black</li>
        <li>Embossed logo and inner print options</li>
        <li>Export-ready size runs and packaging</li>
      </ul>
      <h3>Ideal for</h3>
      <p>Menswear, womenswear, and uniform accessory programs.</p>
    `,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "prod_005",
    name: "Leather work gloves",
    slug: "leather-work-gloves",
    category: "Wallets, belts & accessories",
    categorySlug: "wallets-belts-accessories",
    featured: false,
    shortDescription: "Protective leather gloves with reinforced palm and flexible fit.",
    description:
      "Reliable gloves engineered for durability, grip, and repeated heavy-duty use.",
    descriptionRichHtml: `
      <h3>Product overview</h3>
      <p>Leather glove production balances <strong>protection</strong>, <strong>comfort</strong>, and <strong>durability</strong> for demanding use cases.</p>
      <h3>Decoration fit for performance</h3>
      <ul>
        <li>Palm reinforcement and cuff variation options</li>
        <li>Lining options based on weather and use</li>
        <li>Branding via labels and stamped marks</li>
      </ul>
      <h3>Ideal for</h3>
      <p>Industrial suppliers, safety programs, and workwear distributors.</p>
    `,
    images: [
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "prod_006",
    name: "Leather crossbody bag",
    slug: "leather-crossbody-bag",
    category: "Leather bags & travel",
    categorySlug: "leather-bags-travel",
    featured: false,
    shortDescription: "Compact crossbody bag with organized pockets and premium leather texture.",
    description:
      "Smart everyday bag design with dependable hardware and customizable brand details.",
    descriptionRichHtml: `
      <h3>Product overview</h3>
      <p>This crossbody model focuses on <strong>utility</strong>, <strong>comfort</strong>, and <strong>premium appearance</strong>.</p>
      <h3>Customization</h3>
      <ul>
        <li>Pocket layout and strap options</li>
        <li>Custom lining, zipper, and puller details</li>
        <li>Logo placement through metal plates or embossing</li>
      </ul>
      <h3>Ideal for</h3>
      <p>Fashion labels, travel goods lines, and private label accessory ranges.</p>
    `,
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=1200&q=80",
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Aamir Qureshi",
    role: "Founder",
    company: "Stride Sportswear",
    quote:
      "Fuskan helped us launch our leather goods line with consistent quality and dependable production timelines.",
  },
  {
    name: "Coach Lina Mark",
    role: "Head Coach",
    company: "Metro Athletics Club",
    quote:
      "From jackets to leather bags, their finishing quality and communication made scaling easy for our brand.",
  },
  {
    name: "Rida Khan",
    role: "Brand Owner",
    company: "Peak Motion Goods",
    quote:
      "They understood our accessory vision and delivered consistent specs, branding, and packaging across every batch.",
  },
];
