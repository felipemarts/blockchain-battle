
/**
 * Bonus target
 * 'none' => no bonus,
 * 'own' => current card,
 * 'left-card' => left card
 * 'right-card' => right card
 * 'any-player-card' => any player card
 * 'all-cards' => all player cards
 * 'front-card' => front card
 * 'any-oponnent-card' => any oponnent card
 * 'damage-card' => damages the opponent's card
 * 'damage-all-card' => damages all cards
 * 'oponnent' => oponnent player
 * 'player' => current player
 * 'community-support' => the card can already attack when it goes down
 * 
 * Cost Type
 * 'blockchain' => Blockchain Developer
 * 'smartcontract' => Blockchain Developer
 * 'frontend' => Blockchain Developer
 * 
 * Card Type
 * 'normal', 'instant', 'hardware'
 */

const sha256 = require('sha256');

module.exports = class Cards {
    id = 0;
    name = '';
    costType = '';
    cardType = '';
    cost = 0;
    attack = 0;
    defense = 0;
    description = '';
    bonusTarget = '';
    bonusAmountAttack = 0;
    bonusAmountDefense = 0;
    bonusAmountLife = 0;
    bonusSuportCommunity = false;

    getHash = () => (`${this.costType}-${this.cardType}-${this.cost}-${this.attack}-${this.defense}-${this.bonusTarget}-${this.bonusType}-${this.bonusAmountAttack}-${this.bonusAmountDefense}-${this.bonusAmountLife}`);
}