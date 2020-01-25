
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
    playerMarker: 0,
    computerMarker: 0,
    computerImg: {
        1: "o-img",
        2: "x-img",
    },
    checkWinner: function(){

    },
    updateBoard: function(element){
        let index = element.id
        this.board[index] = this.playerMarker
    },
    computerMove: function(){}

};



//Display functions

function clickHandler(e){
    let element = e.target
    if (model.playerMarker == 1 && model.board[element.id] == 0){
        element.classList.add("o-img")
    } else if (model.playerMarker == 2 && model.board[element.id] == 0){
        element.classList.add("x-img")
    } else if (model.playerMarker == 0){alert("Select X or O.")}
    model.updateBoard(element)
    placeComputer(model.board)
    displayComputer(model.board)
    console.log(model.board)
};

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
            if(model.playerMarker == 0){
                o.style.border = "3px solid black"
                model.playerMarker = 1;
                model.computerMarker = 2;
                x.style.border = "1px solid black"
                computer.classList.add("x-img")
        }
    }
    x.onclick = function(){
        if(model.playerMarker == 0){
            x.style.border = "3px solid black"
            model.playerMarker = 2;
            model.computerMarker = 1;
            o.style.border = "1px solid black"
            computer.classList.add("o-img")
        }
    }
};



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




function placeComputer(board){
    let newArr = board;
    let slice;
    for (let i = 0; i<board.length; i++){
        if (i == 0 || i % 3 == 0){
            slice = board.slice(i, i + 3);
            if (slice.reduce((a,b)=>a+b) == 0) {
                slice[1] = model.computerMarker;
                newArr.splice(i, 3, slice)
                break;
            }
        }
    }
    model.board = newArr.flat();
};


