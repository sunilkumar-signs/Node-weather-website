console.log("I am inside the client side javascript file")


     
const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherform.addEventListener('submit', (e) =>{
    e.preventDefault()  // prevent the page from reloading after the submit option

    const location = search.value

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ''

    fetch('/weather?address='+ location).then((response) => {  // http://localhost:3000
        response.json().then((data) =>{
            if (data.error){
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})

