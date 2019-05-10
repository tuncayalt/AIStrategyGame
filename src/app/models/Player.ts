import { IRenderable } from '../interfaces/IRenderable';
import { IChassis } from '../interfaces/IChassis';
import { Chassis } from './Chassis';
import { Gold } from './Gold';
import { Tile } from './Tile';

export class Player implements IRenderable{
    x: number;
    y: number;
    width: number = 64;
    height: number = 64;
    picture: HTMLImageElement;
    chassis: IChassis;
    score = 0;
    isHuman: boolean;
    ctx: CanvasRenderingContext2D;
    golds: Gold[];
    tiles: Tile[];
    win: boolean;

    constructor(ctx: CanvasRenderingContext2D, golds: Gold[], tiles: Tile[]){
        this.chassis = new Chassis(this);
        this.ctx = ctx;
        this.x = Math.floor(Math.random() * 640);
        this.y = Math.floor(Math.random() * 480);
        this.picture = new Image();
        this.golds = golds;
        this.tiles = tiles;
    }    

    render() {
        this.ctx.drawImage(this.picture, this.x - this.width / 2, this.y - this.height / 2);
        this.ctx.font = "12px Arial";
        this.ctx.strokeText(this.score + "", this.x, this.y - this.height / 4);
    }

    collision = () => {
        var nonTakenGolds = this.golds.filter(g => !g.taken);
        nonTakenGolds.forEach(element => {
            if (Math.sqrt(Math.pow(this.x - element.x, 2) + Math.pow(this.y - element.y, 2)) < (this.width + element.width) / 4){
                element.x = Math.floor(Math.random() * 640);
                element.y = Math.floor(Math.random() * 480);
                this.score++;
            }
        });

        this.tiles.forEach(el => {
            if (Math.sqrt(Math.pow(this.x - el.x, 2) + Math.pow(this.y - el.y, 2)) < (this.width + el.width) / 4){
                this.chassis.setTerrain(Math.max(0, el.trees));
                if (el.trees > 0){
                    el.damage++;
                }
            }
        }); 
    }
}