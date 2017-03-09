import { actions as uiActions } from '../../reducers/ui';
import { actions as imageActions } from '../../reducers/image';
import draggable from '../../util/draggable';

let canvas = null;
let context = null;

export class GabbyComponent {
	constructor($ngRedux) {
		this.unregisterFromStore = $ngRedux.connect(state => ({
			...state,
			scale: state.image.scale,
			rotate: state.image.rotate,
		}), {
			...uiActions,
			...imageActions,
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

			context.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height);
		};

		imageObj.src = this.image.cropped;
	}

	download() {
		//this.setLoading(true);

		//read position of gabby image from UI and translate to canvas
		const imageContainer = document.querySelector('#edit-workspace-image');
		const gabby = document.querySelector('#edit-workspace-gabby img');

		const imageContainerBounds = imageContainer.getBoundingClientRect();
		const gabbyContainerBounds = gabby.getBoundingClientRect();

		const scale = canvas.width/imageContainerBounds.width;

		const width = canvas.width * (this.image.scale/100);
		const height = width; //it's hip to be square

		const x = (parseInt(this.image.xPos) - (gabbyContainerBounds.width/2)) * scale;
		const y = (parseInt(this.image.yPos) - (gabbyContainerBounds.height/2)) * scale;

		const xCenter = x + width/2;
		const yCenter = y + height/2;

		context.save();

		//turn it around
		context.translate(xCenter, yCenter);
		const radians = this.image.rotate*(Math.PI/180);
		context.rotate(radians);
		context.translate(-width/2, -height/2);
		context.drawImage(gabby, 0, 0, width, height);
		context.restore();
	}

	$onDestroy() {
		this.unregisterFromStore();
	}
};