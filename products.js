/* products.js
   Array y'ibicuruzwa mu Kinyarwanda.
   Shyira aya mafoto (placeholder-product-*.jpg) muri repository yawe kuri GitHub Pages.
   Iyi file nta backend ikenera; main.js izayisoma nka window.PRODUCTS.
*/

const PRODUCTS = [
  {
    id: "p-001",
    name: "Air Jordan",
    price: 145.000,
    description: "Iyi air Jordan ni 🔥 kuma style yose ⛸️.",
    category: "Ibirato",
    stock: 24,
    image: "placeholder-product-1.jpg"
  },
  {
    id: "p-002",
    name: "Air fox qualité 1👟",
    price: 180.000,
    description: "Iyi air fox irarenze😱.",
    category: "Ibirato",
    stock: 48,
    image: "placeholder-product-2.jpg"
  },
  {
    id: "p-003",
    name: "Triko",
    price: 10.000,
    description: "trickot kurigiciro gito.",
    category: "Impuzu",
    stock: 8,
    image: "placeholder-product-3.jpg"
  },
  {
    id: "p-004",
    name: "Umufuka w'ububiko",
    price: 9000,
    description: "Umufuka wubatswe neza, ushobora gutwara ibintu byinshi kandi ukomeye.",
    category: "Amasakoshi",
    stock: 31,
    image: "placeholder-product-4.jpg"
  },
  {
    id: "p-005",
    name: "Amavuta y'uruhu",
    price: 6500,
    description: "Amavuta atandukanye yo kwisiga, yorohereza uruhu kandi agatanga umucyo karemano.",
    category: "Ubwiza",
    stock: 15,
    image: "placeholder-product-5.jpg"
  },
  {
    id: "p-006",
    name: "Isahani y'ibanze",
    price: 3500,
    description: "Isahani yoroheje yo mu gikoni, ikozwe mu bikoresho biramba.",
    category: "Ibikoresho byo mu rugo",
    stock: 60,
    image: "placeholder-product-6.jpg"
  }
];

// Export for environments that support modules (optional, safe for browser globals)
if (typeof window !== 'undefined') {
  window.PRODUCTS = PRODUCTS;
}
