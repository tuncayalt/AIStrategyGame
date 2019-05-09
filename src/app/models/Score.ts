import { IRenderable } from "../interfaces/IRenderable";
import { IUpdatable } from "../interfaces/IUpdatable";

export class Score implements IUpdatable, IRenderable{
    ctx: CanvasRenderingContext2D;
    baseX = 590;
    baseY = 40;

    humanX: number;
    humanY: number;
    maxAiX: number;
    maxAiY: number;

    humanScore = 0;
    maxAiScore = 0;

    randomHumanOffsetX = 0;
    randomHumanOffsetY = 0;
    randomAiOffsetX = 0;
    randomAiOffsetY = 0;

    humanScoreOffsetY = 0;
    maxAiScoreOffsetY = 22;
    maxScoreOffsetY = 22;


    constructor(ctx: CanvasRenderingContext2D){
        this.ctx = ctx;
    }

    update() {
        this.randomHumanOffsetX = this.setOffset();
        this.randomHumanOffsetY = this.setOffset();
        this.randomAiOffsetX = this.setOffset();
        this.randomAiOffsetY = this.setOffset();

        if (this.humanScore >= this.maxAiScore){
            this.humanScoreOffsetY = Math.max(0, this.humanScoreOffsetY - 2);
            this.maxAiScoreOffsetY = Math.min(this.maxScoreOffsetY, this.maxAiScoreOffsetY + 2);
        }else{
            this.maxAiScoreOffsetY = Math.max(0, this.maxAiScoreOffsetY - 2);
            this.humanScoreOffsetY = Math.min(this.maxScoreOffsetY, this.humanScoreOffsetY + 2);
        }

        this.humanX = this.baseX + this.randomHumanOffsetX;
        this.humanY = this.baseY + this.randomHumanOffsetY + this.humanScoreOffsetY;
        this.maxAiX = this.baseX + this.randomAiOffsetX;
        this.maxAiY = this.baseY + this.randomAiOffsetY + this.maxAiScoreOffsetY;
    }

    private setOffset() :number {
        return Math.floor(Math.random() * 3) - 1;
    }

    setScores(humanScore: number, maxAiScore: number) {
        this.humanScore = humanScore;
        this.maxAiScore = maxAiScore;
    }

    render() {
        this.ctx.font = "bold 20px Courier New";
        this.ctx.textAlign = "right";

        // this.ctx.fillStyle = "#505050";
        // this.ctx.fillText("You: " + this.humanScore, this.humanX + 5, this.humanY + 5);
        // this.ctx.fillText("AI : " + this.maxAiScore, this.maxAiX + 5, this.maxAiY + 5);

        this.ctx.fillStyle = "#0505ee";
        this.ctx.fillText("You: " + this.humanScore, this.humanX, this.humanY);
        this.ctx.fillStyle = "#ee0505";
        this.ctx.fillText("AI : " + this.maxAiScore, this.maxAiX, this.maxAiY);
    }
}