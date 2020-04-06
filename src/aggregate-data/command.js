const { getMovieGenres, getMoviesData } = require('./communication');
const { insertGenres } = require('../models/genres/genres.model');
const { createAverageScoreGraph, createMoviesPerMonthGraph } = require('../models/graphs');


async function aggregateDataFor(companyId) {
    if (!companyId) {
        console.error("A company ID was not provided. Please make sure you enter a valid company ID.");
    } else {
        try {
            /*
                Not ideal from an efficiency standpoint.
                If I had more time I would query this only once and load it at the beggining of a command's lifespan into memory so it could be shared 
            */
            const movieGenres = await getMovieGenres();
            insertGenres(movieGenres);

            const moviesData = await getMoviesData(companyId);

            // console.log(moviesData.results[0])
            createMoviesPerMonthGraph(moviesData.results);
            createAverageScoreGraph(moviesData.results);
            console.log("The movies data has been aggregated and is ready to use.");
        } catch (error) {
            console.error("An error occured during data aggregation. Further details: ", error);
        }
    }
};

module.exports = aggregateDataFor;