

const api = new ApiProvider
const userForm = document.querySelector("#user-form-div")
const mainContainer = document.querySelector("#main-container")
const tForm = document.getElementById("create-timeslot-form")
const timeslotInputs = document.querySelector(".timeslot-inputs")
const timeslotWrapper = document.querySelector(".timeslot-wrapper")
const timeslotTable = document.querySelector(".timeslot-table")
const navAvailable = document.querySelector("#nav-available")
const navAllTimeslots = document.querySelector("#nav-alltimeslots")
const navMyTimeslots = document.querySelector("#nav-mytimeslots")
const tableHeader = document.querySelector(".table-header")
const tableBody = document.querySelector(".table-body")
const errorsDiv = document.querySelector(".errors")
//when page loads
tForm.style.display = "none"
timeslotTable.display = "none"

function hideUserForm() {
    userForm.style.display = "none"
}
function displayUserForm() {
    userForm.style.display = "block"
}

Timeslot.getAllTimeslots()

//event listeners
userForm.addEventListener("submit", (e) => {
    e.preventDefault()
    User.renderUser({name: e.target[1].value, email: e.target[0].value})
    hideUserForm()
    
    
})

tForm.addEventListener("submit", (e) => {
    let timeslotObj = {}
    e.preventDefault()
    const filteredInputs = Array.from(e.target).filter(inp => inp.type !== "submit")
    while (filteredInputs.length > 1) {
        let inputPairs = filteredInputs.splice(0, 2)
        let poppedUser = filteredInputs.pop()
        inputPairs.forEach(input => timeslotObj[input.name]= input.value)
        api.createTimeslot({...timeslotObj, ...{[poppedUser.name]: poppedUser.value}})
        
    }
})

document.addEventListener("submit", (event) => {
    if(event.target.matches("form.reserve-form")) {
        event.preventDefault()
        console.log("event form", event)
        api.updateTimeslot({id: event.target.id, taken: true, booked_email: event.target[0].value})
        .then(response => {
            console.log("removed successfully", response)
            let foundTr = document.getElementById(`${response.id}`)
            if(foundTr) {
                foundTr.remove()
            }
        })

    }
})



document.addEventListener("click", (event) => {
    if(event.target.matches(".delete-timeslot")) {
        event.preventDefault()
        event.target.parentNode.remove()
    }
    if(event.target.matches(".duplicate-timeslot")) {
        event.preventDefault()
        timeslotWrapper.appendChild(Timeslot.duplicateTimeslotFormInputs())
    }
    if(event.target.matches("#nav-available")) {
        event.preventDefault()
        timeslotTable.style.display = "block"
        tableBody.innerHTML = ""
        Timeslot.getAvailableTimeslots()
    }

    if(event.target.matches("#nav-alltimeslots")) {
        event.preventDefault()
        timeslotTable.style.display = "block"
        tableHeader.innerText = "All Timeslots: "
        tableBody.innerHTML = ""
        Timeslot.getAllTimeslots()
    }

    if(event.target.matches("#nav-mytimeslots")) {
        // tableBody.innerHTML = ""
        // timeslotTable.style.display = "block"
        // tableHeader.innerText = "My Timeslots: "

        if(event.target.dataset.id) {
            displayUserTimeslots(event.target.dataset.id)
        //     api.getCurrentUser(event.target.dataset.id)
        //     .then(response =>  {
        //         console.log("response - user", response)
        //         Timeslot.displayTimeslots(response.timeslots)
        //     })
            
        } else {
            tableBody.innerHTML = "no user selected"
        }
    }
  
})

function displayUserTimeslots(id) {

    //! rewrite so that the id doesn't get passed through this function. 
    //!use the function only to toggle tablebody and timeslottable

    //! also need to reset user
    tableBody.innerHTML = ""
    timeslotTable.style.display = "block"
    tableHeader.innerText = "My Timeslots: "
    api.getCurrentUser(id)
    .then(response =>  {
        
        if(response.error) {
            errorsDiv.innerText = response.error

        } else {
            console.log("response - user", response)
            Timeslot.displayTimeslots(response.timeslots)
        }
    })
    .catch(error => {
        errorsDiv.innerText = error
    })

}
