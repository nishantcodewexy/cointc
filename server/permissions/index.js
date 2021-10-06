
const {
    roles:{
        admin,
        basic
    }
} = require("../consts")
module.exports = {

    /**
     * 
     * @param {Request} req - request object
     * @returns {Boolean}
     */
    isAdmin:async (req)=>{
        const {
            auth:{
              credentials:{
                user
              }
            }
          } = req
        if(!user) return false
        return user.role===admin
        
    },
    /**
     * 
     * @param {Request} req - request object
     * @returns {Boolean}
     */
    isBasic:async (req)=>{
        
        const {
            auth:{
              credentials:{
                user
              }
            }
          } = req
        if(!user) return false
        return user.role===basic
    },
}