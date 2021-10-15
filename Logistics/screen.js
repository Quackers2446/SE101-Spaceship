// Animation handling, Asset Initialization, and Drawing

//import Ship from "../Sandbox/Scripts/Ship/ColonyShip";
// cannot use import statement outside of module....

// SOME GLOBAL VARIABLES are below:

let frame = 0; // Game animation frame.
let paused = false; // Game can be paused.
let fpsInterval = 1000 / 60; // Frame rate in ms.
let screenSize = [32, 24]; // Window dimensions (in "unit"s).
let spritePath = "Sandbox/Sprites/";
let border = 6;
let unit = Math.floor((window.innerWidth - border * 2) / (4 * screenSize[0])) * 4; // Screen unit as a multiple of 4
if ((window.innerWidth - border * 2) / (window.innerHeight - border * 2) > screenSize[0] / screenSize[1]) { // Unit based on height
    unit = Math.floor((window.innerHeight - border * 2) / (4 * screenSize[1])) * 4;
}
console.log("Unit: " + unit);

// Initialize the CSS variables so that the css can do dynamic calculations for displays.
document.body.style.setProperty("--unit", unit + "px");
document.body.style.setProperty("--border", border + "px");
document.body.style.setProperty("--width", screenSize[0] * unit + "px");
document.body.style.setProperty("--height", screenSize[1] * unit + "px");

let imagesLoaded = 0; // Updates as the images load, until all are loaded.
let images = {};
let contexts = {};
let imageInfo = [
    ["background", "SpaceObjects/Space.png"],
    ["ship", "ShipSprites/ColonyShip.png"],
    ["thruste", "ShipSprites/ThrusterNozzle.png"],
    ["thrusterFlame", "ShipSprites/ThrusterFlame.png"],
    ["turret", "ShipSprites/TurretSprite.png"],
    ["planet1", "SpaceObjects/CreamVioletPlanet.png"],
    ["planet2", "SpaceObjects/CyanPlanet.png"],
    ["planet3", "SpaceObjects/CyanPlanet1.png"],
    ["planet4", "SpaceObjects/DarkPlanet.png"],
    ["planet5", "SpaceObjects/EarthLikePlanet.png"],
    ["planet6", "SpaceObjects/FrostPlanet.png"],
    ["planet7", "SpaceObjects/IcePlanet.png"],
    ["planet8", "SpaceObjects/OrangePlanet.png"],
    ["planet9", "SpaceObjects/PurplePlanet.png"],
    ["planet10", "SpaceObjects/RedLinesPlanet.png"],
    ["planet11", "SpaceObjects/RedPlanet1.png"],
    ["planet12", "SpaceObjects/RedPlanetSputnik.png"],
    ["planet13", "SpaceObjects/SandPlanet.png"],
    ["planet14", "SpaceObjects/StormPlanet.png"]
];
let contextNames = [
    "background", // static
    "missiles",
    "objects",
    "thrusters",
    "ships",
    "items"
];

function initializeImages(imageInfo) {
    /* Create the images with the given info: [imageName, src]. */
    for (let i = 0; i < imageInfo.length; i++) {
        let image = new Image();
        image.src = spritePath + imageInfo[i][1];
        image.onload = iterateLoad;
        images[imageInfo[i][0]] = image;
    }
}

function initializeContexts(contextNames) {
    /* Create the contexts with the given names: first name is farthest back. */
    for (let i = 0; i < contextNames.length; i++) {
        let canvas = document.createElement("CANVAS");
        canvas.id = contextNames[i];
        canvas.width = unit * screenSize[0];
        canvas.height = unit * screenSize[1];
        document.body.querySelector(".canvasHolder").appendChild(canvas);
        let ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        if (contextNames[i] == "background") {
            ctx.drawImage(images["background"], 0, 0, screenSize[0] * unit, screenSize[1] * unit);
        }
        contexts[contextNames[i]] = ctx;
    }
}

function iterateLoad() {
    imagesLoaded++;
    if (imagesLoaded >= imageInfo.length) {
        initializeGame();
    }
}

initializeImages(imageInfo);

// Here is where everything should begin.
function initializeGame() {
    console.log("Images have loaded!");
    initializeContexts(contextNames);
    startAnimating();
}

// Function for clearing a context.
function clearContext(contextName) {
    contexts[contextName].clearRect(0, 0, screenSize[0] * unit, screenSize[1] * unit);
}

// Function for drawing an image (very basic, for now).
function drawOnScreen(item, contextName, imageName) {
    contexts[contextName].drawImage(images[imageName], item.x * unit, item.y * unit, item.width * unit, item.height * unit);
}

let startTime, now, then, elapsed;

function startAnimating() {
    then = Date.now();
    startTime = then;
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    // draw next frame
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        if (!paused) {
            frame++;
            
            // run the game here!!!!!

            // testing out drawing onto the screen:
            clearContext("ships");
            drawOnScreen({width: 66 / 22, height: 50 / 22, x: 10, y: 7}, "ships", "ship");

            //console.log("Frame: " + frame);
        }
    }
}