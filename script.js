// DOM Elements
const saveFlashcardBtn = document.getElementById("saveFlashcardBtn");
const statsDisplay = document.getElementById("statsDisplay");
const toast = document.getElementById("toast");

// State
let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];

// Initialize
updateStats();

// Event Listeners
saveFlashcardBtn.addEventListener("click", saveFlashcard);

// Functions
function saveFlashcard() {
  const title = document.getElementById("flashcardTitle").value.trim();
  const front = document.getElementById("flashcardFront").value.trim();
  const back = document.getElementById("flashcardBack").value.trim();

  if (!title || !front || !back) {
    showToast("Please fill in all required fields", "error");
    return;
  }

  const newFlashcard = {
    id: Date.now().toString(),
    title,
    front,
    back,
    createdAt: new Date().toISOString(),
  };

  flashcards.push(newFlashcard);
  saveToLocalStorage();
  clearForm();
  showToast("Flashcard saved successfully!", "success");
}

function showToast(message, type = "") {
  toast.textContent = message;
  toast.className = `toast ${type}`;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function clearForm() {
  document.getElementById("flashcardTitle").value = "";
  document.getElementById("flashcardFront").value = "";
  document.getElementById("flashcardBack").value = "";
}

function saveToLocalStorage() {
  localStorage.setItem("flashcards", JSON.stringify(flashcards));
  updateStats();
}

function updateStats() {
  const count = flashcards.length;
  statsDisplay.textContent = `${count} flashcard${count !== 1 ? "s" : ""}`;
}
