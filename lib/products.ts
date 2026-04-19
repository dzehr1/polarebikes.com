export type ProductCategory = "mountain" | "city" | "cargo" | "folding";

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  images: string[];
  colors: string[];
  specs: {
    motorWatts: number;
    topSpeedMph: number;
    rangeMiles: number;
    batteryWh: number;
    weightLbs: number;
    chargingHours: number;
    brakes: string;
    suspension: string;
    tireSize: string;
    gears: string;
  };
  description: string;
  features: string[];
  inStock: boolean;
  isFeatured: boolean;
  isNew: boolean;
  rating: number;
  reviewCount: number;
};

const img = (seed: string, w = 900, h = 700) =>
  `https://placehold.co/${w}x${h}/0f172a/38bdf8/png?text=${encodeURIComponent(seed)}`;

export const products: Product[] = [
  {
    id: "pb-m-001",
    slug: "aurora-peak-pro",
    name: "Aurora Peak Pro",
    tagline: "Carbon trail dominance with dual-battery endurance.",
    category: "mountain",
    price: 4199,
    images: [img("Aurora+1"), img("Aurora+2", 900, 700), img("Aurora+3", 900, 700)],
    colors: ["Ice White", "Glacier Blue", "Midnight Navy"],
    specs: {
      motorWatts: 750,
      topSpeedMph: 28,
      rangeMiles: 65,
      batteryWh: 900,
      weightLbs: 52,
      chargingHours: 4.5,
      brakes: "Hydraulic 4-piston",
      suspension: "160mm air fork / 150mm rear",
      tireSize: '29" x 2.6"',
      gears: "12-speed SRAM",
    },
    description:
      "The Aurora Peak Pro pairs a stiff carbon chassis with cold-weather optimized battery management. Built for steep climbs, loose shale, and long alpine days where range confidence matters as much as traction.",
    features: [
      "Dual-battery ready architecture",
      "Cold-weather BMS tuning",
      "Dropper post included",
      "Tubeless-ready wheelset",
    ],
    inStock: true,
    isFeatured: true,
    isNew: false,
    rating: 4.9,
    reviewCount: 128,
  },
  {
    id: "pb-m-002",
    slug: "glacier-ridge",
    name: "Glacier Ridge",
    tagline: "All-mountain balance with trail-tuned torque.",
    category: "mountain",
    price: 2799,
    originalPrice: 3299,
    images: [img("Glacier+Ridge"), img("Glacier+2"), img("Glacier+3")],
    colors: ["Storm Gray", "Arctic Teal"],
    specs: {
      motorWatts: 650,
      topSpeedMph: 28,
      rangeMiles: 52,
      batteryWh: 720,
      weightLbs: 54,
      chargingHours: 4,
      brakes: "Hydraulic 2-piston",
      suspension: "150mm fork / 140mm rear",
      tireSize: '27.5" x 2.8"',
      gears: "11-speed Shimano",
    },
    description:
      "Glacier Ridge is the daily driver for riders who want plush compliance without giving up pedal efficiency. Sale pricing makes this the smartest entry into premium trail e-MTB.",
    features: [
      "Trail-tuned mid-drive",
      "RockShox suspension package",
      "Integrated light mount",
      "Aggressive but stable geometry",
    ],
    inStock: true,
    isFeatured: true,
    isNew: false,
    rating: 4.7,
    reviewCount: 84,
  },
  {
    id: "pb-m-003",
    slug: "tundra-trail-x",
    name: "Tundra Trail X",
    tagline: "Hardtail simplicity. Maximum reliability.",
    category: "mountain",
    price: 2799,
    images: [img("Tundra+X"), img("Tundra+2")],
    colors: ["Frost Silver", "Deep Navy"],
    specs: {
      motorWatts: 600,
      topSpeedMph: 28,
      rangeMiles: 48,
      batteryWh: 630,
      weightLbs: 49,
      chargingHours: 3.5,
      brakes: "Hydraulic 2-piston",
      suspension: "120mm air fork",
      tireSize: '29" x 2.4"',
      gears: "10-speed Deore",
    },
    description:
      "A hardtail built for year-round abuse: fewer pivots, easier maintenance, and a motor tuned for technical climbing. Ideal for mixed terrain and winter grit.",
    features: [
      "Sealed bearings throughout",
      "Rack and fender mounts",
      "Confidence-inspiring 29er rollover",
    ],
    inStock: true,
    isFeatured: false,
    isNew: false,
    rating: 4.5,
    reviewCount: 56,
  },
  {
    id: "pb-m-004",
    slug: "summit-volt",
    name: "Summit Volt",
    tagline: "Race-bred kinematics with flagship power.",
    category: "mountain",
    price: 4499,
    images: [img("Summit+Volt"), img("Summit+2"), img("Summit+3")],
    colors: ["Polar White", "Electric Cyan"],
    specs: {
      motorWatts: 850,
      topSpeedMph: 28,
      rangeMiles: 58,
      batteryWh: 900,
      weightLbs: 51,
      chargingHours: 4.5,
      brakes: "Magura MT7",
      suspension: "170mm fork / 165mm rear",
      tireSize: '29" x 2.5"',
      gears: "12-speed electronic",
    },
    description:
      "Summit Volt is our flagship enduro platform: long travel, high-output motor, and chassis stiffness tuned for aggressive descending. New for this season with updated motor firmware.",
    features: [
      "Electronic shifting",
      "Tool-free geometry chip",
      "Carbon swingarm option ready",
      "Race-ready tire compound",
    ],
    inStock: true,
    isFeatured: true,
    isNew: true,
    rating: 5,
    reviewCount: 41,
  },
  {
    id: "pb-m-005",
    slug: "frostline-29",
    name: "Frostline 29",
    tagline: "Trail-capable without the flagship price.",
    category: "mountain",
    price: 2099,
    images: [img("Frostline"), img("Frostline+2")],
    colors: ["Glacier Blue", "Graphite"],
    specs: {
      motorWatts: 550,
      topSpeedMph: 28,
      rangeMiles: 42,
      batteryWh: 540,
      weightLbs: 53,
      chargingHours: 3.5,
      brakes: "Hydraulic 2-piston",
      suspension: "140mm fork / 130mm rear",
      tireSize: '29" x 2.35"',
      gears: "9-speed",
    },
    description:
      "Frostline 29 delivers POLAREBIKES ride quality in an approachable package. Perfect for riders upgrading from analog bikes who want predictable handling first.",
    features: [
      "Stable 29er platform",
      "User-friendly display",
      "Kickstand mount",
    ],
    inStock: true,
    isFeatured: false,
    isNew: false,
    rating: 4.4,
    reviewCount: 33,
  },
  {
    id: "pb-c-001",
    slug: "metro-glide",
    name: "Metro Glide",
    tagline: "Sleek commuter speed with integrated lighting.",
    category: "city",
    price: 2399,
    images: [img("Metro+Glide"), img("Metro+2")],
    colors: ["Pearl Ice", "Matte Navy"],
    specs: {
      motorWatts: 500,
      topSpeedMph: 28,
      rangeMiles: 55,
      batteryWh: 600,
      weightLbs: 47,
      chargingHours: 4,
      brakes: "Hydraulic disc",
      suspension: "Carbon fork with 40mm travel",
      tireSize: '700c x 42mm',
      gears: "11-speed",
    },
    description:
      "Metro Glide is built for fast lanes and slow coffee lines: upright ergonomics, full-coverage fenders, and a lighting system designed for dawn and dusk commutes.",
    features: [
      "Integrated front/rear lights",
      "Gates belt drive compatible",
      "Pannier-ready rack",
      "Anti-theft GPS ready",
    ],
    inStock: true,
    isFeatured: true,
    isNew: false,
    rating: 4.8,
    reviewCount: 201,
  },
  {
    id: "pb-c-002",
    slug: "urban-ice",
    name: "Urban Ice",
    tagline: "Lightweight city frame. Big motor feel.",
    category: "city",
    price: 1799,
    images: [img("Urban+Ice"), img("Urban+2")],
    colors: ["Silver Frost", "Onyx"],
    specs: {
      motorWatts: 450,
      topSpeedMph: 25,
      rangeMiles: 45,
      batteryWh: 504,
      weightLbs: 42,
      chargingHours: 3.5,
      brakes: "Hydraulic disc",
      suspension: "Rigid carbon fork",
      tireSize: '700c x 38mm',
      gears: "10-speed",
    },
    description:
      "New-season Urban Ice trims grams without trimming capability. A favorite for apartment stair carries and quick-lock city parking.",
    features: [
      "Sub-43 lb build",
      "Internal cable routing",
      "Reflective sidewall tires",
    ],
    inStock: true,
    isFeatured: true,
    isNew: true,
    rating: 4.6,
    reviewCount: 67,
  },
  {
    id: "pb-c-003",
    slug: "commuter-nova",
    name: "Commuter Nova",
    tagline: "Essential city e-bike. Unbeatable value.",
    category: "city",
    price: 1199,
    originalPrice: 1499,
    images: [img("Commuter+Nova"), img("Nova+2")],
    colors: ["White", "Slate Blue"],
    specs: {
      motorWatts: 350,
      topSpeedMph: 20,
      rangeMiles: 35,
      batteryWh: 400,
      weightLbs: 46,
      chargingHours: 3,
      brakes: "Mechanical disc",
      suspension: "Steel fork",
      tireSize: '700c x 35mm',
      gears: "8-speed",
    },
    description:
      "Commuter Nova proves that premium support and warranty can come with an entry price. Perfect for flat cities and first-time e-bike owners.",
    features: [
      "Step-through frame option",
      "Included rear rack",
      "UL-compliant battery pack",
    ],
    inStock: true,
    isFeatured: false,
    isNew: false,
    rating: 4.3,
    reviewCount: 312,
  },
  {
    id: "pb-c-004",
    slug: "boulevard-pulse",
    name: "Boulevard Pulse",
    tagline: "Fast-rolling tires meet upright comfort.",
    category: "city",
    price: 2649,
    images: [img("Boulevard"), img("Boulevard+2")],
    colors: ["Glacier", "Charcoal"],
    specs: {
      motorWatts: 550,
      topSpeedMph: 28,
      rangeMiles: 50,
      batteryWh: 630,
      weightLbs: 45,
      chargingHours: 3.5,
      brakes: "Hydraulic disc",
      suspension: "Suspension seatpost",
      tireSize: '700c x 40mm',
      gears: "11-speed",
    },
    description:
      "Boulevard Pulse balances speed and comfort for longer urban loops. The suspension seatpost takes the sting out of rough pavement without the weight of full suspension.",
    features: [
      "Suspension seatpost included",
      "Hydraulic brakes",
      "Premium ergonomic grips",
    ],
    inStock: true,
    isFeatured: false,
    isNew: false,
    rating: 4.7,
    reviewCount: 91,
  },
  {
    id: "pb-ca-001",
    slug: "arctic-hauler",
    name: "Arctic Hauler",
    tagline: "Full-load cargo with dual-battery range.",
    category: "cargo",
    price: 4999,
    images: [img("Arctic+Hauler"), img("Hauler+2"), img("Hauler+3")],
    colors: ["Navy", "Arctic White"],
    specs: {
      motorWatts: 750,
      topSpeedMph: 28,
      rangeMiles: 60,
      batteryWh: 960,
      weightLbs: 88,
      chargingHours: 5,
      brakes: "Hydraulic 4-piston",
      suspension: "80mm front / elastomer rear",
      tireSize: '20" x 2.4" (rear) / 26" x 2.2" (front)',
      gears: "Enviolo stepless",
    },
    description:
      "Arctic Hauler replaces car trips with weather-ready capability. Extended wheelbase stability, low center of gravity, and motor torque tuned for full racks and hills.",
    features: [
      "Child seat compatible",
      "Dual battery slots",
      "Integrated cargo rails",
      "Full-wrap fenders",
    ],
    inStock: true,
    isFeatured: true,
    isNew: false,
    rating: 4.9,
    reviewCount: 74,
  },
  {
    id: "pb-ca-002",
    slug: "family-cargo-s",
    name: "Family Cargo S",
    tagline: "Compact footprint. Maximum utility.",
    category: "cargo",
    price: 3199,
    images: [img("Family+Cargo"), img("Cargo+2")],
    colors: ["Ice Gray", "Deep Teal"],
    specs: {
      motorWatts: 650,
      topSpeedMph: 25,
      rangeMiles: 48,
      batteryWh: 720,
      weightLbs: 76,
      chargingHours: 4.5,
      brakes: "Hydraulic disc",
      suspension: "50mm travel fork",
      tireSize: '20" x 2.15"',
      gears: "10-speed",
    },
    description:
      "New Family Cargo S shrinks the longtail format for tighter city storage while keeping a confident ride under load. Ideal for daycare runs and grocery hauls.",
    features: [
      "Adjustable deck rails",
      "Kickstand rated for loaded park",
      "Low stepover height",
    ],
    inStock: true,
    isFeatured: false,
    isNew: true,
    rating: 4.6,
    reviewCount: 29,
  },
  {
    id: "pb-ca-003",
    slug: "polar-porter",
    name: "Polar Porter",
    tagline: "Front-loader visibility with stable steering.",
    category: "cargo",
    price: 2499,
    originalPrice: 2899,
    images: [img("Polar+Porter"), img("Porter+2")],
    colors: ["White", "Midnight"],
    specs: {
      motorWatts: 600,
      topSpeedMph: 20,
      rangeMiles: 40,
      batteryWh: 600,
      weightLbs: 92,
      chargingHours: 4,
      brakes: "Hydraulic disc",
      suspension: "Rigid frame / sprung saddle",
      tireSize: '20" x 2.3"',
      gears: "8-speed internal",
    },
    description:
      "Polar Porter’s front bucket keeps cargo in view and weight low. On sale while supplies last—perfect for businesses doing short-loop deliveries.",
    features: [
      "Weather-resistant bucket liner",
      "Dual-leg kickstand",
      "Walk mode for heavy starts",
    ],
    inStock: true,
    isFeatured: false,
    isNew: false,
    rating: 4.5,
    reviewCount: 48,
  },
  {
    id: "pb-f-001",
    slug: "pocket-frost",
    name: "Pocket Frost",
    tagline: "Ultra-compact fold for trains, trunks, and apartments.",
    category: "folding",
    price: 899,
    images: [img("Pocket+Frost"), img("Pocket+2")],
    colors: ["Silver", "Navy"],
    specs: {
      motorWatts: 250,
      topSpeedMph: 20,
      rangeMiles: 28,
      batteryWh: 280,
      weightLbs: 38,
      chargingHours: 2.5,
      brakes: "Mechanical disc",
      suspension: "Rigid",
      tireSize: '16" x 1.95"',
      gears: "7-speed",
    },
    description:
      "Pocket Frost is the gateway fold: small wheels, quick latch folding, and a motor that flattens the last mile after transit.",
    features: [
      "Folds in under 20 seconds",
      "Integrated rear rack",
      "Magnet latch when folded",
    ],
    inStock: true,
    isFeatured: false,
    isNew: false,
    rating: 4.2,
    reviewCount: 177,
  },
  {
    id: "pb-f-002",
    slug: "compact-volt",
    name: "Compact Volt",
    tagline: "20-inch wheels with full-size ride feel.",
    category: "folding",
    price: 1599,
    images: [img("Compact+Volt"), img("Compact+2")],
    colors: ["Glacier Blue", "Black"],
    specs: {
      motorWatts: 400,
      topSpeedMph: 25,
      rangeMiles: 38,
      batteryWh: 450,
      weightLbs: 42,
      chargingHours: 3,
      brakes: "Hydraulic disc",
      suspension: "Front suspension fork",
      tireSize: '20" x 2.1"',
      gears: "9-speed",
    },
    description:
      "Compact Volt adds suspension and hydraulic brakes to the folding formula—perfect for mixed surfaces and confident braking in wet conditions.",
    features: [
      "Suspension fork",
      "Telescoping stem",
      "Quick-release pedals",
    ],
    inStock: true,
    isFeatured: true,
    isNew: false,
    rating: 4.5,
    reviewCount: 63,
  },
  {
    id: "pb-f-003",
    slug: "foldaway-glacier",
    name: "Foldaway Glacier",
    tagline: "Premium fold with belt drive cleanliness.",
    category: "folding",
    price: 1999,
    images: [img("Foldaway"), img("Foldaway+2")],
    colors: ["Ice White", "Graphite"],
    specs: {
      motorWatts: 450,
      topSpeedMph: 25,
      rangeMiles: 42,
      batteryWh: 504,
      weightLbs: 41,
      chargingHours: 3.5,
      brakes: "Hydraulic disc",
      suspension: "Rigid carbon fork",
      tireSize: '20" x 2.0"',
      gears: "Gates belt singlespeed with hub",
    },
    description:
      "New Foldaway Glacier brings belt drive silence to the folding category—less maintenance, cleaner drivetrain, and a premium feel at every unfold.",
    features: [
      "Carbon fork",
      "Gates Carbon Drive",
      "Magnetic folding hinge",
    ],
    inStock: true,
    isFeatured: false,
    isNew: true,
    rating: 4.7,
    reviewCount: 22,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const same = products.filter(
    (p) => p.id !== product.id && p.category === product.category,
  );
  if (same.length >= limit) return same.slice(0, limit);
  const rest = products.filter(
    (p) => p.id !== product.id && !same.some((s) => s.id === p.id),
  );
  return [...same, ...rest].slice(0, limit);
}
