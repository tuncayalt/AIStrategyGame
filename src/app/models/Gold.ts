import { IUpdatable } from '../interfaces/IUpdatable';
import { IRenderable } from '../interfaces/IRenderable';

export class Gold implements IUpdatable, IRenderable{
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    width = 64;
    height = 64;
    itemValue = 10;
    picture: HTMLImageElement;
    taken = false;

    constructor(ctx: CanvasRenderingContext2D){
        this.ctx = ctx;
        this.x = Math.floor(Math.random() * 640);
        this.y = Math.floor(Math.random() * 480);
        this.picture = new Image();
        this.picture.src = '../../assets/images/medievalEnvironment_19.png';
    }

    update(){

    }

    render() {
        if (!this.taken)
            this.ctx.drawImage(this.picture, this.x - this.width / 2, this.y - this.height / 2);
    }
}