require('solver');
require('puzzle_gui');

var direction = {};
direction["up"]    = "top";
direction["right"] = "left";
direction["down"]  = "top";
direction["left"]  = "left";

var offset = {};
offset["up"]    = "offsetTop";
offset["right"] = "offsetLeft";
offset["down"]  = "offsetTop";
offset["left"]  = "offsetLeft";

var sign = {};
sign["up"]    = "-";
sign["right"] = "+";
sign["down"]  = "+";
sign["left"]  = "-";

function anim_chain(panel, actions, delay, gap, callback)
{
	var action = actions.shift();

	var move = action.move;
	var tile = panel.getTile(action.tile);
	var anim = setInterval( function() {
		if ( typeof this.moved == 'undefined' )
			this.moved = 0;

		var coord = tile.domObject[offset[move]];
		var newcoord = eval(coord.toString()+sign[move]+gap.toString());
		tile.domObject.style[direction[move]] = newcoord.toString()+"px";

		this.moved += gap;
		if (this.moved > 99) {
			clearInterval(anim);

			//callback...
			if (actions.length == 0)
				callback();
			else {
				this.moved = 0;
				anim_chain(panel, actions, delay, gap, callback);
			}
		}

	}, delay);
}

function search() {
	console.log("clicked search...");
}

function solve(panel, solution, delay, gap) {
	console.log("clicked solve...");
	anim_chain(panel, solution, delay, gap, function(){
		console.log("solve animation finished...");
	});
}

ready(function() {
	window.onload = function() {
		console.log("window loaded...");

		//var init_state = new State([[1,2,3],[8,0,4],[7,6,5]], 3);
		//var init_state = new State([[2,8,3],[1,6,4],[7,0,5]], 3);
		var init_state = new State([[2,8,3],[7,1,4],[6,0,5]], 3);

		// creating panel with tiles according to init_state
		var panel = new Panel();
		panel.createTiles(init_state);
		panel.addToPage();

		// creating searching panel
		var search_panel = new SearchPanel();
		search_panel.createTiles(init_state);
		search_panel.addToPage();

		// solving puzzle
		var solver = new Solver(init_state);
		var solution = solver.solve();

		// creating buttons
		var search_btn = new Button("Search", "search", "button");
		var solve_btn = new Button("Solve", "solve", "button");
		search_btn.onclick( function() {
			search();
		});
		solve_btn.onclick( function() {
			solve_btn.disable();
			solve(panel, solution, 2, 2);
		});
		search_btn.addToPage();
		solve_btn.addToPage();
	};
});