# VANYA LUXE — Contemporary Indian Women's Fashion Boutique

A premium, editorial e-commerce website designed specifically for a modern Indian women's fashion boutique. Inspired by high-end independent fashion labels, this storefront avoids generic templates in favor of spacious editorial typography, warm ivory and burgundy palettes, artisanal craftsmanship storytelling, and seamless mobile-first shopping interactions.

---

## 🎨 Brand Identity & Design System

- **Warm Ivory:** `#F8F5F0` (Primary editorial background)
- **Deep Burgundy:** `#632B3A` (Signature brand accent, hero buttons, footer)
- **Muted Rose:** `#D9B8B3` (Soft complementary accents, badges, highlights)
- **Soft Beige:** `#E9DFD3` (Card backgrounds, borders, divider lines)
- **Charcoal:** `#252323` (Body typography and dark accents)
- **Antique Gold:** `#C5A059` (Rating stars, silk mark badges, savings tags)

### Typography
- **Headings & Editorial Titles:** Cormorant Garamond / Playfair Display
- **Body & UI Elements:** Inter / Manrope

---

## 🚀 Key Features Implemented

### 1. Navigation & Announcement Bar
- Sticky navigation with backdrop blur on scroll.
- Top announcement bar with configurable text: *"Discover timeless styles, delivered across India."*
- Desktop and mobile navigation with quick access to Collections, New Arrivals, Brand Story, and Contact.
- Header action icons for live Search, Saved Wishlist (with item count), and Shopping Bag (with quantity badge).

### 2. High-Impact Fashion Campaign Hero
- Full-screen editorial campaign photograph featuring an Indian model wearing contemporary ethnic attire.
- Headline: *"Style That Speaks. Elegance That Lasts."*
- Subheading: *"Discover thoughtfully curated styles that celebrate individuality and timeless fashion."*
- CTAs: **EXPLORE COLLECTION** and **DISCOVER NEW ARRIVALS**.
- Subtle bounce scroll indicator and pan-India boutique assurance badges.

### 3. "Find Your Style" Category Showcase
- Visually immersive image-based category grid:
  - **Sarees** (Handwoven silks, organza, Kanjeevarams)
  - **Kurtis & Kurtas** (Everyday breathable Chanderi & Mulmul)
  - **Ethnic Sets** (Flared 48-kalidar Anarkalis, shararas)
  - **Dresses** (Modern Indo-western fusion midi dresses)
  - **Co-ord Sets** (Pure European-grade Belgian linen matching sets)
  - **Festive Collection** (Raw silk zardozi suits, kadwa brocade)
- Subtle zoom animations and instant category filtering.

### 4. "Just Arrived" New Arrivals Grid
- Dynamic product cards featuring:
  - Dual-image hover transitions (model angle flip).
  - Indian Rupee (INR ₹) formatted pricing with savings calculations.
  - Size selectors and color variant swatches.
  - Interactive Wishlist heart toggle with localStorage persistence.
  - Instant **Quick View** modal to inspect garments without leaving the page.
  - Quick **Add to Bag** interaction with visual feedback.

### 5. Editorial Storytelling — "The Art of Dressing Beautifully"
- Magazine spread layout highlighting craftsmanship, slow-fashion philosophies, and Indian handloom textile heritage.

### 6. Comprehensive Product Detail Page (PDP)
- Route: `/product/:id` (accessible for any product).
- Multi-image gallery with interactive thumbnail selector and zoom view.
- Real-time Indian PIN Code delivery checker: test with any 6-digit Indian PIN (e.g. `110001`, `400050`, `560001`) to receive realistic transit estimates and COD eligibility.
- Sizing Guide modal with bust, waist, and hip measurements in both inches and centimeters.
- Sticky mobile **Add to Bag** bottom bar for frictionless mobile shopping.
- Direct **"Enquire via WhatsApp"** button prefilled with the product title, SKU, price, and selected size.
- Accordion sections for Fabric & Craft, Delivery & Returns, and Garment Care.
- "You May Also Admire" related product recommendations.

### 7. Interactive Shopping Bag & Checkout Flow
- Slide-over Shopping Bag drawer with quantity steppers and item removal.
- Free shipping progress bar (*"Add ₹X more to unlock Complimentary Pan-India Shipping"*).
- Working promo code engine (try `WELCOME10` for 10% off or `LUXE15` on orders over ₹8,000).
- Dedicated checkout page (`/checkout`) with customer contact details, 28 Indian state dropdowns, and address validation.
- Simulated payment selection (Instant UPI / QR Code, Credit/Debit Cards, Cash on Delivery).
- Generates a realistic **Order Confirmation Receipt** with an assigned Order Reference (e.g. `VNY-894210`), itemized breakdown, and a one-click **"Confirm via WhatsApp"** button.

### 8. Value Propositions & Brand Story
- **"More Than Just Fashion"**: 4 boutique pillars (01 Curated Collections, 02 Quality & Craftsmanship, 03 Easy Shopping, 04 Nationwide Reach).
- **"Every Collection Tells a Story"**: Atelier heritage narrative with ethical fair pay and pure textile commitments.

### 9. Customer Reviews & Social Proof
- Testimonial carousel with clear demonstration sample indicators, star ratings, and verified boutique patron badges.

### 10. Instagram & WhatsApp Shopping Integration
- Curated 6-photo editorial Instagram grid with hover tags (*"Shop This Look"*).
- Dedicated WhatsApp concierge cards with direct prefilled links.
- Floating bottom-right WhatsApp widget with stylist tooltip.

### 11. Luxury Burgundy Footer
- Rich deep wine `#632B3A` styling with warm ivory typography.
- Interactive policy modals for Shipping & Delivery, 7-Day Exchange Policy, Privacy Policy, and Terms of Service.
- Newsletter subscription form with instant feedback.

---

## ⚙️ Configuration & Customization

All boutique-specific information is centralized in clean, editable files:

### Store Configuration: `src/config/storeConfig.ts`
Easily modify:
- Boutique name and tagline
- WhatsApp phone number (powers all WhatsApp chat & enquiry links)
- Announcement bar text
- Studio address, phone, email, and opening hours
- Free shipping threshold and standard delivery fees
- Return period and policies

### Product Catalog: `src/data/products.ts`
Add, edit, or replace products, prices, images, colors, sizes, and craftsmanship stories.

---

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite 6** for fast development and optimized production bundling
- **Tailwind CSS** with custom luxury editorial palette and typography configuration
- **Lucide React** for icons
- **React Router DOM 6** for seamless client-side page routing
- **LocalStorage API** for persistent shopping bag and wishlist state

---

## 📦 Running Locally

```bash
# Navigate to the project directory
cd /Users/munch/.gemini/antigravity/scratch/luxe-boutique

# Start the development server
npm run dev

# Build for production
npm run build
```
The site is served locally at `http://127.0.0.1:5173/`.
