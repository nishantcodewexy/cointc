const login = require('./login');
const register = require('./register');

module.exports.register= async (server) => {
  await login.register(server);
  await register.register(server);
}
