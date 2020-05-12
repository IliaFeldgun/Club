import React from 'react';
import ReactDOM from 'react-dom';
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