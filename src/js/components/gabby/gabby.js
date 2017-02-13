import { createAction } from '../../reducers/util';

const SET_ROTATION = 'Gabby: SET_ROTATION';
const SET_SCALE = 'Gabby: SET_SCALE';
const SET_X = 'Gabby: SET_X';
const SET_Y = 'Gabby: SET_Y';

export const actions = {
	setRotation: (degrees) => createAction(SET_ROTATION, degrees),
	setScale: (percent) => createAction(SET_SCALE, percent),
	setX: (position) => createAction(SET_X, position),
	setY: (position) => createAction(SET_Y, position),
};

const defaultState = {
	rotation: 0,
	scale: 33,
	x: 70,
	y: 40
};

export function reducer(state = defaultState, action) {
	switch(action.type) {
		case SET_ROTATION:
			return {
				...state,
				rotation: action.degrees,
			};
		case SET_SCALE:
			return {
				...state,
				scale: action.percent,
			};
		case SET_X:
			return {
				...state,
				x: action.position,
			};
		case SET_Y:
			return {
				...state,
				y: action.position,
			};
		default:
			return state;
	}
};
export default reducer;