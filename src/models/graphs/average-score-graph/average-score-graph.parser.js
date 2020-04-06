const moment = require('moment');

function parseAverageScore(moviesData, genres) {
    return moviesData.reduce((acc, movie) => {
        const year = moment(movie['release_date']).year();

        movie.genre_ids.forEach(genreId => {
            const genre = genres[genreId];

            if (!acc[genre]) acc[genre] = {};
            if (!acc[genre][year]) acc[genre][year] = [];

            acc[genre][year].push(movie.vote_average)
        });

        return acc;
    }, {});
}

module.exports = parseAverageScore;