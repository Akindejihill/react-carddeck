import React, { useState } from 'react';
import axios from 'axios';
import NewDeckButton from './NewDeckButton';
import NewCardButton from './NewCardButton';
import CardHand from './CardHand';
import './style.css'

function App() {

    const [deck, setDeck] = useState({id : -1, remaining : 0});
    const [hand, setHand] = useState([]);
    const [disabled, setDisabled] = useState(false);


    const getNewDeck = () => {
        axios.get( 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1' )
        .then( (response) => {
                const newDeck = { id :response.data.deck_id, remaining : response.data.remaining }
                setHand([]);
                setDeck(newDeck);
                setDisabled(false);
            }
        )
        .catch(function (error) {
                console.error(error);
        });
    }

    const getNewCard = () => {
        axios.get(`https://deckofcardsapi.com/api/deck/${deck.id}/draw/?count=1`)
        .then(response => {
            if(response.data.success)
            {
                const angle = () => Math.random() * 90 - 45;
                const randomX = () => Math.random() * 40 - 20;
                const randomY = () => Math.random() * 40 - 20;

                const URL = response.data.cards[0].image;
                const code = response.data.cards[0].code;

                //update cards remaning in deck
                setDeck(deck => ({...deck, remaining : response.data.remaining}));

                //add card to hand
                setHand(hand => ([...hand, {URL : URL, code : code, angle: angle(), randomX : randomX(), randomY : randomY()} ]));

                if (response.data.remaining < 1)
                {
                    setDisabled(true);
                }
            }
            else throw new Error("Something broke the API. I didn't do it!");
        })
        .catch(function (error) {
                console.error(error);
        });
    }


    return (
        <div className="App">
            <header className="App-header">
                <h1>Deck of cards!</h1>
            </header>
            <div id="content">
                <div id="card-ui">
                    <ol>
                        <li>Press "Shuffle!" to shuffle the deck</li>
                        <li>Press "New Card!" button to deal a card</li>
                    </ol>
                    <NewDeckButton getNewDeck={getNewDeck} />  <NewCardButton getNewCard={getNewCard} disabled={disabled}/>
                </div>
                <div id="card-hand">
                    <CardHand key={deck.id} deck={deck} hand={hand}/>
                </div>
            </div>
        </div>
    );
}

export default App;
