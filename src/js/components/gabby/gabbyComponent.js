import { actions as uiActions } from '../../reducers/ui';
import draggable from '../../util/draggable';

export class GabbyComponent {
	constructor($ngRedux) {
		this.unregisterFromStore = $ngRedux.connect(state => state, {
			...uiActions,
		})(this);

		//bind Gabby drag and disable default drag
		document.querySelector('#edit-workspace-gabby img').addEventListener('mousedown', (e) => {
			e.preventDefault();
		});
		draggable('edit-workspace-gabby', 'edit-workspace');

		this.setLoading(false);
	}

	$onDestroy() {
		this.unregisterFromStore();
	}
};