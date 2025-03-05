const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: 'localhost:3000'
};

const outputFile = './swagger.json';
const routes = ['src/routes/auth.js', 'src/routes/todos.js', 'src/routes/user.js'];

swaggerAutogen(outputFile, routes, doc);