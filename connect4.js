//selectors

var tableRow = document.getElementsByTagName('tr');
var tableCell = document.getElementsByTagName('td');
var tableSlot = document.querySelectorAll('.slot');
const playerTurn = document.querySelector('.player-turn');
const reset = document.querySelector('.reset')


for (let i = 0; i < tableCell.length; i++) {
  tableCell[i].addEventListener('click', (e) => {
    console.log(`${e.target.parentElement.rowIndex}, ${e.target.cellIndex}`)
  })
}

while(!player1) {
  var player1 = prompt('Player One: Enter your name. You will be red')
}
player1Color = '#0197f6';

while(!player2) {
  var player2 = prompt('Player Two: Enter your name. You will be blue')
}
player2Color = '#f1433f';

var currentPlayer = 1;
playerTurn.textContent = `${player1}'s turn!`


Array.prototype.forEach.call(tableCell, (cell) => {
  cell.addEventListener('click', changeColor);
  cell.style.backgroundColor = 'white'; 
});


function changeColor(e) {
  var column = e.target.cellIndex;
  var row = []

  for(var i = 5; i > -1; i--) {
    if(tableRow[i].children[column].style.backgroundColor == 'white') {
      row.push(tableRow[i].children[column]);
      if(currentPlayer === 1) {
        row[0].style.backgroundColor = player1Color;
        if(horizontalCheck() ||verticalCheck() || diagonalCheck1() || diagonalCheck2()){
          playerTurn.textContent = `${player1} Wins!`
          playerTurn.style.color = player1Color
          return (alert(`${player1} Wins!`));
        } else if(drawCheck()){
          playerTurn.textContent = 'Game is draw!'
          return alert("DRAW")
        }else {
          playerTurn.textContent = `${player2}'s turn!`;
          return currentPlayer = 2
        }
        
  }else {
    row[0].style.backgroundColor = player2Color;
    playerTurn.textContent = `${player1}'s turn!`;
    if(horizontalCheck() ||verticalCheck() || diagonalCheck1() || diagonalCheck2()){
      playerTurn.textContent = `${player2} Wins!`
      playerTurn.style.color = player2Color
      return (alert(`${player2} Wins!`));
    } else if(drawCheck()){
      playerTurn.textContent = 'Game is draw!'
      return alert("DRAW")
    }else {
      playerTurn.textContent = `${player1}'s turn!`;
      return currentPlayer = 1
    }
  }
  
    }
  }
}

function colorMatchCheck(one, two, three, four) {
  return (one === two && one === three && one === four && one !== 'white')
};


function horizontalCheck() {
  for (let row = 0; row < tableRow.length; row++) {
      for(let col = 0; col < 4; col++){
        if(colorMatchCheck( tableRow[row].children[col].style.backgroundColor, 
          tableRow[row].children[col+1].style.backgroundColor,
           tableRow[row].children[col+2].style.backgroundColor, 
          tableRow[row].children[col+3].style.backgroundColor)) {
          return true
        }
      }
  }
}

function verticalCheck() {
  for(let col= 0; col < 7; col++) {
    for(let row = 0; row < 3; row++) {
      if(colorMatchCheck( tableRow[row].children[col].style.backgroundColor, 
        tableRow[row+1].children[col].style.backgroundColor,
         tableRow[row+2].children[col].style.backgroundColor, 
        tableRow[row+3].children[col].style.backgroundColor)) {
        return true;
      }
          }
  }
}

function diagonalCheck1() {
  for(let col = 0; col < 3; col++) {
    for(let row = 0; row < 3; row++ ){
      if(colorMatchCheck(tableRow[row].children[col].style.backgroundColor,
        tableRow[row+1].children[col+1].style.backgroundColor,
        tableRow[row+2].children[col+2].style.backgroundColor,
        tableRow[row+3].children[col+3].style.backgroundColor)) {
          return true;
        }
    }
  }
}


function diagonalCheck2() {
  for(let col = 0; col < 4; col++) {
    for(let row = 5; row > 2 ; row-- ){
      if(colorMatchCheck(tableRow[row].children[col].style.backgroundColor,
        tableRow[row-1].children[col+1].style.backgroundColor,
        tableRow[row-2].children[col+2].style.backgroundColor,
        tableRow[row-3].children[col+3].style.backgroundColor)) {
          return true;
        }
    }
  }
}

function drawCheck() {
  let fullSlot= [];
  for( var i = 0; i < tableCell.length; i++) {
    if(tableCell[i].style.backgroundColor !== 'white') {
      fullSlot.push(tableCell[i])
    }
  }
  if(fullSlot.length === tableCell.length) {
    return true;
  }
}


reset.addEventListener('click', ()=> {
  tableSlot.forEach(slot =>{
   return slot.style.backgroundColor = 'white';
  });
   playerTurn.style.color = 'black';
  return (currentPlayer === 1 ? playerTurn.textContent = `${player1}'s turn` : playerTurn.textContent = `${player2}'s turn!`)
})