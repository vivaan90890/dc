img = "";
status = "";
objects = [];

function preload() {
  img  = loadImage("utensils.jpg");
}
function setup() {
   canvas = createCanvas(500  ,  500);
   canvas.center();

   objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
   document.getElementById("status").innerHTML  = "STATUS = Detecting Objects";
}
function draw() {
   image(img , 0 , 0, 500 , 500);
   if(status != "") {
    for (index = 0; index < objects.length; index++) {
        document.getElementById("status").innerHTML = "STATUS = Objects Detected";
        document.getElementById("about-info").innerHTML = objects.length+" objects are detected out of 5";

        percent  =  floor(objects[index].confidence * 100);
        fill(255 , 255 , 255);
        text(objects[index].label + " "+percent+"%" , objects[index].x + 15 , objects[index].y + 15);
        noFill();
        stroke(255 , 255 , 255);
        rect(objects[index].x , objects[index].y , objects[index].width , objects[index].height);
    }
   }
}

function modelLoaded() {
    console.log("model is loaded");
    status = true;
    objectDetector.detect(img , gotResult);
}

function gotResult(error , results) {
    if(error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
}