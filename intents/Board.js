import { useState, useEffect } from "react";
import { View, Button, Text } from "react-native";
import ShipsInfo from "../ShipInfo.js";
import { BoardSize, DEBUG_LOG, APIURL } from "../Constant.js";
import * as SecureStore from 'expo-secure-store';

const waterColor = '#48F';
const shipColor = 'darkgray';


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
        board.push(row);
    }
    return board;
}

export function BoardView() {

    // State that holds the values of an array of objects from the ShipInfo class
    const [shipsInfo, setShipsInfo] = useState({});

    // State that controls the Board Component
    const [board, setBoard] = useState(CreateEmptyBoard());

    useEffect(() => {
        SecureStore.getItemAsync('token').then(token => {
            fetch(APIURL + '/api/boards', {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()).then(respSI => setShipsInfo(respSI))
        })
    }, []);

    useEffect( () => {
        // An empty board must be created
        let temporaryBoard = CreateEmptyBoard();

        // Paint for each ship
        for (let iShip = 0; iShip < shipsInfo.length; iShip++) {
            // Paint regarding the length of the ship
            for (let j = 0; j < shipsInfo[iShip].length; j++) {
                if (shipsInfo[iShip].is_horizontal)
                    temporaryBoard[shipsInfo[iShip].coordinate[1]][shipsInfo[iShip].coordinate[0] + j] = true;
                else
                    temporaryBoard[shipsInfo[iShip].coordinate[1] + j][shipsInfo[iShip].coordinate[0]] = true;
            }
        }

        // Assign the temporary board to the state's board
        setBoard(temporaryBoard);
    }, [shipsInfo])

    function saveBoard() {
        SecureStore.getItemAsync('token').then(token => {
            fetch(APIURL + '/api/boards', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(shipsInfo)
            })
        })
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
                            {row.map(cell => <CellView hasShip={cell} />)}
                        </View>
                    )
                })}
            </View>

            {/* Buttons for creating and saving board */}
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <Button title='Create Board' onPress={() => setShipsInfo(ShipsInfo())} />
                <Button title='Save Board' onPress={saveBoard} />
            </View>

        </View>
    );
}