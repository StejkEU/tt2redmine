import {createAction} from 'redux-actions';

export default {
    sync: createAction('SYNC_ENTRIES'),
    remove: createAction('REMOVE_SYNCED_ENTRIES_IN_LS'),
};
