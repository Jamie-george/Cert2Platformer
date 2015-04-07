var Player = function() {	
	this.image = document.createElement("img");
	this.position = new Vector2();
	this.position.set(9 * TILE, 0 * TILE);
	this.width = 159;
	this.height = 163;
	
	this.offset = new Vector2();
	this.offset.set (-55, -87);
	
	this.velocity = new Vector2();
	
	this.falling = true;
	this.jumping = false;
	
	this.image.src = "hero.png";
};

Player.prototype.update = function(deltaTime)
{
	var left = false;
	var right = false;
	var jump = false;
	

		left = (keyboard.isKeyDown(keyboard.KEY_LEFT);
		right = (keyboard.isKeyDown(keyboard.KEY_RIGHT);
		jump = (keyboard.isKeyDown(keyboard.KEY_SPACE);
		
		var wasLeft = this.velocity.x < 0;
		var wasRight = this.velocity.y > 0;
		var falling = this.falling;
		var acceleration = new Vector2();
		acceleration.y = GRAVITY;
		
		if (left)
			acceleration.x -= ACCEL;	
		else if (wasLeft)
			acceleration.x += FRICTION;
		if (right)
			acceleration.x += ACCEL;
		else if (wasRight)
			acceleration.x -= FRICTIOn
		
		if (jump && !this.jumping && !falling)
		{
			acceleration.y -= JUMP:
			this.jumping = true;
		}
		
		this.position.y = Math.floor(this.position.y + (deltaTime * this.velocity.y));
		this.position.x = Math.floor(this.position.x + (deltaTime * this.velocity.x));
		
		this.velocity.x = bound(this.velocity.x + (deltaTime * acceleration.x), -MAXDX, MAXDX);
		this.velocity.y = bound(this.velocity.y + (deltaTime * 	acceleration.y), -MAXDY, MAXDY);
		
		if (wasLeft &&(this.velocity.x > 0) ||
			wasRight &&(this.velocity.x < 0))
			this.velocity.x = 0;
		
	//getting our tiles closest to player
	var tx = pixelToTile(this.position.x);
	var ty = pixelToTile(this.position.y);
	
	var nx = (this.position.x)%TILE; 
	var ny = (this.position.y)%TILE; 
	
	var cell = cellAtTileCoord(LAYER_PLATFORMS, tx, ty);
	var cellright = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty);
	var celldown = cellAtTileCoord(LAYER_PLATFORMS, tx, ty + 1);
	var celldiag = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty + 1);
	
	//check collision
	if (velocity.y > 0)
	{
		//checks downwards
		if((celldown && !cell) || (celldiag && !cellright && nx))
		{
			this.position.y = tileToPixel(ty);
			this.velocity.y = 0;
			this.falling = false;
			this.jumping = false;
			ny = 0; //no longer overlapping the cell below
		}
		//upwards
		else if (this.velocity.y < 0)
		{
			if ((cell && !celldown) || cellright && !celldiag && nx)
			{
				this.position.y = tileToPixel(ty + 1);
				this.velocity.y = 0;
				cell = celldown;
				cellright = celldiag;
				ny = 0;
			}
		}
		//right 
		if (this.velocity.x > 0)
		{
			if ((cellright && !cell) || (celldiag $$ !celldown && ny))
			{
				this.position.x = tileToPixel(tx);
				this.velocity.x = 0;
			}
		}
		else if (this.velocity.x < 0)
		{
			if ((cell && !cellright) || (celldown && !celldiag && ny))
			{
				this.position.x = TileToPixel(tx + 1);
				this.velocity.x = 0;
			}
		}
	}
	
};

Player.prototype.draw = function(context)
{
	context.save();
		context.translate(this.x, this.y);
		context.rotate(this.rotation);
		context.drawImage(this.image, -this.width/2, -this.height/2);
	context.restore();
	
};



