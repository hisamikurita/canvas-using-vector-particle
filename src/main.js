import {vector} from './vector'

window.onload = function () {

    var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        particles = [],
        particleNum = 100;

    class particle {
        constructor(position, velocity) {
            this.position = position;
            this.velocity = velocity;
        };
        static create(x, y, speed, direction) {
            this.position = vector.create(x,y);
            this.velocity = vector.create(0,0);
            this.velocity.setLength(speed);
            this.velocity.setAngle(direction);
            return this;
        };
        static update(){
            this.position.addTo(this.velocity)
        }
    }

    for (let i = 0; i < particleNum; i++) {
        particles.push(particle.create(canvas.width / 2, canvas.height / 2, Math.random() * 3 / 1000, Math.random() * Math.PI * 2))
    }
    // console.log(perticles)

    update();
    function update() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particleNum; i++) {
            var p = particles[i];
            p.update();
            ctx.beginPath();
            ctx.arc(p.position.getX(), p.position.getY(), 10, 0, Math.PI * 2, false);
            ctx.fill();
            // console.log(p)
        }
        requestAnimationFrame(update);
    }
}