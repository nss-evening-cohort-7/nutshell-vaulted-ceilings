let firebaseConfig = {};
let userId = '';
// let newUserObj = {};

const setConfig = (fbconfig) => {
  firebaseConfig = fbconfig;
};

const setUid = (newUserId) => {
  userId = newUserId;
};

// const setUsername = (newUsername) => {
//   username = newUsername;
// };

const createUserObj = () => {
  const userName = $('#registerUsername').val();
  const newUserObj = {
    username: userName,
    uid: userId,
  };
  saveUser(newUserObj);
};

const saveUser = (newUserObj) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'POST',
      url: `${firebaseConfig.databaseURL}/users.json`,
      data: JSON.stringify(newUserObj),
    })
      .done((uniqueKey) => {
        resolve(uniqueKey);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

module.exports = {
  setConfig,
  setUid,
  firebaseConfig,
  saveUser,
  createUserObj,
};
