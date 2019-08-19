import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';
import { choice } from './helpers'


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.1
  };

  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard()
    }
  
    
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];

    for (let rowIdx = 0; rowIdx < this.props.nrows; rowIdx++) {
      let r = [];
      for (let colIdx = 0; colIdx < this.props.ncols; colIdx++) {
        r.push(Math.random() < this.props.chanceLightStartsOn);
      }
      board.push(r);
    }
    return board;
  }

  // createBoard() {
  //   let board = [];
  //   let trueFalse = [true, false];

  //   for (let rowIdx = 0; rowIdx < this.props.nrows; rowIdx++) {
  //     let r = [];
  //     for (let colIdx = 0; colIdx < this.props.ncols; colIdx++) {
  //       r.push(choice(trueFalse));
  //     }
  //     board.push(r);
  //   }
  //   return board;
  // }

  /** handle changing a cell: update board & determine if winner */

  // FIXME pass coordinate from cell to flipCellsAround 
  // maybe event handler not working...maybe

  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);
    console.log("flipCellsAround", coord, y, x);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);
    flipCell(y - 1, x);
    flipCell(y + 1, x);
    
    let hasWon = this.state.hasWon;

    // board.every(row => {
    //   return ow.every(cell => cell === false)
    // }); 

    // hasWon = true;
    // }
    for (let row of board) {
      let result = row.some(cell => cell === true)
      if (result) {
        hasWon = false;
        break;
      }
      hasWon = true;
    }

    // var hasWon = this.board.every(
    //   row => row.every(
    //     cell => cell === false
    //   )
    // )

    this.setState({ board, hasWon });
  }


  /** Render game board or winning message. */

  render() {

    const tableElement = this.state.board.map((row, y) => (
      <tr>
        {row.map((cell, x) => <Cell isLit={cell} flipCellsAroundMe={() => this.flipCellsAround(`${y}-${x}`)} />)}
      </tr>
    ));
    
    return <table><tbody>{tableElement}</tbody></table>
  }

  // TODO
  // if the game is won, just show a winning msg & render nothing else
  // if this.state.hasWon === true 

}


export default Board;
