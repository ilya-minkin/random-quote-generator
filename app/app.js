async function getAPI() {
    let quotes = []

    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
    .then(response => response.json())
    .then(data => {
        let quotes = data.quotes
        
        let randomQuote = quotes[getRandomIntInclusive(0,quotes.length)]

        quoteNode.classList.add('quote-text-update')
        setTimeout(() => {

            if (randomQuote.quote.split(' ').length >= 40) {
                quoteNode.classList.remove('text-2xl')
                quoteNode.classList.add('text-xl')
                quoteNode.innerHTML = randomQuote.quote
            } else {
                quoteNode.classList.add('text-2xl')
                quoteNode.innerHTML = randomQuote.quote
            }

            quoteNode.classList.remove('quote-text-update')
        },350)

        authorQuoteNode.classList.add('quote-author-update')
        setTimeout(() => {
            authorQuoteNode.innerHTML = ` - ${randomQuote.author}`
            authorQuoteNode.classList.remove('quote-author-update')
        },350)
    })
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function copyTextToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
    } catch (err) {
        console.error('Error in copying text: ', err);
    }
}

function copyQuote() {
    input.value = quoteNode.innerHTML

    copyTextToClipboard(input.value)

    buttonCopy.innerHTML = 'Copied'

    setTimeout(() => {
        buttonCopy.innerHTML = 'Copy'
    },2000)
}

const buttonGenerate = document.querySelector('.btn-generate')
const buttonCopy = document.querySelector('.btn-copy')
const input = document.querySelector('.invisible')

const quoteNode = document.querySelector('.quote-text')

const authorQuoteNode = document.querySelector('.quote-author')

buttonGenerate.addEventListener('click', () => {
    getAPI()
})

buttonCopy.addEventListener('click', copyQuote)
