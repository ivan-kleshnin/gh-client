import {filter, find, identity, keys, map, pipe, propEq, slice, sortBy, tap, values} from "ramda";
import Baobab from "baobab";
import {flattenArrayObject, filterByAll, sortByAll} from "shared/helpers/common";
import {joiValidate} from "shared/helpers/validation";
import commonValidators from "shared/validators/common";

// STATE ===========================================================================================
window._state = new Baobab(
  { // DATA
    url: {
      handler: undefined,
      params: undefined,
      query: undefined,
      id: undefined,
    },

    issues: {
      // DATA
      owner: undefined,
      repo: undefined,
      models: {},

      // LOAD ARTEFACTS
      loading: false,
      loadError: undefined,

      // MODEL
      number: undefined,
    },

    alerts: {
      // DATA
      models: {},

      // LOAD ARTEFACTS
      loading: false,
      loadError: undefined,
    },
  },
  { // OPTIONS
    syncwrite: true,

    facets: {
      currentAlerts: {
        cursors: {
          alerts: "alerts",
        },

        get(data) {
          let {models} = data.alerts;
          let modelsArray = values(models);
          if (modelsArray.length) {
            return sortBy(m => m.createdDate, modelsArray);
          } else {
            return [];
          }
        }
      },

      currentIssue: {
        cursors: {
          issues: "issues",
        },

        get(data) {
          let {models, number} = data.issues;
          if (number) {
            return models[number];
          } else {
            return undefined;
          }
        }
      },
    }
  }
);

export default window._state;
