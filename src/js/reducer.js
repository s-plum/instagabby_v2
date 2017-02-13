import { combineReducers } from 'redux';
import { reducer as uiReducer } from './reducers/ui';
import { reducer as imageReducer } from './reducers/image';
import { reducer as gabbyReducer } from './components/gabby/gabby';

const reducer = combineReducers({
  image: imageReducer,
  gabby: gabbyReducer,
  ui: uiReducer,
});

export default reducer;