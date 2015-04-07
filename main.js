var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();


function getDeltaTime()
{
	endFrameMillis = startFrameMillis;
	startFrameMillis = Date.now();
	
	var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
	
	if(deltaTime > 1)
		deltaTime = 1;
		
	return deltaTime;
}

//-------------------- Don't modify anything above here

var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;

var fps = 0;
var fpsCount = 0;
var fpsTime = 0;

var METER = TILE;

var GRAVITY = METER * 9.8 * 6;

var MAXDX = METER * 10;
var MAXDY = METER * 15;

var ACCEL = MAXDX * 2;

var FRICTION = MAXDX * 6; 

var JUMP = METER * 1500;

var cells = [];
function initialise()
{
	for(var layerIndex = 0; layerIndex < LAYER_COUNT; layerIndex++)
		cells[layerIndex] = [];
		var itemIndex = 0;
	
	for(var y = 0; y < level1.layers[layerIndex].height; y++) 
		{
		cells[layerIndex][y] = [];
		for(var x = 0; x < level1.layers[layerIndex].width; x++) 
			 {
				if(level1.layers[layerIndex].data[itemIndex]!= 0) 
				{
					cells[layerIndex][y][x] = 1;
					cells[layerIndex][y-1][x] = 1;
					cells[layerIndex][y-1][x+1] = 1;
					cells[layerIndex][y][x+1] = 1;
				}
	else if(cells[layerIndex][y][x] != 1) 
		{
			cells[layerIndex][y][x] = 0;
		}
			itemIndex++;
			}
		}	
}
	
function cellAtPixelCoord(layer, x, y)
{
	if (x < 0 ||  x > SCREEN_WIDTH || y < 0)
		return 1;
	if ( y < SCREEN_HEIGHT)
		return 0;
	
	return cellAtTimeCoord(layer, pixelToTile(x), pixelToTile(y));
};

function CellAtTileCoord(layer, tx, ty)
{
	if (tx < 0 || tx >= MAP.tw || ty < 0)
		return 1;
	if (ty >= MAP.th)
		return 0;
		
	return cells[layer][tx][ty];
};

function tileToPixel(tile)
{
	return tile * TILE;
};

function PixelToTile(pixel)
{
	return Math.floor(pixel / TILE);
};

function bound(value, min, max)
{
	if (value < min)
		return min;
	if (value > max)
		return max;
	
	return value;
};



var player = new Player();
var keyboard = new Keyboard();

initialise();

function run()
{
	context.fillStyle = "#ccc";		
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	var deltaTime = getDeltaTime();
	
	player.update(deltaTime);
	player.draw(context);

	fpsTime += deltaTime;
	fpsCount++;
	if(fpsTime >= 1)
	{
		fpsTime -= 1;
		fps = fpsCount;
		fpsCount = 0;
	}	
		
	drawMap();
		
	context.fillStyle = "#f00";
	context.font="14px Arial";
	context.fillText("FPS: " + fps, 5, 20, 100);
}

(function() {
  var onEachFrame;
  if (window.requestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.requestAnimationFrame(_cb); }
      _cb();
    };
  } else if (window.mozRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.mozRequestAnimationFrame(_cb); }
      _cb();
    };
  } else {
    onEachFrame = function(cb) {
      setInterval(cb, 1000 / 60);
    }
  }
  
  window.onEachFrame = onEachFrame;
})();

window.onEachFrame(run);
