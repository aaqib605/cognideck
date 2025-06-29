// DOM Elements
const saveFlashcardBtn = document.getElementById("saveFlashcardBtn");
const statsDisplay = document.getElementById("statsDisplay");
const closeStudyBtn = document.getElementById("closeStudy");
const flipStudyCardBtn = document.getElementById("flipStudyCardBtn");
const toast = document.getElementById("toast");

// State
let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];

// Initialize
updateStats();
updateFlashcardsDisplay();

// Event Listeners
saveFlashcardBtn.addEventListener("click", saveFlashcard);
closeStudyBtn.addEventListener("click", closeStudySession);
flipStudyCardBtn.addEventListener("click", flipStudyCard);

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

    const editBtn = flashcardElement.querySelector(".edit-btn");
    const deleteBtn = flashcardElement.querySelector(".delete-btn");
    const studyBtn = flashcardElement.querySelector(".study-btn");

    editBtn.addEventListener("click", () => {
      editFlashcard(card.id);
    });

    deleteBtn.addEventListener("click", () => {
      deleteFlashcard(card.id);
    });

    studyBtn.addEventListener("click", () => {
      startStudySession(card);
    });
  });
}

function editFlashcard(id) {
  const cardIndex = flashcards.findIndex((card) => card.id === id);

  const card = flashcards[cardIndex];
  document.getElementById("flashcardTitle").value = card.title;
  document.getElementById("flashcardFront").value = card.front;
  document.getElementById("flashcardBack").value = card.back;

  // Remove the card being edited
  flashcards = flashcards.filter((c) => c.id !== id);
  saveToLocalStorage();
  updateFlashcardsDisplay();
}

function deleteFlashcard(id) {
  if (confirm("Are you sure you want to delete this flashcard?")) {
    flashcards = flashcards.filter((card) => card.id !== id);
    saveToLocalStorage();
    updateFlashcardsDisplay();
    showToast("Flashcard deleted", "success");
  }
}

function startStudySession(card) {
  studyMode.classList.add("active");
  updateStudyCard(card);
}

function updateStudyCard(card) {
  y;
  document.getElementById("studFrontTitle").textContent = card.title;
  document.getElementById("studyFrontContent").textContent = card.front;
  document.getElementById("studyBackContent").textContent = card.back;
}

function closeStudySession() {
  studyMode.classList.remove("active");
  studyCard.classList.remove("flipped");
}

function flipStudyCard() {
  studyCard.classList.toggle("flipped");
}
