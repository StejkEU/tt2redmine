import moment from "moment";
import collect from "collect.js";
import {getItems} from '../helpers/localStorage';

export default class Clockify {
    static fetch(from, to, token, tags) {
        from = from.startOf('day');
        to = to.endOf('day');
        tags = tags.map(tag => tag.trim());

        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(token + ":api_token"));

        let url = 'https://api.track.toggl.com/api/v8/time_entries?';
        url += 'start_date=' + from.toISOString();
        url += '&end_date=' + to.toISOString();

        const ids = getItems();

        return fetch(
            url,
            {
                method: 'GET',
                headers: headers,
            }
        )
            .then(response => response.json())
            .then(entries => collect(entries))
            .then(entries => {
                return entries
                    .filter((entry, key) => {
                        return !ids.includes(entry.id);
                    })
                    .filter((entry, key) => {
                        return entry.duration > 0;
                    })
                    .filter((entry, key) => {
                        return entry.description.includes('#');
                    })
                    .filter((entry, key) => {
                        return entry.hasOwnProperty('tags')
                            && entry.tags.some(value => tags.includes(value));
                    })
                    .map((entry, key) => {
                        const issueId = entry
                            .description
                            .split('#')[1]
                            .split(' ')[0];

                        return {
                            id: entry.id,
                            issueId: issueId,
                            day: moment(entry.start),
                            hours: entry.duration / (60 * 60),
                        };
                    })
            });
    }
}
