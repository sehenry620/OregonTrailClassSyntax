(function () {
    // console.log("hello");

    //A Traveler has a few properties:

    //a name (string) that must be provided as a parameter to the constructor
    //an amount of food (number) with an initial value of 1
    //an isHealthy (boolean) to indicate whether they are sick, 
    //with an initial value of true


    //A Wagon has a few properties as well:

    //a capacity (number) that must be provided as a parameter 
    //to the constructor, sets the maximum number of passengers 
    //the wagon can hold
    //a passengers list (array) which is initially empty

    //Operations
    //Write the following prototype methods:

    //Traveler.prototype.hunt()
    //Increase the traveler's food by 2.

    //Traveler.prototype.eat()
    //Consumes 1 unit of the traveler's food. If the traveler doesn't 
    //have any food to eat, the traveler is no longer healthy.

    //Wagon.prototype.getAvailableSeatCount()
    //Return the number of empty seats, determined by the capacity 
    //set when the wagon was created, compared to the number of 
    //passengers currently on board.

    //Wagon.prototype.join(traveler)
    //Add the traveler to the wagon if there is space. If the wagon 
    //is already at maximum capacity, don't add them.

    //Wagon.prototype.shouldQuarantine()
    //Return true if there is at least one unhealthy person in the wagon. 
    //Return false if not.

    //Wagon.prototype.totalFood()
    //Return the total amount of food among all occupants of the wagon.

    //......................................................................

    function Traveler(name) {
        this.name = name;
        this.food = 1;
        this.isHealthy = true;

    }

    //....................................................................

    Traveler.prototype.hunt = function () {
        this.food = this.food + 2
    }

    //....................................................................

    Traveler.prototype.eat = function () {
        if (this.food >= 1) {
            this.food = this.food - 1;
        }
        else {
            this.isHealthy = false;
        }
    }

    //....................................................................

    function Wagon(capacity) {
        this.capacity = capacity;
        this.passengers = [];
    }

    Wagon.prototype.getAvailableSeatCount = function () {
        return this.capacity - this.passengers.length;
    }

    //....................................................................

    Wagon.prototype.join = function (traveler) {
        // if available seat count is not 0

        if (this.getAvailableSeatCount() !== 0) {
            // add passenger to wagon
            this.passengers.push(traveler)
        }

    }

    //....................................................................

    Wagon.prototype.shouldQuarantine = function () {
        // Return true if there is at least one unhealthy person in the 
        // wagon. Return false if not.
        for (let i = 0; i < this.passengers.length; i++) {
            let currentPassengerHealth = this.passengers[i].isHealthy
            if (currentPassengerHealth) {
                // return false
            }
            else {
                return true
            }
        }
        return false
    }

    //....................................................................

    Wagon.prototype.totalFood = function () {
        let foodSum = 0
        for (let i = 0; i < this.passengers.length; i++) {
            let currentPassengerFood = this.passengers[i].food
            // passengerFood += currentPassengerFood
            foodSum = foodSum + currentPassengerFood
            // console.log(this.passengers)

        }
        return foodSum
    }

    //....................................................................

    function Doctor(name) {
        Traveler.call(this, name);
    }

    Doctor.prototype = Object.create(Traveler.prototype);
    Doctor.prototype.constructor = Doctor;

    //....................................................................

    //Pass another Traveler as a parameter to the .heal() method, 
    //and their isHealthy property is changed to true.

    Doctor.prototype.heal = function (traveler) {
        traveler.isHealthy = true;

    }

    //......................................................................

    //A Hunter is a Traveler that is better at finding food, but 
    //requires more food to eat. They should start out with 2 food 
    //instead of just 1 like other travelers do. They can also give 
    //food to other travelers:

    function Hunter(name) {
        Traveler.call(this, name);
        this.food = 2;

    }

    Hunter.prototype = Object.create(Traveler.prototype);
    Hunter.prototype.constructor = Hunter;

    //......................................................................

    //Increase the hunter's food by 5. (A normal traveler gains only 2.)

    Hunter.prototype.hunt = function () {
        this.food = this.food + 5
    }

    //......................................................................

    //Consumes 2 units of the hunter's food. If the hunter doesn't have 
    //2 food when they are instructed to eat, they eat as much as they 
    //can (0 or 1 unit), but the hunter is no longer healthy. 
    //(A normal traveler eats only 1 unit of food.)

    Hunter.prototype.eat = function () {
        if (this.food >= 2) {
            this.food = this.food - 2;
        }
        else if (this.food >= 1) {
            this.food = this.food - 1;
            this.isHealthy = false; 
        }
        else {
            this.isHealthy = false;
        }
    
    }

    //......................................................................

    //Transfers numOfFoodUnits from the hunter to a different traveler. 
    //If the hunter has less food than they are being asked to give, then 
    //no food should be transferred

    Hunter.prototype.giveFood = function(traveler, numOfFoodUnits){
        // check if hunter has enough food
        // check hunters food (this.food) against the amount of food to 
        // transfer (numOfFoodUnits)
        if (this.food >= numOfFoodUnits){
            traveler.food = traveler.food + numOfFoodUnits
            this.food = this.food - numOfFoodUnits
        }

    }

    //......................................................................

    // Create a wagon that can hold 4 people
    let wagon = new Wagon(4);
    // Create five travelers
    let henrietta = new Traveler('Henrietta');
    let juan = new Traveler('Juan');
    let drsmith = new Doctor('Dr. Smith');
    let sarahunter = new Hunter('Sara');
    let maude = new Traveler('Maude');
    console.log(`#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
    wagon.join(henrietta);
    console.log(`#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
    wagon.join(juan);
    wagon.join(drsmith);
    wagon.join(sarahunter);
    wagon.join(maude); // There isn't room for her!
    console.log(`#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
    console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);
    sarahunter.hunt(); // gets 5 more food
    drsmith.hunt();
    console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);
    henrietta.eat();
    sarahunter.eat();
    drsmith.eat();
    juan.eat();
    juan.eat(); // juan is now hungry (sick)
    console.log(`#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
    console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);
    drsmith.heal(juan);
    console.log(`#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`);
    sarahunter.giveFood(juan, 4);
    sarahunter.eat(); // She only has 1, so she eats it and is now sick
    console.log(`#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
    console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);



}());