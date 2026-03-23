export const SELECTED_PRODUCT_KEY = "selectedProduct";

const SELECTED_PRODUCT_EVENT = "msk:selected-product-change";
let cachedRawValue = null;
let cachedParsedValue = null;

function parseSelectedProduct(rawValue) {
  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue);
  } catch {
    return null;
  }
}

function emitSelectedProductChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(SELECTED_PRODUCT_EVENT));
  }
}

function readAndCacheSelectedProduct(rawValue) {
  if (rawValue === cachedRawValue) {
    return cachedParsedValue;
  }

  cachedRawValue = rawValue;
  cachedParsedValue = parseSelectedProduct(rawValue);
  return cachedParsedValue;
}

export function readSelectedProduct() {
  if (typeof window === "undefined") {
    return null;
  }

  return readAndCacheSelectedProduct(
    window.localStorage.getItem(SELECTED_PRODUCT_KEY)
  );
}

export function subscribeToSelectedProduct(callback) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleChange = () => callback();

  window.addEventListener("storage", handleChange);
  window.addEventListener(SELECTED_PRODUCT_EVENT, handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(SELECTED_PRODUCT_EVENT, handleChange);
  };
}

export function saveSelectedProduct(product) {
  if (typeof window === "undefined") {
    return;
  }

  const rawValue = JSON.stringify(product);
  window.localStorage.setItem(SELECTED_PRODUCT_KEY, rawValue);
  readAndCacheSelectedProduct(rawValue);
  emitSelectedProductChange();
}

export function clearSelectedProductStorage() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(SELECTED_PRODUCT_KEY);
  readAndCacheSelectedProduct(null);
  emitSelectedProductChange();
}
