import { Player } from "./Player";
import { IUpdatable } from "../interfaces/IUpdatable";
import { CustomNetwork } from "../AI/CustomNetwork";
import { Gold } from "./Gold";
import { Tile } from "./Tile";

export class AIPlayer extends Player implements IUpdatable{
    
    brain: CustomNetwork;
    golds: Gold[];

    constructor(ctx: CanvasRenderingContext2D, network: CustomNetwork, golds: Gold[], tiles: Tile[]){
        super(ctx, golds, tiles);
        this.isHuman = false;
        this.picture.src = '../../assets/images/medievalUnit_07.png';
        this.brain = network;
        this.golds = golds;
    }

    move = () => {
        var nonTakenGolds = this.golds.filter(g => !g.taken);

        var minVal = Infinity;
        var curGold = nonTakenGolds[0];
        nonTakenGolds.forEach(el => {
            var curVal = Math.abs(el.x - this.x) + Math.abs(el.y - this.y);
            if (curVal < minVal){
                minVal = curVal;
                curGold = el;
            }
        });
        if (!curGold){
            return;
        }
        var inputs = [
            this.x / 640,
            this.y / 480,
            curGold.x / 640,
            curGold.y / 480
        ];
        
        var outputs = this.brain.myNetwork.activate(inputs);
        //console.log(outputs);
        this.propagate(curGold);
        var maxOutput = Math.max( ...outputs );

        if (outputs[0] === maxOutput){
            this.chassis.moveUp();
        }
        if (outputs[1] === maxOutput){
            this.chassis.moveLeft();
        }
        if (outputs[2] === maxOutput){
            this.chassis.moveDown();
        }
        if (outputs[3] === maxOutput){
            this.chassis.moveRight();
        }
    }

    propagate = (curGold: Gold) => {
        this.brain.trainCount++;
        
        if (this.x > curGold.x && this.y > curGold.y){
            this.brain.myNetwork.propagate(.3, [1,1,0,0]);
        }
        if (this.x > curGold.x && this.y < curGold.y){
            this.brain.myNetwork.propagate(.3, [0,1,1,0]);
        }
        if (this.x < curGold.x && this.y < curGold.y){
            this.brain.myNetwork.propagate(.3, [0,0,1,1]);
        }
        if (this.x < curGold.x && this.y > curGold.y){
            this.brain.myNetwork.propagate(.3, [1,0,0,1]);
        }    
    }

    update(){
        this.move();
        this.collision();
    }
}