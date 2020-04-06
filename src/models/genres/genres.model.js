const fs = require('fs');
const path = require('path');
const config = require('config');

const { confirmDataStorage } = require('../../utils/data');
const parseGenres = require('./genres.parser');

const dataPath = path.join(process.cwd(), config.get('data.path'), 'genres.json');

function insertGenres(genresData) {
    const parsedData = parseGenres(genresData);

    confirmDataStorage(dataPath);

    fs.writeFileSync(dataPath, JSON.stringify(parsedData));
}

function loadGenres() {
    if (!fs.existsSync(dataPath)) {
        console.error("Can not load genres data");
    } else {
        const genresData = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(genresData);
    }

}

module.exports = {
    insertGenres,
    loadGenres
};