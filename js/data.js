/* ==========================================================================
   Stride — shared static data for products + blog
   Loaded by navbar.js / blog.js / products.js across all public pages
   ========================================================================== */

var STRIDE_DATA = (function () {
  'use strict';

  /* ----------------------------------------------------------------------
     PRODUCTS — rendered on products.html and product-details.html?id=...
     ---------------------------------------------------------------------- */
  var PRODUCTS = [
    {
      id: 'cloudrunner-5',
      name: 'Cloudrunner 5',
      brand: 'Asics',
      category: 'Running',
      tagline: 'A cushioned daily trainer that disappears under you.',
      lede:
        'The fifth Cloudrunner keeps the plush heel gel and adds a bouncier midsole foam, so every easy run feels smoother. Built for daily training, 5k through marathon blocks.',
      price: 8999,
      compareAt: 10999,
      badge: 'sale',
      rating: 4.8,
      reviewCount: 214,
      sizes: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11'],
      colors: ['#94a3b8', '#f59e0b', '#1e293b'],
      image:
        'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=900&auto=format&fit=crop',
      imageAlt: 'Asics Cloudrunner 5 sneaker in side profile',
      stats: [
        { value: '10.2 oz', label: 'weight (US 9)' },
        { value: '8 mm', label: 'heel-toe drop' },
        { value: '4.8★', label: 'from 214 reviews' }
      ],
      features: [
        { title: 'Gel in the heel', text: 'Impact-absorption gel under the heel softens every foot strike.' },
        { title: 'FF Blast foam', text: 'The midsole returns energy instead of absorbing it on the way out.' },
        { title: 'Engineered mesh', text: 'Breathable, flexible upper that locks the midfoot without pressure.' },
        { title: 'AHAR outsole', text: 'High-abrasion rubber on the heel for long-wear durability.' },
        { title: 'Wide widths', text: 'Available in standard, wide and extra-wide fittings.' },
        { title: '30-day run guarantee', text: 'Not the shoe for you? Run 30 days in them and swap them free.' }
      ],
      specs: [
        { title: 'Upper', text: 'Engineered air-mesh with synthetic overlays' },
        { title: 'Midsole', text: 'FF Blast foam + rearfoot gel' },
        { title: 'Outsole', text: 'AHAR rubber, wet-grip pattern' },
        { title: 'Weight', text: '10.2 oz (US 9) · 8 mm drop' },
        { title: 'Fit', text: 'True to size; wide fits available' },
        { title: 'Warranty', text: '30-day run guarantee + 14-day fit guarantee' }
      ],
      faqs: [
        { q: 'How does it fit?', a: 'True to size in standard width. If you are between sizes, go up — the fit studio will confirm with a free scan.' },
        { q: 'Is it good for wide feet?', a: 'Yes, this pair ships in wide and extra-wide. Ask in store or choose width at checkout.' },
        { q: 'Can I use it for walking too?', a: 'Absolutely — many walkers pick it for the same cushioning and the softer heel landings.' }
      ],
      related: ['glide-knit', 'tempo-trainer', 'court-low-leather']
    },
    {
      id: 'court-low-leather',
      name: 'Court Low Leather',
      brand: 'Adidas',
      category: 'Lifestyle',
      tagline: 'A clean leather court sneaker that goes with everything.',
      lede:
        'Full-grain leather upper on a classic gum sole. A sneaker you can wear to work on Friday, brunch on Saturday and the airport on Monday.',
      price: 5499,
      compareAt: null,
      badge: null,
      rating: 4.6,
      reviewCount: 342,
      sizes: ['6', '7', '8', '9', '10', '11', '12'],
      colors: ['#f8fafc', '#0f172a'],
      image:
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=900&auto=format&fit=crop',
      imageAlt: 'White Adidas Court Low leather sneaker',
      stats: [
        { value: '2.1 oz', label: 'leather per pair' },
        { value: '60+', label: 'easy-to-wear fits' },
        { value: '4.6★', label: 'from 342 reviews' }
      ],
      features: [
        { title: 'Full-grain leather', text: 'Soft, structured upper that moulds to your foot over the first wears.' },
        { title: 'Classic gum sole', text: 'Flexible cupsole with a timeless contrast finish.' },
        { title: 'Padded collar', text: 'A plush ankle collar for all-day comfort, no break-in bruising.' },
        { title: 'Easy care', text: 'A damp cloth brings it back — no suede brushes or sprays needed.' },
        { title: 'Low profile', text: 'Sits close to the ground for a clean, understated silhouette.' }
      ],
      specs: [
        { title: 'Upper', text: 'Full-grain leather' },
        { title: 'Sole', text: 'Rubber cupsole, gum finish' },
        { title: 'Lining', text: 'Textile, breathable' },
        { title: 'Closure', text: 'Lace-up with 6 eyelets' },
        { title: 'Fit', text: 'True to size; narrow–standard' },
        { title: 'Warranty', text: '14-day fit guarantee' }
      ],
      faqs: [
        { q: 'Do leather sneakers need breaking in?', a: 'This pair is soft out of the box, but like all leather it improves over three or four wears.' },
        { q: 'Can I wear them with formal trousers?', a: 'Yes — with tailored trousers and a tucked shirt they read as smart-casual, not sporty.' },
        { q: 'Are they available in wide?', a: 'This model runs narrow-to-standard. Try the Trailbreak or a wide-fitting runner if you need more room.' }
      ],
      related: ['trailbreak-boot', 'cloudrunner-5', 'school-easy-on']
    },
    {
      id: 'glide-knit',
      name: 'Glide Knit',
      brand: 'Nike',
      category: 'Running',
      tagline: 'A knit everyday runner with plush, cloud-like foam.',
      lede:
        'The Glide Knit wraps your foot in a stretchy Flyknit-style upper over a full-length foam sole. A forgiving, easy pace for daily runs and long walks.',
      price: 6999,
      compareAt: 8299,
      badge: 'sale',
      rating: 4.7,
      reviewCount: 188,
      sizes: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '11'],
      colors: ['#e2e8f0', '#dc2626', '#334155'],
      image:
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=900&auto=format&fit=crop',
      imageAlt: 'Nike Glide Knit runner on a track',
      stats: [
        { value: '9.8 oz', label: 'weight (US 8)' },
        { value: '10 mm', label: 'heel-toe drop' },
        { value: '4.7★', label: 'from 188 reviews' }
      ],
      features: [
        { title: 'Knit upper', text: 'A seamless stretchy knit that adapts to your foot shape as you run.' },
        { title: 'Full-length foam', text: 'One-piece midsole for a soft, uninterrupted ride on every step.' },
        { title: 'Heel pull-tab', text: 'Easy one-hand entry — no more struggling with the collar.' },
        { title: 'Reflective details', text: 'Low-light visibility for early morning or evening runs.' },
        { title: 'Everyday durability', text: 'A tougher toe cap and heel clip where daily runners wear first.' }
      ],
      specs: [
        { title: 'Upper', text: 'Stretch knit with reflective trim' },
        { title: 'Midsole', text: 'Full-length foam' },
        { title: 'Outsole', text: 'Waffle-pattern rubber' },
        { title: 'Weight', text: '9.8 oz (US 8) · 10 mm drop' },
        { title: 'Fit', text: 'Slightly snug; half-size up if between' },
        { title: 'Warranty', text: '30-day run guarantee' }
      ],
      faqs: [
        { q: 'Does the knit stretch out?', a: 'It moulds to your foot but holds its shape — that is what keeps the lockdown consistent at mile ten.' },
        { q: 'Is it warm in summer?', a: 'The knit is highly breathable; most runners use it through Indian summers without issues.' },
        { q: 'Is it suited to race day?', a: 'It is an everyday trainer. For tempo and race day, look at lighter, firmer models.' }
      ],
      related: ['cloudrunner-5', 'tempo-trainer', 'court-low-leather']
    },
    {
      id: 'trailbreak-boot',
      name: 'Trailbreak Boot',
      brand: 'Clarks',
      category: 'Trail',
      tagline: 'A rugged all-weather boot that still looks smart.',
      lede:
        'Waterproof leather, grippy lug outsole and a footbed made for hours on your feet. The Trailbreak handles monsoon pavements and weekend trails without looking out of place in the office.',
      price: 9499,
      compareAt: null,
      badge: 'new',
      rating: 4.9,
      reviewCount: 97,
      sizes: ['7', '8', '9', '10', '11', '12'],
      colors: ['#78350f', '#1e293b'],
      image:
        'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=900&auto=format&fit=crop',
      imageAlt: 'Clarks Trailbreak leather boot',
      stats: [
        { value: '12 h', label: 'standing comfort' },
        { value: 'Waterproof', label: 'full leather upper' },
        { value: '4.9★', label: 'from 97 reviews' }
      ],
      features: [
        { title: 'Waterproof leather', text: 'Seam-sealed full-grain leather keeps monsoon rain out.' },
        { title: 'Lug outsole', text: 'Deep traction lugs grip wet stone, mud and smooth metro floors alike.' },
        { title: 'Cushion footbed', text: 'A shock-absorbing footbed made for long shifts and long walks.' },
        { title: 'Reinforced toe', text: 'Protection where boots scuff first, without a bulky steel look.' },
        { title: 'Ankle support', text: 'A higher cut with a padded collar for confident footing on trails.' }
      ],
      specs: [
        { title: 'Upper', text: 'Waterproof full-grain leather' },
        { title: 'Outsole', text: 'Deep-lug rubber' },
        { title: 'Footbed', text: 'Cushioned, removable' },
        { title: 'Height', text: 'Mid-cut · padded ankle collar' },
        { title: 'Fit', text: 'True to size; standard–wide' },
        { title: 'Warranty', text: '30-day workmanship + 14-day fit guarantee' }
      ],
      faqs: [
        { q: 'Are they actually waterproof?', a: 'The leather is sealed and seams are taped. They handle steady rain; we do not claim full submersion.' },
        { q: 'Can I wear them to the office?', a: 'Yes — the clean leather profile reads as a smart boot. Many customers commute and boardroom in the same pair.' },
        { q: 'Do they need breaking in?', a: 'Minimal. The footbed and collar are cushioned, and leather softens within the first couple of days.' }
      ],
      related: ['court-low-leather', 'school-easy-on', 'cloudrunner-5']
    },
    {
      id: 'school-easy-on',
      name: 'School Easy-On',
      brand: 'Clarks',
      category: 'Kids',
      tagline: 'Easy to put on, hard to wear out — for school days.',
      lede:
        'Built for school: a slip-on elastic style with a wide toe box, scuff-resistant toe cap and a growing-foot friendly sole. Kids get them on themselves — every morning.',
      price: 2999,
      compareAt: null,
      badge: null,
      rating: 4.5,
      reviewCount: 420,
      sizes: ['EU 28', 'EU 30', 'EU 32', 'EU 34', 'EU 36', 'EU 38'],
      colors: ['#0f172a', '#b91c1c'],
      image:
        'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=900&auto=format&fit=crop',
      imageAlt: 'Clarks School Easy-On kids shoes',
      stats: [
        { value: 'No laces', label: 'elastic slip-on' },
        { value: '6 mo', label: 're-size check due' },
        { value: '4.5★', label: 'from 420 reviews' }
      ],
      features: [
        { title: 'Elastic slip-on', text: 'Two-way stretch collar and a pull-tab — no laces to tie in the morning rush.' },
        { title: 'Wide toe box', text: 'Room for growing toes; less rubbing, fewer complaints.' },
        { title: 'Scuff cap', text: 'A hardened toe that survives corridors, gates and gravel.' },
        { title: 'Washable lining', text: 'Machine-washable sock lining for the aftermath of rainy-day play.' },
        { title: 'Growing-feet scan', text: 'Pair it with a free in-store scan and we re-size every 6 months.' }
      ],
      specs: [
        { title: 'Upper', text: 'Smooth leather with elastic gore' },
        { title: 'Sole', text: 'Flexible, non-marking rubber' },
        { title: 'Lining', text: 'Washable textile' },
        { title: 'Closure', text: 'Slip-on · no laces' },
        { title: 'Fit', text: 'Kids sizes EU 28–38' },
        { title: 'Warranty', text: '14-day fit guarantee' }
      ],
      faqs: [
        { q: 'Will these fit a wide-footed child?', a: 'The wide toe box is the point. If in doubt, bring them for a free scan — sizing matters most under 12.' },
        { q: 'How long do they last a school year?', a: 'Most families get a full year; the scuff cap and reinforced toe do the heavy lifting.' },
        { q: 'Can they be resoled?', a: 'Yes — our repair bench re-soles and re-cleans them, which is cheaper than a new pair.' }
      ],
      related: ['tempo-trainer', 'court-low-leather', 'trailbreak-boot']
    },
    {
      id: 'tempo-trainer',
      name: 'Tempo Trainer',
      brand: 'Puma',
      category: 'Sports',
      tagline: 'A lightweight speed shoe for fast sessions and gym floor.',
      lede:
        'Lightweight mesh, a snappy foam plate and a low-profile outsole — the Tempo Trainer is for interval days, gym work and court sports where you want to move fast.',
      price: 4999,
      compareAt: 6499,
      badge: 'sale',
      rating: 4.4,
      reviewCount: 156,
      sizes: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5'],
      colors: ['#f8fafc', '#16a34a', '#111827'],
      image:
        'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=900&auto=format&fit=crop',
      imageAlt: 'Puma Tempo Trainer sneaker on concrete',
      stats: [
        { value: '8.6 oz', label: 'lightest in range' },
        { value: '6 mm', label: 'low-drop platform' },
        { value: '4.4★', label: 'from 156 reviews' }
      ],
      features: [
        { title: 'Snappy plate', text: 'A stiff foam plate propels you forward on every push-off.' },
        { title: 'Lightweight mesh', text: 'A breathable one-piece upper that disappears on foot.' },
        { title: 'Low-drop', text: '6 mm drop keeps you closer to the ground for better ground feel.' },
        { title: 'Court-ready sole', text: 'Flat, grippy outsole that bites on gym floors and hard courts.' },
        { title: 'Speed lacing', text: 'Low-profile lacing system locks the midfoot without pressure points.' }
      ],
      specs: [
        { title: 'Upper', text: 'Engineered mesh' },
        { title: 'Midsole', text: 'Foam with propulsion plate' },
        { title: 'Outsole', text: 'Flat rubber, court pattern' },
        { title: 'Weight', text: '8.6 oz (US 9) · 6 mm drop' },
        { title: 'Fit', text: 'True to size; standard width' },
        { title: 'Warranty', text: '14-day fit guarantee' }
      ],
      faqs: [
        { q: 'Is it for running or gym?', a: 'Both — it shines in interval runs, HIIT and floor work. For long slow runs, prefer the Cloudrunner.' },
        { q: 'Does it suit flat feet?', a: 'It is neutral. If you need support, our fitting studio can recommend an insole to pair.' },
        { q: 'Is the plate hard on the knees?', a: 'It is a flexible plate, not carbon — firm but forgiving on joints for short sessions.' }
      ],
      related: ['cloudrunner-5', 'glide-knit', 'school-easy-on']
    },
    {
      id: 'motion-walker',
      name: 'Motion Walker',
      brand: 'Skechers',
      category: 'Walking',
      tagline: 'A memory-foam walking shoe for all-day comfort.',
      lede:
        'The Motion Walker pairs a breathable knit upper with a memory-foam insole and a grippy, flex-friendly sole — engineered for long days on your feet, from metro commutes to evening walks.',
      price: 3999,
      compareAt: 4999,
      badge: 'sale',
      rating: 4.6,
      reviewCount: 512,
      sizes: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12'],
      colors: ['#475569', '#64748b', '#0f172a'],
      image:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop',
      imageAlt: 'Skechers Motion Walker sneaker in side profile',
      stats: [
        { value: 'Memory foam', label: 'cushioned insole' },
        { value: '6 mo', label: 'comfort guarantee' },
        { value: '4.6★', label: 'from 512 reviews' }
      ],
      features: [
        { title: 'Memory-foam insole', text: 'Moulds to your foot for pressure-relieving comfort from the first step.' },
        { title: 'Breathable knit', text: 'A flexible mesh upper that lets air move on warm days.' },
        { title: 'Flex outsole', text: 'Grooved rubber bends with your foot for a natural walking gait.' },
        { title: 'Machine washable', text: 'Throw them in the wash bag when the commute takes its toll.' },
        { title: 'Wide widths', text: 'Available in standard and wide for most sizes.' }
      ],
      specs: [
        { title: 'Upper', text: 'Breathable knit mesh' },
        { title: 'Insole', text: 'Memory foam, removable' },
        { title: 'Outsole', text: 'Flex-grooved rubber' },
        { title: 'Weight', text: '9.5 oz (US 9) · 6 mm drop' },
        { title: 'Fit', text: 'True to size; wide fits available' },
        { title: 'Warranty', text: '14-day fit guarantee' }
      ],
      faqs: [
        { q: 'Are these good for standing all day?', a: 'Yes — the memory foam insole is the reason this is one of our most-recommended shoes for long shifts.' },
        { q: 'Can I run in them?', a: 'They are a walking shoe. For running, look at the Cloudrunner or Glide Knit.' },
        { q: 'Do they fit wide feet?', a: 'Yes, wide widths are stocked for most sizes — confirm width at checkout.' }
      ],
      related: ['cloudrunner-5', 'glide-knit', 'court-low-leather']
    },
    {
      id: 'retro-574',
      name: 'Retro 574',
      brand: 'New Balance',
      category: 'Lifestyle',
      tagline: 'The classic suede-and-mesh silhouette, reissued.',
      lede:
        'A heritage runner built with premium suede and mesh on the original wedge sole. Timeless in every colourway, and just as good with denim as with tailored trousers.',
      price: 7499,
      compareAt: null,
      badge: null,
      rating: 4.7,
      reviewCount: 268,
      sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11'],
      colors: ['#b45309', '#f8fafc', '#1e293b'],
      image:
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=900&auto=format&fit=crop',
      imageAlt: 'New Balance Retro 574 sneaker in suede',
      stats: [
        { value: '1974', label: 'origin year' },
        { value: 'Suede', label: 'premium upper' },
        { value: '4.7★', label: 'from 268 reviews' }
      ],
      features: [
        { title: 'Premium suede', text: 'Soft, brushed suede panels over breathable mesh.' },
        { title: 'Classic wedge sole', text: 'The original ENCAP cushioning keeps the retro ride.' },
        { title: 'Heritage details', text: 'Bone lace eyelets and tonal embroidery from the archives.' },
        { title: 'Goes anywhere', text: 'The pair that works with jeans, chinos and smart-casual office fits.' }
      ],
      specs: [
        { title: 'Upper', text: 'Suede and mesh' },
        { title: 'Midsole', text: 'ENCAP wedge cushioning' },
        { title: 'Outsole', text: 'Rubber, vintage profile' },
        { title: 'Weight', text: '11.2 oz (US 9)' },
        { title: 'Fit', text: 'True to size; standard width' },
        { title: 'Warranty', text: '14-day fit guarantee' }
      ],
      faqs: [
        { q: 'Is suede hard to keep clean?', a: 'A suede brush and a protectant spray keep it fresh. Our care service also re-cleans and re-seals it.' },
        { q: 'Are they comfortable all day?', a: 'Yes — the wedge midsole was designed for all-day wear long before it was fashionable.' }
      ],
      related: ['court-low-leather', 'cloudrunner-5', 'motion-walker']
    },
    {
      id: 'sprint-light',
      name: 'Sprint Light',
      brand: 'On',
      category: 'Running',
      tagline: 'A featherweight road shoe with a springy cloud sole.',
      lede:
        'The Sprint Light uses a patented cloud sole that compresses on landing and releases on toe-off. A light, energetic road shoe for 10k training and race days.',
      price: 11499,
      compareAt: 12999,
      badge: 'new',
      rating: 4.8,
      reviewCount: 143,
      sizes: ['6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11'],
      colors: ['#0ea5e9', '#f8fafc', '#111827'],
      image:
        'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=900&auto=format&fit=crop',
      imageAlt: 'On Sprint Light running shoe in white and blue',
      stats: [
        { value: '7.4 oz', label: 'featherweight (US 9)' },
        { value: 'Cloud', label: 'compression sole' },
        { value: '4.8★', label: 'from 143 reviews' }
      ],
      features: [
        { title: 'Cloud sole', text: 'Hollow pods absorb impact and return energy on every stride.' },
        { title: 'Speedboard', text: 'A nylon plate transfers power from heel to toe for a snappier push-off.' },
        { title: 'Star-lacing', text: 'A low-bulk lacing system that locks the midfoot without pressure.' },
        { title: 'Reflective loops', text: 'Subtle reflective details for dawn and dusk visibility.' }
      ],
      specs: [
        { title: 'Upper', text: 'Engineered mesh with synthetic overlay' },
        { title: 'Midsole', text: 'Cloud pods + Speedboard' },
        { title: 'Outsole', text: 'Full rubber, road pattern' },
        { title: 'Weight', text: '7.4 oz (US 9) · 6 mm drop' },
        { title: 'Fit', text: 'True to size; narrow–standard' },
        { title: 'Warranty', text: '30-day run guarantee' }
      ],
      faqs: [
        { q: 'Is it cushioned enough for long runs?', a: 'It is a firmer, snappier ride — great for 10k to half-marathon pace. Marathon training might prefer the Cloudrunner.' },
        { q: 'Does it suit wide feet?', a: 'It runs narrow-to-standard. If you need width, our fitting studio can point you to a better last.' }
      ],
      related: ['cloudrunner-5', 'tempo-trainer', 'glide-knit']
    },
    {
      id: 'trail-light',
      name: 'Trail Light X',
      brand: 'Salomon',
      category: 'Trail',
      tagline: 'A grippy, waterproof trail runner for any weather.',
      lede:
        'A quick-drying waterproof trail shoe with deep 5 mm lugs and a locking lace system. Made for monsoon trails, weekend treks and anything the ground throws at you.',
      price: 9999,
      compareAt: null,
      badge: 'new',
      rating: 4.9,
      reviewCount: 81,
      sizes: ['6', '7', '8', '8.5', '9', '9.5', '10', '11', '12'],
      colors: ['#0f766e', '#111827', '#f97316'],
      image:
        'https://images.unsplash.com/photo-1605408499391-6368c628ef42?w=900&auto=format&fit=crop',
      imageAlt: 'Salomon Trail Light X waterproof trail runner',
      stats: [
        { value: '5 mm', label: 'lug depth' },
        { value: 'Waterproof', label: 'sealed membrane' },
        { value: '4.9★', label: 'from 81 reviews' }
      ],
      features: [
        { title: 'Quicklace system', text: 'A single-pull lace that locks in seconds — no double knots mid-trail.' },
        { title: 'Sealed membrane', text: 'A thin waterproof layer keeps feet dry without the bulk of a boot.' },
        { title: '5 mm lugs', text: 'Aggressive traction that bites into mud, scree and wet rock.' },
        { title: 'Protective toe cap', text: 'Reinforced bumper guards against roots and stones.' },
        { title: 'Quick-dry lining', text: 'Drains and dries fast after stream crossings or rain.' }
      ],
      specs: [
        { title: 'Upper', text: 'Waterproof membrane over mesh' },
        { title: 'Midsole', text: 'EVA cushioning' },
        { title: 'Outsole', text: '5 mm lug Contagrip rubber' },
        { title: 'Weight', text: '10.1 oz (US 9)' },
        { title: 'Fit', text: 'True to size; standard–wide' },
        { title: 'Warranty', text: '30-day trail guarantee' }
      ],
      faqs: [
        { q: 'Do I need trail shoes for hiking?', a: 'For anything beyond a flat park path, yes — the lugs and toe cap make uneven ground feel stable.' },
        { q: 'Are they also good on road?', a: 'They work on light road, but the aggressive outsole is loud on tarmac. Use them where they are best: off-road.' }
      ],
      related: ['trailbreak-boot', 'cloudrunner-5', 'tempo-trainer']
    },
    {
      id: 'flex-gym',
      name: 'Flex Trainer Pro',
      brand: 'Reebok',
      category: 'Sports',
      tagline: 'A stable, cushioned trainer for gym and HIIT sessions.',
      lede:
        'A flat, stable base with a cushioned heel for squats, deadlifts and high-impact cardio. The Flex Trainer Pro grips the floor, locks your foot, and stays out of the way.',
      price: 4499,
      compareAt: 5999,
      badge: 'sale',
      rating: 4.5,
      reviewCount: 337,
      sizes: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11'],
      colors: ['#f8fafc', '#dc2626', '#0f172a'],
      image:
        'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=900&auto=format&fit=crop',
      imageAlt: 'Reebok Flex Trainer Pro cross-training shoe',
      stats: [
        { value: '4 mm', label: 'low-drop base' },
        { value: 'Stable', label: 'wide forefoot platform' },
        { value: '4.5★', label: 'from 337 reviews' }
      ],
      features: [
        { title: 'Stable base', text: 'A wide, low-to-the-ground platform for lifting heavy without wobble.' },
        { title: 'Heel cushioning', text: 'Responsive foam under the heel for box jumps and HIIT landings.' },
        { title: 'Lateral support', text: 'Reinforced sidewalls hold your foot during side lunges and court moves.' },
        { title: 'Flex grooves', text: 'Forefoot grooves let the shoe bend where your foot does.' }
      ],
      specs: [
        { title: 'Upper', text: 'Mesh with reinforced cage' },
        { title: 'Midsole', text: 'EVA with heel foam' },
        { title: 'Outsole', text: 'Flat rubber, multi-direction grip' },
        { title: 'Weight', text: '10.6 oz (US 9) · 4 mm drop' },
        { title: 'Fit', text: 'True to size; standard width' },
        { title: 'Warranty', text: '14-day fit guarantee' }
      ],
      faqs: [
        { q: 'Good for deadlifts?', a: 'Yes — the low, stable base keeps you planted. For dedicated lifters we also stock flat-soled options in store.' },
        { q: 'Can I run in them?', a: 'Short treadmill warm-ups only. For running, pair with a dedicated runner.' }
      ],
      related: ['tempo-trainer', 'cloudrunner-5', 'sprint-light']
    }
  ];

  /* ----------------------------------------------------------------------
     BLOG POSTS — rendered on blog.html and blog-details.html?id=...
     ---------------------------------------------------------------------- */
  var POSTS = [
    {
      id: 'size-guide',
      title: 'The honest size guide: how to measure your feet properly',
      category: 'Guides',
      date: '2026-08-04',
      readTime: '6 min read',
      excerpt:
        'Two-thirds of people wear the wrong shoe size. Here is the 10-minute method we use in our fitting studio, with a printable width chart.',
      image: '../assets/shoe-size.jpg',
      imageAlt: 'Measuring a foot against a sizing chart',
      author: { name: 'Rhea Kapoor', role: 'Head of Fitting', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop' },
      tags: ['Sizing', 'Guides', 'Fitting'],
      featured: false,
      content: [
        {
          heading: 'Why the size on the box lies',
          body: [
            'A size 9 at one brand is a 8.5 at another, and it changes again between running, formal and kids’ lines. Lasts differ, materials stretch, and your feet genuinely change shape through the day and across the years.',
            'The only reliable fix is to measure the foot itself. It takes ten minutes, once a season, and it ends the guessing for good.'
          ]
        },
        {
          heading: 'The 10-minute measuring method',
          body: [
            'Do this in the evening, when feet are at their largest. Stand barefoot on a piece of paper against a wall, mark the longest toe and the widest points of both feet, and measure in millimetres.',
            'Compare both feet and size to the longer one — feet are rarely identical. Add a thumb-width of growing room for kids and roughly a thumb’s width of length for running shoes.',
            'Our fitting studio does all of this on a 3D scanner in under a minute, but the paper method gets you 90% of the way there.'
          ]
        },
        {
          heading: 'Width matters more than length',
          body: [
            'Two people with the same length can need completely different widths. If your pinky toe is constantly rubbed, or your foot spills over the sole, it is a width problem — not a length problem.',
            'Stride stocks narrow, standard, wide and extra-wide lasts in most silhouettes. When you shop, ask for the width option rather than simply going half a size up.'
          ]
        },
        {
          heading: 'The three-times-a-day rule',
          body: [
            'Feet swell through the day, so a shoe that fits at 9am will fight you at 6pm. For all-day wear, fit shoes in the late afternoon. For running, fit in the evening and leave a thumb-width at the toe.',
            'And when in doubt, book a 3D fitting — it is free with any purchase and you will never go back to guessing.'
          ]
        }
      ]
    },
    {
      id: 'running-guide',
      title: 'How to pick your first running shoe without overthinking it',
      category: 'Buying Guides',
      date: '2026-07-28',
      readTime: '8 min read',
      excerpt:
        'Drop, cushioning, stability, pronation — the jargon is endless. Here is the simple framework our run team actually uses with first-timers.',
      image: 'https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=900&auto=format&fit=crop',
      imageAlt: 'A runner tying a fresh pair of running shoes',
      author: { name: 'Dev Anand', role: 'Run Club Lead', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop' },
      tags: ['Running', 'Buying Guides', 'Fit'],
      featured: true,
      content: [
        {
          heading: 'Start with how you run, not which brand',
          body: [
            'Before any shoe can help you, it has to match your gait. If you overpronate (ankles roll in), a stability shoe protects you; if your gait is neutral, a neutral shoe is lighter and livelier.',
            'You do not need a lab to find out. Ask a store that watches you walk — our fit team reads your gait in under a minute on the shop floor.'
          ]
        },
        {
          heading: 'The three numbers that matter',
          body: [
            'Cushioning: more foam for long, slow miles; firmer for tempo and track work. Drop: the heel-to-toe offset — 8–12mm suits most beginners, lower drops reward a mid-foot strike. Weight: a lighter shoe feels faster but gives up some protection.',
            'For a first shoe, do not chase the lightest or the trendiest. Chase the one that disappears on your foot at kilometre three.'
          ]
        },
        {
          heading: 'Fit it like a race, in the evening',
          body: [
            'Running feet swell. Try shoes on in the evening, wear the socks you will run in, and keep a thumb-width of room beyond your longest toe. If your toes touch the front on a downhill slope, size up.',
            'Replace running shoes every 500–800 km, or when the midsole feels flat — long before they look worn out.'
          ]
        },
        {
          heading: 'Where our run club fits in',
          body: [
            'Every Sunday morning we lead a free 5K from our Chennai store. First-timers get a gait check and a recommended pair before the start line — and the shoes are 30-day guaranteed, so the risk is on us, not you.'
          ]
        }
      ]
    },
    {
      id: 'care-guide',
      title: 'How to make your sneakers last three times longer',
      category: 'Care & Repair',
      date: '2026-07-15',
      readTime: '5 min read',
      excerpt:
        'One quick routine and one rule about rotating shoes could add years to your rotation. This is the care routine our repair bench swears by.',
      image: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=900&auto=format&fit=crop',
      imageAlt: 'White sneakers propped beside cleaning supplies',
      author: { name: 'Farhan Sheikh', role: 'Repair Bench Lead', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop' },
      tags: ['Care', 'Repair', 'Sustainability'],
      featured: false,
      content: [
        {
          heading: 'Rotate, rotate, rotate',
          body: [
            'Wearing the same pair daily means sweat never fully dries, the midsole never recovers, and the smell becomes a lifestyle. Two pairs used alternately last about three times as long as one pair used every day.',
            'Give a shoe 24 hours off between wears — it genuinely extends foam life.'
          ]
        },
        {
          heading: 'The five-minute clean',
          body: [
            'Brush off loose dirt, wipe with a damp cloth, and use a mild detergent on stains. Air-dry away from direct sun — heat is what crumbles glue and yellows midsoles. Never machine-wash premium shoes unless the tag says so.'
          ]
        },
        {
          heading: 'Fix small damage while it is cheap',
          body: [
            'A loose sole or a scuffed toe costs a couple of hundred rupees to repair now, and a full resole later. Catch sole-edge separation early and a pair that looks dead can run another year.',
            'When you need it, our care bench offers pickup-and-drop repairs with a photo quote before any work begins.'
          ]
        },
        {
          heading: 'Store them like you love them',
          body: [
            'Use shoe trees for leather, stuff paper in canvas, and keep everything in a cool, dry place. Folded into a bag, a good shoe just slowly loses its shape for nothing.'
          ]
        }
      ]
    },
    {
      id: 'kids-guide',
      title: 'School shoes that survive a full year (yes, really)',
      category: 'Buying Guides',
      date: '2026-06-30',
      readTime: '5 min read',
      excerpt:
        'Velcro vs laces, growing room, and the two hard-wearing brands our school parents come back for. A practical guide to the annual school-shoe decision.',
      image: '../assets/school-shoes.jpg',
      imageAlt: 'Bright kids shoes lined up on a mat',
      author: { name: 'Priya Menon', role: 'Kids Buying Lead', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop' },
      tags: ['Kids', 'Buying Guides', 'School'],
      featured: false,
      content: [
        {
          heading: 'Buy for the year ahead, not the month ahead',
          body: [
            'Kids’ feet grow roughly half a size every three months. A shoe with a thumb-width of growing room at purchase will still fit at the end of the school year — barely.',
            'Measure every season: growing feet change width too, not just length.'
          ]
        },
        {
          heading: 'Velcro up to age seven, lace after',
          body: [
            'Velcro survives recess, PE and the five-minute school-morning sprint. From around seven, lace-up trains the fine-motor skills and holds the heel better as gait stabilises.',
            'We stock school lines in both closures from the same lasts, so the switch is seamless.'
          ]
        },
        {
          heading: 'What actually wears out',
          body: [
            'The toe bumper and the heel counter go first, not the sole. Look for a reinforced toe and a firm heel cup — they are the difference between a one-year shoe and a six-month shoe.',
            'And check the insole: a removable, washable one doubles as a hygiene fix in the monsoon.'
          ]
        },
        {
          heading: 'The 14-day guarantee applies to kids too',
          body: [
            'If the pair rubs, pinches or simply gets rejected at the door, swap it within 14 days. Our kids’ fitting check is free — and honestly, the kids are better testers than we are.'
          ]
        }
      ]
    },
    {
      id: 'wedding-guide',
      title: 'Outfitting a wedding party in one order: what we learned',
      category: 'Buying Guides',
      date: '2026-06-12',
      readTime: '7 min read',
      excerpt:
        'Same-day quotes, 18 pairs, every size in the box, and zero last-minute panics. How our bulk desk handles the biggest day of the year.',
      image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=900&auto=format&fit=crop',
      imageAlt: 'Formal shoes arranged for a wedding party',
      author: { name: 'Sana Nair', role: 'Bulk Orders Lead', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop' },
      tags: ['Weddings', 'Bulk', 'Corporate'],
      featured: false,
      content: [
        {
          heading: 'Start with a single size list',
          body: [
            'The whole job is 80% done the day you send us a spreadsheet with names and sizes. We turn it into a line-item quote with prices, GST and a delivery date — usually within 24 hours.',
            'Collect sizes early and in a standard format; it saves a week of back-and-forth later.'
          ]
        },
        {
          heading: 'Sample first, then commit',
          body: [
            'Nobody signs off a wedding party on photos. A sample pack of up to six pairs, delivered to the bride or groom, settles the feel, the finish and the fit before the big order.'
          ]
        },
        {
          heading: 'Stagger delivery to the calendar',
          body: [
            'Reception shoes last, and the rehearsal day is when you actually need everyone’s pair. We schedule batches to arrive in the right order — not all on one terrifying truck.'
          ]
        },
        {
          heading: 'The 30-day exchange window',
          body: [
            'After the party, feet come down and sizes get returned. Every bulk order carries a 30-day exchange window so the whole lot settles calmly, after the music stops.'
          ]
        }
      ]
    },
   {
      id: 'wide-feet',
      title: 'Shopping for wide feet: the guide brands do not give you',
      category: 'Guides',
      date: '2026-04-18',
      readTime: '5 min read',
      excerpt:
        'If your pinky toe is constantly rubbed, the answer is width — not size. How to find wide lasts, and why "half a size up" is the wrong fix.',
      image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=900&auto=format&fit=crop',
      imageAlt: 'A pair of wide-fit shoes on a clean background',
      author: { name: 'Dev Anand', role: 'Run Club Lead', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop' },
      tags: ['Sizing', 'Wide fit', 'Guides'],
      featured: false,
      content: [
        {
          heading: 'The half-size myth',
          body: [
            'When a shoe feels tight across the middle, the instinct is to go up half a size. That adds length you do not need, lets the heel slip, and the forefoot is still squeezed — because the width did not change.',
            'The fix is a wider last: the same length, more room across the ball of the foot.'
          ]
        },
        {
          heading: 'How to spot a wide last',
          body: [
            'Look for explicit width labelling (D for wide, EE/E4 for extra wide) rather than a vague “roomy” claim. Shop the brands that publish width options, and ask about the last — not the size.',
            'At Stride, wide and extra-wide are stocked across most silhouettes, and the fitting studio measures width at 14 points, not just the big toe.'
          ]
        },
        {
          heading: 'Materials forgive — or betray',
          body: [
            'Unlined suede and knit uppers stretch to your foot and are forgiving for wide feet. Stiff patent and synthetic leathers are not. When you are between lasts, choose the material that gives.'
          ]
        }
      ]
    }
  ];

  return {
    PRODUCTS: PRODUCTS,
    POSTS: POSTS,
    getProduct: function (id) {
      return PRODUCTS.find(function (p) { return p.id === id; }) || null;
    },
    getPost: function (id) {
      return POSTS.find(function (p) { return p.id === id; }) || null;
    },
    categories: function () {
      var seen = [];
      POSTS.forEach(function (p) {
        if (seen.indexOf(p.category) === -1) seen.push(p.category);
      });
      return seen;
    },
    productCategories: function () {
      var seen = [];
      PRODUCTS.forEach(function (p) {
        if (seen.indexOf(p.category) === -1) seen.push(p.category);
      });
      return seen;
    }
  };
})();

window.STRIDE_DATA = STRIDE_DATA;
