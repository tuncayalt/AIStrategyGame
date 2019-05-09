import {IChassis} from '../interfaces/IChassis';
import { Player } from './Player';

export class Chassis implements IChassis{
    speed: number;
    x: number;
    player: Player;

    constructor(player: Player){
        this.player = player;
        this.speed = 4;
    }

    moveUp() {
        this.player.y -= this.speed;
        this.player.y = Math.max(0, this.player.y);
    }
    moveDown() {
        this.player.y += this.speed;
        this.player.y = Math.min(480, this.player.y);
    }
    moveLeft() {
        this.player.x -= this.speed;
        this.player.x = Math.max(0, this.player.x);
    }
    moveRight() {
        this.player.x += this.speed;
        this.player.x = Math.min(640, this.player.x);
    }

}