const Hapi = require('@hapi/hapi');
const predictionRoutes = require('./routes/predictionRoutes.js');
const loadModel = require('./helpers/loadModel.js');
const InputError = require('./exceptions/inputError.js');
const config = require('./config/environment.js');

(async () => {
    const server = Hapi.server({
        host: config.HOST,
        port: config.PORT,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    const model = await loadModel();
    server.app.model = model;

    server.route(predictionRoutes);

    server.ext('onPreResponse', (request, h) => {
        const response = request.response;

        if (response.isBoom && response.output.statusCode === 413) {
            const newResponse = h.response({
                status: 'fail',
                message: 'Payload content length greater than maximum allowed: 1000000',
            });

            newResponse.code(413);
            return newResponse;
        }

        console.log(response);

        if (response instanceof InputError || response.isBoom) {
            const statusCode = response instanceof InputError ? response.statusCode : response.output.statusCode;
            const newResponse = h.response({
                status: 'fail',
                message: 'Terjadi kesalahan dalam melakukan prediksi',
            });

            newResponse.code(parseInt(statusCode));
            return newResponse;
        }

        return h.continue;
    });

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
})();