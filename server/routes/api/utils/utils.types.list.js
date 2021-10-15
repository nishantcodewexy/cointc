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
      path: `/utils/types`,
      config: {
        
        handler: ()=>types,
        
      },
    };
  };
  