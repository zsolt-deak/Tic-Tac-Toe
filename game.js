class Player {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  celebrate = () => {
    console.log(`${this.name} won!`);
    alert(`${this.name} won!`);
  };
}

class Cell {
  constructor() {
    this.player = null;
    this.sign = null;
  }
}

class Board {
  constructor() {
    this.board = [
      [new Cell(), new Cell(), new Cell()],
      [new Cell(), new Cell(), new Cell()],
      [new Cell(), new Cell(), new Cell()],
    ];

    this.drawBoard();
  }

  // [1, 2, 3].map((currentNumber) => currentNumber * 2)
  // [2, 4, 6]

  //[{ name: 'T' }, { name: 'Y' }, { name: 'X' }].map((element) => element.name)
  // ['T', 'Y', 'X'].join(' _ ')
  // T _ Y _ X

  drawBoard = () => {
    console.log("\n");
    console.log(this.board[0].map((cell) => cell.sign || "_").join(" "));
    console.log(this.board[1].map((cell) => cell.sign || "_").join(" "));
    console.log(this.board[2].map((cell) => cell.sign || "_").join(" "));
    console.log("\n");

    document.getElementById("cell1").innerText = this.board[0][0].sign;
    document.getElementById("cell2").innerText = this.board[0][1].sign;
    document.getElementById("cell3").innerText = this.board[0][2].sign;
    document.getElementById("cell4").innerText = this.board[1][0].sign;
    document.getElementById("cell5").innerText = this.board[1][1].sign;
    document.getElementById("cell6").innerText = this.board[1][2].sign;
    document.getElementById("cell7").innerText = this.board[2][0].sign;
    document.getElementById("cell8").innerText = this.board[2][1].sign;
    document.getElementById("cell9").innerText = this.board[2][2].sign;
  };

  move = (player, sign, row, column) => {
    if (this.board[row][column].player !== null) {
      console.log("Cell already assigned");
      alert("Cell already assigned");

      return false;
    } else {
      this.board[row][column].player = player;
      this.board[row][column].sign = sign;

      this.drawBoard();

      return true;
    }
  };

  getWinner = () => {
    //lines
    if (
      this.board[0][0].sign === this.board[0][1].sign &&
      this.board[0][1].sign === this.board[0][2].sign
    ) {
      return this.board[0][0].player;
    }

    if (
      this.board[1][0].sign === this.board[1][1].sign &&
      this.board[1][1].sign === this.board[1][2].sign
    ) {
      return this.board[1][0].player;
    }

    if (
      this.board[2][0].sign === this.board[2][1].sign &&
      this.board[2][1].sign === this.board[2][2].sign
    ) {
      return this.board[2][0].player;
    }

    // columns
    if (
      this.board[0][0].sign === this.board[1][0].sign &&
      this.board[1][0].sign === this.board[2][0].sign
    ) {
      return this.board[0][0].player;
    }

    if (
      this.board[0][1].sign === this.board[1][1].sign &&
      this.board[1][1].sign === this.board[2][1].sign
    ) {
      return this.board[0][1].player;
    }

    if (
      this.board[0][2].sign === this.board[1][2].sign &&
      this.board[1][2].sign === this.board[2][2].sign
    ) {
      return this.board[0][2].player;
    }

    //primary diagonal
    if (
      this.board[0][0].sign === this.board[1][1].sign &&
      this.board[1][1].sign === this.board[2][2].sign
    ) {
      return this.board[0][0].player;
    }

    //secondary diagonal
    if (
      this.board[0][2].sign === this.board[1][1].sign &&
      this.board[1][1].sign === this.board[2][0].sign
    ) {
      return this.board[0][2].player;
    }

    //defaut
    return null;
  };

  winCheck = () => {
    //lines
    for (let index = 0; index < 2; index++) {
      if (this.board[0][index].sign !== this.board[0][index + 1].sign) {
        return false;
      }
    }

    for (let index = 0; index < 2; index++) {
      if (this.board[1][index].sign !== this.board[1][index + 1].sign) {
        return false;
      }
    }

    for (let index = 0; index < 2; index++) {
      if (this.board[2][index].sign !== this.board[2][index + 1].sign) {
        return false;
      }
    }

    // columns
    for (let index = 0; index < 2; index++) {
      if (this.board[index][0].sign !== this.board[index + 1][0].sign) {
        return false;
      }
    }

    for (let index = 0; index < 2; index++) {
      if (this.board[index][1].sign !== this.board[index + 1][1].sign) {
        return false;
      }
    }

    for (let index = 0; index < 2; index++) {
      if (this.board[index][2].sign !== this.board[index + 1][2].sign) {
        return false;
      }
    }
  };
}

class Game {
  constructor() {
    this.board = new Board();
    this.players = [];
    this.signs = [];
    this.turn = 0;
    this.isFinished = false;
  }

  addPlayer = (player, sign) => {
    if (this.players.length < 2) {
      this.players.push(player);
      this.signs.push(sign);
    } else {
      console.log("Max players excedeed!");
    }
  };

  makeMove = (row, column) => {
    if (this.players.length === 2) {
      if (!this.isFinished) {
        const successMove = this.board.move(
          this.players[this.turn],
          this.signs[this.turn],
          row,
          column
        );

        if (successMove) {
          this.turn = 1 - this.turn;

          if (this.board.getWinner()) {
            this.isFinished = true;
            this.board.getWinner().celebrate();
          }
        }
      } else {
        console.log("The game is finished!");
        alert("The game is finished!");
      }
    } else {
      console.log("Cannot make move!");
    }
  };
}

const p1 = new Player("O-player", 10);
const p2 = new Player("X-player", 10);
// const p3 = new Player("Marius", 10);

const game1 = new Game();
game1.addPlayer(p1, "O");
game1.addPlayer(p2, "X");
// game1.addPlayer(p3, "Y");

// game1.makeMove(0, 0);
// game1.makeMove(2, 2);
// game1.makeMove(1, 0);
// game1.makeMove(2, 1);
// game1.makeMove(2, 0);

// // try after finsihed
// game1.makeMove(0, 2);

document
  .getElementById("cell1")
  .addEventListener("click", () => game1.makeMove(0, 0));
document
  .getElementById("cell2")
  .addEventListener("click", () => game1.makeMove(0, 1));
document
  .getElementById("cell3")
  .addEventListener("click", () => game1.makeMove(0, 2));
document
  .getElementById("cell4")
  .addEventListener("click", () => game1.makeMove(1, 0));
document
  .getElementById("cell5")
  .addEventListener("click", () => game1.makeMove(1, 1));
document
  .getElementById("cell6")
  .addEventListener("click", () => game1.makeMove(1, 2));
document
  .getElementById("cell7")
  .addEventListener("click", () => game1.makeMove(2, 0));
document
  .getElementById("cell8")
  .addEventListener("click", () => game1.makeMove(2, 1));
document
  .getElementById("cell9")
  .addEventListener("click", () => game1.makeMove(2, 2));
