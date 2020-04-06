const axios = require('axios').default;
const config = require('config');

const { apiQueryErrorHandle } = require('../utils/error-handling');

function getMoviesData(companyId, page = 1) {
    return axios.get(`${config.get('moviesAPI.endpoints.discovery.baseUrl')}`, {
        params: {
            'api_key': config.get('moviesAPI.apiKey'),
            language: config.get('moviesAPI.language'),
            'with_companies': companyId,
            page
        }
    })
        .then(response => response.data)
        .catch(err => { apiQueryErrorHandle('the data', err); });
}

function getMovieGenres() {
    return axios.get(`${config.get('moviesAPI.endpoints.genres.baseUrl')}`, {
        params: {
            'api_key': config.get('moviesAPI.apiKey'),
            language: config.get('moviesAPI.language')
        }
    })
        .then(response => response.data.genres)
        .catch(err => { apiQueryErrorHandle('genres', err); });
}

module.exports = {
    getMoviesData,
    getMovieGenres
};