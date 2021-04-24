class Timeslot{
    constructor(timeslot) {
        this.timeslot = timeslot
    }

   static showTimeslotForm() {
       tForm.style.display = "block"
    }

    static duplicateTimeslotFormInputs() {

     return timeslotInputs.cloneNode(true)
    //  tForm.appendChild(duplicated)
    }

   
}