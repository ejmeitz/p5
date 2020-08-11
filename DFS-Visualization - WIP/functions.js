function getLegalX(diameter) {
  let x = windowWidth * Math.random();
   while (x < (2 * diameter) || x > (windowWidth - (2 * diameter))) {
      x = windowWidth * Math.random();
    }
    return x;
}

function getLegalY(diameter) {
  let y = windowHeight * Math.random();
  while (y < (2 * diameter) || y > (windowHeight - (2 * diameter))) {
      y = windowHeight * Math.random();
    }
    return y;
}
