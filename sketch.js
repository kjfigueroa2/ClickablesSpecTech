
/***********************************************************************************
Clickables Speculative Technology
by Kaila Figueroa


***********************************************************************************/

// the manager class
var clickablesManager;

// an array of clickable objects
var clickables;
var gDebugMode = false;

// indexes into the array (constants) CHANGE to be png for conform and deconform
const correctIndex = 0;
const cautionIndex = 1;
const wrongIndex = 2;
const sleepIndex = 3;
const printIndex = 4;
const speakIndex = 5;
const resetIndex = 6;

//list of variables 
let og;
let correct;
let caution;
let wrong;
let sleep;
let printMode;
let speak;
let resetMode;

let current_img;
let print_img;
let speak_img;
let current_txt;


function preload(){
  clickablesManager = new ClickableManager('assets/clickableLayout.csv');
}


function setup() {
  createCanvas(900,600);
  og = loadImage('assets/og_Mode.png');
  correct = loadImage('assets/correct_Mode.png');
  caution = loadImage('assets/caution_Mode.png');
  wrong = loadImage('assets/wrong_Mode.png');
  sleep = loadImage('assets/sleep_Mode.png');
  printMode = loadImage('assets/print.png');
  speak = loadImage('assets/speak.png');

  current_img = og;
  print_img = loadImage('');
  speak_img = loadImage('');
  current_txt = 'Introducing Truthie! The robot that can fact check information. Scan the QR code or print for more in depth info!';
  

  // setup the clickables = this will allocate the array
  clickables = clickablesManager.setup();

  // call function to setup additional information about the p5.clickables
  setupClickables(); 

  // output to the message window
  console.log(clickables);
}

// draw function
function draw() {
  background(185, 115, 117);
  fill(230);
  strokeWeight(0);
  square(250,75,410);
  image(current_img,230,60,460,460);
  image(print_img,230,60,460,460);
  image(speak_img,230,60,460,460);

 
  drawRect();
  fill(0);
  textFont('Helvetica', 15);
  text(current_txt,100,18,800,40);
  
  
  if(gDebugMode == true ){
    drawDebugInfo();
  }

  // draw the p5.clickables
  clickablesManager.draw();
}
//debug
function keyTyped(){
  if(key === ' '){
    gDebugMode = !gDebugMode;
  }
}

function drawDebugInfo(){
  fill(225);
  text("X: " + mouseX + "  Y:" + mouseY, 20, height - 20);
}

//rectangle features
function drawRect(){
  fill(226,220,222);
  strokeWeight(0);
  rect(50,10,800,40);
}

// change individual fields of the clickables
function setupClickables() {
  clickables[correctIndex].visible = true;
  clickables[cautionIndex].visible = true; 
  clickables[wrongIndex].visible = true;
  clickables[sleepIndex].visible = true;
  clickables[printIndex].visible = true;
  clickables[resetIndex].visible = true;
  

  // These are the CALLBACK functions. Right now, we do the SAME function for all of the clickables
  for( let i = 0; i < clickables.length; i++ ) {
    clickables[i].onPress = clickableButtonPressed;
    clickables[i].onHover = clickableButtonHover;
    clickables[i].onOutside = clickableButtonOnOutside;
  }
}

//--- CLICKABLE CALLBACK FUNCTIONS ----

clickableButtonPressed = function () {
// Changing modes of robot
  if( this.id === correctIndex) {
    print_img = loadImage('');
    speak_img = loadImage('');
    current_img = correct;
    current_txt = ('The information is correct!');
  }
  else if(this.id === cautionIndex){
    print_img = loadImage('');
    speak_img = loadImage('');
    current_img = caution;
    current_txt = ('The information is partially correct!');
  }

  else if( this.id === wrongIndex ) {
    print_img = loadImage('');
    speak_img = loadImage('');
    current_img = wrong;
    current_txt = ('The information is wrong!');
  }

  else if( this.id === sleepIndex ) {
    print_img = loadImage('');
    speak_img = loadImage('');
    current_img = sleep;
    current_txt = ('Truthie is on sleep mode.');
  }
//features of robot
  else if( this.id === printIndex ) {
    print_img = printMode;
    current_img = current_img;
    current_txt = ('Printing summary of information!');
  }

  else if( this.id === speakIndex ) {
    speak_img = speak;
    current_img = current_img;
    current_txt = ('Truthie is speaking!');
  }
//reset
  else if( this.id === resetIndex ) {
    print_img = loadImage('');
    speak_img = loadImage('');
    current_img = og;
    current_txt = ('Introducing Truthie! The robot that can fact check information. Scan the QR code or print for more in depth info!');
  }

}

// New color when the mouse hovers the button
clickableButtonHover = function () {
  this.color = "#CEB1BE";
  this.noTint = false;
  this.tint = "#FF0000";
}

// Default color for buttons
clickableButtonOnOutside = function () {
  this.color = "#F1E4E8";
  this.noTint = true;
}