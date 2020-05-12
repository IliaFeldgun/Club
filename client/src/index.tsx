import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import CardFan from './components/CardFan';
import CardBoard from './components/CardBoard';
import ScoreBoard from './components/ScoreBoard';

ReactDOM.render(
  <React.StrictMode>
    <CardBoard>
      <CardFan cards={ [
        {suit:"spades", rank:"Q"},
        {suit:"hearts", rank:"7"},
        {suit:"clubs", rank:"J"},
        {suit:"diamonds", rank:"A"},
        {suit:"diamonds", rank:"2"}
      ]}/>
    </CardBoard>
    <ScoreBoard>
    </ScoreBoard>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
