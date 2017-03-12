let selected = null,
	container = null,
	stopCallback = null,
	x_pos = 0, 
	y_pos = 0, // Stores x & y coordinates of the mouse pointer
	x_elem = 0, 
	y_elem = 0; // Stores top, left values (edge) of the element

const _set_pos = (e) => {
	if (e.touches) {
		x_pos = e.touches[0].pageX;
		y_pos = e.touches[0].pageY;
	} else {
		x_pos = document.all ? window.event.clientX : e.pageX;
		y_pos = document.all ? window.event.clientY : e.pageY;
	}
};

// Will be called when user starts dragging an element
const _drag_init = (e, elem) => {
	_set_pos(e);

	selected = elem;
	x_elem = x_pos - selected.offsetLeft;
	y_elem = y_pos - selected.offsetTop;
};

// Will be called when user dragging an element
const _move_elem = (e) => {
	_set_pos(e);
	
	if (selected !== null) {
		const left = (x_pos - x_elem);
		const top = (y_pos - y_elem);

		if (stopCallback) {
			stopCallback([left, top]);
		} else {
			selected.style.left = left + 'px';
			selected.style.top = top + 'px';
		}
	}
};

// Destroy the object when we are done
const _destroy = () => {
	selected = null;
}

const bindStart = (elem) => {
	elem.onmousedown = (e) => {
		_drag_init(e, elem);
	};
	elem.addEventListener('touchstart', (e) => {
		_drag_init(e, elem);
	});
};

const makeDraggable = (elemId, containerId, cb) => {
	if (containerId) {
		container = document.getElementById(containerId);
	}
	else {
		container = document;
	}

	if (cb) {
		stopCallback = cb;
	}

	bindStart(document.getElementById(elemId));
	container.onmouseup = _destroy;
	container.ontouchend = _destroy;
	container.onmousemove = _move_elem;
	container.addEventListener('touchmove', _move_elem);
	container.addEventListener('contextmenu', (e) => {
		e.preventDefault();
	});
};

export default makeDraggable;