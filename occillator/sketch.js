const boxWidth = 32;
const boxesPerRow = 16;
const canvasWidth = boxWidth * boxesPerRow;
const canvasHeight = canvasWidth; // Make the canvas square
const boxMinHeight = canvasHeight / 8;
const boxMaxHeight = canvasHeight;
const colors = [
  [130, 186, 180],
  [230, 228, 176],
  [63, 84, 132],
];
let angle = 0; // Angle for the sine wave
let maxDistance;

function setup() {
  createCanvas(canvasWidth, canvasHeight, WEBGL);
  noStroke();

  maxDistance = dist(0, 0, width / 2, height / 2); // Calculate the maximum distance from the center of the canvas
}

function draw() {
  clear(); // Clear the canvas before drawing the next frame
  ortho(-width, width, -height, height); // Set the orthographic projection

  rotateX(-QUARTER_PI / 1.25); // Rotate the canvas around the x-axis
  rotateY(QUARTER_PI); // Rotate the canvas around the y-axis
  
  for (let z = 0; z < height; z += boxWidth) { // Loop through the depth of the canvas with a step of boxWidth
    for (let x = 0; x < width; x += boxWidth) { // Loop through the width of the canvas with a step of boxWidth
      push(); // Save the current transformation matrix

      const distance = dist(x + boxWidth / 2, z + boxWidth / 2, width / 2, height / 2); 
      // Calculate the distance from the center of the canvas from the center of the rectangle
      const offset = map(distance, 0, maxDistance, -PI, PI); // Map the distance to an offset angle
      const boxHight = map(sin(angle + offset), -1, 1, boxMinHeight, boxMaxHeight); // Map the sine value to the height of the rectangle

      translate(x - (width / 2), 0, z - (height / 2)); // Translate the origin to the center of the rectangle

      drawBox(boxWidth, boxHight, boxWidth); // Draw the box with different colors on each side
      pop(); // Restore the transformation matrix
    }
  }
  
  angle = (angle - 0.1) % TWO_PI; // Update angle for animation
}

function drawBox(w, h, d) { // Function to draw a box with different colors on each side
  // Define the 8 vertices of the cube
  const vertices = [
    [-w / 2, -h / 2, -d / 2], // 0
    [w / 2, -h / 2, -d / 2],  // 1
    [w / 2, h / 2, -d / 2],   // 2
    [-w / 2, h / 2, -d / 2],  // 3
    [-w / 2, -h / 2, d / 2],  // 4
    [w / 2, -h / 2, d / 2],   // 5
    [w / 2, h / 2, d / 2],    // 6
    [-w / 2, h / 2, d / 2],    // 7
  ];

  // Use a loop to define each face and color to reduce redundant code
  const faces = [
    { indices: [...vertices[0], ...vertices[1], ...vertices[5], ...vertices[4]], color: colors[0] },
    { indices: [...vertices[4], ...vertices[5], ...vertices[6], ...vertices[7]], color: colors[1] },
    { indices: [...vertices[0], ...vertices[3], ...vertices[7], ...vertices[4]], color: colors[2] },
    // { indices: [...vertices[1], ...vertices[2], ...vertices[6], ...vertices[5]], color: colors[2] },
    // { indices: [...vertices[0], ...vertices[1], ...vertices[2], ...vertices[3]], color: colors[1] },
    // { indices: [...vertices[2], ...vertices[3], ...vertices[7], ...vertices[6]], color: colors[0] },
  ];

  // Draw each face of the box
  faces.forEach(face => {
    fill(...face.color);
    quad(...face.indices);
  });
}