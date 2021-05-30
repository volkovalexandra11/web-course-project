const h = 3
const w = 4

const cards = document.querySelectorAll(".card");

const flipCard = e => {
    const card = e.target.parentElement;
    card.classList.add("flip");
};

cards.forEach(card => {
    card.addEventListener("click", flipCard)
});