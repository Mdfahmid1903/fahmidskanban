// ====== Setup existing cards on page load ======
const cards = document.querySelectorAll(".card");
const lists = document.querySelectorAll(".list");

for (const card of cards) {
  setupCard(card);
}

for (const list of lists) {
  list.addEventListener("dragover", dragOver);
  list.addEventListener("dragenter", dragEnter);
  list.addEventListener("dragleave", dragLeave);
  list.addEventListener("drop", dragDrop);
}

// ====== Reusable function to setup any card ======
function setupCard(card) {
  // Drag events
  card.addEventListener("dragstart", dragStart);
  card.addEventListener("dragend", dragEnd);

  // Text editing events
  const cardText = card.querySelector(".card-text");
  if (cardText) {
    cardText.addEventListener("blur", () => {
      const newText = cardText.innerText;
      console.log("Updated:", newText);
    });

    cardText.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        cardText.blur();
      }
    });
  }

  // Delete button event
  const deleteBtn = card.querySelector(".delete-btn");
  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      card.remove();
    });
  }
}

// ====== Drag and Drop functions ======
function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.currentTarget.id);
}

function dragEnd(e) {
  console.log("Drag ended");
}

function dragOver(e) {
  e.preventDefault();
    this.classList.add("over");

}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave(e) {
  this.classList.remove("over");
}

function dragDrop(e) {
  e.preventDefault();
  const id = e.dataTransfer.getData("text/plain");
  const card = document.getElementById(id);
  const cardsContainer = this.querySelector(".cards-container");
  if (cardsContainer) {
    cardsContainer.appendChild(card);
  } else {
    this.appendChild(card);
  }
  this.classList.remove("over");
}

// ====== Add new card function ======
function addCard(listId) {
  const list = document.getElementById(listId);
  const cardsContainer = list.querySelector(".cards-container");

  // Generate unique id based on total cards
  const totalCards = document.querySelectorAll(".card").length;
  const newId = "card" + (totalCards + 1);

  // Create new card element
  const newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.draggable = true;
  newCard.id = newId;

  // Add inner HTML (text span + delete button)
  newCard.innerHTML = `
    <span class="card-text" contenteditable="true">New task</span>
    <button class="delete-btn">✕</button>
  `;

  // Append to the list's cards container
  cardsContainer.appendChild(newCard);

  // Setup all listeners for the new card
  setupCard(newCard);

  // Auto focus and select text
  const newCardText = newCard.querySelector(".card-text");
  newCardText.focus();

  // Select all text for easy editing
  const range = document.createRange();
  range.selectNodeContents(newCardText);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}