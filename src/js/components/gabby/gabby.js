import { createAction } from '../../reducers/util';

const SET_ROTATE = 'Gabby: SET_ROTATE';
const SET_SCALE = 'Gabby: SET_SCALE';
const SET_POSITION = 'Gabby: SET_POSITION';

export const actions = {
	setRotate: (deg) => createAction(SET_ROTATE, deg),
	setScale: (percent) => createAction(SET_SCALE, percent),
	setPosition: (coords) => createAction(SET_POSITION, coords),
};

const defaultState = {
	rotate: 0,
	scale: 60,
	xPos: 100,
	yPos: 100,
};

export function reducer(state = defaultState, action) {
	switch(action.type) {
		case SET_ROTATE:
			return {
				...state,
				rotate: action.payload,
			};
		case SET_POSITION:
			return {
				...state,
				xPos: action.payload[0],
				yPos: action.payload[1],
			}
		case SET_SCALE:
			return {
				...state,
				scale: action.payload,
			};
		default:
			return state;
	}
};
export default reducer;