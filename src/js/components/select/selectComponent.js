import { actions as uiActions } from '../../reducers/ui';
import { actions as imageActions } from '../../reducers/image';
import Progress from 'image-progress';
import base64ArrayBuffer from 'base64-arraybuffer';

const imageUrlRegex = /\.(png|jpg|gif|jpeg)\?{0,1}.*$/gi;

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

	loadImageUrl(url, event) {
		if (event) {
			const code = event.which || event.keyCode;
			if (code != 13) {
				this.setError(null);
				return false;
			}
		}

		if (!url || url.trim().length === 0) {
			this.setError('Please enter a valid URL.');
		} else if (!url.match(imageUrlRegex)) {
			//validate image URL for accepted file types
			this.setError('Please enter a valid PNG, JPG, or GIF image URL.');
		} else {
			//load image
			this.setError(null);
			this.setLoadingProgress(0);
			let self = this;

			var xmlHTTP = new XMLHttpRequest();
			xmlHTTP.open('GET', url, true);
			xmlHTTP.responseType = 'arraybuffer';
			xmlHTTP.onload = (e) => {
				self.setLoadingProgress(100);
				
				let fileType = imageUrlRegex.exec(url)[1];

				if (fileType === 'jpg') {
					fileType = 'jpeg';
				}

				var blob = new Blob([e.target.response],{type:`image/${fileType}`});
				var reader = new FileReader();
				reader.addEventListener('load', () => {
					self.setRawSource(reader.result);
					self.setLoadingProgress(null);
					self.setStep(2);
				});
				reader.readAsDataURL(blob);
			};
			xmlHTTP.onprogress = (e) => {
				self.setLoadingProgress(parseInt((e.loaded / e.total) * 100));
			};
			xmlHTTP.onerror = (e) => {
				self.setLoadingProgress(null);
				self.setError('Error retrieving file. Please try a different image link.');
			};
			xmlHTTP.send();
		}
	}

	$onDestroy() {
		this.unregisterFromStore();
	}
};