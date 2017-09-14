var welcomePos = 65
var count = 3;
var w = window.innerWidth;
var h = window.innerHeight;
var multiplier = 1;
var timer;
var time = 0;
var canvas = document.createElement('canvas');
var context = canvas.getContext("2d");
var firstCall = true
var title = document.getElementById('title');
var welcome = document.getElementById('welcome');
var email = document.getElementById('contact');
var indev = document.getElementById('in-dev');

setup();

// sets default values and initiates actions
function setup() {
  canvas.width = w;
  canvas.height = h;
  document.body.appendChild(canvas);
  title.style.opacity = 0;
  welcome.style.opacity = 0;
  welcome.style.top = welcomePos + "%";
  email.style.opacity = 0;
  indev.style.opacity = 0;
  if(w > 1000) {
    scale = 1000 / 928;
  } else {
    scale = w / 928;
  }
  timer = setInterval(fadeInWelcome, 1);
}

// welcome message fade and glide in
function fadeInWelcome() {
  if(welcomePos < 50) {
    count = (49 - welcomePos) * 0.015;
    clearInterval(timer);
    fadeOutWelcome();
  }
  welcomePos += (49 - welcomePos) * 0.015;
  welcome.style.opacity = ((65 - welcomePos) * (100 / 15)) / 100;
  welcome.style.top = welcomePos + "%";
}

// welcome message glide and fade out
function fadeOutWelcome() {
  if(firstCall) {
    firstCall = false;
    timer = setInterval(fadeOutWelcome, 1);
  }
  if(welcomePos < 35) {
    clearInterval(timer);
    firstCall = true;
    setTimeout(startTimer, 250);
  }
  count += count * 0.02;
  welcomePos += count;
  welcome.style.opacity = ((welcomePos - 35) * (100 / 15)) / 100;
  welcome.style.top = welcomePos + "%";
}

// initiates what needs to be done to draw circle and show title
// calls drawCircle every millisecond
function startTimer() {
  count = 0;
  clearInterval(timer);
  timer = setInterval(drawCircle, 1);
}

// ease out animation of circle draw and opacity for title
function drawCircle() {
  title.style.opacity = time / (Math.PI * 2);
  count += 1;
  context.beginPath();
  context.clearRect(0,0,w,h);
  context.fillStyle = '#104b75';
  context.strokeStyle = '#104b75';
  time += ((Math.PI * 2.01) - time) * 0.01;
  context.arc((w/2) , (h/2), 250 * scale, 0, time);
  context.lineWidth = 12 * scale;
  context.stroke();
  if(time > Math.PI * 2) {
    clearInterval(timer);
    timer = setInterval(clearCircle, 1);
  }
}

// grow and fade out animation
function clearCircle() {
  context.globalAlpha -= 0.01;
  context.beginPath();
  context.clearRect(0,0,w,h);
  context.fillStyle = '#104b75';
  context.strokeStyle = '#104b75';
  context.arc((w/2) , (h/2), (((1 - context.globalAlpha) * 10) + 250) * scale, 0, Math.PI * 2);
  context.lineWidth = 12 * scale;
  context.stroke();
  if(context.globalAlpha < 0.01) {
    context.clearRect(0,0,w,h);
    count = 0
    clearInterval(timer);
    timer = setInterval(showEmail, 1);
  }
}

// fade in email
function showEmail() {
  count += 0.01;
  email.style.opacity = count;
  if(count > 0.99) {
    count = 0
    clearInterval(timer);
    timer = setInterval(showInfo, 1);
  }
}

// fade in info
function showInfo() {
  count += 0.004 * multiplier;
  indev.style.opacity = count;
  if(count > 0.99) {
    multiplier = -1;
  } else if(count < 0.01) {
    multiplier = 1;
  }
}
