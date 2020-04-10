//vector.jsを読み込む
import { Particle } from './particle'

window.onload = function () {

    var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        particles = [],
        particleNum = 100,
        colors = ['#eeb900', '#6DD0A5', '#f799db'];

    //リサイズイベント
    window.onresize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    //引数の最小値から最大値の間でランダムな値の整数を返す関数
    function randomIntFromRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    //ランダムな色を返す関数
    function randomColor(colors) {
        return colors[Math.floor(Math.random() * colors.length)]
    }

    //最初に定義しておいたparticles配列に、Particleクラスのインスタンスを作成し、各種プロパティを格納する
    for (let i = 0; i < particleNum; i++) {
        particles.push(new Particle(
            canvas,
            canvas.width / 2,
            canvas.height / 2,
            Math.random() * 10 + 2,
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
