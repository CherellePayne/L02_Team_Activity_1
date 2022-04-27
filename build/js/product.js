let products = [],
  checkout_items = [];
function convertToJson(t) {
  if (t.ok) return t.json();
  throw new Error("Bad Response");
}
function getLocalStorage(t) {
  return JSON.parse(localStorage.getItem(t));
}
function setLocalStorage(t, e) {
  localStorage.setItem(t, JSON.stringify(e));
}
function getProductsData() {
  fetch("../json/tents.json")
    .then(convertToJson)
    .then((t) => {
      products = t;
    });
}
function addToCart(t) {
  let e = getLocalStorage("so-cart");
  Array.isArray(e) ? (checkout_items = e) : e != null && checkout_items.push(e);
  const o = products.find((n) => n.Id === t.target.dataset.id);
  checkout_items.push(o), setLocalStorage("so-cart", checkout_items);
}
getProductsData(),
  document.getElementById("addToCart").addEventListener("click", addToCart);
