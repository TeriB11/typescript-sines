// Import stylesheets
import './style.css';



// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;


// Define the function to draw the coordinate system axis
function drawCoordinateSystem(
  ctx: CanvasRenderingContext2D,
  canvas2: HTMLCanvasElement,
  ticSize: number,
  numTics: number
): void {
  // Draw x and y axis with tic marks
  ctx.beginPath();
  ctx.moveTo(0, canvas2.height / 2);
  ctx.lineTo(canvas2.width, canvas2.height / 2);
  ctx.moveTo(canvas2.width / 2, 0);
  ctx.lineTo(canvas2.width / 2, canvas2.height);

  const ticSpacing = canvas2.width / numTics;
  for (let i = 1; i < numTics; i++) {
    const xPos = i * ticSpacing;
    ctx.moveTo(xPos, canvas2.height / 2 - ticSize);
    ctx.lineTo(xPos, canvas2.height / 2 + ticSize);
    ctx.fillText(
      i.toString(),
      xPos - ctx.measureText(i.toString()).width / 2,
      canvas2.height / 2 + ticSize + 15
    );
    const yPos = i * ticSpacing;
    ctx.moveTo(canvas2.width / 2 - ticSize, yPos);
    ctx.lineTo(canvas2.width / 2 + ticSize, yPos);
    ctx.fillText(
      i.toString(),
      canvas2.width / 2 - ticSize - 25,
      yPos + ctx.measureText("1").width / 2
    );
  }

  ctx.strokeStyle = "black";
  ctx.stroke();
}

// Define the function to generate and draw multiple sine waves
function generateAndDrawSineWaves(
  canvas2: HTMLCanvasElement,
  amplitude: number,
  numWaves: number
): void {
  const ctx = canvas2.getContext("2d");
  const k = Math.PI / numWaves;

  // Draw coordinate system axis
  drawCoordinateSystem(ctx, canvas2, 10, 9);

  // Calculate offsets for the waves
  const offset1 = Math.PI / 4;
  const offset2 = (3 * Math.PI) / 4;

  // Generate data for each wave
  for (let i = 1; i <= numWaves; i++) {
    const frequency = i; // Calculate frequency for this wave
    const wavePeriod = 8 / (2 * i - 1); // Calculate period for this wave
    const wavePoints: { x: number; y: number }[] = [];

    // Generate data points for this wave
    for (let x = 0; x <= 8; x += wavePeriod / 100) {
      let y;
      if (x >= 3 && x <= 5) {
        // If x is between 3 and 5, set y value to 0
        y = 0;
      } else {
        y =
          amplitude *
          Math.sin(
            (2 * Math.PI * frequency * (x + offset1)) / 8 +
              k * (i - 1) +
              Math.sin((2 * Math.PI * frequency * (x + offset2)) / 8)
          );
      }
      const xPos = (x / 8) * canvas2.width;
      const yPos = ((y / amplitude) * canvas2.height) / 2 + canvas2.height / 2;

      wavePoints.push({ x: xPos, y: yPos });
    }

    ctx.beginPath();

    // Draw the wave using the generated data points
    for (let j = 0; j < wavePoints.length; j++) {
      const { x, y } = wavePoints[j];


    // Draw the wave using the generated data points
    for (let j = 0; j < wavePoints.length; j++) {
      const { x, y } = wavePoints[j];

      if (j === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.strokeStyle = "blue";
    ctx.stroke();
  }
}

// Get the canvas element and call the function to generate and draw the sine waves
//const canvas2 = document.getElementById("canvas2") as HTMLCanvasElement;
canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;
generateAndDrawSineWaves(canvas2, 50, 6)};