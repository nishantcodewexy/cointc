const assert = require("assert");

module.exports = (server) => {
  const {
    db,
    boom,
    helpers: { sendMail, decrypt, createToken },
  } = server.app;

  return {
    create(req, h){},
    delete(req, h) { },
    
    // retirieve ads
    retrieve(req, h) {
      
    }
  }
}