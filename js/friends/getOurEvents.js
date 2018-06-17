// const { apiKeys, } = require('../apiKeys');
const { getMyFriends, } = require('./friendsCrud');

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

const getMyEvents = () =>
{
  const uid = firebase.auth().currentUser.uid;
  return new Promise((resolve, reject) =>
  {
    apiKeys()
      .then((results) =>
      {
        const eventsArr = [];
        $.ajax(
          {
            method: 'GET',
            url: `${results.firebase.databaseURL}/events.json?orderBy="uid"&equalTo="${uid}"`,
          })
          .done((allEventsObj) =>
          {
            if (allEventsObj !== null)
            {
              Object.keys(allEventsObj).forEach(fbKey =>
              {
                allEventsObj[fbKey].id = fbKey;
                eventsArr.push(allEventsObj[fbKey]);
              });
            }
            resolve(eventsArr);
            console.log(eventsArr);
          })
          .fail((err) => { reject(err); });
      })
      .catch((err) => { console.error(err); });
  });
};

const getUserEvents = (userUid) =>
{
  const uid = userUid;
  return new Promise((resolve, reject) =>
  {
    apiKeys()
      .then((results) =>
      {
        const eventsArr = [];
        $.ajax(
          {
            method: 'GET',
            url: `${results.firebase.databaseURL}/events.json?orderBy="uid"&equalTo="${uid}"`,
          })
          .done((allEventsObj) =>
          {
            if (allEventsObj !== null)
            {
              console.log(allEventsObj);
              Object.keys(allEventsObj).forEach(fbKey =>
              {
                allEventsObj[fbKey].id = fbKey;
                eventsArr.push(allEventsObj[fbKey]);
              });
            }
            resolve(eventsArr);
          })
          .fail((err) => { reject(err); });
      })
      .catch((err) => { console.error(err); });
  });
};

const getMyFriendsEvent = () =>
{
  getMyFriends()  // Get's a list of all your friends, including pending friend requests.
    .then((myFriends) =>
    {
      myFriends.forEach(friend =>
      {
        if (friend.isAccepted) // Filters friends by which ones are accepted
        {
          console.log(friend);
          getUserEvents(friend.friendUid) // Gets the user events by UID
            .then((friendsEvents) =>
            {
              console.log(friendsEvents);
            });
        }
      });
    })
    .catch((err) => { console.error(err); });
};

module.exports =
{
  getMyEvents,
  getUserEvents,
  getMyFriendsEvent,
};
