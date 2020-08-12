let numBalls = 7;
let diameter = 40;

let x_pos = []
let y_pos = []
let x_vel = []
let y_vel = []
let dist = 50;

let v_factor = 5;


function getLegalX() {
  let x = windowWidth * Math.random();
   while (x < (2 * diameter) || x > (windowWidth - (2 * diameter))) {
      x = windowWidth * Math.random();
    }
    return x;
}

function getLegalY() {
  let y = windowHeight * Math.random();
  while (y < (2 * diameter) || y > (windowHeight - (2 * diameter))) {
      y = windowHeight * Math.random();
    }
    return y;
}

function setup() {


  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < numBalls; i++) {
    let legal = false;
    let x;
    let y;
    while(legal === false){
       x = getLegalX();
       y = getLegalY();


    //check ball isn't spawned on top of another ball
      if(i >= 1){
        for(let j = 0; j < i; j++){
          let temp = Math.sqrt(Math.pow((x_pos[j] +x_vel[j] - x), 2) + Math.pow((y_pos[j] +y_vel[j] - y), 2));
          if(temp < diameter){
            legal = false;
            break; //try again
          } else {
            legal = true;
          }
        }
      } else {
        break;
      }
    }


    let vx = v_factor * Math.random();
    let vy = v_factor * Math.random();
    x_pos.push(x);
    y_pos.push(y);
    x_vel.push(vx);
    y_vel.push(vy);

    stroke("#5e03fc");

    strokeWeight(3);

    circle(x_pos[i], y_pos[i], diameter);
  }

  frameRate(40);
}


function draw() {

  background(232, 232, 232);



  for (let i = 0; i < numBalls; i++) {

       /* collisions */
      for (let j = 0; j < numBalls; j++) {
        if (j !== i) {
          dist = Math.sqrt(Math.pow(((x_pos[j] + (x_vel[j] /2)) - (x_pos[i] + (x_vel[i] /2))), 2) + Math.pow(((y_pos[j] + (y_vel[j]/2 )) - (y_pos[i] + (y_vel[i] /2))), 2))

        }

        if (dist < diameter) {
          x_vel[j] *= -1;
          y_vel[j] *= -1;
        }

      }

    /*left */
    if (x_pos[i] + x_vel[i] / 2 <= diameter) {
      x_vel[i] *= -1
      x_pos[i] = diameter;
    }
    /* right */
    if (x_pos[i] + x_vel[i] / 2 >= (windowWidth - diameter)) {
      x_vel[i] *= -1
      x_pos[i] = windowWidth - (diameter);
    }

    /*top */
    if (y_pos[i] + y_vel[i] / 2 <= diameter) {
      y_vel[i] *= -1;
      y_pos[i] = diameter;
    }
    /*bottom */
    if (y_pos[i] + y_vel[i] / 2 >= (windowHeight - diameter)) {
      y_vel[i] *= -1;
      y_pos[i] = windowHeight - (diameter);
    }



    clear();


    x_pos[i] += x_vel[i];
    y_pos[i] += y_vel[i];

    fill(0, 0, 0, 0);
    rect(0, 0, windowWidth, windowHeight);
    for (let z = 0; z < numBalls; z++) {
      circle(x_pos[z], y_pos[z], diameter);
    }


  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
