import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AIPlayer } from '../models/AIPlayer';
import { HumanPlayer } from '../models/HumanPlayer';
import { Gold } from '../models/Gold';
import { CustomNetwork } from '../AI/CustomNetwork';
import { Tile } from '../models/Tile';
import { Message } from '../models/Message';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  @ViewChild('myCanvas') canvasRef: ElementRef;
  @ViewChild('gameButton', { read: ElementRef }) gameButton: ElementRef;
  @ViewChild('playerCount', { read: ElementRef }) playerCountRef: ElementRef;
  @ViewChild('goldCount', { read: ElementRef }) goldCountRef: ElementRef;
  @ViewChild('validation') validationRef: ElementRef;

  WIN_SCORE = 100;
  myPlayer: HumanPlayer;
  otherPlayers: AIPlayer[];
  golds: Gold[];
  tiles: Tile[];
  message: Message;
  age: number = 0;
  fps = 50;
  running = true;
  ctx: CanvasRenderingContext2D;
  myNetwork: CustomNetwork;
  goldCount;
  aiPlayerCount;
  tileCount = 80;

  constructor() { }

  ngOnInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.myNetwork = new CustomNetwork(4, 6, 4);
    this.initial();
  }

  downKeys: Set<number>;

  doKeyDown = (event) => {
    if (event.keyCode === 87 ||
        event.keyCode === 83 ||
        event.keyCode === 68 ||
        event.keyCode === 65){
      this.downKeys.add(event.keyCode);
    }
  }

  doKeyUp = (event) => {
    if (event.keyCode === 87 ||
        event.keyCode === 83 ||
        event.keyCode === 68 ||
        event.keyCode === 65){
      this.downKeys.delete(event.keyCode);
    }
  }

  startGame = () => {
    this.goldCount = parseInt(this.goldCountRef.nativeElement.value);
    this.aiPlayerCount = parseInt(this.playerCountRef.nativeElement.value);
    if (!this.validate()){
      return;
    }
    this.resumeGame();
  }

  restartGame = () => {
    this.initial();
    this.startGame();
  }

  resumeGame() {
    this.gameButton.nativeElement.innerText = 'Pause Game';
    this.gameButton.nativeElement.removeEventListener("click", this.startGame);
    this.gameButton.nativeElement.removeEventListener("click", this.resumeGame);
    this.gameButton.nativeElement.addEventListener("click", this.stopGame);
    this.playerCountRef.nativeElement.disabled = true;
    this.goldCountRef.nativeElement.disabled = true;
    this.canvasRef.nativeElement.focus();
    if (this.age === 0) {
      for (var i = 0; i < this.goldCount; i++) {
        this.golds.push(new Gold(this.ctx));
      }
      for (var i = 0; i < this.aiPlayerCount; i++) {
        this.otherPlayers.push(new AIPlayer(this.ctx, this.myNetwork, this.golds, this.tiles));
      }
    }
    this.running = true;
    this.update();
    this.render();
    this.gameLoop();
  }

  initial = () => {
    this.age = 0;
    this.otherPlayers = new Array();
    this.golds = new Array();
    this.tiles = new Array();
    this.downKeys = new Set<number>();
    this.myPlayer = new HumanPlayer(this.ctx, this.golds, this.downKeys, this.tiles);
    for (var i = 0; i < this.tileCount; i++) {
      var tile = new Tile(this.ctx);
      tile.x = (i * tile.width) % 640 + tile.width / 2;
      tile.y = Math.floor(i * tile.width / 640) * tile.width + tile.height / 2;
      this.tiles.push(tile);
    }
    this.message = new Message(this.ctx, this.fps);
  }

  validate(): boolean {
    this.validationRef.nativeElement.innerText = '';
    console.log(this.playerCountRef.nativeElement.value);
    if (!this.aiPlayerCount || this.aiPlayerCount <= 0){
        this.validationRef.nativeElement.innerText += 'Invalid player count.'; 
        return false;
    }
    if (!this.goldCount && this.goldCount <= 0){
      this.validationRef.nativeElement.innerText += 'Invalid gold count.'; 
      return false;
    }
    if (this.aiPlayerCount > 20){
      this.validationRef.nativeElement.innerText += 'Too many players.'; 
      return false;
    }
    return true;
  }

  gameLoop = () => {
      if (!this.running){
        return;
      }
      let startTime = Date.now();
      this.update();
      this.render();
      let millis = Date.now() - startTime;
      let sleepTime = (1000 / this.fps) - millis;
      setTimeout(this.gameLoop, sleepTime);
  }

  stopGame = () => {
    this.gameButton.nativeElement.innerText = 'Resume Game';
    this.gameButton.nativeElement.removeEventListener("click", this.stopGame);
    this.gameButton.nativeElement.addEventListener("click", this.resumeGame);
    this.running = false;
  }

  gameOver = () => {
    console.log("game over");
    this.gameButton.nativeElement.innerText = 'Start Game';
    this.gameButton.nativeElement.removeEventListener("click", this.stopGame);
    this.gameButton.nativeElement.removeEventListener("click", this.resumeGame);
    this.gameButton.nativeElement.addEventListener("click", this.restartGame);
    this.playerCountRef.nativeElement.disabled = false;
    this.goldCountRef.nativeElement.disabled = false;
    this.running = false;

    var maxScore = -Infinity;
    this.otherPlayers.forEach(el => {
      if (el.score > maxScore){
        maxScore = el.score;
      }
    });

    if (this.myPlayer.score >= maxScore){
      this.message.message = "Game Over!\nYou win!\nHope it was worth it...";
    }else{
      this.message.message = "Game Over!\nYou lost!\nIn every respect...";
    }
    
    this.message.hidden = false;

    //this.update();
    this.render();
  }

  update = () => {
    this.age++;
    if (this.age < this.fps * 3){
      this.message.countDown(this.age);
      return;
    }
    if (this.age === this.fps * 3)
      this.message.hidden = true;

    this.otherPlayers.forEach(element => {
      element.update();
      if (element.score >= this.WIN_SCORE){
        this.gameOver();
        return;
      }
    });
    this.golds.forEach(element => {
      element.update();
    });
    this.myPlayer.update();
    if (this.myPlayer.score >= this.WIN_SCORE){
      this.gameOver();
      return;
    }
    if (this.golds.filter(g => !g.taken).length < this.goldCount){
      this.golds.push(new Gold(this.ctx));
    }
    var treesExist = false;
    this.tiles.forEach(el => {
      el.update();
      if (el.trees > 0){
        treesExist = true;
      }
    });
    if (!treesExist){
      this.gameOver();
      return;
    }
  }

  render = () => {
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);    
    
    this.tiles.forEach(element => {
      element.render();
    }); 
    this.otherPlayers.forEach(element => {
      element.render();
    });
    this.golds.forEach(element => {
      element.render();
    });
    this.myPlayer.render();
    this.message.render();
  }
}
