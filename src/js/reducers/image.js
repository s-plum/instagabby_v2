import { createAction } from './util';

const SET_RAW_SOURCE = 'Image: SET_RAW_SOURCE';
const SET_CROPPED_SOURCE = 'Image: SET_CROPPED_SOURCE';
const SET_FINAL_SOURCE = 'Image: SET_FINAL_SOURCE';
const SET_SOURCE_TYPE = 'Image: SET_SOURCE_TYPE';
const SET_ROTATE = 'Image:SET_ROTATE';
const SET_SCALE = 'Image:SET_SCALE';
const SET_POSITION = 'Image: SET_POSITION';
const SET_ERROR = 'Image: SET_ERROR';

export const actions = {
	setRawSource: (data) => createAction(SET_RAW_SOURCE, data),
	setCroppedSource: (data) => createAction(SET_CROPPED_SOURCE, data),
	setFinalSource: (data) => createAction(SET_FINAL_SOURCE, data),
	setSourceType: (type) => createAction(SET_SOURCE_TYPE, type),
	setRotate: (deg) => createAction(SET_ROTATE, deg),
	setScale: (percent) => createAction(SET_SCALE, percent),
	setPosition: (coords) => createAction(SET_POSITION, coords),
	setError: (message) => createAction(SET_ERROR, message),
};

const defaultState = {
	sourceType: null, // 'upload' or 'url'
	raw: null,
	cropped: null,
	final: null,
	error: null,
	rotate: 0,
	scale: 60,
	xPos: '69%',
	yPos: '78%',
};

export function reducer(state = defaultState, action) {
	switch(action.type) {
		case SET_RAW_SOURCE:
			return {
				...state,
				raw: action.payload,
			};
		case SET_CROPPED_SOURCE:
			return {
				...state,
				cropped: action.payload,
			};
		case SET_FINAL_SOURCE:
			return {
				...state,
				final: action.payload,
			};
		case SET_SOURCE_TYPE:
			return {
				...state,
				error: null,
				sourceType: action.payload,
			};
		case SET_ERROR:
			return {
				...state,
				error: action.payload,
			};
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