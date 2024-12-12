const predictClassification = require('../helpers/inference.js');
const storeData = require('../helpers/storeData.js');
const { Firestore } = require('@google-cloud/firestore');
const crypto = require('crypto');

async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  const { result, suggestion } = await predictClassification(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    id,
    result,
    suggestion,
    createdAt,
  };
  await storeData(id, data);

  const response = h.response({
    status: 'success',
    message: 'Model is predicted successfully',
    data: data,
  });

  response.code(201);
  console.log(response);
  return response;
}

async function getHistoriesHandler(request, h) {
  const db = new Firestore({
    projectId: 'submissionmlgc-mfarhanl4',
    keyFilename: 'src/config/key.json',
  });

  const predictCollection = db.collection('predictions');
  const predictSnapshot = await predictCollection.get();

  const data = [];

  predictSnapshot.forEach((doc) => {
    const history = {
      id: doc.id,
      history: doc.data(),
    };
    data.push(history);
  });

  const response = h.response({
    status: 'success',
    data: data,
  });

  response.code(200);
  return response;
}

module.exports = { postPredictHandler, getHistoriesHandler };