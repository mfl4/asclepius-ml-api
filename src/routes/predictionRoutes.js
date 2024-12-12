const { postPredictHandler, getHistoriesHandler } = require('../handlers/predictionHandlers.js');

const predictionRoutes = [
  {
    path: '/predict',
    method: 'POST',
    handler: postPredictHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        maxBytes: 1000000,
      },
    },
  },
  {
    path: '/predict/histories',
    method: 'GET',
    handler: getHistoriesHandler,
  },
];

module.exports = predictionRoutes;