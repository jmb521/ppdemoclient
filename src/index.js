//

const api = new ApiProvider
const userForm = document.querySelector("#user-form-div")
const mainContainer = document.querySelector("#main-container")
const tForm = document.getElementById("create-timeslot-form")
const timeslotInputs = document.querySelector(".timeslot-inputs")
const timeslotWrapper = document.querySelector(".timeslot-wrapper")
tForm.style.display = "none"
let counter = 1; //may not need this
function hideUserForm() {
    userForm.style.display = "none"
}
function displayUserForm() {
    userForm.style.display = "block"
}


//event listeners
userForm.addEventListener("submit", (e) => {
    e.preventDefault()
    new User({name: e.target[1].value, email: e.target[0].value})
    hideUserForm()
    Timeslot.showTimeslotForm()
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
})

