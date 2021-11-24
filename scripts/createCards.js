const Cards = require('./Cards');
const fs = require('fs');

const allPts = [2, 3, 5, 8, 13];
const getRandom = (max) => {
    if (max <= 0) {
        return 0;
    }
    return Math.floor(Math.random() * max) + 1;
}
const getBlockchainCard = () => {
    let cost = getRandom(5);
    let pts = allPts[cost - 1];

    let card = new Cards();
    card.cost = cost;
    card.costType = 'blockchain';
    card.bonusAmountAttack = getRandom(pts);
    card.bonusAmountDefense = getRandom(pts - card.bonusAmountAttack);
    pts = pts - card.bonusAmountAttack - card.bonusAmountDefense;
    if (pts === 2) {
        card.bonusTarget = 'own';
        card.cardType = 'normal'
        card.attack = 1;
        card.defense = 1;
    } else if (pts > 2) {
        card.bonusTarget = 'own';
        card.cardType = 'normal'
        card.attack = getRandom(pts - 1);
        card.defense = getRandom(pts - card.attack);
    } else {
        if (pts === 1) {
            if (Math.random() > 0.5) {
                card.bonusAmountAttack++;
            } else {
                card.bonusAmountDefense++;
            }
        }
        if (Math.random() > 0.5) {
            card.cost = cost - 1;
            if (card.cost < 1) {
                card.cost = 1;
            }
            card.cardType = 'notice';
            card.bonusTarget = 'any-player-card';
        } else {
            card.cardType = 'hardware';
            card.bonusTarget = 'any-player-card';
        }
    }
    return card;
}
const getSmartcontractCard = () => {
    let cost = getRandom(5);
    let pts = allPts[cost - 1];

    let card = new Cards();
    card.cost = cost;
    card.costType = 'smartcontract';
    card.bonusAmountAttack = getRandom(pts);
    card.bonusAmountDefense = getRandom(pts - card.bonusAmountAttack);
    pts = pts - card.bonusAmountAttack - card.bonusAmountDefense;
    if (pts >= 2) {
        if (pts === 2) {
            card.attack = 1;
            card.defense = 1;
        } else if (pts > 2) {
            card.attack = getRandom(pts - 1);
            card.defense = getRandom(pts - card.attack);
        }
        card.cardType = 'normal';

        card.bonusTarget = ['left-card', 'right-card', 'any-player-card'][getRandom(3) - 1];
    } else {
        if (pts === 1) {
            if (Math.random() > 0.5) {
                card.bonusAmountAttack++;
            } else {
                card.bonusAmountDefense++;
            }
        }
        if (Math.random() > 0.5) {
            card.cost = cost - 1;
            if (card.cost < 1) {
                card.cost = 1;
            }
            card.cardType = 'notice';
            card.bonusTarget = 'any-player-card';
        } else {
            card.cardType = 'hardware';
            card.bonusTarget = 'any-player-card';
        }
    }
    return card;
}
const getFrontendCard = () => {
    let cost = getRandom(5);
    let pts = allPts[cost - 1];

    let card = new Cards();
    card.cost = cost;
    card.costType = 'frontend';
    card.bonusAmountLife = getRandom(pts);
    pts = pts - card.bonusAmountLife;
    if (pts >= 2) {
        if (pts === 2) {
            card.attack = 1;
            card.defense = 1;
        } else if (pts > 2) {
            if (getRandom(2) === 1) {
                card.bonusSuportCommunity = true;
                pts--;
            }
            card.attack = getRandom(pts - 1);
            card.defense = getRandom(pts - card.attack);
        }
        card.cardType = 'normal';

        card.bonusTarget = ['oponnent', 'player'][getRandom(2) - 1];
        card.bonusAmountLife = Math.round(card.bonusAmountLife / 2)
        if (card.bonusTarget === 'oponnent') {
            card.bonusAmountLife = -card.bonusAmountLife;
        }
    } else {
        if (pts === 1) {
            card.bonusAmountLife++;
        }
        card.bonusTarget = ['oponnent', 'player', 'any-oponnent-card', 'any-player-card', 'all-cards', 'damage-card', 'damage-all-card'][getRandom(7) - 1];
        card.cardType = 'notice';
        switch (card.bonusTarget) {
            case 'oponnent':
                card.bonusAmountLife = -Math.floor(card.bonusAmountLife / 3) - 1;
                break;
            case 'player':
                card.bonusAmountLife = Math.floor(card.bonusAmountLife / 3) + 1;
                break;
            case 'any-oponnent-card':
                card.cost = cost - 1;
                if (card.cost < 1) {
                    card.cost = 1;
                }
                card.bonusAmountDefense = -card.bonusAmountLife;
                card.bonusAmountLife = 0;
                break;
            case 'any-player-card':
                card.cost = cost - 1;
                if (card.cost < 1) {
                    card.cost = 1;
                }
                card.bonusAmountAttack = card.bonusAmountLife;
                card.bonusAmountLife = 0;
                break;
            case 'all-cards':
                card.cost = cost + 1;
                card.bonusAmountDefense = -card.bonusAmountLife;
                card.bonusAmountLife = 0;
                break;
            case 'damage-card':
                card.bonusAmountLife = -Math.floor(card.bonusAmountLife / 2) - 1;
                break;
            case 'damage-all-card':
                card.cost = cost + 1;
                card.bonusAmountLife = -Math.floor(card.bonusAmountLife / 3) - 1;
                break;
        }
    }
    return card;
}

let allCards = [];

const amountAllCards = 300;
const amountSpecialCards = 30;

[getBlockchainCard, getSmartcontractCard, getFrontendCard].forEach(createCardFunction => {
    let createdCards = [];
    while (createdCards.length < amountSpecialCards) {
        let card = createCardFunction();

        let add = true;
        createdCards.forEach(savedCard => {
            if (savedCard.getHash() === card.getHash()) {
                add = false;
            }
        })
        if (card.cardType === 'normal') {
            add = false;
        }
        if (add) {
            createdCards.push(card);
        }
    }
    while (createdCards.length < amountAllCards) {
        let card = createCardFunction();

        let add = true;
        createdCards.forEach(savedCard => {
            if (savedCard.getHash() === card.getHash()) {
                add = false;
            }
        })
        if (card.cardType !== 'normal') {
            add = false;
        }
        if (add) {
            createdCards.push(card);
        }
    }
    allCards = [...allCards, ...createdCards];
})

allCards = allCards.map((card, i) => {
    card.id = i + 1;
    return card;
})

fs.writeFileSync('../assets/cards.json', JSON.stringify(allCards, null, 2))
