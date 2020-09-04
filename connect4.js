var tableRow = document.getElementsByTagName('tr');
var tableCell = document.getElementsByTagName('td');
var tableSlot = document.querySelectorAll('.slot');
const playerTurn = document.querySelector('.player-turn');
const reset = document.querySelector('.reset')



class Players {
  constructor() {
  this.player1 = prompt('Player One: Enter your name. You will be red')
  this.player2 = prompt('Player Two: Enter your name. You will be blue')
  this.player1Color = '#0197f6'
  this.player2Color = '#f1433f'
  }
}
let players = new Players;


let currentPlayer = 1;
playerTurn.textContent = `${players.player1}'s turn!`



Array.prototype.forEach.call(tableCell, (cell) => {
  cell.addEventListener('click', checkForWinner);
  cell.style.backgroundColor = 'white'; 
});


// checking for a winner

  function checkForWinner(e) {
    let column = e.target.cellIndex; //from left to right 0-6 each columns 
    console.log('this is index of column', column)
    let row = []
  
    for(var i = 5; i > -1; i--) { // i from down to up
      if(tableRow[i].children[column].style.backgroundColor == 'white') {
        row.push(tableRow[i].children[column]);
        if(currentPlayer === 1) {
          row[0].style.backgroundColor = players.player1Color;
          if(newCheck.horizontalCheck() ||newCheck.verticalCheck() || newCheck.diagonalCheck1() || newCheck.diagonalCheck2()){
            playerTurn.textContent = `${players.player1} Wins!`
            playerTurn.style.color = players.player1Color
            return (alert(`${players.player1} Wins!`));
          } else if(drawCheck()){
            playerTurn.textContent = 'Game is draw!'
            return alert("DRAW")
          }else {
            playerTurn.textContent = `${players.player2}'s turn!`;
            return currentPlayer = 2
          }
          
    }else {
      row[0].style.backgroundColor = players.player2Color;
      playerTurn.textContent = `${players.player1}'s turn!`;
      if(newCheck.horizontalCheck() ||newCheck.verticalCheck() || newCheck.diagonalCheck1() || newCheck.diagonalCheck2()){
        playerTurn.textContent = `${players.player2} Wins!`
        playerTurn.style.color = players.player2Color
        return (alert(`${players.player2} Wins!`));
      } else if(drawCheck()){
        playerTurn.textContent = 'Game is draw!'
        return alert("DRAW")
      }else {
        playerTurn.textContent = `${players.player1}'s turn!`;
        return currentPlayer = 1
      }
    }
    
      }
    }
  }  



function colorMatchCheck(one, two, three, four) {
  return (one === two && one === three && one === four && one !== 'white')
};




class CheckAllDirections {

  horizontalCheck() {
    for (let row = 0; row < tableRow.length; row++) {
        for(let col = 0; col < 4; col++){
          if(colorMatchCheck( tableRow[row].children[col].style.backgroundColor, 
            tableRow[row].children[col+1].style.backgroundColor,
             tableRow[row].children[col+2].style.backgroundColor, 
            tableRow[row].children[col+3].style.backgroundColor)) {
            return true
          }}}}

  verticalCheck() {
    for(let col= 0; col < 7; col++) {
      for(let row = 0; row < 3; row++) {
        if(colorMatchCheck( tableRow[row].children[col].style.backgroundColor, 
          tableRow[row+1].children[col].style.backgroundColor,
           tableRow[row+2].children[col].style.backgroundColor, 
          tableRow[row+3].children[col].style.backgroundColor)) {
          return true;
        }}}}



  diagonalCheck1() {
    for(let col = 0; col < 3; col++) {
      for(let row = 0; row < 3; row++ ){
        if(colorMatchCheck(tableRow[row].children[col].style.backgroundColor,
          tableRow[row+1].children[col+1].style.backgroundColor,
          tableRow[row+2].children[col+2].style.backgroundColor,
          tableRow[row+3].children[col+3].style.backgroundColor)) {
            return true;
          }}}}

  diagonalCheck2() {
    for(let col = 0; col < 4; col++) {
      for(let row = 5; row > 2 ; row-- ){
        if(colorMatchCheck(tableRow[row].children[col].style.backgroundColor,
          tableRow[row-1].children[col+1].style.backgroundColor,
          tableRow[row-2].children[col+2].style.backgroundColor,
          tableRow[row-3].children[col+3].style.backgroundColor)) {
            return true;
          }}}}
        
        }


let newCheck = new CheckAllDirections;



function drawCheck() {
  let fullSlot= [];
  for( let i = 0; i < tableCell.length; i++) {
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
  return (currentPlayer === 1 ? playerTurn.textContent = `${players.player1}'s turn` : playerTurn.textContent = `${players.player2}'s turn!`)
})