//vector.jsを読み込む
import { Vector } from './vector'

//Particleクラスを作成する
export class Particle {
    /**
     * コンストラクター
     * @param {canvas} canvas
     * @param {number} x positionx(位置)
     * @param {number} y positiony(位置)
     * @param {number} speed speed(速度)
     * @param {number} direction direction(角度)
     * @param {number} radius radius(半径)
     * @param {string} color color(色)
     */
    constructor(canvas, x, y, speed, direction, radius, color) {
        this.canvas = canvas;
        //position(位置)プロパティのインスタンスを作成
        this.position = new Vector(x, y);
        //velocity(進路方向+速度)プロパティのインスタンスを作成
        this.velocity = new Vector(0, 0);
        //velocityの速度と向きをセットする
        this.velocity.setFromScalarAngle(speed, direction);
        //radius(半径)プロパティを定義
        this.radius = radius;
        //color(色)プロパティを定義
        this.color = color;
        //摩擦
        this.friction = Math.random() * .05;
    }
    /**
     * updateメソッドの作成
     */
    update() {
        //position.x,position.yにvelocity.x,velocity.yを加算する。
        this.position.addFromScalar(
            this.velocity.x,
            this.velocity.y,
        );

        //速度を滑らかに減速させ、最終的に停止させる。
        this.velocity.x = this.velocity.x - (this.velocity.x * this.friction);
        this.velocity.y = this.velocity.y - (this.velocity.y * this.friction);

        //速度が.4以下になった時に再度速度の値を追加して向きを変更する。
        if (Math.abs(this.velocity.x) <= .4 && Math.abs(this.velocity.y) <= .4) {
            this.velocity.setFromScalarAngle(Math.random() * 10 + 2, Math.random() * Math.PI * 2);
        }

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
}