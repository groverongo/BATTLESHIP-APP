import { View } from "react-native";

const waterColor = '#48F';
const shipColor = 'darkgray';

// Size of the square board
export const BoardSize = 10;


// Component that show a single cell of the board
function CellView({hasShip = false, cellSize = 15}){
    return (
        <View style={{
            padding: cellSize,
            // Depending if there is a ship, the color displayed will vary
            backgroundColor: hasShip ? shipColor : waterColor,
            borderStyle: "solid",
            borderColor: "#000",
            borderWidth: 1
        }} />
    );
}

// Create matrix a booleans
function CreateEmptyBoard(){
    let board = [];
    // Populate each row
    for (let i = 0; i < BoardSize; i++) {
        let row = [];
        // Populate each row cell
        for (let j = 0; j < BoardSize; j++) {
            row.push(false);
        }
        // Add row to result matrix
        board.push(fila);
    }
    return board;
}

export function BoardView(){
    
    // missing whole board component
}