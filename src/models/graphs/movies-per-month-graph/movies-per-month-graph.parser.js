const moment = require('moment');

function parseMoviesPerMonth(moviesData) {
    return moviesData.reduce((acc, movie) => {
        const yearAndMonth = moment(movie['release_date']).format("YYYY:MM")
        acc[yearAndMonth] = (acc[yearAndMonth] || 0) + 1;
        return acc;
    }, {});
}

module.exports = parseMoviesPerMonth;