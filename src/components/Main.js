import { useEffect, useState } from 'react'

export default function Main(){
    //const [value, onChangeText] = useState('Useless Placeholder');
    const [deck, setDeck] = useState([]);
    const [currentCard,setCurrentCard] = useState({'Jack':'0'});

    const suits = [ 'spades', 'diamonds', 'hearts', 'clubs' ];
    const values = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];

    function _buildDeck()
    {
        var deck, suit, value;

        deck = [];

        for (let i = 0; i < suits.length; i++) {
            suit = suits[i];
            for (let k = 0; k < values.length; k++) {
                value = values[k];
                deck.push({suit: value });
            }
        }
        
        return deck;
    }

    useEffect(() => {
        setDeck( _buildDeck() );
    },[]);

    function _onDeckClick()
    {
        var index, temp_deck;

        index = Math.floor(Math.random() * deck.length ) + 1;
        setCurrentCard( deck[ index ] );

        temp_deck = deck.splice( index, 1 )

        setDeck( temp_deck );
    }
    

    return(
        <div style={{display: "flex"}}>
            <div onClick={() => _onDeckClick()} >Deck</div>
            <div >{Object.keys(currentCard)[0]}</div>
            
            <div ></div>
      </div>
    )
}