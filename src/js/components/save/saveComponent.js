import { actions as uiActions } from '../../reducers/ui';
import { actions as imageActions } from '../../reducers/image';

export class SaveComponent {
	constructor($ngRedux) {
		this.unregisterFromStore = $ngRedux.connect(state => state, {
			...uiActions,
			resetImage: imageActions.reset,
		})(this);

		this.setLoading(false);
	}

	reset() {
		this.resetImage();
		this.setStep(1);
	}

	$onDestroy() {
		this.unregisterFromStore();
	}
};