import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import dns from 'dns';
import User from './models/User.js';
import Product from './models/Product.js';

dns.setServers(['8.8.8.8', '8.8.4.4']); // use Google DNS for this app
dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

const img = (t) => `https://placehold.co/600x750/E4EAF0/0E1A24?text=${encodeURIComponent(t)}`;
const make = (name, category, price, stock, description, sizes) => ({
  name, category, price, stock, description, image: img(name), ...(sizes && { sizes }),
});

await Product.deleteMany();
await Product.insertMany([
  make('Core Heavy Tee', 'T-shirts', 29, 40, 'Heavyweight cotton, boxy fit, pre-washed.'),
  make('Signal Print Tee', 'T-shirts', 34, 25, 'Soft jersey with a chest print.'),
  make('Utility Cargo Pants', 'Pants', 79, 18, 'Relaxed cargo with six pockets.'),
  make('Slate Straight Pants', 'Pants', 69, 22, 'Clean straight leg in stretch twill.'),
  make('Orbit Hoodie', 'Hoodies', 89, 30, 'Fleece-lined hoodie with a double-layer hood.'),
  make('Nimbus Zip Hoodie', 'Hoodies', 95, 14, 'Full-zip hoodie, brushed interior.'),
  make('Vector Tracksuit', 'Tracksuits', 139, 12, 'Matching jacket and joggers in tech fabric.'),
  make('Pulse Shorts', 'Shorts', 39, 35, 'Lightweight shorts with zip pockets.'),
  make('Chrono One Watch', 'Watches', 149, 10, 'Steel case, minimal dial, 5 ATM water resistance.', ['One size']),
  make('Apex Runner', 'Shoes', 119, 16, 'Cushioned everyday sneaker.', ['40', '41', '42', '43', '44']),
]);

if (!(await User.findOne({ email: 'admin@mosern.com' }))) {
  await User.create({ name: 'Admin', email: 'admin@mosern.com', password: await bcrypt.hash('admin123', 10), role: 'admin' });
}
console.log('Seeded products. Admin login: admin@mosern.com / admin123');
await mongoose.disconnect();
