//vector.jsを読み込む
import { Vector } from './vector'

window.onload = function () {

    var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        particles = [],
        particleNum = 100,
        colors = ['#eeb900', '#6DD0A5', '#f799db'];

    //引数の最小値から最大値の間でランダムな値の整数を返す関数
    function randomIntFromRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    //ランダムな色を返す関数
    function randomColor(colors) {
        return colors[Math.floor(Math.random() * colors.length)]
    }

    //Particleクラスを作成する
    class Particle {
        //コンストラクターでposition(位置),velocity(進路方向),direction(進路方向),speed(速度),radius(半径),color(色)を定義する
        constructor(x, y, speed, direction, radius, color) {
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
        }
        //updateメソッドの作成
        update() {
            //position.x,position.yにvelocity.x　* speed,velocity.y * speedを加算する。
            this.position.addFromScalar(
                this.velocity.x * this.speed,
                this.velocity.y * this.speed,
            );
            //canvas外の衝突判定
            if (this.position.x + this.radius > canvas.width || this.position.x - this.radius < 0) {
                this.velocity.x *= -1;
            }
            if (this.position.y + this.radius > canvas.height || this.position.y - this.radius < 0) {
                this.velocity.y *= -1;
            }
        }
    }

    //最初に定義しておいたparticles配列に、Particleクラスのインスタンスを作成し、各種プロパティを格納する
    for (let i = 0; i < particleNum; i++) {
        particles.push(new Particle(
            canvas.width / 2,
            canvas.height / 2,
            Math.random() + 8,
            Math.random() * Math.PI * 2,
            randomIntFromRange(2, 24),
            randomColor(colors),
        ));
    }

    render();

    function render() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particleNum; i++) {
            var p = particles[i];
            p.update();
            ctx.beginPath();
            ctx.arc(p.position.x, p.position.y, p.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = p.color;
            ctx.fill();
        }
        requestAnimationFrame(render);
    }
}
