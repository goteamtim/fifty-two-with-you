import { useEffect, useState } from 'react'
import '../style/Main.css'

export default function Main() {
    //const [value, onChangeText] = useState('Useless Placeholder');
    const [ deck, setDeck ] = useState([]);
    const [ currentCard, setCurrentCard ] = useState({ 'Jack': '0' });
    const [ stats, setStats ] = useState({'spades':0,'diamonds':0,'hearts':0,'clubs':0})
    const [ suit_1_count, setSuitOneCount ] = useState(0)
    const [ suit_2_count, setSuitTwoCount ] = useState(0)
    const [ suit_3_count, setSuitThreeCount ] = useState(0)
    const [ suit_4_count, setSuitFourCount ] = useState(0)

    const suits = ['spades', 'diamonds', 'hearts', 'clubs'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    function _buildDeck() {
        var deck, suit, value;

        deck = [];

        for (let i = 0; i < suits.length; i++) {
            suit = suits[i];
            for (let k = 0; k < values.length; k++) {
                value = values[k];
                var card = new Object();
                card[suit] = value;
                deck.push(card);
            }
        }

        return deck;
    }

    useEffect(() => {
        setDeck(_buildDeck());
    }, []);

    function _onDeckClick() {
        var index;

        // Add the current card to the stats

        if (deck.length === 0)
        {
            // Stop the timer
            return;
        }else if ( deck.length === 1 )
        {
            setCurrentCard( deck[ 0 ] );
            setDeck([])
            return;
        }else if ( deck.length != 52 )
        {
            _updateStats()
        }
// Probably a better way to shuffle or in addition to this.
// https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
        index = Math.floor (Math.random() * deck.length );

        setCurrentCard( deck[ index ] );

        deck.splice( index, 1 )

        setDeck( deck );
    }

    function _updateStats()
    {
        var suit;

        suit = Object.keys( currentCard )[ 0 ];

        if ( !isNaN( parseInt( currentCard[ suit ] ) ) )
        {    
            stats[ suit ] += parseInt( currentCard[ suit ] );
        }
        else
        {
            var card;

            card = currentCard[ suit ]

            switch (card) {
                case 'A':
                    card = 1
                    break;
                case 'J':
                    card = 11
                    break;
                case 'Q':
                    card = 12
                    break;
                case 'K':
                    card = 13
                    break;
            
                default:
                    card = 0
                    break;
            }
            stats[ suit ] += card;
        }
        
        setStats( stats )
    }

    return (
        <div id="game-container">
            <div id="deck" onClick={() => _onDeckClick()} >Deck</div>
            <div id="current-card">
                <div>{Object.keys(currentCard)[0]}</div>
                <div>{currentCard[ Object.keys(currentCard)[0] ]}</div>
            </div>

            <div id="stats">
                <div class="stat-row" id="suit_1">Spades {stats.spades}</div>
                <div class="stat-row" id="suit_2">Diamonds {stats.diamonds}</div>
                <div class="stat-row" id="suit_3">Dearts {stats.hearts}</div>
                <div class="stat-row" id="suit_4">Clubs {stats.clubs}</div>
            </div>
        </div>
    )
}