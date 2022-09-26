export const _removeData = (field) => {
    return new Promise((resolve, reject) => {
        localStorage.removeItem(field)
            .then(() => {
                // console.log("remove asyncStore for key: " + field);
            })
            .catch((error) => {
                console.log("error remove item asyncStore: " + error);
            });
    });
};

export const _saveRecentSearch = (dataSearch) => {
    return new Promise((resolve, reject) => {
        _getRecentSearch()
            .then((data) => {
                // console.log("get asyncStore for key: ", data);
                // let preDataRecent = JSON.parse(data) !== null ? JSON.parse(data) : [];
                // let isExist = preDataRecent.findIndex((e, i) => dataSearch.id == e.id && dataSearch.type == e.type)
                // if (isExist > -1) { resolve(true); return; };

                // if (preDataRecent.length < 7 && isExist < 0) {
                //     preDataRecent.unshift(dataSearch);
                // }
                // else {
                //     preDataRecent.splice(preDataRecent.length - 1, 1);
                //     preDataRecent[preDataRecent.length - 1] = dataSearch;
                // }
                // AsyncStorage.setItem('RECENT', JSON.stringify(preDataRecent))
                //     .then((data) => {
                //         resolve(data);
                //     })
                //     .catch((error) => {
                //         reject(error);
                //         console.log("error store item asyncStore: " + error);
                //     });
            }).catch(err => {
                console.log('err', err)
            })

    });
}

export const _getRecentSearch = async () => {
    return new Promise((resolve, reject) => {
        let data = localStorage.getItem('RECENT');
        let recent = JSON.parse(data);
        // console.log("get asyncStore for key: ", data);
        resolve(recent);
    });
};