/* products.js
   Array y'ibicuruzwa mu Kinyarwanda.
   Shyira aya mafoto (placeholder-product-*.jpg) muri repository yawe kuri GitHub Pages.
   Iyi file nta backend ikenera; main.js izayisoma nka window.PRODUCTS.
*/

const PRODUCTS = [
  {
    id: "p-001",
    name: "Igitenge cyiza",
    price: 12000,
    description: "Igitenge cyiza cyo gukoramo amakanzu n'imyambaro; ibara rikomeye kandi riramba.",
    category: "Imyenda",
    stock: 24,
    image: "placeholder-product-1.jpg"
  },
  {
    id: "p-002",
    name: "Agatundu ka Coffee",
    price: 4500,
    description: "Ibirungo bya kawa by'umwimerere; gikoze mu buryo bwita ku bidukikije.",
    category: "Ibinyobwa",
    stock: 48,
    image: "placeholder-product-2.jpg"
  },
  {
    id: "p-003",
    name: "Telefoni y'ibanze",
    price: 45000,
    description: "Telefoni y'ibanze ifite batterie ihamye, ikwiranye n'abashaka igikoresho cyoroshye gukoresha.",
    category: "Ibikoresho",
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
