module.exports = (server) => {
  return {
    method: ["POST", "GET", "PUT"],
    path: '/user/kyc',
    config: {
      handler(req, h){}
    }
  }
}