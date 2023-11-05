let particleSystem;
let wind; // 바람 벡터 추가

function setup() {
  createCanvas(400, 400);
  background(255);
  particleSystem = new ParticleSystem();
  wind = createVector(0, 0.025); // 바람은 위에서 아래로 설정
  noStroke(); // 바깥선 없앰
}

function draw() {
  particleSystem.applyForce(wind); // 바람 적용
  particleSystem.run();
}

function mouseClicked() {
  particleSystem.addParticle(mouseX, mouseY);
}

class ParticleSystem {
  constructor() {
    this.particles = [];
  }

  addParticle(x, y) {
    for (let i = 0; i < 30; i++) {
      let particle = new Particle(x, y);
      this.particles.push(particle);
    }
  }

  applyForce(force) {
    for (let particle of this.particles) {
      particle.applyForce(force);
    }
  }

  run() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      let p = this.particles[i];
      p.update();
      p.display();
      if (p.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }
}

class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D();
    this.velocity.mult(random(1, 2));
    this.acceleration = createVector(0, 0.05);
    this.lifespan = 60;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 1;
  }

  display() {
    fill(255, 200, 200, this.lifespan * 1.4);
    ellipse(this.position.x, this.position.y, 20, 20);
  }

  isDead() {
    return this.lifespan <= 0;
  }
}
