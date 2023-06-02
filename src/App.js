import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utilis.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// inherit the component from the child.
class App extends React.Component {
  constructor(props) {
    // super with props in constructor to call on parent class.
    super(props);
    // setting the current state of the card deck to be shuffled.
    this.state = {
      cardDeck: makeShuffledDeck(),
      // Current cards holds the cards from the current round.
      currentCards: [],
      // CURRENT STATE
      // There is: 1. No Winners. 2. Game has not started. 3.Neither players have won any round.
      hasGameBegins: false,
      roundWinner: null,
      numberOfRoundsWonByPlayer1: 0,
      numberOfRoundsWonByPlayer2: 0,
      player1Score: 0,
      player2Score: 0,
      totalPlayer1Score: 0,
      totalPlayer2Score: 0,
      numberOfGames: 0,
    };
  }

  // Setting State for Reset Game Condition.
  //Conditions: (1) Deck Shuffled (2) Gamenot started (3) Player count set to 0. (4) No round winner. (5) currentCards is empty.
  resetGame = () => {
    this.setState({
      cardDeck: makeShuffledDeck(),
      hasGameBegins: true,
      currentCards: [],
      roundWinner: null,
      numberOfRoundsWonByPlayer1: 0,
      numberOfRoundsWonByPlayer2: 0,
      totalPlayer1Score: this.state.player1Score,
      totalPlayer2Score: this.state.player2Score,
      numberOfGames: this.state.numberOfGames + 1,
    });
  };

  // setting the state of the card as the cards are drawn.

  dealCards = () => {
    // Deal last 2 cards to currentCards
    const newCurrentCards = this.state.cardDeck.slice(-2);
    // Slice (-2) means last 2 cards.
    let newRoundWinner = null;
    newCurrentCards[0].rank > newCurrentCards[1].rank
      ? (newRoundWinner = 1)
      : (newRoundWinner = 2);

    this.setState((state) => ({
      cardDeck: state.cardDeck.slice(0, -2),
      currentCards: newCurrentCards,
      hasGameBegins: true,
      roundWinner: newRoundWinner,
      // if player 1 won, add points else no p0ints
      numberOfRoundsWonByPlayer1:
        newRoundWinner === 1
          ? state.numberOfRoundsWonByPlayer1 + 1
          : state.numberOfRoundsWonByPlayer1,
      // if player 2 won, add points else no p0ints
      numberOfRoundsWonByPlayer2:
        newRoundWinner === 2
          ? state.numberOfRoundsWonByPlayer2 + 1
          : state.numberOfRoundsWonByPlayer2,
      player1Score:
        newRoundWinner === 1 ? state.player1Score + 1 : state.player1Score,
      player2Score:
        newRoundWinner === 2 ? state.player2Score + 1 : state.player2Score,
    }));
  };

  render() {
    const currentCardElements = this.state.currentCards.map(
      ({ name, suit }, index) => (
        <div key={`${name}${suit}`}>
          {index === 0 ? "Player 1:" : "Player 2:"} {name} of {suit}
        </div>
      )
    );

    const roundWinnerMsg = this.state.roundWinner
      ? `Player ${this.state.roundWinner} won this round`
      : `This round is a tie!`;
    const player1WinRoundMsg = `Player 1 has won ${this.state.numberOfRoundsWonByPlayer1} round this game.`;
    const player2WinRoundMsg = `Player 2 has won ${this.state.numberOfRoundsWonByPlayer2} round this game.`;
    const numberRoundsLeft = this.state.cardDeck.length / 2;
    const numberRoundsLeftMsg = `There are ${numberRoundsLeft} rounds left in the game!`;
    const player1ScoreMsg = `Player 1's Score: ${this.state.totalPlayer1Score}`;
    const player2ScoreMsg = `Player 2's Score: ${this.state.totalPlayer2Score}`;
    const gameNumberMsg = `Number of Games played: ${this.state.numberOfGames}`;

    // Determine game winner

    let gameWinner = null;
    if (
      this.state.numberOfRoundsWonByPlayer1 >
      this.state.numberOfRoundsWonByPlayer2
    ) {
      gameWinner = 1;
    } else if (
      this.state.numberOfRoundsWonByPlayer1 <
      this.state.numberOfRoundsWonByPlayer2
    ) {
      gameWinner = 2;
    }
    const gameWinnerMsg = gameWinner
      ? `Player ${gameWinner} won this game!`
      : `It is a draw!`;

    const dealButtonText = numberRoundsLeft === 0 ? "Reset Game" : "Deal";

    return (
      <div className="App">
        <header className="App-header">
          <h1>High Card</h1>
          <br></br>
          <Container>
            <Row>
              <Col>{currentCardElements}</Col>
            </Row>
          </Container>

          <br />
          <Button
            variant="outline-warning"
            size="lg"
            onClick={numberRoundsLeft === 0 ? this.resetGame : this.dealCards}
          >
            {dealButtonText}
          </Button>
          <br></br>
          <p>{this.state.hasGameBegins && roundWinnerMsg}</p>
          <br></br>

          <p>{this.state.hasGameBegins && player1WinRoundMsg}</p>
          <p>{this.state.hasGameBegins && player2WinRoundMsg}</p>

          <p>{this.state.hasGameBegins && numberRoundsLeftMsg}</p>
          {/*Render winner message if the game is over*/}

          <br></br>

          <Container className="bg-danger">
            <Row>
              <Col>
                <p>{numberRoundsLeft === 0 && gameWinnerMsg}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>{this.state.hasGameBegins && gameNumberMsg}</p>
              </Col>
            </Row>

            <Row>
              <Col>
                <p>{this.state.hasGameBegins && player1ScoreMsg}</p>
              </Col>
              <Col>
                <p>{this.state.hasGameBegins && player2ScoreMsg}</p>
              </Col>
            </Row>
          </Container>
        </header>
      </div>
    );
  }
}

export default App;
