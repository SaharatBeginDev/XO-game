let startBtn = document.getElementById('startBtn');
let status = document.getElementById('status');
let boardGame = document.querySelector('.board');
let f1 = document.getElementById('f1');
let f2 = document.getElementById('f2');
let f3 = document.getElementById('f3');
let f4 = document.getElementById('f4');
let f5 = document.getElementById('f5');
let f6 = document.getElementById('f6');
let f7 = document.getElementById('f7');
let f8 = document.getElementById('f8');
let f9 = document.getElementById('f9');
let allFields = document.querySelectorAll('.field');

//Initial state
let gameStart = false;
boardGame.classList.add('cannot-click');
let turn = 'X';
let xStore = [];
let oStore = [];
let count = 0;

startBtn.addEventListener('click', () => {
  gameStart = true;
  turn = 'X';
  status.innerHTML = '';
  startBtn.classList.add('cannot-click');
  startBtn.style = 'opacity: .5';
  boardGame.classList.remove('cannot-click');
  allFields.forEach( (item) => {
    item.innerHTML = '';
    item.classList.remove('cannot-click');
    item.style = 'background-color: white;';
  })
  console.log(allFields.length)
}); //startBtn

allFields.forEach( (field, index) => {
  field.addEventListener('click', () => {
    if(turn == 'X'){
      tacToe(field, index, 'X', xStore)
      // field.innerHTML = 'X'
      turn = 'O';
    } else{
      tacToe(field, index, 'O', oStore)
      turn = 'X';
    }

  })
})

function tacToe(field, index, turn, arr) {
  field.innerHTML = turn;
  // turn = 'O';
  arr.push(index + 1);
  field.classList.add('cannot-click');
  field.style = 'background-color: black; color: white;'
  //check win
  if(winner(arr)){
    status.innerHTML = turn + ' is winner';
    gameStart = false;
    xStore = [];
    oStore = [];
    count = 0;
    boardGame.classList.add('cannot-click');
    startBtn.classList.remove('cannot-click');
    startBtn.style = 'opacity: 1';
  }
  
  ++count;
  if(count === 9){
    startBtn.classList.remove('cannot-click');
    startBtn.style = 'opacity: 1';
    gameStart = false;
    xStore = [];
    oStore = [];
    count = 0;
    turn = 'X'
  }
}

//Check subset in set array
function checkSubset(parentArray, subsetArray){
  return subsetArray.every((el) => {
    return parentArray.includes(el)
  })
}//Check subset in set array

//winner function
function winner(arr) {
  //win condition
  let row1 = [1,2,3];
  let row2 = [4,5,6];
  let row3 = [7,8,9];
  let col1 = [1,4,7];
  let col2 = [2,5,8];
  let col3 = [3,6,9];
  let dia1 = [1,5,9];
  let dia2 = [3,5,7];
  let winCindition = [row1, row2, row3, col1, col2, col3, dia1, dia2];

  //sort array
  arr.sort();
  
  //Has Winner yet?
  let hasWinner = false;
  winCindition.forEach( (condition) => {
    if(checkSubset(arr, condition)){
      hasWinner = true;
    }
  });
  return hasWinner;
}//winner function
