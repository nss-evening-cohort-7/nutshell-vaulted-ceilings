const {setUid, createUserObj,} = require('./firebaseApi');

const checkUserLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUid(user.uid);
      createUserObj();
      $('#auth').addClass('hide');
      $('#welcome, #logout').removeClass('hide');
      $('#users, #events, #tasks, #friends, #messages').addClass('hide');
    } else {
      $('#auth').removeClass('hide');
      $('#welcome, #logout').addClass('hide');
      $('#users, #events, #tasks, #friends, #messages').addClass('hide');
    };
  });
};

module.exports = {
  checkUserLoginStatus,
};
