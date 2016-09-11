var _rmod = _rmod || {};
_rmod.script_name = 'require.js';
_rmod.libpath = '';
_rmod.READY = false;
_rmod.on_ready_fn_stack = [];
_rmod.imported = {};
_rmod.loading = {
	scripts: {},
	length: 0
};

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
 
_rmod.findScriptPath = function(script_name) {
	var script_elems = document.getElementsByTagName('script');
	for (var i = 0; i < script_elems.length; i++) {
		if (script_elems[i].src.endsWith(script_name)) {
			var href = window.location.href;
			href = href.substring(0, href.lastIndexOf('/'));
			var url = script_elems[i].src.substring(0, script_elems[i].src.length-script_name.length);

			return url;
		}
	}

	return '';
};

_rmod.libpath = _rmod.libpath === '' ? _rmod.findScriptPath(_rmod.script_name) : _rmod.libpath;

_rmod.injectScript = function(script_name, uri, callback, prepare, async) {
	if(prepare) prepare(script_name, uri);
	
	var script_elem = document.createElement('script');
	script_elem.src = uri;
	script_elem.defer = false;
	script_elem.async = async ? async : false;
	
	if(callback) script_elem.onload = function() { callback(script_name, uri); };

	document.getElementsByTagName('head')[0].appendChild(script_elem);
};
 
_rmod.requirePrepare = function(script_name, uri) {
	_rmod.loading.scripts[script_name] = uri;
	_rmod.loading.length++;
};
 
_rmod.requireCallback = function(script_name, uri) {
	delete _rmod.loading.scripts[script_name];
	_rmod.loading.length--;
	_rmod.imported[script_name] = uri;
 
	if(_rmod.loading.length == 0) _rmod.onReady();
};
 
_rmod.onReady = function() {
	if (!_rmod.READY) {
		_rmod.READY = true;
		for (var i = 0; i < _rmod.on_ready_fn_stack.length; i++) _rmod.on_ready_fn_stack[i]();
	}
};

_rmod.namespaceToUri = function(script_name, url) {
	var ns = script_name.split('.');
	if (ns[ns.length-1] === '*') {
		ns.pop();
		ns.push('_all');
	} else if (ns[ns.length-1] === 'js') {
		ns.pop();
	}

	if(!url) url = '';
	script_name = ns.join('.');

	return url + ns.join('/')+'.js';
};

var require = function(script_name, async) {
	var uri = '';
	if (script_name.indexOf('/') > -1) {
		uri = script_name;
		var lastSlash = uri.lastIndexOf('/');
		script_name = uri.substring(lastSlash+1, uri.length);
	} else {
		uri = _rmod.namespaceToUri(script_name, _rmod.libpath);
	}
 
	if (!_rmod.loading.scripts.hasOwnProperty(script_name)
	 && !_rmod.imported.hasOwnProperty(script_name)) {
		_rmod.injectScript(script_name, uri,
		_rmod.requireCallback,
		_rmod.requirePrepare, async);
	}
};
 
var ready = function(fn) {	
	_rmod.on_ready_fn_stack.push(fn);
};