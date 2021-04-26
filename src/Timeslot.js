class Timeslot{
    constructor(timeslot) {
        this.timeslot = timeslot
    }

   static showTimeslotForm(currentUser) {
       tForm.style.display = "block"
       let hidden = document.querySelector(".hidden")
       hidden.value = currentUser.user.id

    }

    static duplicateTimeslotFormInputs() {
     return timeslotInputs.cloneNode(true)
    }

    addTimeslotRow() {
        let tr = document.createElement("tr")
        tr.id = this.timeslot.id
        let activityTd = document.createElement("td")
        activityTd.innerText = this.timeslot.activity
        let bookedTimeTd = document.createElement("td")
        bookedTimeTd.innerText = this.timeslot.booked_time
        tr.append(activityTd, bookedTimeTd)
        // debugger;
        if(!this.timeslot.user) {
            const withHeader = document.querySelector(".with-header")
            withHeader.style.display = "none"
        } else {
            let withTd = document.createElement("td")
            withTd.innerText = `${this.timeslot.user.name} - ${this.timeslot.user.email}`
            tr.append(withTd)
        }
        let takenTd = document.createElement("td")
        if(!this.timeslot.taken) {
            let takeTimeslotForm = document.createElement("form")
            let takeInput = document.createElement("input")
            takeInput.type = "text"
            takeInput.name = "email"
            takeInput.placeholder = "Enter your email to reserve"
            takeTimeslotForm.className = "reserve-form"
            takeTimeslotForm.id = this.timeslot.id
            let takeSubmit = document.createElement("input")
            takeSubmit.type = "submit" 
            takeSubmit.name ="submit"
            takeTimeslotForm.append(takeInput, takeSubmit)
            takenTd.append(takeTimeslotForm)
        } else {
            takenTd.innerText = "This has already been taken"
        }
        tr.append(takenTd)
        tableBody.appendChild(tr)

    }

   static getAllTimeslots() {
        api.getTimeslots()
        
        .then(response => this.displayTimeslots(response))
    }

    static getAvailableTimeslots() {
      
        api.getTimeslots()
        .then(response => {
            const filtered = response.filter(timeslot => timeslot.taken === false)
            this.displayTimeslots(filtered)
        })
        
    }

    static displayTimeslots(timeslots) {
        timeslots.forEach(timeslot => {
            let newTimeslot = new Timeslot(timeslot)
            const foundTimeslot = document.getElementById(`${newTimeslot.timeslot.id}`)
            if(foundTimeslot=== null) {
                newTimeslot.addTimeslotRow()
            }
        })
    }

    
    

   
}