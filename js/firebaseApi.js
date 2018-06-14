let firebaseConfig = {};

const setConfig = (fbconfig) => {
  firebaseConfig = fbconfig;
};

const getUserById = (uid) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'GET',
      url: `${firebaseConfig.databaseURL}/users.json?orderBy="uid"&equalTo="${uid}"`,
    })
      .done((user) => {
        resolve(user);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const saveNewUser = (newUserObj) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'POST',
      url: `${firebaseConfig.databaseURL}/users.json`,
      data: JSON.stringify(newUserObj),
    })
      .done((user) => {
        resolve(user);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

module.exports = {
  setConfig,
  firebaseConfig,
  saveNewUser,
  getUserById,
};
