import logo from './logo.svg';
import './App.css';

let cartaSelecionada = {id:0};

function GetJson(props) {
    return (
        <div>
            {Object.keys(props.json).map(key =>
                <div style={{width:"100%"}}>
                    <span>{key} : {props.json[key].toString()}</span>
                </div>
            )}
        </div>
    );
}

function CampoDeBatalha(props) {
    let mapCards = [...Array(6).keys()]
    if (props.hand) {
        return (
            <div className="rowCampoBatalha">
                {props.cards.map(card => {
                        return <div onClick={() => {cartaSelecionada = card; console.log(cartaSelecionada)}} className="card">
                            <GetJson json={card}/>
                        </div>
                    }
                )}
            </div>
        );
    } else {
        return (
            <div className="rowCampoBatalha">
                {mapCards.map(id => {
                        let card = props.cards.find(card => card.position === id);
                        if (card) {
                            return <div onClick={() => {cartaSelecionada = card; console.log(cartaSelecionada)}} className="card">
                                <GetJson json={card}/>
                            </div>
                        } else {
                            return <div onClick={() => {
                                    if(props.mine) {
                                        card = cartaSelecionada;
                                        card.position = id;
                                        // fetch
                                        //post card
                                        window.location.reload(false);
                                    }
                                }
                            } className="card"/>
                        }
                    }
                )}
            </div>
        );
    }
}

function App() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    let id = "365047c0-55e7-11ec-bfc0-6f4fb32026a0";
    let deck = fetch('http://192.168.1.8:2000/decks/'+ id +'/cards', requestOptions)
        .then((deck) =>{console.log(deck); console.log("deck");});
    return (
        <div className="App allPage">
            <div style={{display: "flex", flexDirection: "column"}} className="allPage">
                <div style={{backgroundColor: "red"}} className="row">
                    <CampoDeBatalha cards={cards1} hand={false} mine={false}/>
                </div>
                <div style={{backgroundColor: "blue"}} className="row">
                    <CampoDeBatalha cards={cards2} hand={false} mine={true}/>
                </div>
                <div style={{backgroundColor: "green"}} className="row">
                    <CampoDeBatalha cards={cards3} hand={true} mine={false}/>
                </div>
            </div>
        </div>
    );
}

export default App;

// mockup
let cards1 = [{
    "id": 1,
    "name": "",
    "costType": "blockchain",
    "cardType": "hardware",
    "cost": 3,
    "attack": 0,
    "defense": 0,
    "description": "",
    "bonusTarget": "any-player-card",
    "bonusAmountAttack": 4,
    "bonusAmountDefense": 1,
    "position": 2,
    "bonusAmountLife": 0,
    "bonusSuportCommunity": false
}, {
    "id": 2,
    "name": "",
    "costType": "blockchain",
    "cardType": "hardware",
    "cost": 3,
    "attack": 0,
    "defense": 0,
    "description": "",
    "bonusTarget": "any-player-card",
    "bonusAmountAttack": 4,
    "bonusAmountDefense": 1,
    "position": 4,
    "bonusAmountLife": 0,
    "bonusSuportCommunity": false
}, {
    "id": 3,
    "name": "",
    "costType": "blockchain",
    "cardType": "hardware",
    "cost": 3,
    "attack": 0,
    "defense": 0,
    "description": "",
    "bonusTarget": "any-player-card",
    "bonusAmountAttack": 4,
    "bonusAmountDefense": 1,
    "position": 5,
    "bonusAmountLife": 0,
    "bonusSuportCommunity": false
}]
let cards2 = [{
    "id": 37,
    "name": "",
    "costType": "blockchain",
    "cardType": "hardware",
    "cost": 3,
    "attack": 0,
    "defense": 0,
    "description": "",
    "bonusTarget": "any-player-card",
    "bonusAmountAttack": 4,
    "bonusAmountDefense": 1,
    "bonusAmountLife": 0,
    "position": 3,
    "bonusSuportCommunity": false
}, {
    "id": 456,
    "name": "",
    "costType": "blockchain",
    "cardType": "hardware",
    "cost": 3,
    "attack": 0,
    "defense": 0,
    "description": "",
    "bonusTarget": "any-player-card",
    "bonusAmountAttack": 4,
    "bonusAmountDefense": 1,
    "position": 1,
    "bonusAmountLife": 0,
    "bonusSuportCommunity": false
}];

let cards3 = [{
    "id": 795,
    "name": "",
    "costType": "blockchain",
    "cardType": "hardware",
    "cost": 3,
    "attack": 0,
    "defense": 0,
    "description": "",
    "bonusTarget": "any-player-card",
    "bonusAmountAttack": 4,
    "bonusAmountDefense": 1,
    "position": 0,
    "bonusAmountLife": 0,
    "bonusSuportCommunity": false
}, {
    "id": 256,
    "name": "",
    "costType": "blockchain",
    "cardType": "hardware",
    "cost": 3,
    "attack": 0,
    "defense": 0,
    "description": "",
    "bonusTarget": "any-player-card",
    "bonusAmountAttack": 4,
    "bonusAmountDefense": 1,
    "position": 0,
    "bonusAmountLife": 0,
    "bonusSuportCommunity": false
}, {
    "id": 32,
    "name": "",
    "costType": "blockchain",
    "cardType": "hardware",
    "cost": 3,
    "attack": 0,
    "defense": 0,
    "description": "",
    "bonusTarget": "any-player-card",
    "position": 0,
    "bonusAmountAttack": 4,
    "bonusAmountDefense": 1,
    "bonusAmountLife": 0,
    "bonusSuportCommunity": false
}, {
    "id": 845,
    "name": "",
    "costType": "blockchain",
    "cardType": "hardware",
    "cost": 3,
    "attack": 0,
    "defense": 0,
    "description": "",
    "bonusTarget": "any-player-card",
    "bonusAmountAttack": 4,
    "bonusAmountDefense": 1,
    "position": 0,
    "bonusAmountLife": 0,
    "bonusSuportCommunity": false
}/*, {
    "id": 34,
    "name": "",
    "costType": "blockchain",
    "cardType": "hardware",
    "cost": 3,
    "attack": 0,
    "defense": 0,
    "description": "",
    "position": 0,
    "bonusTarget": "any-player-card",
    "bonusAmountAttack": 4,
    "bonusAmountDefense": 1,
    "bonusAmountLife": 0,
    "bonusSuportCommunity": false
}, {
    "id": 33,
    "name": "",
    "costType": "blockchain",
    "cardType": "hardware",
    "cost": 3,
    "attack": 0,
    "defense": 0,
    "description": "",
    "position": 0,
    "bonusTarget": "any-player-card",
    "bonusAmountAttack": 4,
    "bonusAmountDefense": 1,
    "bonusAmountLife": 0,
    "bonusSuportCommunity": false
}, {
    "id": 666,
    "name": "",
    "costType": "blockchain",
    "cardType": "hardware",
    "cost": 3,
    "attack": 0,
    "position": 0,
    "defense": 0,
    "description": "",
    "bonusTarget": "any-player-card",
    "bonusAmountAttack": 4,
    "bonusAmountDefense": 1,
    "bonusAmountLife": 0,
    "bonusSuportCommunity": false
}, {
    "id": 234,
    "name": "",
    "costType": "blockchain",
    "cardType": "hardware",
    "cost": 3,
    "attack": 0,
    "defense": 0,
    "position": 0,
    "description": "",
    "bonusTarget": "any-player-card",
    "bonusAmountAttack": 4,
    "bonusAmountDefense": 1,
    "bonusAmountLife": 0,
    "bonusSuportCommunity": false
}*/]
