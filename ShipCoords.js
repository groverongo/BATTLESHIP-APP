// An array with the lengths of each ship that'll be created
const ShipLenghts = [2, 3, 3, 4, 5];
// BoardSize
const BoardSize = 10;

class ShipPosition {
    constructor(length, coordinates, is_horizontal){
        this.length = length;
        this.coordinates = coordinates;
        this.is_horizontal = is_horizontal;
    }

    // Method that returns a bool if the ship is theoretically inside the board
    insideBoard(){
        // If the ship is horizontal
        if(this.is_horizontal)
            // choose X values
            return this.coordinates[0] + this.length <= BoardSize;
        // Else, choose Y values
        return this.coordinates[1] + this.length <= BoardSize;
    }

    verifyCollision(other){

    }
};

// Simple func for random number [0, num)
const RandInt = (num) => {
    return Math.floor(Math.random() * num);
};

// Simple func for random boolean
const RandBool = () => {
    return Math.random() < 0.5;
};

const ShipsInfo = () => {
    // Create result array with ship information on board
    const infoArray = new Array();
    /* 
    Create each ship and verify that: 
    1. it's inside the board
    2. it doesn't collide with other ships
    */
    for(let current = 0; i<ShipLenghts.length; current++){
        // New ship object
        let info = new ShipPosition(RandInt, [RandInt(BoardSize), RandInt(BoardSize)], RandBool());

        // Verify that there aren't any collisions with the previously created ships
        for(let previous = 0; previous < current; previous++){

        }

        // Everything correct so push
        infoArray.push(info);
    }   
    return infoArray; 
};