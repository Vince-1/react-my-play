import React from "react";
import "../index.css";

// import App from "./App";
// import reportWebVitals from "./reportWebVitals";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

interface PropsSquare {
  value: "X" | "O" | null;
  onClick: () => void;
}
interface StateSquare {
  value: "X" | "O" | null;
}

interface PropsBoard {
  square: ("X" | "O" | null)[];
}
interface StateBoard {
  square: ("X" | "O" | null)[];
  onClick: (i: number) => void;
  // player: "X" | "O";
  // winner: "X" | "O" | null;
}

interface GameState {
  history: {
    square: ("X" | "O" | null)[];
    player: "X" | "O";
    winner: "X" | "O" | "N" | null;
  }[];
}
// class Square extends React.Component<PropsSquare, StateSquare> {
//   // props = { value: 1 };
//   // state?:string;
//   constructor(public props: PropsSquare) {
//     super(props);
//   }
//   render() {
//     return (
//       <button className="square" onClick={() => this.props.onClick()}>
//         {this.props.value}
//       </button>
//     );
//   }
// }

function Square(props: PropsSquare) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

// class Board extends React.Component<StateBoard, {}> {
//   // player: "X" | "O" = "X";
//   // winner: "X" | "O" | null = null;
//   constructor(public props: StateBoard) {
//     super(props);

//     // this.state = { square: Array(9).fill(null), player: "X", winner: null };
//   }
//   // handleClick = (i: number) => {
//   //   if (this.state.square[i] === null && this.state.winner === null) {
//   //     const square = this.state.square.map((value, index) =>
//   //       index !== i ? value : this.state.player === "X" ? "X" : "O"
//   //     );
//   //     const player = this.state.player === "X" ? "O" : "X";
//   //     const winner = calculateWinner(square);

//   //     this.setState({
//   //       square,
//   //       player,
//   //       winner,
//   //     });
//   //   }
//   // };
//   renderSquare(i: number) {
//     // return <Square value={i} />;
//     return (
//       <Square
//         value={this.props.square[i]}
//         onClick={() => this.props.handleClick(i)}
//       />
//     );
//   }

//   render() {
//     // const status = `Next player: ${this.state.player}`;
//     // const winner =
//     //   this.state.winner === null
//     //     ? "no winner yet!"
//     //     : `Winner: ${this.state.winner}!Congratulations`;

//     return (
//       <div>
//         {/* <div className="status">{status}</div>
//         <div className="status">{winner}</div> */}
//         <div className="board-row">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//           {this.renderSquare(5)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(6)}
//           {this.renderSquare(7)}
//           {this.renderSquare(8)}
//         </div>
//       </div>
//     );
//   }
// }

function Board(props: StateBoard) {
  const renderSquare = (i: number) => (
    <Square value={props.square[i]} onClick={() => props.onClick(i)} />
  );
  return (
    <div>
      {/* <div className="status">{status}</div>
      <div className="status">{winner}</div> */}
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}
export class Game extends React.Component<{}, GameState> {
  square = Array(9).fill(null);
  player: "X" | "O" = "X";
  winner: "X" | "O" | null = null;
  // add = (s:StateBoard) => {this.setState{this.}};
  constructor(props: {}) {
    super(props);
    console.log("constrctor", this.props);
    this.state = {
      history: [{ square: Array(9).fill(null), player: "X", winner: null }],
    };
  }

  componentDidMount() {
    console.log("mount");
  }

  componentWillUnmount() {
    console.log("unmount");
  }
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    console.log(current);
    const status =
      current.winner === null
        ? `Next player: ${current.player}`
        : current.winner === "N"
        ? "no winner!"
        : `Winner: ${current.winner}!Congratulations`;

    const moves = history.map((h, index) => {
      const desc = `Go to move # ${index}`;
      return (
        <li key={index}>
          <button onClick={() => this.jumpTo(index)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            square={current.square}
            onClick={(i: number) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  jumpTo(i: number) {
    const history = this.state.history;
    if (history.length > i) {
      this.setState({ history: history.slice(0, i + 1) });
    }
  }
  handleClick(i: number) {
    const history = this.state.history;
    const current = this.state.history[history.length - 1];

    if (current.winner === null && current.square[i] === null) {
      const square = current.square.map((s, index) =>
        index === i ? current.player : s
      );
      const player = current.player === "X" ? "O" : "X";
      const winner = calculateWinner(square);
      this.setState({ history: history.concat({ square, player, winner }) });
    } else {
      return;
    }
  }
}

// ========================================

// ReactDOM.render(<Game />, document.getElementById("root"));

// ReactDOM.render(<Board />, document.getElementById("root"));
// ReactDOM.render(<App />, document.getElementById("root"));

// reportWebVitals();

function calculateWinner(square: StateBoard["square"]): "X" | "O" | "N" | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const AssembleX = square
    .map((x, index) => (x === "X" ? index : -1))
    .filter((x) => x !== -1);
  const AssembleO = square
    .map((x, index) => (x === "O" ? index : -1))
    .filter((x) => x !== -1);

  let xWin = false;
  let oWin = false;
  for (let ls of lines) {
    xWin =
      xWin ||
      ls.reduce((a: boolean, b: number) => a && AssembleX.includes(b), true);
    oWin =
      oWin ||
      ls.reduce((a: boolean, b: number) => a && AssembleO.includes(b), true);
  }
  if (xWin) {
    return "X";
  }
  if (oWin) {
    return "O";
  }
  if (square.find((x) => x === null) === undefined) {
    return "N";
  }
  return null;
}
