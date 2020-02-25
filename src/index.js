// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading. 
const QUOTES_URL = 'http://localhost:3000/quotes'

const quoteList = document.getElementById('quote-list')
const form = document.getElementById('new-quote-form')

document.addEventListener('DOMContentLoaded', () => {
    fetch(`${QUOTES_URL}?_embed=likes`)
        .then(resp => resp.json())
        .then(quotes => quotes.forEach(quote => listQuote(quote)))

    function listQuote(quote){
        let quoteEntry = document.createElement('li')
        quoteEntry.className = 'quote-card'
        quoteEntry.innerHTML =
            `<blockquote class="blockquote">
            <p class="mb-0">${quote.quote}</p>
            <footer class="blockquote-footer">${quote.author}</footer>
            <br>
            <button class='btn-success'>Likes: <span id='${quote.id}-likes'>${quote.likes.length}</span></button>
            <button class='btn-danger'>Delete</button>
            </blockquote>`
        quoteList.append(quoteEntry)

    quoteEntry.addEventListener('click', (e) => {
        if (e.target.className === 'btn-success'){
            const quoteLikes = document.getElementById(`${quote.id}-likes`)
            let numLikes = parseInt(quoteLikes.innerText.split(" ")[0])
            numLikes++
            fetch('http://localhost:3000/likes',{
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    accept: 'application/json'
                },
                body: JSON.stringify({"quoteId": quote.id, "createdAt": Date.now()})
            })
            .then(quoteLikes.innerText = numLikes)
        } else if (e.target.className === 'btn-danger') {
            fetch(`${QUOTES_URL}/${quote.id}`,{
                method: "DELETE",
                headers: {
                    'content-type': 'application/json',
                    accept: 'application/json'
                }
            })
            .then(e.target.parentNode.remove())
        }
    })
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        fetch(QUOTES_URL,{
            method: "POST",
            headers: {
                'content-type': 'application/json',
                accept: 'application/json'
            },
            body: JSON.stringify({"quote":form.quote.value, "author":form.author.value})
        })
        .then(resp => resp.json())
        .then(quote => listQuote(quote))
    })
})