const { getConfig, } = require('../firebaseApi');
const { apiKeys, } = require('../apiKeys');

let firebaseConfig = {};
// const uid = getUid();

const getAllEventsFromFb = () => {
  return new Promise((resolve, reject) => {
    apiKeys()
      .then((results) => {
        const allEventsArray = [];
        $.ajax({
          method: 'GET',
          url: `${results.firebase.databaseURL}/events.json`,
        })
          .done((allEventsObj) => {
            if (allEventsObj !== null) {
              Object.keys(allEventsObj).forEach((fbKey) => {
                allEventsObj[fbKey].id = fbKey;
                allEventsArray.push(allEventsObj[fbKey]);
              });
            }
            resolve(allEventsArray);
          })
          .fail((error) => {
            reject(error);
          });
      });
  })
    .catch((error) => {
      console.error(error);
    });
};

const saveNewEvent = (newEventObj) => {
  return new Promise((resolve, reject) => {
    firebaseConfig = getConfig();
    $.ajax({
      method: 'POST',
      url: `${firebaseConfig.databaseURL}/events.json`,
      data: JSON.stringify(newEventObj),
    })
      .done((userEvent) => {
        resolve(userEvent);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const deleteEvent = (id) => {
  return new Promise((resolve, reject) => {
    firebaseConfig = getConfig();
    $.ajax({
      method: 'DELETE',
      url: `${firebaseConfig.databaseURL}/events/${id}.json`,
    })
      .done(() => {
        resolve();
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const updateUserEvent = (updatedEvt, id) => {
  return new Promise((resolve, reject) => {
    firebaseConfig = getConfig();
    $.ajax({
      method: 'PUT',
      url: `${firebaseConfig.databaseURL}/events/${id}.json`,
      data: JSON.stringify(updatedEvt),
    })
      .done((modifiedEvt) => {
        resolve(modifiedEvt);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

module.exports = {
  saveNewEvent,
  getAllEventsFromFb,
  deleteEvent,
  updateUserEvent,
};
