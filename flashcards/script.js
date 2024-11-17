let flashcards = [];
let currentFlashcardIndex = 0;
let showQuestion = true;

// Fisher-Yates Shuffle function
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}

// Load the selected deck
function loadDeck() {
  const selectedDeck = document.getElementById("deck-select").value;
  fetch(`flashcards/${selectedDeck}.json`)
    .then((response) => response.json())
    .then((data) => {
      flashcards = data;
      if (flashcards.length > 0) {
        shuffleArray(flashcards); // Shuffle the flashcards
        startQuiz();
      } else {
        alert("No flashcards found in this deck.");
      }
    })
    .catch((error) => {
      console.error("Error loading flashcard deck:", error);
      alert("Failed to load deck. Please try again.");
    });
}

// Start the quiz
function startQuiz() {
  currentFlashcardIndex = 0;
  showQuestion = true;
  document.getElementById("deck-selection").style.display = "none";
  document.getElementById("game").style.display = "flex";
  displayFlashcard(currentFlashcardIndex);
}

// Display flashcard content
function displayFlashcard(index) {
  const flashcardText = document.getElementById("flashcard-text");
  showQuestion = true;
  flashcardText.textContent = flashcards[index].question;
}

// Toggle between question and answer
function showAnswer() {
  const flashcardText = document.getElementById("flashcard-text");
  if (flashcards.length > 0) {
    showQuestion = !showQuestion;
    flashcardText.textContent = showQuestion
      ? flashcards[currentFlashcardIndex].question
      : flashcards[currentFlashcardIndex].answer;
  }
}

// Move to the next flashcard
function nextFlashcard() {
  currentFlashcardIndex = (currentFlashcardIndex + 1) % flashcards.length;
  displayFlashcard(currentFlashcardIndex);
}

// Go back to deck selection
function goBack() {
  document.getElementById("deck-selection").style.display = "flex";
  document.getElementById("game").style.display = "none";
}
