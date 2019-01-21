var webcam;

//var faces;  // not needed if we're just drawing to a single face
var faceVertices;
var faceRotation;
var faceDataReceived = false;
var faceTrackingStatus = false;

var canvasWidth = 640;
var canvasHeight = 480;

// function to set up the canvas that will draw the webcam's input
var webcamCanvas = function( p ) {
  p.setup = function() {
    setupCanvas(p);

    // set up the webcam HTML5 video element and make it hidden on the page
    webcam = p.createCapture('VIDEO');
    webcam.size(canvasWidth, canvasHeight);
    webcam.hide();
  };

  p.draw = function() {
    p.image(webcam, 0, 0, canvasWidth, canvasHeight);
  };
}

// function to set up the canvas that will draw whatever layers we want to place on top of the webcam's input
var drawingCanvas = function( p ) {
  p.setup = function() {
    setupCanvas(p);
  };

  p.draw = function() {
    // clear the canvas drawing buffer each frame (can easily be turned off)
    p.clear();
    // set the canvas background to transparent (otherwise you won't see the webcam's input)
    p.background(0, 0, 0, 0);
    // set the
    p.fill(0, 0, 0, 0);
    p.stroke(255, 0, 0);

    // only draw if you've received data from the facetracking library
    if (faceDataReceived == true && faceTrackingStatus == true) {
      for(var k = 0; k < faceVertices.length; k += 2) {
        // draw a circle on top of each face vertex - you have to divide the vertex's X and Y coordinates by 2 to draw accurately on the p5 canvas
        p.ellipse(faceVertices[k]/2, faceVertices[k+1]/2, 5, 5);
      }
    }
  };
}

var p5Webcam = new p5(webcamCanvas, 'canvasContainer');
var p5Drawing = new p5(drawingCanvas, 'canvasContainer');

function sendFaceDataToP5(faces) {
  if (faceDataReceived == false) {
    faceDataReceived = true;
  }

  faceVertices = faces[0].vertices;
  faceRotation = [faces[0].rotationX, faces[0].rotationY, faces[0].rotationZ];

  // ** FOR MULTI-FACE TRACKING
  // for(var i = 0; i < faces.length; i++) {
  //   var face = faces[i];
  //   faceVertices = face.vertices;
  // }
}

function sendFaceTrackingStatusToP5(trackingStatus) {
  faceTrackingStatus = trackingStatus;
}

function setupCanvas(p) {
  let canvas = p.createCanvas(canvasWidth, canvasHeight);

  // find the div element that contains our canvases and set the p5 canvas to have its position
  // if we don't do this, the canvas will default draw to our window's (0, 0) position,
  // overwriting other elements on the page
  var canvasContainerElement = p.selectAll('.canvasContainerClass');
  let containerElementPositionX = canvasContainerElement[0].elt.offsetLeft;
  let containerElementPositionY = canvasContainerElement[0].elt.offsetTop;
  canvas.position(containerElementPositionX, containerElementPositionY);
}
