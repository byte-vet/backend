import Joi from 'joi';

const userJOI = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  userType: Joi.string().required(),
  clinicName: Joi.string(),
  clinicLoc: Joi.string(),
});

export default userJOI;