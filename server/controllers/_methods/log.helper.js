const Joi = require("joi")


let {types} = require('../../consts')
let {LogType,LoginStatusType,HistoryPostType,country} = types
const {Model} = require("sequelize")
const boom = require("@hapi/boom")

const schema = {
    authHistorySchema:Joi.object({
        login_at:Joi.date().optional(),
        logout_at:Joi.date().optional(),
        login_status:Joi.string().valid(...Object.values(LoginStatusType))
      }),
    tradeHistorySchema:Joi.object({
        buyer_email:Joi.string().email().required(),
        seller_email:Joi.string().email().required(),
        post_type:Joi.string().valid(...Object.values(HistoryPostType)).required(),
        currency_pair:Joi.string().required(),
        price:Joi.string().required(),
        fiat_amount:Joi.number().required(),
        total_crypto:Joi.string().required(),
    }),
    chatHistorySchema:Joi.object({
        visitor_email:Joi.string().email().required(),
        country:Joi.string().valid(...Object.values(country)).required(),
        browser:Joi.string().required(),
        duration:Joi.string().required(),
      }),
    smsHistorySchema:Joi.object({
        to:Joi.object().required(),
        message:Joi.string().required(),
        status:Joi.string().required(),
        sent_time:Joi.date().required()
      }),
    depositeAndWithdrawHistorySchema:Joi.object({
        txn_date:Joi.date().required(),
        ref_cheque_no:Joi.string().required(),
        description:Joi.string().required(),
        debit_amount:Joi.number().required(),
        credit_amount:Joi.number().required(),
        running_balance:Joi.number().required()
      }),
    
}



  
const combineSchema = Joi.object({
    type:Joi.string().valid(...Object.values(LogType)).required(),
    metadata:Joi.alternatives()
    .conditional("type",[
      {is:LogType.AUTH_HISTORY,then:schema.authHistorySchema},
      {is:LogType.TRADE_HISTORY,then:schema.tradeHistorySchema},
      {is:LogType.CHAT_HISTORY,then:schema.chatHistorySchema},
      {is:LogType.DEPOSIT_AND_WITHDRAW,then:schema.depositeAndWithdrawHistorySchema},
      {is:LogType.SMS_HISTORY,then:schema.smsHistorySchema},
    ])
  })


  /**
   * @typedef {Object} AuthLogArgs
   * @property {Date} login_at
   * @property {Date} logout_at
   * @property {LoginStatusType} login_status
   */

  /**
   * @typedef {Object} TradeLogArgs
   * @property {String} buyer_email
   * @property {String} seller_email
   * @property {HistoryPostType} post_type
   * @property {String} currency_pair
   * @property {String} price
   * @property {Number} fiat_amount
   * @property {String} total_crypto
   */

  /**
   * @typedef {Object} ChatLogArgs
   * @property {String} visitor_email
   * @property {country} country
   * @property {String} browser
   * @property {String} duration
   */

  /**
   * @typedef {Object} SMSLogArgs
   * @property {Object} to - user profile details
   * @property {String} message
   * @property {"DELIVER"|"PENDING"} status
   * @property {StrinDate} sent_time
   */

  /**
   * @typedef {Object} TxnLogArgs
   * @property {Date} txn_date - user profile details
   * @property {String} ref_cheque_no
   * @property {String} description
   * @property {String} debit_amount
   * @property {String} credit_amount
   * @property {String} running_balance
   */


/**
 * 
 * @param {Model} user 
 * @param {Object} metadata 
 * @param {LogType} metadata.type
 * @returns 
 */
const __create_log = async (user,metadata,type)=>{
    let schema_;
    switch (type) {
        case LogType.AUTH_HISTORY:
            schema_ = schema.authHistorySchema
            break;
        case LogType.CHAT_HISTORY:
            schema_ = schema.chatHistorySchema
            break;
        case LogType.DEPOSIT_AND_WITHDRAW:
            schema_ = schema.depositeAndWithdrawHistorySchema
            break;
        case LogType.SMS_HISTORY:
            schema_ = schema.smsHistorySchema
            break;
        case LogType.TRADE_HISTORY:
            schema_ = schema.tradeHistorySchema
            break;
    
        default:
            throw boom.boomify(new Error(`type ${metadata.type} is invalid`))
            
    }
    const {error,value} = schema_.validate(metadata)
    if(error) throw boom.boomify(error)

    return await user.createLogger({
        type,
        metadata:value
    })
  }
  

  const logHelper = {
    /**
     * 
     * @param {Model} user 
     * @param {AuthLogArgs} metadata 
     * @returns 
     */
    async authLog(user,metadata){
        return await __create_log(user,metadata,LogType.AUTH_HISTORY)
    },

    /**
     * 
     * @param {Model} user 
     * @param {TradeLogArgs} metadata 
     * @returns 
     */
    async tradeLog(user,metadata){
        return await __create_log(user,metadata,LogType.TRADE_HISTORY)
    },

    /**
     * 
     * @param {Model} user 
     * @param {ChatLogArgs} metadata 
     * @returns 
     */
    async chatLog(user,metadata){
        return await __create_log(user,metadata,LogType.CHAT_HISTORY)
    },
    /**
     * 
     * @param {Model} user 
     * @param {SMSLogArgs} metadata 
     * @returns 
     */
    async smsLog(user,metadata){
        return await __create_log(user,metadata,LogType.SMS_HISTORY)
    },
    /**
     * 
     * @param {Model} user 
     * @param {TxnLogArgs} metadata 
     * @returns 
     */
    async TxnLog(user,metadata){
        return await __create_log(user,metadata,LogType.DEPOSIT_AND_WITHDRAW)
    },
    types
}
  


  module.exports = {schema,combineSchema,logHelper}
  