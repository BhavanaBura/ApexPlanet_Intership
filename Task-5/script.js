const products = [
  { 
    name: 'Laptop', 
    category: 'Electronics', 
    price: 50000, 
    rating: 4.5
  },
  { 
    name: 'Headphones', 
    category: 'Electronics', 
    price: 2000, 
    rating: 4.0
  },
  { 
    name: 'Book A', 
    category: 'Books', 
    price: 300, 
    rating: 4.8
  },
  { 
    name: 'Book B', 
    category: 'Books', 
    price: 400, 
    rating: 4.2
  },
];

const categoryFilter = document.getElementById('categoryFilter');
const sortOption = document.getElementById('sortOption');
const productList = document.getElementById('productList');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const resetCartBtn = document.getElementById('resetCartBtn');

let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartUI();

function renderProducts() {
  let filteredProducts = products.filter(p => categoryFilter.value === 'All' || p.category === categoryFilter.value);
  filteredProducts.sort((a, b) => sortOption.value === 'price' ? a.price - b.price : b.rating - a.rating);

  productList.innerHTML = '';
  filteredProducts.forEach((p) => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <p>⭐${p.rating}</p>
      <button>Add to Cart</button>
    `;
    const button = div.querySelector('button');
    button.addEventListener('click', () => addToCart(p));
    productList.appendChild(div);
  });
}

function addToCart(product) {
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  cartCount.textContent = `Cart: ${cart.length}`;
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = `Total: ₹${total}`;
}

resetCartBtn.addEventListener('click', () => {
  cart = [];
  localStorage.removeItem('cart');
  updateCartUI();
  alert('Cart has been reset.');
});

categoryFilter.addEventListener('change', renderProducts);
sortOption.addEventListener('change', renderProducts);

renderProducts();
