const fs = require('fs');
const path = require('path');
const config = require('config');

const { confirmDataStorage } = require('../../../utils/data');
const parseMoviesPerMonth = require('./movies-per-month-graph.parser');

const dataPath = path.join(process.cwd(), config.get('data.path'), 'movies_per_month_graph.json');

function createMoviesPerMonthGraph(moviesData) {
    const parsedData = parseMoviesPerMonth(moviesData);
    
    confirmDataStorage(dataPath);

    fs.writeFileSync(dataPath, JSON.stringify(parsedData));
}

module.exports = {
    createMoviesPerMonthGraph
};