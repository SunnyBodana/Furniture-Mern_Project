const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const sampleProducts = [
  // Chairs
  {
    title: "Modern Ergonomic Office Chair",
    description: "Comfortable office chair with adjustable height, lumbar support, and 360-degree swivel. Perfect for long work sessions.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800",
    category: "chair",
    stock: 25,
    ratings: {
      average: 4.5,
      count: 32
    },
    reviews: []
  },
  {
    title: "Classic Wooden Dining Chair",
    description: "Elegant wooden dining chair with comfortable cushion. Perfect for dining rooms and kitchen tables.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1549497538-303791108f95?w=800",
    category: "chair",
    stock: 40,
    ratings: {
      average: 4.3,
      count: 18
    },
    reviews: []
  },
  {
    title: "Comfortable Recliner Chair",
    description: "Plush recliner chair with footrest. Ideal for living rooms and relaxation. Available in multiple colors.",
    price: 449.99,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
    category: "chair",
    stock: 15,
    ratings: {
      average: 4.7,
      count: 45
    },
    reviews: []
  },
  {
    title: "Minimalist Accent Chair",
    description: "Sleek and modern accent chair with metal legs. Adds style to any room.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=800",
    category: "chair",
    stock: 30,
    ratings: {
      average: 4.2,
      count: 12
    },
    reviews: []
  },
  {
    title: "Executive Leather Chair",
    description: "Premium leather executive chair with high back and armrests. Perfect for home offices.",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800",
    category: "chair",
    stock: 10,
    ratings: {
      average: 4.8,
      count: 28
    },
    reviews: []
  },
  
  // Sofas
  {
    title: "3-Seater Modern Sofa",
    description: "Comfortable 3-seater sofa with soft cushions and modern design. Perfect for living rooms.",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
    category: "sofa",
    stock: 12,
    ratings: {
      average: 4.6,
      count: 38
    },
    reviews: []
  },
  {
    title: "L-Shaped Sectional Sofa",
    description: "Spacious L-shaped sectional sofa with chaise lounge. Great for large living spaces.",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
    category: "sofa",
    stock: 8,
    ratings: {
      average: 4.7,
      count: 52
    },
    reviews: []
  },
  {
    title: "Luxury Velvet Sofa",
    description: "Elegant velvet sofa with tufted back and gold-tone legs. Adds luxury to any space.",
    price: 1099.99,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
    category: "sofa",
    stock: 6,
    ratings: {
      average: 4.9,
      count: 24
    },
    reviews: []
  },
  {
    title: "Compact 2-Seater Sofa",
    description: "Space-saving 2-seater sofa perfect for apartments and small living rooms.",
    price: 649.99,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
    category: "sofa",
    stock: 20,
    ratings: {
      average: 4.4,
      count: 19
    },
    reviews: []
  },
  {
    title: "Convertible Sofa Bed",
    description: "Multi-functional sofa that converts to a bed. Perfect for guest rooms and small spaces.",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
    category: "sofa",
    stock: 14,
    ratings: {
      average: 4.5,
      count: 31
    },
    reviews: []
  },
  
  // Tables
  {
    title: "Modern Coffee Table",
    description: "Sleek coffee table with glass top and metal legs. Perfect centerpiece for living rooms.",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800",
    category: "table",
    stock: 18,
    ratings: {
      average: 4.5,
      count: 27
    },
    reviews: []
  },
  {
    title: "Solid Wood Dining Table",
    description: "Beautiful solid wood dining table that seats 6. Handcrafted and durable.",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800",
    category: "table",
    stock: 10,
    ratings: {
      average: 4.7,
      count: 41
    },
    reviews: []
  },
  {
    title: "Round Side Table",
    description: "Elegant round side table with storage shelf. Perfect for lamps and decor.",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800",
    category: "table",
    stock: 35,
    ratings: {
      average: 4.3,
      count: 15
    },
    reviews: []
  },
  {
    title: "Extendable Dining Table",
    description: "Versatile extendable dining table. Seats 4-8 people. Perfect for entertaining.",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800",
    category: "table",
    stock: 7,
    ratings: {
      average: 4.8,
      count: 33
    },
    reviews: []
  },
  {
    title: "Minimalist Console Table",
    description: "Slim console table perfect for entryways and hallways. Modern and functional.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800",
    category: "table",
    stock: 22,
    ratings: {
      average: 4.4,
      count: 20
    },
    reviews: []
  }
];

async function seedProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.DATABASE_URL || process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products to avoid duplicates on re-seed
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert sample products
    const inserted = await Product.insertMany(sampleProducts);
    console.log(`✅ Successfully inserted ${inserted.length} products`);

    // Show summary
    const chairCount = await Product.countDocuments({ category: 'chair' });
    const sofaCount = await Product.countDocuments({ category: 'sofa' });
    const tableCount = await Product.countDocuments({ category: 'table' });

    console.log('\n📊 Product Summary:');
    console.log(`   Chairs: ${chairCount}`);
    console.log(`   Sofas: ${sofaCount}`);
    console.log(`   Tables: ${tableCount}`);
    console.log(`   Total: ${chairCount + sofaCount + tableCount}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();
