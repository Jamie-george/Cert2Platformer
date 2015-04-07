var level1 = { "height":15,
 "layers":[
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2],
         "height":15,
         "name":"Tile Layer 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":20,
         "x":0,
         "y":0
        }],
 "nextobjectid":1,
 "orientation":"orthogonal",
 "properties":
    {

    },
 "renderorder":"right-down",
 "tileheight":36,
 "tilesets":[
        {
         "firstgid":1,
         "image":"tileset.png",
         "imageheight":1024,
         "imagewidth":1024,
         "margin":2,
         "name":"level1",
         "properties":
            {

            },
         "spacing":2,
         "tileheight":70,
         "tilewidth":70
        }],
 "tilewidth":35,
 "version":1,
 "width":20
}

var tileset = document.createElement("img");
tileset.src = level1.tilesets[0].image;

var LAYER_COUNT = level1.layers.length;
var TILESET_COUNT_X = 14;
var TILESET_COUNT_Y = 14;

var MAP = {};
MAP.tw = level1.layers[0].width;
MAP.th = level1.layers[0].height;

var TILE = level1.tilewidth;
var TILESET_TILE = level1.tilesets[0].tilewidth;
var TILESET_SPACING = level1.tilesets[0].spacing;
var TILESET_MARGIN = level1.tilesets[0].margin;

var LAYER_BACKGROUND = 0;
var LAYER_PLATFORMS = 1;
var LAYER_LADDERS = 2;

function drawMap()
{	
	for (var layerIndex = 0; layerIndex <LAYER_COUNT; layerIndex++)
	{
		var itemIndex = 0;
		
		for (var y = 0; y < level1.layers[layerIndex].height; y++)
		{
			for (var x = 0; x < level1.layers[layerIndex].width; x++)
			{
				if (level1.layers[layerIndex].data[itemIndex] += 0)
				{
					var tileIndex = level1.layers[layerIndex].data[itemIndex];
					
					var sx = TILESET_MARGIN +
							(tileIndex % TILESET_COUNT_X - 1) * (TILESET_TILE + TILESET_SPACING);
							
					var sy = TILESET_MARGIN +
							(Math.floor(tileIndex / TILESET_COUNT_Y)) * (TILESET_TILE + TILESET_SPACING);
					context.drawImage(tileset, 
										sx, sy,
										TILESET_TILE, TILESET_TILE, 
										x * TILE, (y - 1) * TILE, 
										TILESET_TILE, TILESET_TILE);							
				}
				itemIndex++;
			}
		}
	}
}















