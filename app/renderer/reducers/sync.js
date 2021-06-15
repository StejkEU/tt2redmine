import {handleActions} from 'redux-actions';
import actions from '../actions/sync';
import {clockify, toggl} from '../helpers/timeTrackings';
import Toggl from '../timeTrackers/toggl';
import Redmine from '../timeTrackers/redmine';
import {setNewStorage} from '../helpers/localStorage';

const fetchFromClockify = (from, to) => {
    console.log("Fetching from clockify", {from: from, to: to});

    return ["d", "e", "f"];
}

export default handleActions(
    {
        [actions.remove]: (state, action) => {
            setNewStorage();

            return {...state, ...action.payload};
        },
        [actions.sync]: (state, action) => {
            let entries;
            if (action.payload.time_tracking === toggl) {
                entries = Toggl.fetch(
                    action.payload.from,
                    action.payload.to,
                    action.payload.toggl_api_key,
                    action.payload.toggl_tags.split(',')
                );
            } else if (action.payload.time_tracking === clockify) {
                entries = fetchFromClockify(
                    action.payload.from,
                    action.payload.to
                );
            }

            entries.then(entriesToSend => {
                return Redmine.post(
                    action.payload.url,
                    action.payload.token,
                    entriesToSend
                );
            });

            return {...state, ...action.payload};
        },
    },
    {},
);
