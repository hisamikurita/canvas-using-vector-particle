//vector.jsを読み込む
import { Vector } from './vector'

//Particleクラスを作成する
export class Particle {
    /**
     * コンストラクター
     * @param {canvas} canvas
     * @param {number} x positionx(位置)
     * @param {number} y positiony(位置)
     * @param {number} scalar scalar(速度)
     * @param {number} direction direction(角度)
     * @param {number} radius radius(半径)
     * @param {string} color color(色)
     */
    constructor(canvas, x, y, scalar, direction, radius, color) {
        this.canvas = canvas;
        //position(位置)プロパティのインスタンスを作成
        this.position = new Vector(x, y);
        //velocity(進路方向+速度)プロパティのインスタンスを作成
        this.velocity = new Vector();
        //velocityの速度と向きをセットする
        this.velocity.setFromScalarAngle(scalar, direction);
        //加速度
        this.acceleration = new Vector();
        this.acceleration.set(.5, .5);
        //radius(半径)プロパティを定義
        this.radius = radius;
        //color(色)プロパティを定義
        this.color = color;

    }
    /**
     * updateメソッドの作成
     */
    update() {
        //positionにvelocityを加算する
        this.position.add(this.velocity);

        //canvas外の衝突判定
        if (this.position.x + this.radius > this.canvas.width) {
            this.position.x = this.canvas.width - this.radius;
            this.velocity.x *= -1;
        };
        if (this.position.x - this.radius < 0) {
            this.position.x = this.radius;
            this.velocity.x *= -1;
        }
        if (this.position.y + this.radius > this.canvas.height) {
            this.position.y = this.canvas.height - this.radius;
            this.velocity.y *= -1;
        };
        if (this.position.y - this.radius < 0) {
            this.position.y = this.radius;
            this.velocity.y *= -1;
        };

        // position(位置)がcanvas外に出た時は中央に再配置
        if (this.position.x > this.canvas.width) {
            this.position.x = this.canvas.width / 2;
        };
        if (this.position.y > this.canvas.height) {
            this.position.y = this.canvas.height / 2;
        };
    }
    accelerate() {
        this.velocity.add(this.velocity * this.acceleration);
    }
}