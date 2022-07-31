import axios from 'axios';

const api = (data) => {
    return axios(data).then((result) => result.data);
};

const get = (data) =>
    api({ method: 'GET', ...data, params: { ...data.params } });

const post = (data) => api({ method: 'POST', ...data, params: { ...data.params } });

const defaultParams = {
    classification_id: 5,
    device_identifier: 'web',
    locale: 'es',
    market_code: 'es'
};

export const movieSearch = (params = {}) => {
    return get({
        url: '/lists/estrenos-imprescindibles-en-taquilla',
        params: { ...defaultParams, ...params }
    });
};

export const getMovieDetail = (params = {}) => {
    return get({
        url: `/movies/${params.id}`,
        params: { ...defaultParams, ...params }
    });
};

export const getMovieStream = (params = {}, data) => {
    return post({
        url: '/me/streamings',
        params: { ...defaultParams, ...params },
        data: data
    });
};
