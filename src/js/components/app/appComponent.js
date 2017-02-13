import { actions as uiActions } from '../../reducers/ui';

export class AppComponent {
	constructor($ngRedux) {
		this.unregisterFromStore = $ngRedux.connect(state => state, {
			...uiActions,
		})(this);

		this.setShowIntro(true);
	}

	$onDestroy() {
		this.unregisterFromStore();
	}
};