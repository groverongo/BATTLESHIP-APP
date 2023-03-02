import { BoardSize } from "./Constant.js";
import {DEBUG_LOG} from './Constant.js'

// An array with the lengths of each ship that'll be created
const ShipLenghts = [2, 3, 3, 4, 5];

class ShipPosition {
    constructor(length, coordinate, is_horizontal){
        this.length = length;
        this.coordinate = coordinate;
        this.is_horizontal = is_horizontal;
    }

    getMaxCoordinate(){
        // Clone the coordinate from the object
        let maxCoordinate = [...this.coordinate];

        // Depending on the orientation, length applied to the respective component
        if (this.is_horizontal)
            maxCoordinate[0] += (this.length - 1);
        else 
            maxCoordinate[1] += (this.length - 1);

        return maxCoordinate
    }

    // Method that returns a bool if the ship is theoretically inside the board
    insideBoard(){
        // If the ship is horizontal
        if(this.is_horizontal)
            // choose X values
            return this.coordinate[0] + this.length <= BoardSize;
        // Else, choose Y values
        return this.coordinate[1] + this.length <= BoardSize;
    }

    verifyCollision(other){
        // MC: Max Coordinate
        const [thisMC, otherMC] = [this.getMaxCoordinate(), other.getMaxCoordinate()];

        // Are colinear
        if (this.is_horizontal == other.is_horizontal){

        }
        else {

        }

        return false;
    }
};

// Simple func for random number [0, num)
function RandInt(num){
    return Math.floor(Math.random() * num);
}

// Simple func for random boolean
function RandBool(){
    return Math.random() < 0.5;
}

export default function ShipsInfo(){
    // Create result array with ship information on board
    const infoArray = new Array();
    /* 
    Create each ship and verify that: 
    1. it's inside the board
    2. it doesn't collide with other ships
    */
    for(let current = 0; current<ShipLenghts.length; current++){
        // New ship object
        let info = new ShipPosition(ShipLenghts[current], [RandInt(BoardSize), RandInt(BoardSize)], RandBool());
        
        DEBUG_LOG(info);

        // Reset creation if not inside
        if(!info.insideBoard()){
            current--;
            continue;
        }

        // Verify that there aren't any collisions with the previously created ships
        let previous;
        for(previous = 0; previous < current; previous++){
            // If ships collide, cut loop
            if(info.verifyCollision(infoArray[0])){
                break;
            }
        }

        // if the index never got to the current index, create ship again
        if(previous != current){
            current--;
            continue;
        }

        // Everything correct so push
        infoArray.push(info);
    }   
    return infoArray; 
};