
window.onload = init

function init(){
    setBoard();
};

//Controller which will glue together the model and the view
let controller = {

};

//Model

let model = {
    board: [0,0,0,0,0,0,0,0,0],
    playerMarkers: {
        user: 0,
        computer: 0,
    },
    computerImg: {
        1: "o-img",
        2: "x-img",
    },
    winCombos: [
        [0, 1, 2],
        [0, 3, 7],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 9],
    ],
    checkWinner: function(){


    },
    updateBoard: function(element){
        let index = element.id
        this.board[index] = this.playerMarkers.user
    },
    computerMove: function(){}

};




//Handles board clicks when a player selects a move
function clickHandler(e){
    let element = e.target
    if (model.playerMarkers.user == 1 && model.board[element.id] == 0){
        element.classList.add("o-img")
    } else if (model.playerMarkers.user == 2 && model.board[element.id] == 0){
        element.classList.add("x-img")
    } else if (model.playerMarkers.user == 0){alert("Select X or O.")}
    model.updateBoard(element)
    placeComputer(model.board)
    displayComputer(model.board)
    console.log(model.board)
    checkWinner(model.board, model.playerMarkers)
};


//Sets board to handle clicks
function setBoard(){
    let arr = Array.from(document.getElementsByClassName("square"))
    for (let i=0; i < arr.length; i++){
        arr[i].setAttribute("id", i);
        arr[i].onclick = clickHandler
    }
    let o = document.getElementById("o-selector");
    let x = document.getElementById("x-selector");
    let computer = document.getElementById("computer-marker");
    o.onclick = function(){
            if(model.playerMarkers.user == 0){
                o.style.border = "3px solid black"
                model.playerMarkers.user = 1;
                model.playerMarkers.computer = 2;
                x.style.border = "1px solid black"
                computer.classList.add("x-img")
        }
    };
    x.onclick = function(){
        if(model.playerMarkers.user == 0){
            x.style.border = "3px solid black"
            model.playerMarkers.user = 2;
            model.playerMarkers.computer = 1;
            o.style.border = "1px solid black"
            computer.classList.add("o-img")
        }
    }
};


// displays the computer's move
function displayComputer(board){
    let boardArr = Array.from(document.getElementsByClassName("square"));
    for (let i = 0; i < board.length; i++){
        if(board[i] == 1){
            boardArr[i].classList.add("o-img")
        } else if (board[i] == 2){
            boardArr[i].classList.add("x-img")
        }
    }
}

// selects computer's place on the board
function placeComputer(board){
    let newArr = board;
    let slice;
    for (let i = 0; i < board.length; i++){
        if (i == 0 || i % 3 == 0){
            slice = board.slice(i, i + 3);
            if (slice.reduce((a,b)=>a+b) == 0) {
                slice[1] = model.playerMarkers.computer;
                newArr.splice(i, 3, slice)
                break;
            }
        }
    }
    model.board = newArr.flat();
};


// Need to pass in a function that ends the game once there is a winner
function checkWinner(board, playerMarker){
    let vertical = [];
    let row = [];
    for (let i = 0; i < 3; i++){
        vertical.push(board[i], board[i+3], board[i+6])
        if (vertical.every(value => value === playerMarker.user)){
           alert("You win!")
        } else if (vertical.every(value => value === playerMarker.computer)){
            alert("You lose!")
        } vertical = [];
    };
    for (let i = 0; i < board.length; i++){
        if (i % 3 == 0){
            row = board.slice(i, i+3);
        }
        if (row.every(value => value === playerMarker.user)){
            alert("You win!")
            break;
        } else if (row.every(value => value === playerMarker.computer)){
            alert("You lose!")
            break;
        }
    };
};


