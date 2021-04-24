

class User {
    constructor(user) {
        this.user = user
        this.renderUser() 
    }
    
    displayUser(user) {
        //append user to the dom.
        
    }
    
    renderUser() {
        api.createUser(this.user)
        .then(response => response.json())
        .then(response => this.displayUser(response))
        
    }

    


}