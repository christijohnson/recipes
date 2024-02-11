const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Recipe API',
        description: 'Recipe Book API'
    },
    // host: 'localhost:8080',
    host: 'https://recipe-book-l98l.onrender.com',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// run server after it gets generated
//swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
    // await import('./index.js');
// });