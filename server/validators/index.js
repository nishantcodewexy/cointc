const Joi = require("joi");
const { types } = require("../consts");

const basicUserKycSchema = Joi.object({
  email: Joi.string()
    .email()
    .optional(),
  payment_methods: Joi.object().optional(),
  sms: Joi.string()
    .uuid()
    .optional(),
  id: Joi.string()
    .uuid()
    .optional(),
  account_no: Joi.string().optional(),
  bank_name: Joi.string().optional(),
  IFSC_code: Joi.string().optional(),
  country: Joi.string()
    .valid(...Object.keys(types.country))
    .optional(),
  currency: Joi.string()
    .valid(...Object.keys(types.currencies))
    .optional(),
});

const adminUserKycSchema = Joi.object({
  account_no: Joi.string().optional(),
  bank_name: Joi.string().optional(),
  IFSC_code: Joi.string().optional(),
  country: Joi.string()
    .valid(...Object.keys(types.country))
    .optional(),
  currency: Joi.string()
    .valid(...Object.keys(types.currencies))
    .optional(),
  created_at: Joi.string()
    .email()
    .optional(),
});

const basicUserProfileUpdateSchema = Joi.object({
  mode: Joi.string()
    .valid(...Object.keys(types.UserModeType))
    .optional(),
  nickname: Joi.string().optional(),
  country: Joi.string()
    .valid(...Object.keys(types.country))
    .optional(),
  last_name: Joi.string().optional(),
  other_names: Joi.string().optional(),
  profile_pic: Joi.string().uuid(),
  kyc_document: Joi.string().uuid(),
  kyc: basicUserKycSchema,
});

const adminUserProfileUpdateSchema = Joi.object({
  nickname: Joi.string().optional(),
  kyc: adminUserKycSchema,
});

const adminUpdateUserSchema = Joi.object({
  permission: Joi.boolean().optional(),
  suitability: Joi.number()
    .min(0)
    .max(100)
    .optional(),
  kyc_status: Joi.string().valid(...Object.keys(types.KycStatusType)),
});

module.exports = {
  adminUserKycSchema,
  basicUserKycSchema,
  basicUserProfileUpdateSchema,
  adminUpdateUserSchema,
  adminUserProfileUpdateSchema,
};
