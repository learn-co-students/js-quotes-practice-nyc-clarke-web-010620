document.addEventListener("DOMContentLoaded", init)

function init(e){
    fetchQuotes()
}

function fetchQuotes() {
    return fetch('http://localhost:3000/quotes?_embed=likes')
           .then(resp => resp.json())
           .then(data => addQuotes(data))
} 

function addQuotes(quotes) {
    let ul = document.getElementById('quote-list')
    quotes.forEach(quote => {
        console.log(quote)
        let li = document.createElement('li')
        li.className = "quote-card"
        let blockquote = document.createElement('blockquote')
        blockquote.className = 'blockquote'
        let p = document.createElement('p')
        p.className = "mb-0"
        p.innerText = `${quote.quote}`
        let footer = document.createElement('footer')
        footer.className = 'blockquote-footer'
        footer.innerText = `${quote.author}`
        let br = document.createElement('br')
        let likeButton = document.createElement('button')
        likeButton.className = 'btn-success'
        likeButton.innerHTML = `Likes: <span>0</span>`
        let deleteButton = document.createElement('button')
        deleteButton.className = 'btn-danger'
        deleteButton.innerText = 'Delete'

        blockquote.appendChild(p)
        blockquote.appendChild(footer)
        blockquote.appendChild(br)
        blockquote.appendChild(likeButton)
        blockquote.appendChild(deleteButton)

        li.appendChild(blockquote)
        ul.appendChild(li)
    })
}