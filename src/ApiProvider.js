class ApiProvider {
    constructor() {
        this.userUrl = "http://localhost:3000/users"
        this.timeslotUrl = "http://localhost:3000/timeslots"
    }

    createUser(user) {
       return fetch(this.userUrl, {
           method: "POST", 
           headers: {
               "Content-Type": "application/json", 
               "accepts": "application/json"
           }, 
           body: JSON.stringify({user: user})
       })
    }

    createTimeslot(timeslot) {
        return fetch(this.timeslotUrl, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json", 
                "accepts": "application/json"
            }, 
            body: JSON.stringify({timeslot: timeslot})
        })
    }

    getTimeslots() {
        return fetch(this.timeslotUrl)
    }

    getTimeslot(id) {
        return fetch(this.timeslotUrl + "/" + id)
    }

    updateTimeslot(timeslot) {
        return fetch(this.timeslotUrl + "/" + id, {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json", 
                "accepts": "application/json"
            }, 
            body: JSON.stringify({timeslot: timeslot})
        })
    }
}