const userRoute = require('./user_route');
const authRoute = require('./auth_route');

const routes = (app) => {
  app.use('/api/v1/users', userRoute);
  app.use('/api/v1/auth', authRoute);
};

module.exports = routes;