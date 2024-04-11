document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector("#new-quote"); 
    btn.addEventListener('click', getQuote);
    getQuote(); 
});

async function getQuote() {
    loading(true); 
    try {
        const response = await fetch('https://api.quotable.io/random');
        if (!response.ok) {
            throw Error(response.statusText);
        }

        const quoteData = await response.json(); 
        const quote = quoteData.content;
        const author = quoteData.author || "Unknown"; 

        displayQuote(quote, author);
    } catch (err) {
        console.error(err);
        alert('Failed to fetch new quote');
    } finally {
        loading(false); 
    }
}

function displayQuote(quote, author) {
    const quoteText = document.querySelector('#quote-text'); 
    const authorText = document.querySelector('#author-text'); 

    quoteText.textContent = `"${quote}"`;
    authorText.textContent = `— ${author}`;

    updateTweetButton(`${quote} — ${author}`);
}

function updateTweetButton(quote) {
    const tweetBtn = document.querySelector('#tweet-quote'); 
    tweetBtn.href = `https://twitter.com/home`;
}

function loading(isLoading) {
    const loadingIndicator = document.querySelector("#loading");
    loadingIndicator.style.display = isLoading ? 'block' : 'none';
}
