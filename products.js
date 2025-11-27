/* products.js — Scalable, adaptable, and Kinyarwanda-friendly
   - Inzu y'ibicuruzwa (store) ifite CRUD, gushakisha, gusortinga, filtering, validation, na localStorage persistence
   - Ikoresha array yawe as base, ariko ishobora kwiyongera/no guhinduka mu buryo bwizewe
   - main.js ishobora gusoma window.PRODUCTS (array) cyangwa gukoresha window.ProductsAPI (methods)

   Amasezerano y'ikintu (product):
   {
     id: "p-001",          // unique string
     name: "Izina",        // required
     price: 145000,        // positive integer/float
     description: "…",     // optional
     category: "Impuzu",   // required (Impuzu, Ibirato, Ibindi)
     stock: 24,            // integer >= 0
     image: "placeholder-product-1.jpg" // optional string (path/url)
   }
*/

// =========================
// Categories & helpers
// =========================
const CATEGORIES = Object.freeze({
  IMPUZU: "Impuzu",
  IBIRATO: "Ibirato",
  IBINDI: "Ibindi"
});

/* Template (copy-paste) yo kongeramo igicuruzwa gishya */
const PRODUCT_TEMPLATE = Object.freeze({
  id: "",                 // izuzuza automatically
  name: "",
  price: 0,
  description: "",
  category: CATEGORIES.IBINDI,
  stock: 0,
  image: ""
});

// =========================
// Base data (ishyirwaho na Or)
// =========================
const BASE_PRODUCTS = [
  {
    id: "p-001",
    name: "Air fox class",
    price: 145000,
    description: "Iyi air fox ni 🔥 kuma style yose .",
    category: CATEGORIES.IBIRATO,
    stock: 24,
    image: "placeholder-product-1.jpg"
  },
  {
    id: "p-002",
    name: "shoes 1",
    price: 180000,
    description: "Iyi shoes irarenze 👌🏽.",
    category: CATEGORIES.IBIRATO,
    stock: 48,
    image: "placeholder-product-2.jpg"
  },
  {
    id: "p-003",
    name: "Triko",
    price: 10000,
    description: "trickot👕 kurigiciro gito.",
    category: CATEGORIES.IMPUZU,
    stock: 8,
    image: "placeholder-product-3.jpg"
  },
  {
    id: "p-004",
    name: "maillot zikomeye",
    price: 45000,
    description: " maillot zikomeye zitandukanye.",
    category: CATEGORIES.IMPUZU,
    stock: 31,
    image: "placeholder-product-4.jpg"
  },
  {
    id: "p-005",
    name: "impuzu zabakobwa",
    price: 10000,
    description: "Impuzu nziza cane , styles zitandukanye zabakobwa.",
    category: CATEGORIES.IMPUZU,
    stock: 15,
    image: "placeholder-product-5.jpg"
  },
  {
    id: "p-006",
    name: "Umupira wimbeho",
    price: 35000,
    description: "Hari imipira yimbeho myiza.",
    category: CATEGORIES.IMPUZU,
    stock: 60,
    image: "placeholder-product-6.jpg"
  }
];

// =========================
/* Validation & normalization */
// =========================
function normalizeProduct(p) {
  const out = { ...PRODUCT_TEMPLATE, ...p };
  out.id = typeof out.id === "string" ? out.id.trim() : "";
  out.name = String(out.name || "").trim();
  out.description = String(out.description || "").trim();
  out.category = String(out.category || "").trim() || CATEGORIES.IBINDI;
  out.image = String(out.image || "").trim();

  const toNumber = (v, def = 0) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : def;
  };
  out.price = toNumber(out.price, 0);
  out.stock = Math.max(0, Math.floor(toNumber(out.stock, 0)));

  return out;
}

function validateProduct(p, existingIds = new Set()) {
  const errors = [];

  if (!p.name) errors.push("Izina ry'igicuruzwa (name) rirabura.");
  if (!p.category) errors.push("Category irabura.");
  const allowedCats = new Set(Object.values(CATEGORIES));
  if (!allowedCats.has(p.category)) {
    errors.push(`Category '${p.category}' ntizwi. Byemewe: ${[...allowedCats].join(", ")}.`);
  }
  if (!(typeof p.price === "number" && p.price > 0)) {
    errors.push("Igiciro (price) kigomba kuba number iri hejuru ya 0.");
  }
  if (!(typeof p.stock === "number" && p.stock >= 0)) {
    errors.push("Stock igomba kuba integer >= 0.");
  }
  if (!p.id) errors.push("ID irabura.");
  if (existingIds.has(p.id)) errors.push(`ID '${p.id}' irasanzwe (igomba kuba unique).`);

  return { ok: errors.length === 0, errors };
}

function nextId(products, prefix = "p-") {
  let max = 0;
  for (const p of products) {
    const num = parseInt(String(p.id || "").replace(prefix, ""), 10);
    if (Number.isFinite(num)) max = Math.max(max, num);
  }
  const next = String(max + 1).padStart(3, "0");
  return `${prefix}${next}`;
}

// =========================
/* Persistence (localStorage) */
// =========================
const STORAGE_KEY = "products";

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return null;
    return data.map(normalizeProduct);
  } catch {
    return null;
  }
}

function saveToStorage(products) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return true;
  } catch {
    return false;
  }
}

// =========================
/* Store API (scalable) */
// =========================
function createProductsStore(initial = []) {
  // In-memory state (immutable-like ops)
  let state = initial.map(normalizeProduct);

  const ids = () => new Set(state.map(p => p.id));

  function list() {
    return state.slice();
  }

  function add(product) {
    const normalized = normalizeProduct(product);
    if (!normalized.id) normalized.id = nextId(state);

    const { ok, errors } = validateProduct(normalized, ids());
    if (!ok) {
      return { ok, errors, product: null };
    }
    state = [...state, normalized];
    saveToStorage(state);
    return { ok: true, errors: [], product: normalized };
  }

  function remove(id) {
    const before = state.length;
    state = state.filter(p => p.id !== id);
    const removed = before !== state.length;
    if (removed) saveToStorage(state);
    return { ok: removed, errors: removed ? [] : [`ID '${id}' ntibonetse.`] };
  }

  function update(id, patch) {
    const idx = state.findIndex(p => p.id === id);
    if (idx === -1) return { ok: false, errors: [`ID '${id}' ntibonetse.`] };

    const merged = normalizeProduct({ ...state[idx], ...patch, id }); // keep id
    const existing = ids();
    existing.delete(id); // kwirinda false duplicate kuri self
    const { ok, errors } = validateProduct(merged, existing);
    if (!ok) return { ok, errors };

    state = [...state.slice(0, idx), merged, ...state.slice(idx + 1)];
    saveToStorage(state);
    return { ok: true, errors: [], product: merged };
  }

  function getByCategory(category) {
    const cat = String(category || "").trim();
    return state.filter(p => p.category === cat);
  }

  function search(query) {
    const q = String(query || "").trim().toLowerCase();
    if (!q) return list();
    return state.filter(p =>
      (p.name || "").toLowerCase().includes(q) ||
      (p.description || "").toLowerCase().includes(q) ||
      (p.category || "").toLowerCase().includes(q)
    );
  }

  function sort(by = "price", dir = "asc") {
    const validKeys = new Set(["price", "stock", "name", "category", "id"]);
    const key = validKeys.has(by) ? by : "price";
    const sign = dir === "desc" ? -1 : 1;

    return list().sort((a, b) => {
      const va = a[key], vb = b[key];
      if (typeof va === "number" && typeof vb === "number") return (va - vb) * sign;
      return String(va).localeCompare(String(vb)) * sign;
    });
  }

  function resetToBase() {
    state = BASE_PRODUCTS.map(normalizeProduct);
    saveToStorage(state);
    return list();
  }

  function importMany(items = []) {
    if (!Array.isArray(items)) {
      return { ok: false, errors: ["Ibyinjijwe ntabwo ari array."], added: 0 };
    }
    let added = 0;
    const currentIds = ids();
    const newState = list();

    for (const raw of items) {
      const normalized = normalizeProduct(raw);
      if (!normalized.id) normalized.id = nextId(newState);
      const check = validateProduct(normalized, currentIds);
      if (!check.ok) {
        // igisobanuro cy’ikosa kiri muri check.errors
        continue;
      }
      newState.push(normalized);
      currentIds.add(normalized.id);
      added++;
    }
    state = newState;
    saveToStorage(state);
    return { ok: true, errors: [], added };
  }

  return {
    list,
    add,
    remove,
    update,
    getByCategory,
    search,
    sort,
    resetToBase,
    importMany
  };
}

// =========================
/* Bootstrap store: localStorage > base */
// =========================
const BOOT_DATA = loadFromStorage() || BASE_PRODUCTS;
const ProductsStore = createProductsStore(BOOT_DATA);

// =========================
/* Expose to browser (globals) */
// =========================
if (typeof window !== "undefined") {
  // Array-friendly for templates/components zikeneye simple data
  Object.defineProperty(window, "PRODUCTS", {
    get() { return ProductsStore.list(); },
    configurable: false
  });

  // Full API (CRUD, search, sort, etc.)
  window.ProductsAPI = {
    CATEGORIES,
    TEMPLATE: PRODUCT_TEMPLATE,
    list: ProductsStore.list,
    add: ProductsStore.add,
    remove: ProductsStore.remove,
    update: ProductsStore.update,
    getByCategory: ProductsStore.getByCategory,
    search: ProductsStore.search,
    sort: ProductsStore.sort,
    resetToBase: ProductsStore.resetToBase,
    importMany: ProductsStore.importMany
  };
}

/* Usage examples (ushobora kuzisiba mu production):
   // Kongera
   ProductsAPI.add({ name: "Ikabutura", price: 20000, category: ProductsAPI.CATEGORIES.IMPUZU, stock: 12, image: "placeholder-product-7.jpg" });

   // Gusiba
   ProductsAPI.remove("p-003");

   // Guhindura
   ProductsAPI.update("p-002", { price: 175000, stock: 40 });

   // Gushakisha
   const results = ProductsAPI.search("shoes");

   // Gusortinga
   const sortedByPriceDesc = ProductsAPI.sort("price", "desc");

   // Filter by category
   const impuzu = ProductsAPI.getByCategory(ProductsAPI.CATEGORIES.IMPUZU);

   // Reset to base
   ProductsAPI.resetToBase();
*/
