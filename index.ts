// Import stylesheets
import './style.css';



// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;


// Define the function to draw the coordinate system axis
function drawCoordinateSystem(
  canvas: HTMLCanvasElement,
  ticSize: number,
  numTics: number
): void {
  const ctx = canvas.getContext("2d");

  // Draw x and y axis with tic marks
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);

  const ticSpacing = canvas.width / numTics;
  for (let i = 1; i < numTics; i++) {
    const xPos = i * ticSpacing;
    ctx.moveTo(xPos, canvas.height / 2 - ticSize);
    ctx.lineTo(xPos, canvas.height / 2 + ticSize);
    ctx.fillText(
      i.toString(),
      xPos - ctx.measureText(i.toString()).width / 2,
      canvas.height / 2 + ticSize + 15
    );
    const yPos = i * ticSpacing;
    ctx.moveTo(canvas.width / 2 - ticSize, yPos);
    ctx.lineTo(canvas.width / 2 + ticSize, yPos);
    ctx.fillText(
      i.toString(),
      canvas.width / 2 - ticSize - 25,
      yPos + ctx.measureText("1").width / 2
    );
  }

  ctx.strokeStyle = "black";
  ctx.stroke();
}


// Function to generate data for a single sine wave
function generateSineWaveData(frequency: number, amplitude: number): { x: number; y: number }[] {
  const k = .5*Math.PI;
  const wavePeriod = 8 / (2 * frequency - 1);
  const wavePoints: { x: number; y: number }[] = [];

  for (let x = 0; x <= 8; x += wavePeriod / 100) {
    const y = amplitude * Math.sin((2 * Math.PI * frequency * x) / 8 + k * frequency);
    const xPos = x;
    const yPos = y;

    wavePoints.push({ x: xPos, y: yPos });
  }

  return wavePoints;
}


// Function to render multiple sine waves on a canvas
function drawSineWaves(canvas: HTMLCanvasElement, waves: { frequency: number; amplitude: number }[]): void {
  const ctx = canvas.getContext("2d");
  const ticSize = 10; // Set size of tic marks on the axis
  drawCoordinateSystem(canvas, 10, 9)

  // Generate data for each wave and draw it
  for (let i = 0; i < waves.length; i++) {
    const { frequency, amplitude } = waves[i];
    const wavePoints = generateSineWaveData(frequency, amplitude);

    ctx.beginPath();

    // Draw the wave using the generated data points
    for (let j = 0; j < wavePoints.length; j++) {
      const { x, y } = wavePoints[j];

      const xPos = (x / 8) * canvas.width;
      const yPos = (y / amplitude) * (canvas.height / 2) + canvas.height / 2;

      if (j === 0) {
        ctx.moveTo(xPos, yPos);
      } else {
        ctx.lineTo(xPos, yPos);
      }
    }

    ctx.strokeStyle = `hsl(${(i * 30) % 360}, 70%, 50%)`;
    ctx.stroke();
  }
}

// Call the function with example values
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const waves = [{ frequency: 1, amplitude: 50 }, { frequency: 2, amplitude: 50 }, { frequency: 3, amplitude: 50 }, { frequency: 4, amplitude: 50 }, { frequency: 5, amplitude: 50 }];
drawSineWaves(canvas, waves);