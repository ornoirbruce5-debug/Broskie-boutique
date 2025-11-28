/* products.js
   Array y'ibicuruzwa mu Kinyarwanda.
   Shyira aya mafoto (placeholder-product-*.jpg) muri repository yawe kuri GitHub Pages.
   Iyi file nta backend ikenera; main.js izayisoma nka window.PRODUCTS.
*/

const PRODUCTS = [
  {
    id: "p-001",
    name: "Air fox class",
    price: 145000,
    description: "Iyi air fox ni 🔥 kuma style yose.",
    category: "Ibirato",
    stock: 24,
    image: "placeholder-product-1.jpg"
  },
  {
    id: "p-002",
    name: "shoes 1",
    price: 180000,
    description: "Iyi shoes irarenze 👌🏽.",
    category: "Ibirato",
    stock: 48,
    image: "placeholder-product-2.jpg"
  },
  {
    id: "p-003",
    name: "Triko",
    price: 10000,
    description: "Trickot👕 kurigiciro gito.",
    category: "Impuzu",
    stock: 8,
    image: "placeholder-product-3.jpg"
  },
  {
    id: "p-004",
    name: "maillot zikomeye",
    price: 45000,
    description: "Maillot zikomeye zitandukanye.",
    category: "Impuzu",
    stock: 31,
    image: "placeholder-product-4.jpg"
  },
  {
    id: "p-005",
    name: "impuzu zabakobwa",
    price: 10000,
    description: "Impuzu nziza cane, styles zitandukanye zabakobwa.",
    category: "Impuzu",
    stock: 15,
    image: "placeholder-product-5.jpg"
  },
  {
    id: "p-006",
    name: "Umupira w'imbeho",
    price: 35000,
    description: "Hari imipira y'imbeho myiza.",
    category: "Impuzu",
    stock: 60,
    image: "placeholder-product-6.jpg"
  },
  {
    id: "p-007",
    name: "Pantalon",
    price: 25000,
    description: "Pantalon nziza yo kwambara ku kazi no mu biruhuko.",
    category: "Impuzu",
    stock: 20,
    image: "placeholder-product-7.jpg"
  }
];

// Export for environments that support modules (optional, safe for browser globals)
if (typeof window !== 'undefined') {
  window.PRODUCTS = PRODUCTS;
}
