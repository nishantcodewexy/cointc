module.exports = (server) => {
    const {
      controllers: {
        // user: { archive },
      },
      // helpers: { jwt: {decodeUser} },
      consts:{
          types
      }
    } = server.app;
  
    return {
      method: ["GET"],
      path: `/utils/types/{type}`,
      config: {
        
        handler: async (req)=>{
          return types[req.params.type]
        },
        
      },
    };
  };
  