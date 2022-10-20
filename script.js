const quotes = [
  "Things are only impossible until they are not",
  "It is possible to commit no errors and still lose. That is not a weakness. That is life",
  "There is a way out of every box, a solution to every puzzle; it is just a matter of finding it.",
  "Without freedom of choice there is no creativity",
  "Logic is the beginning of wisdom, not the end",
  "Improve a mechanical device and you may double productivity. But improve yourself, you gain a thousandfold",
  "Compassion: that is the one thing no machine ever had. Maybe it is the one thing that keeps us ahead of them.",
];

const quote = document.getElementById("quote");
const input = document.getElementById("typed-value");
const start = document.getElementById("start");
const message = document.getElementById("message");
// These lines were to grab the elements for the DOM

let wordQueue;
let quoteText;
let highlightPosition;
let startTime;

function startGame() {
  console.log("Game Started!");

  const quoteIndex = Math.floor(Math.random() * quotes.length); // return random number from 1 to 7

  quoteText = quotes[quoteIndex];
  wordQueue = quoteText.split(" "); // separates each individual word for then creating a span for each one of them

  document.body.className = "";
  start.className = "started";
  message.innerHTML = "";

  quote.innerHTML = wordQueue.map((word) => `<span>${word}</span>`).join("");
  highlightPosition = 0;
  quote.childNodes[highlightPosition].className = "highlight";

  startTime = new Date().getTime();
  setTimeout(() => {
    start.className = "button";
  }, 2000);
}

function checkInput() {
  // console.log("checking", input.value);
  const currentWord = wordQueue[0].replaceAll(".", "").replaceAll(",", ""); // not to loose the value of wordQueue
  const typedValue = input.value.trim();

  if (currentWord !== typedValue) {
    input.className = currentWord.startsWith(typedValue) ? "" : "error"; // atribbutes a class depending on if the typed value is equal or not to the current word
    return;
  }
  wordQueue.shift();
  input.value = ""; // clears the box when it moves to a new word

  quote.childNodes[highlightPosition].className = "";
  highlightPosition++;
  quote.childNodes[highlightPosition].className = "highlight";

  if (wordQueue.length === 0) {
    //=== check both type and value
    gameOver();
    return;
  }
}

function gameOver() {
  const elapsedTime = new Date().getTime() - startTime;
  document.body.className = "winner";

  message.innerHTML = `<span class="congrats">Congratulations!</span><br>You finished in ${
    elapsedTime / 1000
  }seconds`;
}

input.addEventListener("input", checkInput);
start.addEventListener("click", startGame); // (event,function) - quando se clica no botão imprime "Game Started"
