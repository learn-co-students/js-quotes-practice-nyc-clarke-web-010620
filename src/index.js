let quoteList = document.querySelector("#quote-list")  
let newQuoteForm = document.querySelector("#new-quote-form")
// console.log(newQuoteForm)
window.addEventListener('DOMContentLoaded', (event) => {
  


    fetch('http://localhost:3000/quotes?_embed=likes')
    .then((response) => {
      return response.json();
    })
    .then((quotes) => {
      quotes.forEach(quote => {listQuote(quote)})
    });

    function listQuote(quote){
        let eachQuote = document.createElement('li')
        eachQuote.innerHTML = `<blockquote class="blockquote">
        <p class="mb-0">${quote.quote}</p>
        <footer class="blockquote-footer">${quote.author}</footer>
        <br>
        <button id= ${quote.id} class='btn-success'>Likes:  <span>${quote.likes.length}</span></button>
        <button id= ${quote.id} class='btn-danger'>Delete</button>
      </blockquote>`
    //   debugger
     //k.dataset.quoteId = "asdfoiajdfioajs"
        quoteList.append(eachQuote)
    }
newQuoteForm.addEventListener("submit", function(event){
    event.preventDefault();
    
    quoteInput = document.querySelector('#new-quote').value
    authorInput = document.querySelector('#author').value
    console.log(quoteInput)
    console.log(authorInput)
    newQuoteForm.reset() 
    const data = { quote: quoteInput, author: authorInput, likes: []};

fetch('http://localhost:3000/quotes?_embed=likes', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
.then((response) => response.json())
.then((data) => {listQuote(data)})
})

document.addEventListener("click",function(event){
    if(event.target.className === "btn-danger") {
       event.target.parentNode.parentNode.remove()
fetch(`http://localhost:3000/quotes/${event.target.id}`, {
    method: "DELETE"})
}
    
})

document.addEventListener("click", function(event){
    if(event.target.className === "btn-success"){
        // console.log(event.target.childNodes[1])
        let likeValue = event.target.childNodes[1]
        console.log(likeValue)
        likeValue.innerHTML++
        
    }
    const data = { quoteId: parseInt(event.target.id)};
   // console.log(event.target.id)

    fetch('http://localhost:3000/likes', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    // .then((data) => {listQuote(data)})
    
})


});//dom