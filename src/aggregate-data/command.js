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

            const moviesData = await queryAllMovieResults(companyId);

            createMoviesPerMonthGraph(moviesData);
            createAverageScoreGraph(moviesData);
            console.log("The movies data has been aggregated and is ready to use.");
        } catch (error) {
            console.error("An error occured during data aggregation. Further details: ", error);
        }
    }
};

 // sub-optimal, but due to time constraints
async function queryAllMovieResults(companyId) {
    let moviesData = [];
    let page = 1;
    let maxPage = 1;

    while(page <= maxPage) {
        const moviesDataResponse = await getMoviesData(companyId, page);
        if(moviesDataResponse["total_pages"] != maxPage) maxPage = moviesDataResponse["total_pages"];
        moviesData = moviesData.concat(moviesDataResponse.results);
        page++;
    }

    return moviesData;
}

module.exports = aggregateDataFor;