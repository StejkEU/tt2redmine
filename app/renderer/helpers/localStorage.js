export const setNewStorage = () => {
    localStorage.setItem('time_entries_synced', JSON.stringify([]));
}

export const addNewItem = (item) => {
    const currentItems = localStorage.getItem('time_entries_synced');

    if (currentItems === null) {
        setNewStorage();
    }

    let current = JSON.parse(localStorage.getItem('time_entries_synced'));
    current.push(item);

    localStorage.setItem('time_entries_synced', JSON.stringify(current));
}

export const getItems = () => {
    const currentItems = localStorage.getItem('time_entries_synced');

    if (currentItems === null) {
        setNewStorage();
    }

    return JSON.parse(localStorage.getItem('time_entries_synced'));
}
