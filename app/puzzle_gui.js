function Button(text, id, className, onclickfunc) {
	this.domObject = document.createElement("BUTTON");
	this.domObject.appendChild(document.createTextNode(text));
	this.text = text;
	this.domObject.id = id;
	this.domObject.className = className;

	this.addToPage = function() {
		document.body.appendChild(this.domObject);
	};

	this.enable = function() {
		this.domObject.disabled = false;
	};

	this.disable = function() {
		this.domObject.disabled = true;
	};

	this.onclick = function(func){
		this.domObject.onclick = func;
	}
}

function Tile(id, text, position) {
	this.domObject = document.createElement("DIV");
	this.domObject.appendChild(document.createTextNode(text));
	this.domObject.className = "tile";
	this.domObject.id = "pos_"+position;
	this.text = text;
	this.id = id;
}

function Panel() {
	this.domObject = document.createElement("DIV");
	this.domObject.className = "panel";
	this.tiles = [];

	this.addTile = function(tile) {
		this.tiles.push(tile);
		this.domObject.appendChild(tile.domObject);
	}

	this.addToPage = function() {
		document.body.appendChild(this.domObject);
	}

	this.createTiles = function(state) {
		var n = state.size;
		var arr = state.array;

		for (var i = 0; i < n; i++) {
			for (var j = 0; j < n; j++) {
				var pos = (i*n + j) + 1;
				var value = arr[i][j];
				if (value != EMPTY)
					this.addTile(new Tile(value, value.toString(), pos));
			}
		}
	}

	this.getTile = function(tileid) {
		for (var i = 0; i < this.tiles.length; i++)
			if (this.tiles[i].id == tileid)
				return this.tiles[i];

		return null;
	}
}



//=========================================================



function SearchTile(id, text, position) {
	this.domObject = document.createElement("DIV");
	this.domObject.appendChild(document.createTextNode(text));
	this.domObject.className = "search_tile";
	this.domObject.id = "search_pos_"+position;
	this.text = text;
	this.id = id;
}

function SearchPanel() {
	this.domObject = document.createElement("DIV");
	this.domObject.className = "search_panel";
	this.tiles = [];

	this.addTile = function(tile) {
		this.tiles.push(tile);
		this.domObject.appendChild(tile.domObject);
	}

	this.addToPage = function() {
		document.body.appendChild(this.domObject);
	}

	this.createTiles = function(state) {
		var n = state.size;
		var arr = state.array;

		for (var i = 0; i < n; i++) {
			for (var j = 0; j < n; j++) {
				var pos = (i*n + j) + 1;
				var value = arr[i][j];
				if (value != EMPTY)
					this.addTile(new SearchTile(value, value.toString(), pos));
			}
		}
	}

	this.getTile = function(tileid) {
		for (var i = 0; i < this.tiles.length; i++)
			if (this.tiles[i].id == tileid)
				return this.tiles[i];

		return null;
	}
}