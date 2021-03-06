function Queue() {
	this.array =  [];
	
	this.isEmpty = function() {
		return this.array.length == 0;
	};

	this.enqueue = function(value) {
		this.array.push(value);
	};

	this.dequeue = function() {
		return this.array.shift();
	};

	this.size = function() {
		return this.array.length;
	};
}

function Node(value) {

    this.value = value;
    this.children = [];
    this.parent = null;

    this.setParentNode = function(node) {
        this.parent = node;
    };

    this.getParentNode = function() {
        return this.parent;
    };

    this.addChild = function(node) {
        node.setParentNode(this);
        this.children[this.children.length] = node;
    };

    this.getChildren = function() {
        return this.children;
    };

    this.removeChildren = function() {
        this.children = [];
    };
}

function Tree() {
	if (arguments.length == 0)
		this.root = null;
	else if (arguments.length == 1 && arguments[0].constructor.name == "Node")
		this.root = arguments[0];

	this.setRoot = function(node) {
		this.root = node;
	}
}

// Tests
// ======
//
// var root = new Node('root');
// root.addChild(new Node('child 0'));
// root.addChild(new Node('child 1'));
// var children = root.getChildren();
// for(var i = 0; i < children.length; i++) {
//     for(var j = 0; j < 5; j++) {
//         children[i].addChild(new Node('second level child ' + j));
//     }
// }
// console.log(root);
// children[0].removeChildren();
// console.log(root);
// console.log(root.getParentNode());
// console.log(children[1].getParentNode());