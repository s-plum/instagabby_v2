import draggable from './draggable';
import Croppie from 'croppie';

//todo - convert to redux actions instead of JS binding 

const cropSpace = document.getElementById('image-crop-inner');
const workspaceImageContainer = document.getElementById('edit-workspace-image');
const gabbyImage = document.querySelector('#edit-workspace-gabby img');
const fileInput = document.getElementById('image-upload-file');
const urlInput = document.getElementById('image-upload-url');
const urlInputSubmit = document.getElementById('image-upload-url-submit');
const urlRegex = /^(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))$/;
const downloadButton = document.getElementById('edit-download');

let hasImage = false;
let canvas;
let context;
let rotation = 0;
let scale = 33;

const changeGabbyScale = (e) => {
	scale = e.target.value;
	document.getElementById('edit-workspace-gabby').style.width = `${scale}%`;
};

const changeGabbyRotation = (e) => {
	rotation = e.target.value;
	gabbyImage.style.transform = `rotate(${rotation}deg)`;
	gabbyImage.style.webkitTransform = `rotate(${rotation}deg)`;
};

const bindInputs = () => {
	//for loading files
	fileInput.onchange = (e) => {
		validateImage(e.target);
	};
	urlInput.addEventListener('keyup', (e) => {
		if (e.keyCode && e.keyCode === 13) {
			e.preventDefault();
			validateImage(urlInput);
		}
	});
	urlInputSubmit.addEventListener('click', () => {
		validateImage(urlInput);
	});

	//for edit controls
	document.getElementById('edit-controls-scale').addEventListener('change', changeGabbyScale);
	document.getElementById('edit-controls-scale').addEventListener('input', changeGabbyScale);

	document.getElementById('edit-controls-rotate').addEventListener('change', changeGabbyRotation);
	document.getElementById('edit-controls-rotate').addEventListener('input', changeGabbyRotation);

	//for download
	downloadButton.addEventListener('click', renderImage);
};

const buildCanvas = () => {
	canvas = document.createElement('canvas');
	canvas.className = 'hidden-canvas';
	document.body.appendChild(canvas);
	context = canvas.getContext('2d');
};

const showError = (message) => {
	console.log(message);
};

const cropImage = (url) => {
	let rawImg = new Image();

	rawImg.onload = () => {
		let c = new Croppie(cropSpace, {
			viewport: {
				width: 400,
				height: 400,
				type: 'square'
			}
		});

		c.bind({ url: url });
	};

	rawImg.src = url;
};

const validateImage = (input) => {
	if (input.type === 'file') {
		let file = input.files[0];

		if (['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].indexOf(file.type) < 0) {
			showError('Please select a valid image in PNG, JPG, or GIF format.');
		}

		let reader = new FileReader();

		reader.addEventListener('load', () => {
			cropImage(reader.result);
		});

		reader.readAsDataURL(file);
	}
	else if (input.type === 'url' || input.type === 'text') {
		let url = input.value.trim();
		if (url.length === 0 || !url.match(urlRegex)) {
			return showError('Please enter a valid image URL');
		}
		cropImage(url);
	}
};

const loadImage = (url) => {
	try {
		var imageObj = new Image();

		imageObj.onload = () => {
			//load image into canvas for rendering later
			canvas.width = imageObj.width;
			canvas.height = imageObj.height;

			context.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height);

			//append image to the DOM editor
			workspaceImageContainer.appendChild(imageObj);

			hasImage = true;
		};

		imageObj.src = url;
	}
	catch (error) {
		showError('Error loading image. Please try again with a different file.');
	}
};

//save image back to base64, then download
const renderImage = () => {
	let canvasScale = canvas.width/workspaceImageContainer.getBoundingClientRect().width;

	let width = gabbyImage.getBoundingClientRect().width * canvasScale;
	let height = width;

	let x = gabbyImage.getBoundingClientRect().left - workspaceImageContainer.getBoundingClientRect().left;
	let y = gabbyImage.getBoundingClientRect().top - workspaceImageContainer.getBoundingClientRect().top;

	let xRel = x*canvasScale; //x coordinate
	let yRel = y*canvasScale; //y coordinate

	let xTrans = xRel + width/2; //horizonal center of image
	let yTrans = yRel + height/2; //vertical center of image

	let xDiff = width - gabbyImage.getBoundingClientRect().width;

	context.save();
	context.translate(xTrans, yTrans);
	var radians = rotation*(Math.PI/180);
	context.rotate(radians);
	context.translate(-width/2, -height/2);
    context.drawImage(gabbyImage, 0, 0, width, height);
    context.restore();
};

buildCanvas();
bindInputs();

draggable('edit-workspace-gabby', 'edit-workspace');