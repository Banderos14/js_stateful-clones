'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];

  let copyState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    if (type === 'addProperties') {
      copyState = { ...copyState, ...extraData };
    }

    if (type === 'removeProperties') {
      const nextState = { ...copyState };

      for (const key of keysToRemove) {
        delete nextState[key];
      }
      copyState = nextState;
    }

    if (type === 'clear') {
      copyState = {};
    }

    history.push({ ...copyState });
  }

  return history;
}

module.exports = transformStateWithClones;
