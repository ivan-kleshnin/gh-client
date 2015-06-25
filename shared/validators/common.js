import Joi from "joi";

// RULES ===========================================================================================
export default {
  // ID
  id: {
    id: Joi.string().guid().required()
  },

  // URL QUERY
  urlQuery: {},
};
