import React, { useState } from 'react';
import '../styles/deck.css';

// Deck component
export const GenerateCards = () => {
  const suits = ['♥', '♦', '♣', '♠'];
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  const [deck, setDeck] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const [dealtPlayerCard1, setDealtPlayerCard1] = useState(null); // New state to store the players 1st card
  const [dealtPlayerCard2, setDealtPlayerCard2] = useState(null);
  const [dealtDealerCard1, setDealtDealerCard1] = useState(null); // New state to store the dealers 1st card
  const [dealtDealerCard2, setDealtDealerCard2] = useState(null);

  const initializeDeck = () => {
    setGameOver(false);
    // create the deck
    const newDeck = [];
    for (const suit of suits) {
      for (const rank of ranks) {
        newDeck.push({ suit, rank });
      }
    }

    // shuffle the deck
    const shuffledDeck = [...newDeck];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }

    setDeck(shuffledDeck); // this means the new state of the deck goes from empty (null) to a shuffled deck of 52 cards

  };

  const dealCard = () => {
    const newDeck = [...deck];
    const [card4, card3, card2, card1] = newDeck.splice(-4); // this takes the last 4 cards from the shuffled deck
    setDeck(newDeck);
    setDealtPlayerCard1(card1);
    setDealtPlayerCard2(card2);
    setDealtDealerCard1(card3);
    setDealtDealerCard2(card4);
  };


  const handleDealCard = () => {
    dealCard();
    console.log(deck.length)
    if (deck.length === 0) {
      // alert('All cards have been dealt');
      (setGameOver(true))
    }
  };

  function getCardColor(suit) {
    return ['♥', '♦'].includes(suit) ? 'red' : 'black';
  }

  return (
    <div>
      <button onClick={initializeDeck}>Initialize Deck</button>
      <button onClick={handleDealCard}>Deal Card</button>
      {dealtPlayerCard1 && (
        <>
        <div className="card-container">
          <div className={`card ${getCardColor(dealtDealerCard1.suit)}`}>
            <h1 className="value">{dealtDealerCard1.rank}</h1>
            <h1 className="suit">{dealtDealerCard1.suit}</h1>
          </div>
          <div className={`card ${getCardColor(dealtDealerCard2.suit)}`}>
            <h1 className="value">{dealtDealerCard2.rank}</h1>
            <h1 className="suit">{dealtDealerCard2.suit}</h1>
          </div>
        </div> <br />
        <div className="card-container">
          <div className={`card ${getCardColor(dealtPlayerCard1.suit)}`}>
            <h1 className="value">{dealtPlayerCard1.rank}</h1>
            <h1 className="suit">{dealtPlayerCard1.suit}</h1>
          </div>
          <div className={`card ${getCardColor(dealtPlayerCard2.suit)}`}>
            <h1 className="value">{dealtPlayerCard2.rank}</h1>
            <h1 className="suit">{dealtPlayerCard2.suit}</h1>
          </div>
        </div>
        </>
      )}
      {gameOver ? (
        <h1>Game Over - You've run out of cards</h1>
      ) : console.log("in play")}
    </div>
  );
};

export default GenerateCards;
