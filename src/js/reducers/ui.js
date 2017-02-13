import { createAction } from './util';

const SET_LOADING = 'UI: SET_LOADING';
const SET_LOADING_PROGRESS = 'UI: SET_LOADING_PROGRESS';
const SET_STEP = 'UI: SET_STEP';
const SET_SHOW_INTRO = 'UI: SET_SHOW_INTRO';

export const actions = {
	setLoading: (loadingState) => createAction(SET_LOADING, loadingState),
	setLoadingProgress: (percent) => createAction(SET_LOADING_PROGRESS, percent),
	setStep: (step) => createAction(SET_STEP, step),
	setShowIntro: (shouldHide) => createAction(SET_SHOW_INTRO, shouldHide),
};

const defaultState = {
	loading: false,
	loadingProgress: null,
	step: 1,
	showIntro: true,
};

export function reducer(state = defaultState, action) {
	switch(action.type) {
		case SET_LOADING:
			return {
				...state,
				loading: action.payload,
			};
		case SET_LOADING_PROGRESS:
			return {
				...state,
				loadingProgress: action.payload,
			};
		case SET_STEP:
			return {
				...state,
				step: action.payload,
			};
		case SET_SHOW_INTRO:
			return {
				...state,
				showIntro: action.payload,
			};
		default:
			return state;
	}
};
export default reducer;