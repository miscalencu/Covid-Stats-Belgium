function get(options, feedback) {
    options = options || {};
    feedback = feedback || (() => {});
    
    if(!options.url) {
        console.error('_data.get: missing Url');
    }

    let total = null;

    let url = options.url;
    if(options.filter) {
        let filterObj = [];
        Object.keys(options.filter).forEach(key => {
            filterObj.push({
                key: key,
                value: encodeURIComponent(options.filter[key])
            })
        });
        url += (url.indexOf('?') === -1) ? `?` : `&`;
        url += `filterStr=${JSON.stringify(filterObj)}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(response => {
            let data = response.data ? response.data : response;
            if(options.orderBy && options.orderDir) {
                data = sort(data, options.orderBy, options.orderDir)
            }

            if(options.pageNr && options.pageSize) {
                let _filter = filter(data, options.pageNr, options.pageSize);
                data = _filter.data;
                total = _filter.total;
            }

            feedback(data, total);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

function sort(arr, sortBy, sortDir) {
    return arr.sort((a, b) => {
        let aVal = a[sortBy] ? a[sortBy] : "-";
        let bVal = b[sortBy] ? b[sortBy] : "-";

        let val = 0;
        if (aVal > bVal)
            val = (sortDir === "ASC") ? 1 : -1;
        if (aVal < bVal)
            val = (sortDir === "ASC") ? -1 : 1;

        return val;
    });
}

function filter(arr, pageNr, pageSize) {
    let offset = (pageNr - 1) * pageSize;
    let paginatedItems = arr.slice(offset).slice(0, pageSize);
    let pages = Math.ceil(arr.length / pageSize);
    return {
        total: arr.length,
        pages: pages,
        data: paginatedItems
    };
}

export { 
    get,
    sort
}