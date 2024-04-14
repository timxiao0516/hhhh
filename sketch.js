let patterns = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  generatePatterns(8); // 生成8个随机图案
}

function draw() {
  background("#f3f3f4");

  for (let pattern of patterns) {
    pattern.update();
    pattern.display();
    pattern.checkEdges();
  }
}

function generatePatterns(cols) {
  let rows = cols;
  let cellW = width / cols;
  let cellH = height / rows;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * cellW;
      let y = j * cellH;

      patterns.push(new Pattern(x + cellW / 2, y + cellH / 2));
    }
  }
}

class Pattern {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = random(360);
    this.speed = random(1, 3);
    this.d = random(20, 50);
    this.gradient = createRandomGradient();
    this.c1 = color(126, 127, 131); // 固定顏色1
    this.c2 = color(217, 197, 178); // 固定顏色2
  }

  update() {
    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed;
  }

  display() {
    let cells = 5;
    let offset = width / 30;
    let margin = offset / 20;
    let w = (width - offset * 2 - margin * (cells - 1)) / cells;
    let h = (height - offset * 2 - margin * (cells - 1)) / cells;

    for (let j = 0; j < cells; j++) {
      for (let i = 0; i < cells; i++) {
        let x = offset + i * (w + margin);
        let y = offset + j * (h + margin);

        let d = w * 0.3;

        push();
        translate(this.x, this.y);

        strokeWeight(d / 4.5);
        stroke(this.c1); // 使用固定顏色1
        noFill();
        arc(0, d / 3, d, d, 190, 350);
        arc(0, d / 4, d * 1.3, d * 1.2, 200, 340);
        arc(0, d / 5, d * 1.6, d * 1.5, 210, 330);

        noStroke();
        fill(this.c2); // 使用固定顏色2
        ellipse(0, 0, d, d / 1.12);

        fill("#34312d");
        circle(-d / 4.5, -d / 50, d / 7.5);
        circle(d / 4.5, -d / 50, d / 7.5);

        fill("#34312d");
        ellipse(0, d / 11, d / 3.5, d / 3);

        pop();
      }
    }
  }

  checkEdges() {
    if (this.x - this.d / 2 <= 0 || this.x + this.d / 2 >= width) {
      this.angle = 180 - this.angle;
    }
    if (this.y - this.d / 2 <= 0 || this.y + this.d / 2 >= height) {
      this.angle = -this.angle;
    }
  }
}

function createRandomGradient() {
  let p = ["#7e7f83", "#d9c5b2"];
  let gdcolor1 = random(p);
  let gdcolor2 = random(p);

  let gradient = drawingContext.createLinearGradient(0, 0, 0, 30);
  gradient.addColorStop(0, gdcolor1);
  gradient.addColorStop(1, gdcolor2);

  return gradient;
}
