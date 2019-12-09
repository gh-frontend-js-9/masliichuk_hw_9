'use strict';

class Tamagochy{
  constructor (name, level){
    this.name = name;
    this.level = level;
    this.lifeTime = 0; // seconds

    if (this.level === 2) {
      this.maxStatValue = 70;
      this.decreaseStatValue = -5;
    } else if(this.level === 1) {
      this.maxStatValue = 100;
      this.decreaseStatValue = -3;
    } else {
      this.maxStatValue = Number.MAX_SAFE_INTEGER;
      this.decreaseStatValue = -7;
    }

    let parent = this;

    this.food = this._generateRandomNumber(50, this.maxStatValue);
    this.happiness = this._generateRandomNumber(50, this.maxStatValue);

    if (this.level === 1 || this.level === 2) {
      this.clean = this._generateRandomNumber(50, this.maxStatValue);

      this.gameTimer = setInterval(function () {
        parent._decreaseStats();
        parent.lifeTime += 5;
      }, 5000);

    } else { // ninja game
      this.health = this._generateRandomNumber(50, this.maxStatValue);
      this.socialization = this._generateRandomNumber(50, this.maxStatValue);
      this.money = this._generateRandomNumber(50, this.maxStatValue);

      this.gameTimer = setInterval(function () {
        parent._decreaseStats();
        parent.lifeTime += 7;
      }, 7000);

      this.statsIncreaser = setInterval(function () {
        parent._randomStatsIncreaser();
      }, 60000);

    }

  }

  getGameLevel(){
    return this.level;
  }

  stopGame() {
    clearInterval(this.gameTimer);
    if (this.statsIncreaser) {clearInterval(this.statsIncreaser)};
  }

  _generateRandomNumber = function(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  _randomStatsIncreaser = function(){
    let stats = [
        'food',
        'happiness',
        'health',
        'socialization',
        'money'
    ];

    let randomStatName = stats[Math.floor(Math.random()*stats.length)];
    let randomValue = this._generateRandomNumber(10, 50);

    this._updateStat(randomStatName, randomValue);

    this._say(`Increased random stat: ${randomStatName} with value ${randomValue}`);
  }

  _decreaseStats = function(){

    this._updateStat('food',this.decreaseStatValue);
    this._updateStat('happiness',this.decreaseStatValue);

    this._say(`Food: ${this.food}`);
    this._say(`Happiness: ${this.happiness}`);

    if (this.level === 1 || this.level === 2) {
      this._updateStat('clean',this.decreaseStatValue);

      this._say(`Clean: ${this.clean}`);
    } else {
      this._updateStat('health',this.decreaseStatValue);
      this._updateStat('socialization',this.decreaseStatValue);
      this._updateStat('money',this.decreaseStatValue);

      this._say(`Health: ${this.health}`);
      this._say(`Socialization: ${this.socialization}`);
      this._say(`Money: ${this.money}`);
    }

  }

  _say = function(msg){
    console.log("%c"+ this.name + " says: " + msg, 'background: #222; color: #bada55');
    // alert(this.name + " says: " + msg);
  }

  _updateStat = function(statName, value){
    this[statName] += value;
    if (this[statName] > this.maxStatValue) { this[statName] = this.maxStatValue; }
    if (this[statName] < 0) { this[statName] = 0; }
  }

  isEndGame() {
    if (this.level === 1 || this.level === 2) {
      return (this.food === 0 || this.clean === 0 || this.happiness === 0);
    } else {
      return (this.health === 0 || this.socialization === 0 || this.money === 0 || this.food === 0);
    }
  }

  getStatPercent(name){
    return ((this[name]/this.maxStatValue) * 100).toFixed(2);
  }

  getStatValue(name){
    return this[name];
  }

  getLifeTime(){
    return this.lifeTime;
  }

  eat(){
    this._updateStat('food',30);
    this._updateStat('clean',-20);
  }

  wash(){
    this._updateStat('clean',40);
    this._updateStat('happiness',-20);
  }

  run(){
    this._updateStat('happiness',15);
    this._updateStat('food',-10);
  }

  visitDoctor(){
    this._updateStat('health',30);
    this._updateStat('money',-20);
  }

  goToBar(){
    this._updateStat('socialization',40);
    this._updateStat('food',10);
    this._updateStat('money',-20);
    this._updateStat('health',-10);
  }

  goToWork(){
    this._updateStat('socialization',-20);
    this._updateStat('food',-10);
    this._updateStat('money',50);
    this._updateStat('health',-10);
  }

  buyFood(){
    this._updateStat('food',20);
    this._updateStat('money',-20);
  }

  startBusiness(){
    this._updateStat('socialization',20);
    this._updateStat('money',100);
    this._updateStat('happiness',100);
    this._updateStat('health',-100);
  }

}
