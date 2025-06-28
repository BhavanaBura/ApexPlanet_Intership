function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(section => {
    section.style.display = 'none';
  });
  document.getElementById(sectionId).style.display = 'block';


  if (sectionId === 'todo') loadTasks();
  if (sectionId === 'products') renderProducts();
}


const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task;
    li.onclick = () => deleteTask(index);
    taskList.appendChild(li);
  });
}

function addTask() {
  const task = taskInput.value;
  if (task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    loadTasks();
  }
}

function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}


const products = [
  { name: 'Laptop', category: 'Electronics', price: 50000, rating: 4.5 },
  { name: 'Headphones', category: 'Electronics', price: 2000, rating: 4.0 },
  { name: 'Book A', category: 'Books', price: 300, rating: 4.8 },
  { name: 'Book B', category: 'Books', price: 400, rating: 4.2 },
];

function renderProducts() {
  const category = document.getElementById('categoryFilter').value;
  const sortOption = document.getElementById('sortOption').value;

  let filteredProducts = products.filter(
    (p) => category === 'All' || p.category === category
  );

  filteredProducts.sort((a, b) =>
    sortOption === 'price' ? a.price - b.price : b.rating - a.rating
  );

  const productList = document.getElementById('productList');
  productList.innerHTML = '';
  filteredProducts.forEach((p) => {
    const li = document.createElement('li');
    li.textContent = `${p.name} - ₹${p.price} - ⭐${p.rating}`;
    productList.appendChild(li);
  });
}


showSection('portfolio');
