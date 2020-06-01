
let numBalls = 6;
let w = 500;
let h = 500;
let rad = 20;

let x_pos = []
let y_pos = []
let x_vel = []
let y_vel = []
let dist = 50;


let v_factor = 5;

function setup() {


createCanvas(w, h);

  for(let i = 0; i < numBalls; i++){
    let x = w*Math.random();
    let y = h*Math.random();

    while( x < (2*rad) || x > (w-(2*rad))){
       x = w*Math.random();
    }
    while( y < (2*rad) || y > (h-(2*rad))){
       y = h*Math.random();
    }

    let vx = v_factor*Math.random();
    let vy = v_factor*Math.random();
    console.log(vx)

    x_pos.push(x);
    y_pos.push(y);
    x_vel.push(vx);
    y_vel.push(vy);

    stroke("#"+((1<<24)*Math.random()|0).toString(16));

    strokeWeight(2);

    circle(x_pos[i],y_pos[i],rad);
  }

frameRate(40);
}


function wait(ms)
{
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while(d2-d < ms);
}


function draw() {

  background(232,232,232);



  for(let i = 0; i < numBalls; i++){

    /*left */
    if(x_pos[i]+x_vel[i]/3 <= rad ){
      x_vel[i] *= -1
      x_pos[i] = rad;
    }
    /* right */
    if( x_pos[i]+x_vel[i]/3  >= (w - rad)){
      x_vel[i] *= -1
      x_pos[i] = w - (rad);
    }

    /*top */
    if(y_pos[i]+y_vel[i]/3 <= rad){
      y_vel[i] *= -1;
      y_pos[i] = rad;
    }
    /*bottom */
    if( y_pos[i]+y_vel[i]/3  >= (h -rad)){
      y_vel[i] *= -1;
      y_pos[i] = h - (rad);
    }


      /* collisions */
    for( let f = 0; f < numBalls; f++){
      for(let j = 0; j < numBalls; j++){
          if(j !== f){
              dist = Math.sqrt(  Math.pow(( (x_pos[j] + (x_vel[j]/5))   - (x_pos[f] + (x_vel[f]/5)) ),2) + Math.pow(((y_pos[j] + (y_vel[j]/5) )  - (y_pos[f] +( y_vel[f]/5))),2)  )

            }

            if(dist < 2*rad){
                  x_vel[j] *= -1
                  y_vel[j] *= -1;

                  console.log(dist)
            }

          }
      }
      clear();


      x_pos[i] += x_vel[i];
      y_pos[i] += y_vel[i];

      fill(0,0,0,0);
      rect(0,0,w,h);
      for (let z = 0; z < numBalls; z++ ){
        circle(x_pos[z],y_pos[z],rad);
      }

    }


  }
