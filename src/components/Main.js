import { useEffect, useState } from 'react'
import '../style/Main.css'

export default function Main() {
    const [deck, setDeck] = useState([]);
    const [currentCard, setCurrentCard] = useState({ 'Jack': '0' });
    const [stats, setStats] = useState({ 'spades': 0, 'diamonds': 0, 'hearts': 0, 'clubs': 0 })

    const suits = ['spades', 'diamonds', 'hearts', 'clubs'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    function _buildDeck() {
        var deck, suit, value;

        deck = [];

        for (let i = 0; i < suits.length; i++) {
            suit = suits[i];
            for (let k = 0; k < values.length; k++) {
                value = values[k];
                var card = {};
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

        if (deck.length === 0) {
            // Stop the timer
            return;
        } else if (deck.length === 1) {
            setCurrentCard(deck[0]);
            setDeck([])
            return;
        } else if (deck.length != 52) {
            _updateStats()
        }
        // Probably a better way to shuffle or in addition to this.
        // https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
        index = Math.floor(Math.random() * deck.length);

        setCurrentCard(deck[index]);

        deck.splice(index, 1)

        setDeck(deck);
    }

    function _updateStats() {
        var suit;

        suit = Object.keys(currentCard)[0];

        if (!isNaN(parseInt(currentCard[suit]))) {
            stats[suit] += parseInt(currentCard[suit]);
        }
        else {
            var card;

            card = currentCard[suit]

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
            stats[suit] += card;
        }

        setStats(stats)
    }

    function _resetGame(){

    }

    return (
        <div id="game-container">
            <div id="deck-container">
                <div id="deck" onClick={() => _onDeckClick()} class="card-deck">Deck</div>
            </div>

            <div id="current-card-container">
                <div id="current-card" class="card-deck">
                    <div>{Object.keys(currentCard)[0]}</div>
                    <div>{currentCard[Object.keys(currentCard)[0]]}</div>
                </div>
            </div>

            <div id="stats-container">
                <table>
                    <tr>
                        <th>Card</th>
                        <th>Count</th>
                    </tr>
                    <tr>
                        <td>Spades</td>
                        <td>{stats.spades}</td>
                    </tr>
                    <tr>
                        <td>Diamonds</td>
                        <td>{stats.diamonds}</td>
                    </tr>
                    <tr>
                        <td>Hearts</td>
                        <td>{stats.hearts}</td>
                    </tr>
                    <tr>
                        <td>Clubs</td>
                        <td>{stats.clubs}</td>
                    </tr>
                </table>
                <div>Remaining cards {deck.length}</div>
            </div>
        </div>
    )
}