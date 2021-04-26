

class User {
    constructor(user) {
        this.user = user
    }
    

    
    static renderUser(user) {
        return api.createUser(user)
        .then(response => response.json())
        .then(response => {
            if(response.errors) {
                console.log("response errors", Object.keys(response.errors))
                const responseKeys = Object.keys(response.errors)
                let responseString = ""
                responseKeys.forEach(key => responseString += `${key}: ${response.errors[key]}`)
                errorsDiv.innerText = responseString
            }else {
                const currentUser = new User(response)
                navMyTimeslots.setAttribute("data-id", currentUser.user.id)
                Timeslot.showTimeslotForm(currentUser)
                tableBody.innerHTML = ""
                 timeslotTable.style.display = "block"
                 tableHeader.innerText = "My Timeslots: "
                Timeslot.displayTimeslots(currentUser.user.timeslots)
            }
        })
      
    }

    
    


}