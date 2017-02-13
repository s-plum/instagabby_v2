export class GabbyComponent {
	constructor($ngRedux) {
		this.unregisterFromStore = $ngRedux.connect(state => state, {})(this);
	}

	$onDestroy() {
		this.unregisterFromStore();
	}
};