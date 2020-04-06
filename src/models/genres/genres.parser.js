function parseGenres(genresData) {
    return genresData.reduce((acc, genre) => {
        acc[genre.id] = genre.name
        return acc;
    }, {});
}

module.exports = parseGenres;