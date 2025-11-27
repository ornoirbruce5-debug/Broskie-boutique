// seed.js — ibicuruzwa bishya byinjizwa ukoresheje ProductsAPI
// Iyi file igomba kuza munsi ya products.js muri index.html

// Kongera ikabutura
ProductsAPI.add({
  name: "Ikabutura",
  price: 20000,
  description: "Ikabutura nziza yo kwambara mu biruhuko.",
  category: ProductsAPI.CATEGORIES.IMPUZU,
  stock: 12,
  image: "placeholder-product-7.jpg"
});

// Kongera sandale
ProductsAPI.add({
  name: "Sandale Soft",
  price: 18000,
  description: "Sandale yorohereye 👡.",
  category: ProductsAPI.CATEGORIES.IBIRATO,
  stock: 20,
  image: "sandale.jpg"
});

// Kongera T-shirt pastel
ProductsAPI.add({
  name: "T-shirt Pastel",
  price: 12000,
  description: "T-shirt pastel nziza yo mu biruhuko.",
  category: ProductsAPI.CATEGORIES.IMPUZU,
  stock: 35,
  image: "tshirt.jpg"
});
