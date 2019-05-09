import { IRenderable } from "../interfaces/IRenderable";

export class Message implements IRenderable{
    ctx: CanvasRenderingContext2D;
    message: string = "3";
    hidden = true;
    fps: number;

    constructor(ctx: CanvasRenderingContext2D, fps: number){
        this.ctx = ctx;
        this.fps = fps;
    }

    update(message: string){
        this.message = message;
    }

    render() {
        if (this.hidden){
            return;
        }
        this.ctx.font = "48px Arial";
        this.ctx.textAlign = "center"; 

        var lines = this.message.split('\n');

        for (var i = 0; i < lines.length; i++)
            this.ctx.fillText(lines[i], 320, 200 + (i * 50) );
    }
    countDown(age: number){
        this.hidden = false;
        if (age < this.fps){
            this.message = "3";
        }else if (age < this.fps * 2){
            this.message = "2";
        }else if (age < this.fps * 3){
            this.message = "1";
        }
    }

}