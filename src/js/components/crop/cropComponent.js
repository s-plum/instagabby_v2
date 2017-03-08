import Croppie from 'croppie';
import { actions as uiActions } from '../../reducers/ui';
import { actions as imageActions } from '../../reducers/image';

export class CropComponent {
	constructor($ngRedux) {
		this.unregisterFromStore = $ngRedux.connect(state => state, {
			...uiActions,
			...imageActions,
		})(this);

		const viewportSize = window.innerWidth > 600 ? 400 : 200;

		this.croppie = new Croppie(document.getElementById('image-crop-inner'), {
			viewport: {
				width: viewportSize,
				height: viewportSize,
				type: 'square',
			},
			showZoomer: false,
		});

		this.croppie.bind({ url: this.image.raw });
	}

	cropImage() {
		this.setLoadingProgress(null);
		this.setLoading(true);
		this.croppie.result({
			type: 'base64',
			size: 'original',
		}).then(result => {
			this.setCroppedSource(result);
			this.setStep(3);
		});
	}

	$onDestroy() {
		this.unregisterFromStore();
	}
};