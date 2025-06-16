
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const error = document.getElementById("error");

  if (name === "" || email === "") {
    error.textContent = "Please fill all fields.";
  } else if (!email.includes("@")) {
    error.textContent = "Enter a valid email address.";
  } else {
    error.textContent = "";
    alert("Form submitted successfully!");
    this.reset();
  }
});

let taskCount = 0;

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  taskCount++;

  const table = document.getElementById("taskList");
  const row = document.createElement("tr");

  const col1 = document.createElement("td");
  col1.textContent = taskCount;

  const col2 = document.createElement("td");
  col2.textContent = taskText;

  const col3 = document.createElement("td");
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.onclick = () => {
    row.remove();
    taskCount--;
    updateTaskNumbers();
  };

  col3.appendChild(delBtn);

  row.appendChild(col1);
  row.appendChild(col2);
  row.appendChild(col3);

  table.appendChild(row);
  taskInput.value = "";
}

function updateTaskNumbers() {
  const rows = document.querySelectorAll("#taskList tr");
  rows.forEach((row, index) => {
    row.children[0].textContent = index + 1;
  });
}
