const userRoute = require('./user_route');
const authRoute = require('./auth_route');
const noteRoute = require('./note_route');

const routes = (app) => {
  app.use('/api/v1/users', userRoute);
  app.use('/api/v1/auth', authRoute);
  app.use('/api/v1/note', noteRoute);
};

module.exports = routes;