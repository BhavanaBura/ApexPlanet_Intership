const quizData = [
  {
    question: "What is the correct file extension for Python files?",
    options: [".py", ".python", ".pt", ".pyt"],
    answer: ".py"
  },
  {
    question: "Which of the following is used to display output in Python?",
    options: ["echo", "cout", "print()", "System.out.print()"],
    answer: "print()"
  },
  {
    question: "How do you write a comment in Python?",
    options: ["<!-- comment -->", "# comment", "/* comment */", "-- comment"],
    answer: "# comment"
  },
  {
    question: "What will be the output of: print(\"5\" + \"6\")?",
    options: ["11", "56", "TypeError", "Error"],
    answer: "56"
  },
  {
    question: "Which of these data types is mutable in Python?",
    options: ["tuple", "int", "list", "str"],
    answer: "list"
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const scoreEl = document.getElementById("score");
const jokeEl = document.getElementById("joke");

function showQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = `Q${currentQuestion + 1}: ${q.question}`;
  optionsEl.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => selectAnswer(btn, q.answer);
    optionsEl.appendChild(btn);
  });

  nextBtn.classList.add("hidden");
}

function selectAnswer(button, correctAnswer) {
  const selected = button.textContent;
  if (selected === correctAnswer) score++;
  Array.from(optionsEl.children).forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.style.backgroundColor = "#28a745";
    } else if (btn === button) {
      btn.style.backgroundColor = "#dc3545";
    }
  });
  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  document.getElementById("quiz-container").classList.add("hidden");
  resultContainer.classList.remove("hidden");
  scoreEl.textContent = `Your Score: ${score}/${quizData.length}`;
  fetchJoke();
}


function fetchJoke() {
  fetch("https://official-joke-api.appspot.com/jokes/programming/random")
    .then(response => response.json())
    .then(data => {
      const joke = data[0];
      jokeEl.textContent = `😂 Here's a programming joke: ${joke.setup} ${joke.punchline}`;
    })
    .catch(() => {
      jokeEl.textContent = "⚠️ Couldn't fetch a joke at the moment. Try again later!";
    });
}


showQuestion();
