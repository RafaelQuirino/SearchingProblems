require('data_structures');
require('puzzle_gui');

var EMPTY = 0;

var UP = "up";//0;
var RIGHT = "right";//1;
var DOWN = "down";//2;
var LEFT = "left";//3;

var Action = function(tile, move) {
	this.tile = tile; // number from puzzle grid
	this.move = move; // movement over grid, either up, right, down or left

	this.print = function() {
		console.log(this.tile.toString()+", "+this.move.toString());
	};
};

function State(array, n) {
	// order of puzzle grid
	this.size = n;

	// array representing the grid
	this.array = [];
	for (var i = 0; i < this.size; i++)
		this.array.push(new Array(this.size));
	for (var i = 0; i < this.size; i++)
		for (var j = 0; j < this.size; j++)
			this.array[i][j] = array[i][j];

	// is this state equal to the given state ?
	this.equals = function(state) {
		if (this.size != state.size) 
			return false;

		var n = this.size;
		for (var i = 0; i < n; i++) {
			for (var j = 0; j < n; j++) {
				if (this.array[i][j] != state.array[i][j])
					return false;
			}
		}

		return true;
	};

	// is this state a solution ?
	this.isSolution = function() {
		// var n = this.size;
		// var n2 = n * n;
		// var arr = this.array;

		// for (var i = 0; i < n; i++) {
		// 	for (var j = 0; j < n; j++) {
		// 		var correct_tile = (i*n + j) + 1;
		// 		if (arr[i][j] != correct_tile && correct_tile < n2)
		// 			return false;
		// 	}
		// }

		// return true;

		var s = new State([[1,2,3],[8,0,4],[7,6,5]], 3);
		if (this.equals(s)) return true;
		return false;
	};

	// possible actions (transitions) from this state
	this.actions = function() {
		var acts = [];
		var n = this.size;
		var arr = this.array;

		for (var i = 0; i < n; i++) {
			for (var j = 0; j < n; j++) {
				if (i-1 >= 0 && arr[i-1][j] == EMPTY)
					acts.push(new Action(arr[i][j], UP));
				
				if (j+1 < n && arr[i][j+1] == EMPTY)
					acts.push(new Action(arr[i][j], RIGHT));
				
				if (i+1 < n && arr[i+1][j] == EMPTY)
					acts.push(new Action(arr[i][j], DOWN));
				
				if (j-1 >= 0 && arr[i][j-1] == EMPTY)
					acts.push(new Action(arr[i][j], LEFT));
			}
		}

		return acts;
	}

	// performing an action (transition) over a grid
	this.performAction = function(action) {
		var n = this.size;
		var n2 = n * n;
		var tile = action.tile;
		var move = action.move;
		var arr = this.array;

		// searching position of tile
		var tile_i = -1, tile_j = -1;
		for (var i = 0; i < n; i++) {
			for (var j = 0; j < n; j++) {
				if (arr[i][j] == tile) {
					tile_i = i;
					tile_j = j;
				}
			}
		}

		// moving tile according to given action
		switch(move) {
			case UP:
				arr[tile_i][tile_j] = EMPTY;
				arr[tile_i-1][tile_j] = tile;
				break;
			case RIGHT:
				arr[tile_i][tile_j] = EMPTY;
				arr[tile_i][tile_j+1] = tile;
				break;
			case DOWN:
				arr[tile_i][tile_j] = EMPTY;
				arr[tile_i+1][tile_j] = tile;
				break;
			case LEFT:
				arr[tile_i][tile_j] = EMPTY;
				arr[tile_i][tile_j-1] = tile;
				break;
		}
	}; // this.makeTransition = function(action)

	// get action causing transition between this and given state 
	this.getAction = function(state) {
		var acts = this.actions();

		for (var i = 0; i < acts.length; i++) {
			var selfcpy = new State(this.array, this.size);
			var action = acts[i];
			
			selfcpy.performAction(action);

			if (selfcpy.equals(state))
				return action;
		}

		return null;
	};

	this.distanceFromSolution = function() {
		var n = this.size;
		var n2 = n * n;
		var mdist = 0; // Manhattan distance
		for (var i = 0; i < n; i++) {
			for (var j = 0; j < n; j++) {
				var tile = this.array[i][j];
				if (tile == EMPTY) tile = n * n;
				tile -= 1;
				var correct_i = Math.floor(tile/n);
				var correct_j = tile%n;

				mdist += Math.abs(i - correct_i) + Math.abs(j - correct_j);
			}
		}

		return mdist;
	};

	this.print = function() {
		for (var i = 0; i < this.size; i++)
			console.log(this.array[i]);
	}
}

function has_state(states, state) {
	for (var i = 0; i < states.length; i++) {
		var curr_state = states[i];
		if (curr_state.equals(state))
			return true;
	}
	return false;
}

function Solver(state) {
	this.initialState = state;
	
	this.tree = new Tree();  // tree representing the search space
	this.path = [];          // path of solution (all states from initial to solution)
	this.solution = [];      // sequence of actions that lead from initial state to solution
	this.searchedNodes = []; // just to show the seeking of the search space

	// expand state space (tree) until find solution node
	// (or reach LIMIT), in a BFS fashion; 
	this.search = function(panel) {
		// limiting the number of nodes to explored
		var LIMIT = 100000;

		//creating the tree which represents the state space
		this.tree.setRoot(new Node(this.initialState));

		// queue used to expand nodes
		var queue = new Queue();
		queue.enqueue(this.tree.root);

		var solution_node = null;
		var counter = 0;

		while (!queue.isEmpty()) { // actually, while(true)...
			var curr_node = queue.dequeue();
			this.searchedNodes.push(curr_node);
			counter += 1;

			//panel.update(curr_node.value);

			// if current node is solution, stop searching
			if (curr_node.value.isSolution()) {
				solution_node = curr_node;
				break;
			}

			// get possible actions from current node state
			var actions = curr_node.value.actions();

			// for each action, create a node with new state and push into tree
			for (var i = 0; i < actions.length; i++) {
				var action = actions[i];
				var s = new State(curr_node.value.array, curr_node.value.size);
				s.performAction(action);

				// only add new node if it is different from it's grandfather
				var ancestor = curr_node.getParentNode();
				if (ancestor == null || !s.equals(ancestor.value)) {
					var new_node = new Node(s);
					curr_node.addChild(new_node);
					queue.enqueue(new_node);
				}
			}

			if (counter > LIMIT) {
				console.log("last node explored:");
				curr_node.value.print(); 
				break; 
			}
		}

		if (solution_node != null) {
			// console.log("reached solution state:");
			// solution_node.value.print();
			// console.log("# of searched nodes: "+counter);
		}

		return solution_node;
	};

	// create the sequence of actions by constructing
	// the path from the root to the solution node
	this.solve = function(panel) {
		var solution_node = this.search(panel);
		var curr_node = solution_node;
		
		// constructing path
		while (curr_node != null) {
			this.path.push(curr_node);
			curr_node = curr_node.getParentNode();
		}

		// reverting path
		var half = this.path.length/2;
		var last = this.path.length-1;
		for (var i = 0; i < half; i++) {
			var temp = this.path[i];
			this.path[i] = this.path[last-i];
			this.path[last-i] = temp;
		}

		//constructing solution
		for (var i = 0; i < this.path.length-1; i++) {
			var curr_state = this.path[i].value;
			var next_state = this.path[i+1].value;

			var action = curr_state.getAction(next_state);
			this.solution.push(curr_state.getAction(next_state));
		}

		return this.solution.slice(0);
	}; // this.solve = function()
}