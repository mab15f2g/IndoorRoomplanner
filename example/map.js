/*
****************************************Initial Parameters **************************
*/
/* 
var svg = d3.select("#mapfield").call(d3.zoom().on("zoom", function () {
   svg.attr("transform", d3.event.transform)})).append("g"),

  
*/



var svg = d3.select("#mapfield"),


    width = +svg.attr("width"),
    height = +svg.attr("height"),
    g = svg.append("g").attr("transform", "translate(32," + (height / 2) + ")"),
    map = d3.floorplan(); // initialize floor plan




/*
*****************************MAP DATA *************************************************
 */
var mapdata =
    {
        floors: [
            {
                id: "94325",
                name: "Floor 1",
                image: {
                    x: 0,
                    y: 0,
                    w: 960,
                    h: 500
                },
                zones: [
                    {
                        id: "3ada4",
                        name: "Shelf - 71041",
                        points: [
                            [
                                700,
                                441
                            ],
                            [
                                700,
                                392
                            ],
                            [
                                480,
                                392
                            ],
                            [
                                480,
                                441
                            ]
                        ]
                    },
                    {
                        id: "be497",
                        name: "Shelf - 54b7a",
                        points: [
                            [
                                404,
                                389
                            ],
                            [
                                404,
                                440
                            ],
                            [
                                214,
                                440
                            ],
                            [
                                214,
                                389
                            ]
                        ]
                    },
                    {
                        id: "65000",
                        name: "Shelf - 8d99c",
                        points: [
                            [
                                150,
                                472
                            ],
                            [
                                106,
                                472
                            ],
                            [
                                106,
                                6
                            ],
                            [
                                150,
                                6
                            ]
                        ]
                    },
                    {
                        id: "30eba",
                        name: "Shelf - 252d3",
                        points: [
                            [
                                214,
                                335
                            ],
                            [
                                700,
                                335
                            ],
                            [
                                700,
                                286
                            ],
                            [
                                214,
                                286
                            ]
                        ]
                    },
                    {
                        id: "9afd0",
                        name: "Shelf - 8b191",
                        points: [
                            [
                                214,
                                255
                            ],
                            [
                                214,
                                207
                            ],
                            [
                                700,
                                207
                            ],
                            [
                                700,
                                255
                            ]
                        ]
                    },
                    {
                        id: "be17e",
                        name: "Shelf - 26838",
                        points: [
                            [
                                214,
                                150
                            ],
                            [
                                214,
                                100
                            ],
                            [
                                700,
                                100
                            ],
                            [
                                700,
                                150
                            ]
                        ]
                    },
                    {
                        id: "1c725",
                        name: "Shelf - 6f1c3",
                        points: [
                            [
                                150,
                                477
                            ],
                            [
                                700,
                                477
                            ],
                            [
                                700,
                                500
                            ],
                            [
                                150,
                                500
                            ]
                        ]
                    },
                    {
                        id: "5ee48",
                        name: "Shelf - 1a1bc",
                        points: [
                            [
                                216,
                                9.199999809265137
                            ],
                            [
                                217,
                                55.20000076293945
                            ],
                            [
                                700,
                                57.20000076293945
                            ],
                            [
                                700,
                                7.199999809265137
                            ]
                        ]
                    }
                ],
                objects: [

                ]
            }


        ]
    }
    ;



// Load Floor image
map.imageLayers(svg, mapdata.floors);
// Load default polygons.
map.zonePolygons(svg, mapdata.floors[0].zones);



/*
************************DRAW FUNCTIONS****************************
*/


//  freehand Draw function
var drawZone = d3.select('#poly').on('click', function () {
    var zonePolyPoints = [];
    var zone = {
        id: uuid(),
        name: "Zone - " + uuid(),
        points: zonePolyPoints
    };
    mapdata.floors[0].zones.push(zone);
    new map.drawZonePolygon(svg, zone);
});

// Draw Sensor Image
var drawSensor = d3.select('#sensor').on('click', function () {
    var zonePolyPoints = [];
    var sensor = {
        id: uuid(),
        name: "Sensor" + uuid(),
        url: "images/bluetooth_logo.png",
        x: 0,
        y: 0,
        w: 32,
        h: 32
    };


    mapdata.floors[0].objects.push(sensor);
    new map.sensorImageLayer(svg, mapdata.floors[0], sensor);
});

// Draw Wall function

var drawWall = d3.select('#wall').on('click', function () {
    
});


// Draw Shelf function
var drawShelf = d3.select('#shelf').on('click', function () {
    var zonePolyPoints = [];
    var shelf = {
        id: uuid(),
        name: "Shelf - " + uuid(),
        url: "images/shelf.PNG",
        x: 50,
        y: 50,
        w: 100,
        h: 100
    };
    mapdata.floors[0].objects.push(shelf);
    new map.sensorImageLayer(svg, mapdata.floors[0], shelf);
});


/*
********************************JSON******************************************
*/


// Show data
$('#mapdata').html(library.json.prettyPrint(mapdata));

// Helper to automatically refresh data
var updateMapData = d3.select('#updateMapData').on('click', function () {
    // Reacalculate all coordinate points.

    $('#mapdata').html(library.json.prettyPrint(mapdata));
});

// Helper to splice json array
function findAndRemove(array, property, value) {
    array.forEach(function (result, index) {
        if (result[property] === value) {
            //Remove from array
            array.splice(index, 1);
        }
    });
}


// Helper to save map

function saveText(text, filename) {
    var a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(text));
    a.setAttribute('download', filename);
    a.click()
}
// Helper to load map
function loadText(text, filename) {
    var b = document.createElement('b');
    b.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(text));
    b.setAttribute('upload', filename);
}


//Download Map as Json-file
var saveMapData = d3.select('#saveMapData').on('click', function () {
    confirm("Press a button!");



    
    saveText(JSON.stringify(mapdata),"Map.json");
    window.location.assign(url);

});

/*
**************************UUID generator ***************************************
*/

function uuid() {
    var uuid = "", i, random;
    for (i = 0; i < 6; i++) {
        random = Math.random() * 16 | 0;

        if (i === 8 || i === 12 || i === 16 || i === 20) {
            uuid += "-"
        }
        uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
}



/*
***********************************Update Map**********************************
*/
var updateMapData = d3.select('#test').on('click', function () {


    var y = document.getElementsByClassName("svg")
    //var x = document.getElementById("sensor-1111");   

    //console.log(x);
    console.log(y);

    $('#mapdata').html(library.json.prettyPrint(mapdata));
});


/*
***********************************Zoom helper**********************************
*/
var scaleData = [10, 15, 20, 25, 30];
// Create scale
var xscale = d3.scaleLinear()
    .domain([d3.min(scaleData), d3.max(scaleData)])
    .range([0, width]);
var yscale = d3.scaleLinear()
    .domain([d3.min(scaleData), d3.max(scaleData)])
    .range([0, height]);



var x_axis = d3.axisBottom()
    .scale(xscale);
// Add scales to x_axis
var x_axis = d3.axisBottom()
    .scale(xscale).tickPadding(+10);
// Add scales to y_axis
var y_axis = d3.axisLeft()
    .scale(yscale);

svg.append("g")
    .call(x_axis);


/*
var zoom_handler = d3.zoom()
    .on("zoom", zoom_actions);

//specify what to do when zoom event listener is triggered 
function zoom_actions() {
    svg.attr("transform", d3.event.transform);
}

zoom_handler(svg);
*/









