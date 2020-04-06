const fs = require('fs');
const path = require('path');
const config = require('config');

const { confirmDataStorage } = require('../../../utils/data');
const { loadGenres } = require('../../genres/genres.model');
const parseAverageScore = require('./average-score-graph.parser');

const dataPath = path.join(process.cwd(), config.get('data.path'), 'average_score_graph.json');

function createAverageScoreGraph(moviesData) {
    const genres = loadGenres();
    const parsedData = parseAverageScore(moviesData, genres);
    const recalculatedData = calculateAverages(parsedData);

    confirmDataStorage(dataPath);

    fs.writeFileSync(dataPath, JSON.stringify(recalculatedData));
}

function calculateAverages(data) {
    for(let genre in data) {
        for(let year in data[genre]) {
            
            const sum = data[genre][year].reduce((acc, movieScore) => acc + movieScore, 0);
            const averageScore = (sum / data[genre][year].length) || 0;
            
            data[genre][year] = averageScore;
        }
    }

    return data;
}

module.exports = {
    createAverageScoreGraph
};