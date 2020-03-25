import {vector} from './vector'

window.onload = function () {

    var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        particles = [],
        particleNum = 100;

    class Particle {
        constructor(x, y, speed, direction){
            this.position = vector.create(x, y);
            this.velocity = vector.create(0, 0);
            this.velocity.setFromAngle(direction);
            this.speed = speed;
        }
        update(){
            this.position.addFromScalar(
                this.velocity.getX() * this.speed,
                this.velocity.getY() * this.speed,
            );
        }
    }

    for (let i = 0; i < particleNum; i++) {
        particles.push(new Particle(
            canvas.width / 2,
            canvas.height / 2,
            Math.random(),
            Math.random() * Math.PI * 2
        ));
    }
    // console.log(perticles)

    render();

    function render() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particleNum; i++) {
            var p = particles[i];
            p.update();
            ctx.beginPath();
            ctx.arc(p.position.getX(), p.position.getY(), 10, 0, Math.PI * 2, false);
            ctx.fill();
            // console.log(p)
        }
        requestAnimationFrame(render);
    }
}
