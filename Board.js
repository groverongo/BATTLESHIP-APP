import { useState } from "react";
import { View } from "react-native";
import ShipsInfo from "./ShipInfo";

const waterColor = '#48F';
const shipColor = 'darkgray';

// Size of the square board
export const BoardSize = 10;


// Component that show a single cell of the board
function CellView({ hasShip = false, cellSize = 15 }) {
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
function CreateEmptyBoard() {
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

export function BoardView() {

    // State that holds the values of an array of objects from the ShipInfo class
    const [shipsInfo, setShipsInfo] = useState({});

    // State that controls the Board Component
    const [board, setBoard] = useState(CreateEmptyBoard());

    // Fcuntion that will create a playable board
    function genBoard() {
        // An empty board must be created
        let temporaryBoard = CreateEmptyBoard();

        // Create the array of shipinfo and set the state
        setShipsInfo(ShipsInfo());

        // Paint for each ship
        for (let iShip = 0; iShip < shipsInfo.length; iShip++) {
            // Paint regarding the length of the ship
            for (let j = 0; j < shipsInfo[iShip].length; j++) {
                if (shipsInfo[iShip].Horizontal)
                    temporaryBoard[shipsInfo[iShip].coordinate[1]][shipsInfo[iShip].coordinate[0] + j] = true;
                else
                    temporaryBoard[shipsInfo[iShip].coordinate[1] + j][shipsInfo[iShip].coordinate[0]] = true;
            }
        }

        // Assign the temporary board to the state's board
        setBoard(temporaryBoard);
    }

    return (
        <View style={{ padding: 30 }}>

            {/* View the ui of a board */}
            <View style={{ alignItems: "center", marginBottom: 10 }}>
                {board.map(row => {
                    return (
                        <View style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap'
                        }}>
                            {row.map(cell => <Casilla barco={cell} />)}
                        </View>
                    )
                })}
            </View>

            {/* Buttons for creating and saving board */}
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <Button title='Create Board' onPress={genBoard} />
                <Button title='Save Board' onPress={saveBoard} />

            </View>

        </View>
    );
}