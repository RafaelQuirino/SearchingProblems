require('solver');
require('puzzle_gui');

var solution;

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

function search_anim_chain(solver, panel, delay, callback) 
{
	var anim = setInterval( function() 
	{
		// if (this.counter == undefined)
		// 	this.counter = 0;
		// if (this.counter % 100 == 0 && this.counter != 0)
		// 	console.log(this.counter);
		// this.counter += 1;

		var state = solver.searchedNodes.shift().value;
		panel.update(state);

		clearInterval(anim);

		//callback...
		if (solver.searchedNodes.length == 0)
			callback();
		else 
			search_anim_chain(solver, panel, delay, callback);

	}, delay);
}

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

function search(solver, panel, search_btn, solve_btn, show_btn, delay) 
{
	console.log("clicked search...");

	var count = 0;
	var interval = setInterval(function(){
		if (count == 0) {
			search_btn.disable();
			solve_btn.disable();
			show_btn.disable();
		}

		if (count > 0) {
			clearInterval(interval);

			solution = solver.solve(panel);
			var sizeofspace = solver.searchedNodes.length;
			document.getElementById("gifp").innerHTML = sizeofspace.toString() + " nodes searched";
			solve_btn.enable();
			show_btn.enable();
		}

		count += 1;
	}, 50);
}

function solve(panel, delay, gap) 
{
	console.log("clicked solve...");
	anim_chain(panel, solution, delay, gap, function(){
		console.log("solve animation finished...");
	});
}

function show(solver, panel, search_btn, solve_btn, show_btn, delay) 
{
	solve_btn.disable();
	search_anim_chain(solver, panel, delay, function(){
		console.log("search animation finished...");
		solve_btn.enable();
		show_btn.disable();
	});
}

ready(function() {
	window.onload = function() {
		console.log("window loaded...");

		var state_0 = new State([[1,2,3],[8,0,4],[7,6,5]], 3);
		var state_1 = new State([[2,8,3],[1,6,4],[7,0,5]], 3);
		var state_2 = new State([[2,8,3],[7,1,4],[6,0,5]], 3);
		var state_3 = new State([[3,1,5],[0,2,4],[6,8,7]], 3);

		var init_state = state_3;

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

		// creating buttons
		var search_btn = new Button("Search", "search", "button");
		var solve_btn = new Button("Solve", "solve", "button");
		var show_btn = new Button("Search space", "show", "button");
		search_btn.onclick( function() {
			search(solver, search_panel, search_btn, solve_btn, show_btn, 1);
		});
		solve_btn.onclick( function() {
			solve_btn.disable();
			solve(panel, 2, 1);
		});
		show_btn.onclick( function() {
			show(solver, search_panel, search_btn, solve_btn, show_btn, 1);
		});

		search_btn.addToPage();
		solve_btn.addToPage();
		show_btn.addToPage();
		solve_btn.disable();
		show_btn.disable();
	};
});