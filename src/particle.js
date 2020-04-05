//vector.jsを読み込む
import { Vector } from './vector'

//Particleクラスを作成する
export class Particle {
    //コンストラクターでposition(位置),velocity(進路方向),direction(進路方向),speed(速度),radius(半径),color(色)を定義する
    constructor(canvas,x, y, speed, direction, radius, color) {
        this.canvas = canvas;
        //position(位置)プロパティのインスタンスを作成
        this.position = new Vector(x, y);
        //velocity(進路方向)プロパティのインスタンスを作成
        this.velocity = new Vector(0, 0);
        //velocity(進路方向)の向きをdirectionの角度によって変える
        this.velocity.setFromAngle(direction);
        //speed(速度)プロパティを定義
        this.speed = speed;
        //radius(半径)プロパティを定義
        this.radius = radius;
        //color(色)プロパティを定義
        this.color = color;
        //摩擦
        this.friction = .01;
    }
    //updateメソッドの作成
    update() {
        //position.x,position.yにvelocity.x　* speed,velocity.y * speedを加算する。
        this.position.addFromScalar(
            this.velocity.x * this.speed,
            this.velocity.y * this.speed,
        );

        //速度を滑らかに減速させ、最終的に停止させる。
        this.velocity.x = this.velocity.x - (this.velocity.x * this.friction);
        this.velocity.y = this.velocity.y - (this.velocity.y * this.friction);

        //canvas外の衝突判定
        if (this.position.x + this.radius > this.canvas.width || this.position.x - this.radius < 0) {
            this.velocity.x *= -1;
        }
        if (this.position.y + this.radius > this.canvas.height || this.position.y - this.radius < 0) {
            this.velocity.y *= -1;
        }
    }
}