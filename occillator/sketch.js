const boxWidth = 64;
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
let halfWidth, halfHeight;
let offsets = [];

function setup() {
  createCanvas(canvasWidth, canvasHeight, WEBGL);
  noStroke(); // Remove the stroke from the shapes

  halfWidth = width / 2;
  halfHeight = height / 2;
  let maxDistance = dist(0, 0, halfWidth, halfHeight); // Calculate the maximum distance from the center of the canvas

  // Precompute offsets
  for (let z = 0; z < height; z += boxWidth) {
    let rowOffsets = [];
    for (let x = 0; x < width; x += boxWidth) {
      const distance = dist(x + boxWidth / 2, z + boxWidth / 2, width / 2, height / 2);
      const offset = map(distance, 0, maxDistance, -PI, PI);
      rowOffsets.push(offset);
    }
    offsets.push(rowOffsets);
  }
}

function draw() {
  clear(); // Clear the canvas before drawing the next frame
  ortho(-width, width, -height, height, -width * height, width * height); // Set the orthographic projection

  rotateX(-QUARTER_PI / 1.25); // Rotate the canvas around the x-axis
  rotateY(QUARTER_PI); // Rotate the canvas around the y-axis
  
  for (let z = 0, row = 0; z < height; z += boxWidth, row++) { // Loop through the depth of the canvas with a step of boxWidth
    for (let x = 0, col = 0; x < width; x += boxWidth, col++) { // Loop through the width of the canvas with a step of boxWidth
      const offset = offsets[row][col];
      const angleOffset = angle + offset;
      const boxHight = map(sin(angleOffset), -1, 1, boxMinHeight, boxMaxHeight); // Map the sine value to the height of the rectangle

      push(); // Save the current transformation matrix
      translate(x - halfWidth, 0, z - halfHeight); // Translate the origin to the center of the rectangle
      drawBox(boxWidth, boxHight, boxWidth); // Draw the box with different colors on each side
      pop(); // Restore the transformation matrix
    }
  }

  angle = (angle - 0.05) % TWO_PI; // Update angle for animation
}

// Function to draw a box with different colors on each side
function drawBox(boxWidth, boxHeight, boxDepth) {
  const faces = [
    // Top face
    {
      translation: [0, -boxHeight / 2, 0],
      rotation: [HALF_PI, 0, 0],
      color: colors[0],
      planeSize: [boxWidth, boxDepth],
    },
    // // Bottom face
    // {
    //   translation: [0, boxHeight / 2, 0],
    //   rotation: [-HALF_PI, 0, 0],
    //   color: colors[0],
    //   planeSize: [boxWidth, boxDepth],
    // },
    // Front face
    {
      translation: [0, 0, boxDepth / 2],
      rotation: [0, 0, 0],
      color: colors[1],
      planeSize: [boxWidth, boxHeight],
    },
    // // Back face
    // {
    //   translation: [0, 0, -boxDepth / 2],
    //   rotation: [0, PI, 0],
    //   color: colors[1],
    //   planeSize: [boxWidth, boxHeight],
    // },
    // // Right face
    // {
    //   translation: [boxWidth / 2, 0, 0],
    //   rotation: [0, HALF_PI, 0],
    //   color: colors[2],
    //   planeSize: [boxDepth, boxHeight],
    // },
    // Left face
    {
      translation: [-boxWidth / 2, 0, 0],
      rotation: [0, -HALF_PI, 0],
      color: colors[2],
      planeSize: [boxDepth, boxHeight],
    },
  ];

  faces.forEach(face => {
    push();
    translate(...face.translation);
    if (face.rotation[0]) rotateX(face.rotation[0]);
    if (face.rotation[1]) rotateY(face.rotation[1]);
    if (face.rotation[2]) rotateZ(face.rotation[2]);
    fill(...face.color);
    plane(...face.planeSize); // Draw a plane with the specified size
    pop();
  });
}