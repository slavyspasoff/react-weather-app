export default (search, data) => {
    let result = search.slice(search.indexOf('(') + 1, -1).split(', ');
    if (result.length === 1) {
        return data.find((i) => i.country === result[0]);
    }
    return data.find((i) => i.state === result[0] && i.country === result[1]);
};
