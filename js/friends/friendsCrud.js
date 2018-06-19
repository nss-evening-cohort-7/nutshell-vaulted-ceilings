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
    })
    .catch((err) =>
    {
      console.error(err);
    });
};

// This will not include the user

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
            if (allUsersObj[fbKey].uid !== firebase.auth().currentUser.uid)
            {
              allUsersArr.push(allUsersObj[fbKey]);
            }
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

// This will include the user

const getUsers = () =>
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

const getMyFriends = () =>
{
  const uid = firebase.auth().currentUser.uid;
  return new Promise((resolve, reject) =>
  {
    const allFriendsArr = [];
    $.ajax(
      {
        method: 'GET',
        url: `${firebaseConfig.databaseURL}/friends.json?orderBy="uid"&equalTo="${uid}"`,
      })
      .done((allFriendsObj) =>
      {
        if (allFriendsObj !== null)
        {
          Object.keys(allFriendsObj).forEach((fbKey) =>
          {
            allFriendsObj[fbKey].id = fbKey;
            allFriendsArr.push(allFriendsObj[fbKey]);
            console.log(allFriendsArr);

          });
        }
        resolve(allFriendsArr);
      })
      .fail((err) =>
      {
        reject(err);
      });
  });
};

const getAllFriends = () =>
{
  return new Promise((resolve, reject) =>
  {
    const allFriendsArr = [];
    $.ajax(
      {
        method: 'GET',
        url: `${firebaseConfig.databaseURL}/friends.json`,
      })
      .done((allFriendsObj) =>
      {
        if (allFriendsObj !== null)
        {
          Object.keys(allFriendsObj).forEach((fbKey) =>
          {
            allFriendsObj[fbKey].id = fbKey;
            allFriendsArr.push(allFriendsObj[fbKey]);

          });
        }
        resolve(allFriendsArr);
      })
      .fail((err) =>
      {
        reject(err);
      });
  });
};

const addAFriend = (newFriend) =>
{
  newFriend.uid = firebase.auth().currentUser.uid;
  return new Promise((resolve, reject) =>
  {
    $.ajax(
      {
        method: 'POST',
        url: `${firebaseConfig.databaseURL}/friends.json`,
        data: JSON.stringify(newFriend),
      }).done((uniqueKey) =>
    {
      resolve(uniqueKey);
    }).fail((err) =>
    {
      reject(err);
    });
  });
};

const addANewFriend = (newFriend) =>
{
  return new Promise((resolve, reject) =>
  {
    $.ajax(
      {
        method: 'POST',
        url: `${firebaseConfig.databaseURL}/friends.json`,
        data: JSON.stringify(newFriend),
      }).done((uniqueKey) =>
    {
      resolve(uniqueKey);
    }).fail((err) =>
    {
      reject(err);
    });
  });
};

// Gets a list of all pending friend requests and assigns them to the current user if they have been sent one

const getFriendRequests = () =>
{
  const uid = firebase.auth().currentUser.uid;
  return new Promise ((resolve, reject) =>
  {
    const allFRArr = [];
    $.ajax(
      {
        method: 'GET',
        url: `${firebaseConfig.databaseURL}/friends.json`,
      })
      .done((allFRObj) =>
      {
        if (allFRObj !== null)
        {
          Object.keys(allFRObj).forEach((fbKey) =>
          {
            allFRObj[fbKey].id = fbKey;
            if (allFRObj[fbKey].friendUid === uid && allFRObj[fbKey].isAccepted === false && allFRObj[fbKey].isPending === true)
            {
              allFRArr.push(allFRObj[fbKey]);
            }
          });
        }
        resolve(allFRArr);
      })
      .fail((err) =>
      {
        reject(err);
      });
  });
};

// Update the friend object upon accept or decline

const updateFriend = (updatedFriend, friendId) =>
{
  updatedFriend.uid = firebase.auth().currentUser.uid;
  return new Promise ((resolve, reject) =>
  {
    $.ajax(
      {
        method: 'PUT',
        url: `${firebaseConfig.databaseURL}/friends/${friendId}.json`,
        data: JSON.stringify(updatedFriend),
      })
      .done((modifiedFriend) => { resolve(modifiedFriend); })
      .fail((err) => { reject(err); });
  });
};

// Remove a friend

const deleteAFriend = (friendId) =>
{
  return new Promise((resolve, reject) =>
  {
    $.ajax(
      {
        method: 'DELETE',
        url: `${firebaseConfig.databaseURL}/friends/${friendId}.json`,
      })
      .done(() => { resolve(); })
      .fail((err) => { reject(err); });
  });
};

module.exports =
{
  getAllUsers,
  getFirebaseUrl,
  getAllFriends,
  addAFriend,
  getFriendRequests,
  updateFriend,
  deleteAFriend,
  getUsers,
  addANewFriend,
  getMyFriends,
};
