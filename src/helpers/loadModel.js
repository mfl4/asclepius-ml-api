const tf = require('@tensorflow/tfjs-node');

async function loadModel() {
    return tf.loadGraphModel("https://storage.googleapis.com/mfl4-bucket/scdModel/model.json");
}

module.exports = loadModel;