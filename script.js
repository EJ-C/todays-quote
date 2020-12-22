const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote From API
async function getQuote() {
  showLoadingSpinner();
  const proxyUrl = 'https://sleepy-hollows-06866.herokuapp.com/';
  const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
      const response = await fetch(proxyUrl + apiUrl);
      const data = await response.json();
      // If Author is blank, add 'Unknown'
      if (data.quoteAuthor === '') {
        authorText.innerText = 'Unknown';
      } else {
        authorText.innerText = data.quoteAuthor;
      }
      // Reduce font size for long quotes
      if (data.quoteText.length > 120) {
        quoteText.classList.add('long-quote');
      } else {
        quoteText.classList.remove('long-quote');
      }
      quoteText.innerText = data.quoteText;
      // Stop Loader, show Quote
      removeLoadingSpinner();
  } catch (error) {
      getQuote();
  }
}


// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);

// On Load
getQuote();