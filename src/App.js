import React from 'react';
import Rock from './icons/Rock';
import Paper from './icons/Paper';
import Scissors from './icons/Scissors';
import './App.css';

const choises = [
  { id:1, name: 'rock', component: Rock, losesTo: 2},
  { id:2, name: 'paper', component: Paper, losesTo: 3},
  { id:3, name: 'scissors', component: Scissors, losesTo: 1},

]


class App extends React.Component {

  constructor() {
    super();
    // states
    this.state = {
      wins: 0,
      losses: 0,
      userChoise: null,
      computerChoise: null,
      gameState: null,
    }

    // methods
    this.restartGame = this.restartGame.bind(this);
    this.handleUserChoise = this.handleUserChoise.bind(this);
    this.renderComponent = this.renderComponent.bind(this);
  }

  componentDidMount(){
    this.restartGame();
  }

 


  // обнуляєм значення
  restartGame() {
    // створюєм логіку вибору бота гри на основі варіантів ходів та рандому
    const randomChoise = choises[Math.floor(Math.random() * choises.length)];
    this.setState({
      gameState: null,
      userChoise: null,
      computerChoise: randomChoise,
    });
  }

  // записуєм вибір гравця
  handleUserChoise(choise){
    const chosenChoise = choises.find(c => c.id === choise);
    const computerChoise = this.state.computerChoise;
    this.setState({
      userChoise: chosenChoise,
    });
    // прописуєм логіку гри win / losse
    if(chosenChoise.losesTo === computerChoise.id){
      // losse
      this.setState(state => {
        state.losses = this.state.losses + 1;
        state.gameState = 'losse';
      });
    }else if(computerChoise.losesTo === chosenChoise.id){
      // win
      this.setState(state => {
        state.wins = this.state.wins + 1;
        state.gameState = 'win';
      });
    }else if(computerChoise.id === chosenChoise.id){
      // draw
      this.setState(state => {
        state.gameState = 'draw';
      });
    }
    
  }

  // рендер іконок вибору бота
  renderComponent(choise) {
    console.log(choise)
    const Component = choise.component;
    return <Component />;
  }

  render() {
    
    console.log(this.state.losses)
    console.log(this.state.wins)
    return (
      <div className="app">
        {/* information goes here */}
        <div className="info">
          <h2>Rock. Paper. Scissors</h2>

          {/* wins vs losses stats */}
          <div className="wins-losses">
            <div className="wins">
              <span className="number">{this.state.wins}</span>
              <span className="text">{this.state.wins === 1 ? 'Win' : 'Wins'}</span>
            </div>

            <div className="losses">
              <span className="number">{this.state.losses}</span>
              <span className="text">{this.state.losses === 1 ? 'Losse' : 'Losses'}</span>
            </div>
          </div>
        </div>

        {/* the popup to show win/loss/draw */}
        {this.state.gameState && (
          <div className="game-state" onClick={() => this.restartGame()}>
            <div>
              <div className='game-state-content'>
                <p>{this.renderComponent(this.state.userChoise)}</p>
                {this.state.gameState === 'win' && <p>You won!</p>}
                {this.state.gameState === 'losse' && <p>You lost!</p>}
                {this.state.gameState === 'draw' && <p>You drew!</p>}
                <p>{this.renderComponent(this.state.computerChoise)}</p>
              </div>
              <button>Play Again</button>
            </div>
          </div>
        )}

        <div className="choices">
          {/* choices captions */}
          <div>You</div>
          <div />
          <div>Computer</div>

          {/* записуэм вибір гравця в handleUserChoise(choise) для порывняння з id*/}
          <div>
            <button className="rock" onClick={() => this.handleUserChoise(1)}>
              <Rock />
            </button>
            <button className="paper" onClick={() => this.handleUserChoise(2)}>
              <Paper />
            </button>
            <button className="scissors" onClick={() => this.handleUserChoise(3)}>
              <Scissors />
            </button>
          </div>

          <div className="vs">vs</div>

          {/* show the computer's choice */}
          <div>
            <button className="computer-choice">?</button>
          </div>
        </div>
      </div>
  );
}}

export default App;

