// Angular
import angular from 'angular';

// Redux
import { combineReducers } from 'redux';
import createLogger from 'redux-logger';
import ngRedux from 'ng-redux';

// Reducers
import reducer from './reducer';

// Styles
import '../sass/main.scss';

//Images
import '../img/svg/app_icon.svg';
import '../img/svg/logotext_icon.svg';
import '../img/svg/link.svg';
import '../img/svg/photo.svg';

// Init app
const app = angular
				.module('instagabby', [ngRedux])
				.config(['$ngReduxProvider', ($ngReduxProvider) => {
					$ngReduxProvider.createStoreWith(reducer, []);
				}])
				.run(() => {
					const noJsContent = Array.prototype.slice.call(document.querySelectorAll('.no-js'));

					noJsContent.forEach((c) => {
						c.parentNode.removeChild(c);
					});
				});

// UI Components
import { SelectComponent } from './components/select/selectComponent';
import selectTpl from './components/select/select.tpl.jade';
app.component('igSelect', {
	template: selectTpl,
	controller: ['$ngRedux', SelectComponent]
});

import { CropComponent } from './components/crop/cropComponent';
import cropTpl from './components/crop/crop.tpl.jade';
app.component('igCrop', {
	template: cropTpl,
	controller: ['$ngRedux', CropComponent]
});

import { GabbyComponent } from './components/gabby/gabbyComponent';
import gabbyTpl from './components/gabby/gabby.tpl.jade';
app.component('igGabby', {
	template: gabbyTpl,
	controller: ['$ngRedux', GabbyComponent]
});

import { SaveComponent } from './components/save/saveComponent';
import saveTpl from './components/save/save.tpl.jade';
app.component('igSave', {
	template: saveTpl,
	controller: ['$ngRedux', SaveComponent]
});

import { AppComponent } from './components/app/appComponent';
import appTpl from './components/app/app.tpl.jade';
app.component('igApp', {
	template: appTpl,
	controller: ['$ngRedux', AppComponent]
});

angular.element(document).ready(() => {
	angular.bootstrap(document, ['instagabby']);
});