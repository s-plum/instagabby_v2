import { actions } from './gabby';
import { actions as uiActions } from '../../reducers/ui';
import { actions as imageActions } from '../../reducers/image';
import draggable from '../../util/draggable';
import download from '../../util/download';

let canvas = null;
let context = null;

export class GabbyComponent {
	constructor($ngRedux) {
		this.unregisterFromStore = $ngRedux.connect(state => ({
			...state,
			scale: state.gabby.scale,
			rotate: state.gabby.rotate,
		}), {
			...actions,
			...uiActions,
			setFinalSource: imageActions.setFinalSource,
		})(this);

		//bind Gabby drag and disable default drag
		document.querySelector('#edit-workspace-gabby img').addEventListener('mousedown', (e) => {
			e.preventDefault();
		});

		//disable moving gabby when toggling controls
		document.querySelector('#edit-controls').addEventListener('mousemove', (e) => {
			e.stopPropagation();
		});
		document.querySelector('#edit-controls').addEventListener('touchmove', (e) => {
			e.stopPropagation();
		});

		draggable('edit-workspace-gabby', 'edit-workspace', (coords) => {
			this.setPosition(coords);
		});

		this.imageContainer = document.querySelector('#edit-workspace-image');

		//add background
		this.imageContainer.style.backgroundImage = `url(${this.image.cropped})`;

		//set initial position in pixels
		const outerBounds = this.imageContainer.getBoundingClientRect();
		this.setPosition([outerBounds.width*0.4, outerBounds.height*0.49]);
		this.setLoading(false);

		//in the background, prep canvas for rendering full image
		//build canvas for rendering image
		const canvasContainer = document.createElement('div');
		canvasContainer.className = 'edit-canvas';
		canvas = document.createElement('canvas');
		canvasContainer.appendChild(canvas);
		document.body.appendChild(canvasContainer);
		context = canvas.getContext('2d');

		//load raw image onto canvas, with max image width of 1200px
		const imageObj = new Image();

		imageObj.onload = () => {
			//load image into canvas for rendering later, with max width of 1200px
			const ratio = imageObj.width/imageObj.height;
			canvas.width = Math.min(imageObj.width, 1200);
			canvas.height = canvas.width * (1/ratio);

			context.drawImage(imageObj, 0, 0, canvas.width, canvas.height);
		};

		imageObj.src = this.image.cropped;
	}

	setScaleAndCenter(scale) {
		const gabbyContainerBounds = document.querySelector('#edit-workspace-gabby').getBoundingClientRect();
		const currentCenterX = (gabbyContainerBounds.width/2) + gabbyContainerBounds.left;

		const newWidth = this.imageContainer.getBoundingClientRect().width * (scale/100);
		const newCenterX = (newWidth/2) + gabbyContainerBounds.left;
		const centerDelta = newCenterX - currentCenterX;

		this.setScale(scale);
		this.setPosition([this.gabby.xPos - centerDelta, this.gabby.yPos - centerDelta]);
	}

	download() {
		this.setLoading(true);

		//read position of gabby image from UI and translate to canvas
		const imageContainerBounds = this.imageContainer.getBoundingClientRect();

		const scale = canvas.width/imageContainerBounds.width;

		const width = canvas.width * (this.gabby.scale/100);
		const height = width; //it's hip to be square

		const x = this.gabby.xPos * scale;
		const y = this.gabby.yPos * scale;

		const xCenter = x + width/2;
		const yCenter = y + height/2;

		context.save();

		//turn it around
		context.translate(xCenter, yCenter);
		const radians = this.gabby.rotate*(Math.PI/180);
		context.rotate(radians);
		context.translate(-width/2, -height/2);
		context.drawImage(document.querySelector('#edit-workspace-gabby img'), 0, 0, width, height);
		context.restore();

		const timestamp = (new Date()).getTime();

		const finalImage = canvas.toDataURL();
		this.setFinalSource(finalImage);

		download(finalImage, `instagabby-${timestamp}.png`, 'image/png');

		this.setStep(4);
	}

	$onDestroy() {
		this.unregisterFromStore();
	}
};