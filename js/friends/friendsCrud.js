let firebaseConfig = {};

const setConfig = (fbconfig) => {
  firebaseConfig = fbconfig;
};

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

const getFirebaseUrl = () =>
{
  apiKeys()
    .then((result) =>
    {
      setConfig(result.firebase);
      console.log(result.firebase);
    })
    .catch((err) =>
    {
      console.error(err);
    });
};

const getAllUsers = () =>
{
  return new Promise ((resolve, reject) =>
  {
    const allUsersArr = [];
    $.ajax(
      {
        method: 'GET',
        url: `${firebaseConfig.databaseURL}/users.json`,
      })
      .done((allUsersObj) =>
      {
        if (allUsersObj !== null)
        {
          Object.keys(allUsersObj).forEach((fbKey) =>
          {
            allUsersObj[fbKey].id = fbKey;
            allUsersArr.push(allUsersObj[fbKey]);
          });
        }
        resolve(allUsersArr);
      })
      .fail((err) =>
      {
        reject(err);
      });
  });
};

const getAllFriends = () =>
{
  const uid = firebase.auth().currentUser.uid;
  return new Promise((resolve, reject) =>
  {
    $.ajax(
      {
        method: 'GET',
        url: `${firebaseConfig.databaseURL}/friends.json?orderBy="uid"&equalTo="${uid}"`,
      })
      .done((allFriendsObj) =>
      {
        console.log(allFriendsObj);
      })
      .fail((err) =>
      {
        reject(err);
      });
  });
};

const addAFriend = (newFriend) =>
{
  return new Promise((resolve, reject) =>
  {
    $.ajax(
      {
        method: 'POST',
        url: `${firebaseConfig.databaseURL}/friends.json`,
        data: JSON.stringify(newFriend),
      });
  });
};

module.exports =
{
  getAllUsers,
  getFirebaseUrl,
  getAllFriends,
  addAFriend,
};
