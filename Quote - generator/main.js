const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuote = [];

function ShowLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}


function showNewQuote() {
    ShowLoadingSpinner();
    const quote = apiQuote[Math.floor(Math.random() * apiQuote.length)];
    if (!quote.author) {
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }

    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    removLoadingSpinner();
}


// get quote from Api
async function getQuote() {
    ShowLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuote = await response.json();
        showNewQuote();
    } catch (error) {
        console.log("Error");
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=
${quoteText.innerText} - ${authorText.innerText}`;
    window.open(twitterUrl, '_blank');
}


newQuoteBtn.addEventListener("click", showNewQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuote();
