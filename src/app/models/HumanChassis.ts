import { Chassis } from "./Chassis";
import { Player } from "./Player";

export class HumanChassis extends Chassis{
    constructor(player: Player){
        super(player);
        this.speed = 4;
    }
}