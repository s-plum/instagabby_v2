import { createAction } from './util';

const SET_RAW_SOURCE = 'Image: SET_RAW_SOURCE';
const SET_CROPPED_SOURCE = 'Image: SET_CROPPED_SOURCE';
const SET_FINAL_SOURCE = 'Image: SET_FINAL_SOURCE';
const SET_SOURCE_TYPE = 'Image: SET_SOURCE_TYPE';
const SET_ERROR = 'Image: SET_ERROR';

export const actions = {
	setRawSource: (data) => createAction(SET_RAW_SOURCE, data),
	setCroppedSource: (data) => createAction(SET_CROPPED_SOURCE, data),
	setFinalSource: (data) => createAction(SET_FINAL_SOURCE, data),
	setSourceType: (type) => createAction(SET_SOURCE_TYPE, type),
	setError: (message) => createAction(SET_ERROR, message),
};

const defaultState = {
	sourceType: null, // 'upload' or 'url'
	raw: null,
	cropped: null,
	final: null,
	error: null,
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
			}
		case SET_SOURCE_TYPE:
			return {
				...state,
				error: null,
				sourceType: action.payload,
			}
		case SET_ERROR:
			return {
				...state,
				error: action.payload,
			}
		default:
			return state;
	}
};
export default reducer;