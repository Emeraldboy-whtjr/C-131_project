var bed = "";
var status = "";
objects = [];

function preload(){
    bed = loadImage("bed_for_normies.png");
}

function setup(){
    canvas = createCanvas(600,400);
    canvas.center();

    object_identifier = ml5.objectDetector("cocossd",cocossd_loaded);
    document.getElementById("status").innerHTML = "Status :- Detecting objects..";

    
}

function draw(){
    image(bed,0,0,600,400);

    if(status != ""){
        for(i = 0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status :- All objects have been detected";
            document.getElementById("obj").innerHTML = "Objects in the image :- bed(1)";
            document.getElementById("objdtc").innerHTML = "Objects detected :- " + objects[0].label + "(" + objects.length + ")";

            fill("red");
            textSize(15);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 20 , objects[i].y + 20);
            noFill(); 
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }


}

function cocossd_loaded(){
    status = true;

    object_identifier.detect(bed,detection_loaded);

}

function detection_loaded(error,results){
    if(error){
        console.error(error);
    }

    else{
        console.log(results);

        objects = results;
    }
}