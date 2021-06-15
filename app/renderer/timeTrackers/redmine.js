import toast from "react-hot-toast";
import {addNewItem} from '../helpers/localStorage';

export default class Redmine {
    static post(url, token, data) {
        url = url.endsWith('/') ? url.slice(0, -1) : url;

        const request = data.map(entry => {
            return {
                id: entry.id,
                body: {
                    key: token,
                    time_entry: {
                        issue_id: entry.issueId,
                        spent_on: entry.day.format('YYYY-MM-DD'),
                        hours: entry.hours,
                    },
                },
            };
        });

        return request.map(requestData => {
            return fetch(url + '/time_entries.json', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData.body)
            })
                .then((response) => {
                    if (response.status === 200 || response.status === 201) {
                        toast.success('Synced #' + requestData.body.time_entry.issue_id, {
                            icon: '👏',
                            duration: 4000,
                            position: 'top-right',
                            style: {
                                borderRadius: '10px',
                                background: '#333',
                                color: '#fff',
                            },
                        });

                        addNewItem(requestData.id);

                        return {success: true, id: requestData.id};
                    } else {
                        toast.error('Failed syncing #' + requestData.body.time_entry.issue_id, {
                            icon: '❌',
                            duration: 4000,
                            position: 'top-right',
                            style: {
                                borderRadius: '10px',
                                background: '#333',
                                color: '#fff',
                            },
                        });

                        return {success: false, id: requestData.id};
                    }
                }, () => {
                    toast.error('Failed syncing #' + requestData.body.time_entry.issue_id, {
                        icon: '❌',
                        duration: 4000,
                        position: 'top-right',
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    });

                    return {success: false, id: requestData.id};
                });
        });
    }
}
