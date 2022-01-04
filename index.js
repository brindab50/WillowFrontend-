// **** project requirement ***
// ***Integrate JavaScript and Rails **
// A link to your project repo, with code for your Rails backend and HTML / CSS / JavaScript frontend.
// A README.md file describing your application
// ***A Blog Post about your application***
// A 2-4 minute Video Demo introducing your application
// ***The application must be an HTML, CSS, and JavaScript frontend with a Rails API backend. All interactions between the client and the ***
// ***server must be handled asynchronously (AJAX) and use JSON as the communication format.***
// ***The JavaScript application must use Object Oriented JavaScript (classes) to encapsulate related data and behavior.***
// ***The domain model served by the Rails backend must include a resource with at least one has-many relationship. For example, if you were building an Instagram clone, 
// ***The backend and frontend must collaborate to demonstrate Client-Server Communication. Your application should have at least 3 AJAX calls, covering at least 2 of Create, Read, Update, 
// ***and Delete (CRUD). Your client-side JavaScript code must use fetch with the appropriate HTTP verb, and your Rails API should use RESTful conventions.


// __________________________

// rails backend integrated with javascript frontend // done 
// application is using css html javascript with a rails as an api // done 
// using atleast 3 AJAX calls GET POST PATCH DELETE // done
// the domain model has at least one has many relationship // done
// application has Create Read Update and Delete // must have 2 of the 4 CRUD  // done 
// javascript code uses Fetch and has the apporiate HTTP verb // done


// add a patch request 
// add delete button on home 
// show number of offers on the home 
// when make a offer button is submitted 
// create a patch request to create a offer in the backend 
// in the front end create a button that shows the offer id that matches the home id 



// function makeOffer(event){
// fetch()
// let homeOffer = document.createElement("div")
// let offer = allOffers.filter(offer => offer.home.id === home.id) 

// } 

// create a post request that creates a offer for the home in the backend 
// offer should have price home id and user id and successfully be created in the backend 
// 


let makeOffer = false
let addHome = false
let homeHovered = false


document.addEventListener('DOMContentLoaded', () => {
const homesUrl = 'http://localhost:3000/homes'
let homeContainer = document.querySelector('#homes-collection')
let newHomeForm = document.createElement("form")
let allOffers = []
let newHome = document.querySelector("#new-listing-form")
let newHomeButton = document.querySelector("#new-home-btn")
newHomeButton.addEventListener("click", function(e) {
    console.log("test 1", e)
    addHome = !addHome
    if (addHome) {
        createNewListing()
        newHome.style.display = "block"
        newHome.addEventListener('submit', function(event)  {
             console.log("test000", event)
            event.preventDefault()
            console.log("test 2", event.target.location.value) // the target of the click event 
            // addNewHome(event)
            // console.log("test 3", event) 
            fetch('http://localhost:3000/homes', {
                method: "POST",
                headers: {
                    "content-Type": "application/json",
                    "accept": "application/json"
                }, 
                body: JSON.stringify({
                    
                    "location": event.target.location.value,
                    "price": event.target.price.value,
                    "bedrooms": event.target.bedrooms.value,
                    "bathrooms": event.target.bathrooms.value,
                    "img_url": event.target.img_url.value,
                    "details": event.target.details.value
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log("test10", data)
                renderHomes(data)

            })
            newHomeForm.reset()

        })

    }else {

        newHomeButton.style.display = "none"
    }
})


fetchHomes()


function fetchHomes(){
    fetch(homesUrl)
    .then(resp => resp.json())
    .then(homes => {
        homes.forEach(home => {
            renderHomes(home)
        })
    })
}

// ***********
function renderHomes(home){

    let deleteHome = document.createElement("button")
    deleteHome.setAttribute('id', 'delete-btn')
    deleteHome.innerText = "delete listing"
    deleteHome.addEventListener("click", function(event) {

        console.log("test222 home id ", homeDiv.id)

        if (event.target.id === 'delete-btn') {
            fetch(`http://localhost:3000/homes/${home.id}`, {
                method: "DELETE",
                headers: {
                  "content-type": "application/json",
                  accept: "application/json"
                }
              }).then(resp => resp.json())
              .then(() => {
                homeDiv.innerHTML = "";
                const home = homeDiv.querySelector(`[data-id='${homeDiv.id}']`);
                home.remove();
              })
    
            }
    })
    

    let detailsDiv = document.createElement('div')
    detailsDiv.setAttribute('id', "home-details")

    let detailsBtn = document.createElement("button")
    detailsBtn.innerText = "home Details"
    detailsBtn.addEventListener("click", () => {
        detailsDiv.innerText = home.details

    })


    let offerForm = document.createElement('form');
    offerForm.className = 'offer-form';
    let homeDiv = document.createElement('div')
    let homeTitle = document.createElement('h2')
    homeTitle.innerHTML = home.location
    let img = document.createElement('img')
    img.setAttribute('src', home.img_url)
    img.setAttribute('class', "home-avatar")
    img.style.height = "270px"
    img.style.width = "350px"
    img.style.margin = "0 auto"
    let p = document.createElement('p')
    p.innerText = 
    `bedrooms: ${home.bedrooms}
     bathrooms: ${home.bathrooms}
     price: ${home.price}`

    let offerBtn = document.createElement('button')
    offerBtn.setAttribute('id', 'offer-btn')
    offerBtn.innerText = "Make an Offer"
    offerBtn.addEventListener('click', (e) => {
        e.preventDefault()
            // console.log("test 2", event.target, "test3", makeOffer )
            makeOffer = !makeOffer
            if (makeOffer){
            console.log(offerForm.innerHTML = `
         <input type="textarea" name="price" placeholder="Offer Price">
         <button class="new-offer-btn" value="submit">submit offer</button>
        `
        )}
    })

    offerForm.addEventListener("submit", function(event) {

        event.preventDefault()
        console.log("test9 home id", homeDiv.id)

        console.log("test9 offer price", event.target.price.value)
        fetch('http://localhost:3000/offers', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }, 
        body: JSON.stringify({

            "price": event.target.price.value,
            "home_id": homeDiv.id 
        })
    })

    .then(res => res.json())
    .then(offer => {
        console.log(offer)

    })
    })
   
    homeDiv.setAttribute('class', 'card')
    homeDiv.append(homeTitle, img, p, offerBtn, offerForm, detailsDiv, detailsBtn, deleteHome)
    homeDiv.id = home.id
    homeContainer.append(homeDiv)
    
}





function createNewListing(){
    let formHeader = document.createElement("h2")
    formHeader.innerText = "Tell Us About Your Home!"
    newHomeForm.className = 'new-home-form';
    newHomeForm.innerHTML = `
    <input type="text" name="location" value="" placeholder="Location">
    <input type="textarea" name="price" value="" placeholder="Price">
    <input type="text" name="bedrooms" value=""  placeholder="bedrooms">
    <input type="text" name="bathrooms" value="" placeholder="bathrooms">
    <input type="text" name="img_url" value="" placeholder="Images of Home">
    <input type="text" name="details" value="" placeholder="Home Details">
    <button class="submitOffer" value="submit">submit new listing</button>
   `
      newHome.append(formHeader, newHomeForm)
   
}



// function addNewHome(event){

//     console.log("test 4",  )
//     fetch('http://localhost:3000/homes', {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         }, 
//         body: JSON.stringify({

            
//             "location": event.target.location.value,
//             "price": event.target.price.value,
//             "bedrooms": event.target.bedrooms.value,
//             "bathrooms": event.target.bathrooms.value,
//             "img_url": event.target.img_url.value,
//             "details": event.target.details.value
//         })
//     })
//     // .then(resp => resp.json())
//     // .then(data => console.log("test5", data));
//     .then((home_data) => {
//         // console.log("test 5 ", home_data)
//         renderHomes(home_data)
//         console.log("test 5", renderHomes(home_data))
//     })
// // })

// }



// function deleteListing(event){

//     let deleteHome = document.createElement("button")
//     deleteHome.setAttribute('id', 'delete-btn')
//     deleteHome.innerText = "delete listing"
//     deleteHome.addEventListener("click", function(event) {

//         console.log("test222", homeDiv.id)

//         if (event.target.id === 'delete-btn') {
//             fetch(`http://localhost:3000/homes/${home.id}`, {
//                 method: "DELETE",
//                 headers: {
//                   "content-type": "application/json",
//                   accept: "application/json"
//                 }
//               }).then(resp => resp.json())
//               .then(() => {
//                 homeDiv.innerHTML = "";
//                 const home = homeDiv.querySelector(`[data-id='${id}']`);
//                 home.remove();
//               })
    
//             }
//     })

// }


// function makeOffer(event){

//       fetch('http://localhost:3000/offers', {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         }, 
//         body: JSON.stringify({

//             "price": event.target.price.value,
//             "home_id": homeDiv.id 
//         })
//     })

//     .then(res => res.json())
//     .then(offer => {
//         console.log(offer)

//     })



// }




})

