// example
const canvas = document.createElement("canvas");
canvas.id = "myCanvas";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.zIndex = 8;
canvas.style.position = "absolute";

const body = document.getElementsByTagName("body")[0];
body.appendChild(canvas);

const ctx = canvas.getContext("2d");

function drawArt() {
    // example
    /*
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = `rgba(${randomM0() * 255}, ${randomM0() * 255}, ${
        randomM0() * 255
    }, 1)`;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "rgba(0, 255, 0, .5)";
    ctx.fillRect(m1 * width, m2 * height, m3 * width * 0.5, m4 * height * 0.5);

    ctx.fillStyle = "rgba(255, 0, 0, .5)";
    ctx.fillRect(m3 * width * 0.5, m4 * height * 0.5, m1 * width * 0.5, m2 * height * 0.5);

    ctx.fillStyle = "rgba(0, 0, 255, .5)";
    ctx.fillRect(m2 * width * 0.5, m3 * height * 0.5, m4 * width, m1 * height);
    */

    // test
const width = window.innerWidth;
const height = window.innerHeight;

const pointsCount = 20;
const points = [];

for (let i = 0; i < pointsCount; i++) {
  const x = i / (pointsCount - 1) * width;
  const y = m1 * height;
  points.push({ x, y });
}

function generateGradient(width, height) {
  const gradient = [];
  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      const angle = m2 * 2 * Math.PI;
      row.push({ x: Math.cos(angle), y: Math.sin(angle) });
    }
    gradient.push(row);
  }
  return gradient;
}

function interpolate(x1, y1, x2, y2, t) {
  return y1 + (y2 - y1) * ((t - x1) / (x2 - x1));
}

function perlinNoise(x, y, gradient) {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const x1 = x0 + 1;
  const y1 = y0 + 1;

  const dx0 = x - x0;
  const dx1 = x - x1;
  const dy0 = y - y0;
  const dy1 = y - y1;

  const g00 = gradient[y0][x0];
  const g01 = gradient[y0][x1];
  const g10 = gradient[y1][x0];
  const g11 = gradient[y1][x1];

  const dot00 = g00.x * dx0 + g00.y * dy0;
  const dot01 = g01.x * dx1 + g01.y * dy0;
  const dot10 = g10.x * dx0 + g10.y * dy1;
  const dot11 = g11.x * dx1 + g11.y * dy1;

  const weightX = 6 * dx0 ** 5 - 15 * dx0 ** 4 + 10 * dx0 ** 3;
  const weightY = 6 * dy0 ** 5 - 15 * dy0 ** 4 + 10 * dy0 ** 3;

  const n0 = interpolate(x0, dot00, x1, dot01, dx0);
  const n1 = interpolate(x0, dot10, x1, dot11, dx0);
  const noise = interpolate(y0, n0, y1, n1, dy0);

  return noise;
}

function drawCurve(ctx) {
  const gradient = generateGradient(pointsCount, 10);
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  for (let i = 1; i < pointsCount; i++) {
    const x = points[i].x;
    const y = points[i].y + perlinNoise(points[i].x / width * 4, points[i].y / height * 4, gradient) * 100;
    ctx.lineTo(x, y);
  }

  ctx.strokeStyle = "white";
  ctx.lineWidth = 5;
  ctx.stroke();
}

const canvas = document.querySelector("canvas");
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext("2d");

ctx.fillStyle = `rgba(${m3 * 255}, ${m4 * 255}, ${
  m1 * 255
}, 1)`;
ctx.fillRect(0, 0, width, height);

drawCurve(ctx);

    triggerPreview();
}
