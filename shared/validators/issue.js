import Joi from "joi";

// RULES ===========================================================================================
export default {
  model: {
    id: Joi.required(),              // 87445100
    number: Joi.number().required(), // 72
    title: Joi.string().required(),  // 'Simpler require paths'
    body: Joi.required(),            // 'There is a module called ...'
    //url: Joi.required(),             // 'https://api.github.com/repos/Paqmind/react-ultimate/issues/72'
    //html_url: Joi.required(),        // 'https://github.com/Paqmind/react-ultimate/issues/72'
    //user: Joi.required(),            // user object {login, id, avatar_url, url, html_url}
    //labels: Joi.required(),          // []
    //state: Joi.required(),           // 'open'
    //locked: Joi.required(),          // false
    //comments: Joi.required(),        // 1
    //created_at: Joi.required(),      // '2015-06-11T18:48:29Z'
    //updated_at: Joi.required(),      // '2015-06-12T10:18:11Z'
    //closed_at: Joi.required(),       // null
  },
};
