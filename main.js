const quoteText = document.querySelector(".quotation");
const authorName = document.querySelector(".name");
const soundBtn = document.querySelector(".sound");
const copyBtn = document.querySelector(".copy");
const twitterBtn = document.querySelector(".twitter");
const newQuoteBtn = document.querySelector("button.new-quote");
const favoriteBtn = document.querySelector("button.favorite");
const deleteAllBtn = document.querySelector("button.delete-all");
const favoriteList = document.querySelector(".favorite-list");

function randomQuote() {
    fetch("http://api.quotable.io/random")
        .then(r => r.json())
        .then(data => {
            quoteText.innerHTML = data.content;
            authorName.innerHTML = data.author;
        });
}

function addToFavorites() {
    let favoriteQuotes = JSON.parse(localStorage.getItem("favoriteQuotes")) || [];
    favoriteQuotes.push({ quote: quoteText.innerHTML, author: authorName.innerHTML });
    localStorage.setItem("favoriteQuotes", JSON.stringify(favoriteQuotes));
    displayFavorites();
}

function displayFavorites() {
    let favoriteQuotes = JSON.parse(localStorage.getItem("favoriteQuotes")) || [];
    favoriteList.innerHTML = "";
    favoriteQuotes.forEach((quote, index) => {
        const li = document.createElement("li");
        li.textContent = `"${quote.quote}" - ${quote.author}`;
        favoriteList.appendChild(li);
    });
}

function viewFavorites() {
    displayFavorites();
}

function deleteAllFavorites() {
    localStorage.removeItem("favoriteQuotes");
    favoriteList.innerHTML = "";
}

soundBtn.addEventListener('click', () => {
    let utterance = new SpeechSynthesisUtterance(`${quoteText.innerHTML} by ${authorName.innerHTML}`);
    speechSynthesis.speak(utterance);
});

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(quoteText.innerHTML);
});

newQuoteBtn.addEventListener("click", () => {
    randomQuote();
});

favoriteBtn.addEventListener("click", () => {
    addToFavorites();
});

deleteAllBtn.addEventListener("click", () => {
    deleteAllFavorites();
});

window.addEventListener("DOMContentLoaded", () => {
    displayFavorites();
});
