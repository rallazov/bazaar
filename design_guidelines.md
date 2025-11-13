# E-Commerce Design Guidelines: Premium Boxer Briefs Store

## Design Approach

**Reference-Based Design**: Drawing inspiration from premium e-commerce experiences like Nike, Adidas, and direct-to-consumer brands like MeUndies and Tommy John. Focus on bold product photography, clean layouts, and seamless checkout experience.

**Color Palette**
- Primary: Black (#000000) - headers, text, CTAs
- Accent: Red (#DC2626) - highlights, sale badges, CTAs
- Background: White (#FFFFFF) - main canvas
- Secondary: Gray scale (#F3F4F6, #9CA3AF, #4B5563) - borders, secondary text, backgrounds

## Typography

**Font Stack**: 
- Headings: Inter (Bold 700, SemiBold 600) - modern, clean
- Body: Inter (Regular 400, Medium 500)

**Hierarchy**:
- Hero H1: text-5xl md:text-7xl font-bold
- Section H2: text-3xl md:text-5xl font-bold
- Product Title: text-2xl font-semibold
- Body: text-base md:text-lg
- Small Print: text-sm

## Layout System

**Spacing Units**: Tailwind units of 4, 6, 8, 12, 16, 24 (p-4, m-8, gap-6, etc.)

**Grid System**:
- Product Grid: grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6
- Max Container: max-w-7xl mx-auto px-4 md:px-8

## Page Structures

### Homepage

**Hero Section** (h-screen):
- Full-screen lifestyle image of model wearing boxer briefs
- Overlaid heading: "Premium Comfort. Bold Style."
- Dual CTAs: "Shop Now" (red bg) + "View Collection" (outline)
- Background: Blurred dark overlay for text readability
- Buttons with backdrop-blur-md bg-black/30 effect

**Featured Products** (py-16):
- 4-column grid (responsive to 2-col mobile)
- Product cards: Image, title, price, quick "Add to Cart" on hover
- Red sale badges on discounted items (top-right corner)

**Benefits Section** (py-24, bg-gray-50):
- 3-column layout: Free Shipping | 30-Day Returns | Premium Fabric
- Icons above each benefit (use Heroicons)
- Black icons with red accent on hover

**Social Proof** (py-16):
- Customer reviews in 3-column grid
- 5-star ratings in red
- Customer photos in circular frames

### Product Listing Page

**Filter Sidebar** (w-64, sticky):
- Size checkboxes
- Color swatches (visual circles)
- Price range slider

**Product Grid** (flex-1):
- 3-4 column responsive grid
- Hover effect: Image zoom + "Quick View" overlay
- Product card: Image, name, price (strikethrough for sale), color dots

### Product Detail Page

**Layout**: Two-column (lg:grid-cols-2)

**Left Column - Images**:
- Large primary image
- Thumbnail gallery below (4-5 images)
- Click to expand lightbox

**Right Column - Details**:
- Product name (text-3xl)
- Price (text-2xl, red for sale price)
- Size selector: Button group (black border, red when selected)
- Quantity picker
- Large "Add to Cart" button (bg-red-600, full width)
- Accordion sections: Description, Care Instructions, Shipping

### Cart Page

**Layout**: Two-column (lg:grid-cols-3, cart is 2/3)

**Cart Items** (col-span-2):
- Each item: Thumbnail (left) | Details (center) | Price & quantity (right)
- Remove icon (X) in top-right of each item
- Quantity +/- buttons
- Update quantities without page reload

**Order Summary** (col-span-1, sticky):
- Subtotal, shipping, tax breakdown
- Promo code input
- Total (text-2xl font-bold)
- "Proceed to Checkout" button (bg-black, full width)

### Checkout Page

**Progress Indicator** (top):
- Steps: Shipping → Payment → Review
- Active step in red, completed in black, upcoming in gray

**Form Layout**: Single column (max-w-2xl)
- Shipping address form (clean input fields, gray borders)
- Payment section with Stripe Elements integration
- Order summary sidebar (sticky on desktop)
- "Place Order" button (bg-red-600, text-xl, py-4)

## Component Library

**Buttons**:
- Primary: bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded
- Secondary: border-2 border-black hover:bg-black hover:text-white px-8 py-3 rounded
- Ghost: text-black hover:text-red-600 transition

**Product Cards**:
- White background, subtle shadow on hover
- Image aspect-ratio-square
- 4px border-radius
- Sale badge: absolute top-2 right-2, bg-red-600 text-white px-3 py-1 rounded-full

**Inputs**:
- Border: border-gray-300 focus:border-black focus:ring-2 focus:ring-black
- Rounded-md, px-4 py-3
- Labels: text-sm font-medium mb-2

**Navigation**:
- Sticky header (bg-white border-b)
- Logo left, nav center, cart/account icons right
- Mobile: Hamburger menu (slide-in drawer)
- Cart icon with quantity badge (red circle)

## Images

**Hero Image**: Full-screen lifestyle shot of athletic male model wearing boxer briefs in modern setting (bedroom/urban loft). High-contrast, slightly desaturated for premium feel.

**Product Images**: Clean white background, front and side views of boxer briefs, fabric detail close-ups, worn on model.

**Lifestyle Images**: Action shots, everyday scenarios, emphasize comfort and fit.

## Mobile Optimization

- Stack all multi-column layouts to single column
- Product grid: 2 columns max
- Sticky "Add to Cart" bar at bottom on product pages
- Simplified navigation (hamburger menu)
- Touch-friendly buttons (min 44px height)
- Collapsible sections for product details

## Animations

**Minimal, purposeful**:
- Product image zoom on hover (scale-105 transition-transform)
- Cart icon shake on item add
- Smooth page transitions (opacity fade)
- No distracting scroll animations

This design creates a bold, modern e-commerce experience that emphasizes product photography while maintaining clarity and ease of use across all devices.