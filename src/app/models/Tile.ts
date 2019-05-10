import { IRenderable } from "../interfaces/IRenderable";

export class Tile implements IRenderable{
    x;
    y;
    width = 64;
    height = 64;
    picture: HTMLImageElement;
    trees = -1;
    damage = 0;
    ctx: CanvasRenderingContext2D
    damageTime = 200;

    constructor(ctx: CanvasRenderingContext2D){
        this.ctx = ctx;
        this.picture = new Image();
        var ran = Math.floor(Math.random() * 90) + 1;

        if (ran >= 0 && ran < 30){
            this.trees = -2;
        }else if (ran >= 30 && ran < 60){
            this.trees = -1;
        }else if (ran >= 60 && ran < 70){
            this.trees = 1;
        }else if (ran >= 70 && ran < 80){
            this.trees = 2;
        }else{
            this.trees = 3;
        }
        this.picture.src = this.getPicture();
    }

    getPicture = () => {
        if (this.trees === 3){
            return "../../assets/images/medievalTile_48.png";
        }else if (this.trees === 2){
            return "../../assets/images/medievalTile_46.png";
        }else if (this.trees === 1){
            return "../../assets/images/medievalTile_45.png";
        }else if (this.trees === 1){
            return "../../assets/images/medievalTile_45.png";
        }else if (this.trees === 0){
            return "../../assets/images/medievalTile_50.png";
        }
        else if (this.trees === -1){
            return "../../assets/images/medievalTile_57.png";
        }
        else if (this.trees === -2){
            return "../../assets/images/medievalTile_58.png";
        }
    }

    optimizeTrees(){
        if (this.y > 420 || this.y < 40 || this.x > 580 || this.x < 40){
            this.trees = Math.max(this.trees - 1, 0);
            if (this.trees == 0){
              this.trees -= Math.floor(Math.random() * 2) + 1;
            } 
          }else{
            this.trees = Math.min(this.trees + 1, 3);
            if (this.trees == 0){
              this.trees -= Math.floor(Math.random() * 2) + 1;
            } 
          }
    }

    setCoordinates(index: number){
        this.x = (index * this.width) % 640 + this.width / 2;
        this.y = Math.floor(index * this.width / 640) * this.width + this.height / 2;
    }

    update(){
        //console.log(this.damage);
        if (this.damage > this.damageTime){

            this.trees--;
            this.damage = 0;
        }
        this.picture.src = this.getPicture();
    }

    render() {
        this.ctx.drawImage(this.picture, this.x - this.width / 2, this.y - this.height / 2);
    }

}