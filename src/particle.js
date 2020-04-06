//vector.jsを読み込む
import { Vector } from './vector'

//Particleクラスを作成する
export class Particle {
    //コンストラクターでcanvas,position(位置),velocity(進路方向),direction(角度),speed(速度),radius(半径),color(色)を定義する
    constructor(canvas, x, y, speed, direction, radius, color) {
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
        this.friction = .04;
    }
    //updateメソッドの作成
    update() {
        //position.x,position.yにvelocity.x　* speed,velocity.y * speedを加算する。
        this.position.addFromScalar(
            this.velocity.x * this.speed,
            this.velocity.y * this.speed,
        );

        //速度を滑らかに減速させ、最終的に停止させる。
        this.speed = this.speed - (this.speed * this.friction);

        //速度が0.5以下になった時に再度速度の値を追加して向きを変更する。
        if (this.speed <= .4) {
            this.velocity.setFromAngle(Math.random() * Math.PI * 2);
            this.speed = Math.random() + 8;
        }

        //canvas外の衝突判定
        if (this.position.x + this.radius > this.canvas.width || this.position.x - this.radius < 0) {
            this.velocity.x *= -1;
        };
        if (this.position.y + this.radius > this.canvas.height || this.position.y - this.radius < 0) {
            this.velocity.y *= -1;
        };

        //position(位置)がcanvas外に出た時は中央に再配置
        if (this.position.x > this.canvas.width) {
            this.position.x = this.canvas.width / 2;
        };
        if (this.position.y > this.canvas.height) {
            this.position.y = this.canvas.height / 2;
        };
    }
}