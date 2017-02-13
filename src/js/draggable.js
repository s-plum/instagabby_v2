let selected = null,
	container = null,
	x_pos = 0, 
	y_pos = 0, // Stores x & y coordinates of the mouse pointer
	x_elem = 0, 
	y_elem = 0; // Stores top, left values (edge) of the element

// Will be called when user starts dragging an element
function _drag_init(elem) {
	// Store the object of the element which needs to be moved
	selected = elem;
	x_elem = x_pos - selected.offsetLeft;
	y_elem = y_pos - selected.offsetTop;
}

// Will be called when user dragging an element
function _move_elem(e) {
	x_pos = document.all ? window.event.clientX : e.pageX;
	y_pos = document.all ? window.event.clientY : e.pageY;
	
	if (selected !== null) {
		selected.style.left = (x_pos - x_elem) + 'px';
		selected.style.top = (y_pos - y_elem) + 'px';
	}
}

// Destroy the object when we are done
function _destroy() {
	selected = null;
}

const bindStart = (elem) => {
	elem.onmousedown = () => {
		_drag_init(elem);
	};
	elem.ontouchstart = () => {
		_drag_init(elem);
	};
};

const makeDraggable = (elemId, containerId) => {
	if (containerId) {
		container = document.getElementById(containerId);
	}
	else {
		container = document;
	}

	bindStart(document.getElementById(elemId));
	container.onmouseup = _destroy;
	container.ontouchend = _destroy;
	container.onmousemove = _move_elem;
	container.ontouchmove = _move_elem;
	container.addEventListener('contextmenu', (e) => {
		e.preventDefault();
	});
};

export default makeDraggable;