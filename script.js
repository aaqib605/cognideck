// DOM Elements
const saveFlashcardBtn = document.getElementById("saveFlashcardBtn");
const statsDisplay = document.getElementById("statsDisplay");
const toast = document.getElementById("toast");

// State
let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];

// Initialize
updateStats();
updateFlashcardsDisplay();

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
  updateFlashcardsDisplay();
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

function updateFlashcardsDisplay() {
  if (flashcards.length === 0) {
    flashcardsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-layer-group"></i>
                <h3>No Flashcards Found</h3>
                <p>Try adjusting your search or create a new flashcard.</p> 
            </div>
        `;

    return;
  }

  flashcardsContainer.innerHTML = "";

  flashcards.forEach((card) => {
    const flashcardElement = document.createElement("div");
    flashcardElement.className = "flashcard";
    flashcardElement.dataset.id = card.id;

    flashcardElement.innerHTML = `
            <div class="flashcard-content">
                <div class="flashcard-front">
                    <h3 class="flashcard-title">${card.title}</h3>
                    <p class="flashcard-body">${card.front}</p>
                </div> 
                <div class="flashcard-actions">
                    <button class="edit-btn" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn" title="Delete"><i class="fas fa-trash"></i></button>
                    <button class="study-btn" title="Study"><i class="fas fa-graduation-cap"></i></button>
                </div>
            </div>
        `;

    flashcardsContainer.appendChild(flashcardElement);
  });
}
