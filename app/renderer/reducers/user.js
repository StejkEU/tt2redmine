import {handleActions} from 'redux-actions';
import actions from '../actions/user';
import {setNewStorage} from '../helpers/localStorage';

export default handleActions(
    {
        [actions.login]: (state, action) => {
            setNewStorage();

            return {...state, ...action.payload};
        },
        [actions.logout]: (state, action) => {
            setNewStorage();

            return {...state, ...action.payload};
        },
    },
    {},
);
