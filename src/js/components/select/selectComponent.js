import { actions as uiActions } from '../../reducers/ui';
import { actions as imageActions } from '../../reducers/image';

export class SelectComponent {
	constructor($ngRedux) {
		this.unregisterFromStore = $ngRedux.connect(state => state, {
			...uiActions,
			setRawSource: imageActions.setRawSource,
			setSourceType: imageActions.setSourceType,
			setError: imageActions.setError,
		})(this);
	}

	loadImageFile(input) {
		const file = input.files[0];

		if (['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].indexOf(file.type) < 0) {
			this.setError('Please select a valid image in PNG, JPG, or GIF format.');
		} else {
			this.setError(null);
			this.setLoadingProgress(0);

			const reader = new FileReader();

			reader.addEventListener('load', () => {
				this.setLoadingProgress(100);

				setTimeout(() => {
					this.setRawSource(reader.result);
					this.setLoadingProgress(null);
					this.setStep(2);
				}, 100);
			});

			reader.addEventListener('progress', (e) => {
				const percent = (e.loaded/e.total) * 100;
				this.setLoadingProgress(percent);
			});

			reader.readAsDataURL(file);
		}
	}

	$onDestroy() {
		this.unregisterFromStore();
	}
};