import * as canvas from './canvas';

const fileInputContainer = document.getElementById('image-upload');

const addGabby = (cv) => {
	var gabbyImg = new Image();

	gabbyImg.onload = () => {
		//set gabby size to 1/3 of the image width, and put her in the bottom corner
		let ratio = gabbyImg.height / gabbyImg.width;
		let width = cv.width / 3;
		let height = width*ratio;
		let elbowOffset = height * (65/476); //taken from the original image size
		cv.getContext('2d').drawImage(gabbyImg, cv.width - width, cv.height - height + elbowOffset, width, height);
	};

	gabbyImg.src = `/img/gabby.png?${new Date().getTime()}`;

	//bind movement events to canvas
	

};

canvas.createFileInput(fileInputContainer, addGabby);