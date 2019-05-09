import { Player } from "./Player";
import { IUpdatable } from "../interfaces/IUpdatable";
import { Gold } from "./Gold";
import { HumanChassis } from "./HumanChassis";
import { Tile } from "./Tile";

export class HumanPlayer extends Player implements IUpdatable{
    
    downKeys: Set<number>;
    constructor(ctx: CanvasRenderingContext2D, golds: Gold[], downKeys: Set<number>, tiles: Tile[]){
        super(ctx, golds, tiles);
        this.isHuman = true;
        this.picture.src = '../../assets/images/medievalUnit_01.png';
        this.chassis = new HumanChassis(this);
        this.downKeys = downKeys;
    }

    move = () => {
        if (this.downKeys.has(87)){
            this.chassis.moveUp();
        }
        if (this.downKeys.has(65)){
            this.chassis.moveLeft();
        }
        if (this.downKeys.has(83)){
            this.chassis.moveDown();
        }
        if (this.downKeys.has(68)){
            this.chassis.moveRight();
        }
    }

    update(){
        this.move();
        this.collision();
    }
}