
function apiQueryErrorHandle(queryObject, error) {
    console.error(`Something went wrong with querying ${queryObject} from the movies API`);
    throw error;
}

module.exports = {
    apiQueryErrorHandle
}