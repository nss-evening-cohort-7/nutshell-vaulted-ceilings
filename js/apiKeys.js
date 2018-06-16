const {checkUserLoginStatus,} = require('./users/auth');
const {setConfig,} = require('./firebaseApi');

const apiKeys = () => {
  return new Promise((resolve, reject) => {
    $.ajax('./db/apiKey.json')
      .done((data) => {
        resolve(data.apiKeys);
      })
      .fail((err) => {
        reject(err);
      });
  });
};

const retrieveKeys = () => {
  apiKeys()
    .then((results) => {
      setConfig(results.firebase);
      firebase.initializeApp(results.firebase);
      checkUserLoginStatus();
    })
    .catch((err) => {
      console.error('no keys: ', err);
    });
};

module.exports = {
  retrieveKeys,
  apiKeys,
};
