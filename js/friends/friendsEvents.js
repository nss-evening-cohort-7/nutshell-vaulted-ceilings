const {getAllUsers, addAFriend, getAllFriends, getFriendRequests, updateFriendsDb, deleteAFriend, getUsers,} = require('./friendsCrud');
const {domStringBuild, friendsList, friendRequestCard,} = require('./friendsDom');;
let friendUid = '';
const friendArr = [];

$('#friendsBtn').click(() =>
{
  $('#friends').removeClass('hide');
  $('#welcome').addClass('hide');
  $('#friends').prepend(firebase.auth().currentUser.username);
});

// Checks if the users are already on your friends list

const isFriends = (userObj) =>
{
  return userObj.uid === friendUid;
};

// Show A List Of Friends You Can Add

const getNonFriends = () =>
{
  getAllUsers()
    .then((addableUsers) =>
    {
      getAllFriends()
        .then((myFriendsList) =>
        {
          myFriendsList.forEach(friend =>
          {
            friendUid = friend.friendUid;
            if (addableUsers.findIndex(isFriends) !== -1)
            {
              addableUsers = addableUsers.filter(user => user.uid !== friend.friendUid && friend.friendUid !== firebase.auth().currentUser.uid);
              console.log(addableUsers);
            }
          });
          domStringBuild(addableUsers);
        });
    })
    .catch((err) =>
    {
      console.error(err);
    });
};

const getAllUsersEvent = () =>
{
  $('#getFriendsBtn').click(() =>
  {
    getNonFriends();
  });
};

// Adding a friend
const setMyUsername = () =>
{
  getUsers().then((result) =>
  {
    result.forEach(element => {
      if (element.uid === firebase.auth().currentUser.uid)
      {
        firebase.auth().currentUser.username = element.username;
      }
    });
  }).catch();
};

const addAFriendEvent = () =>
{
  $(document).on('click', '.addThisFriend', (e) =>
  {
    const friendToAddCard = $(e.target).closest('.userCard');
    const friendUid = friendToAddCard.find('h3').data('frienduid');
    const friendToAdd =
    {
      'username': firebase.auth().currentUser.username,
      'friendUid': friendUid,
      'isAccepted': false,
      'isPending': true,
    };
    addAFriend(friendToAdd).then()
      .catch((err) =>
      {
        console.error('Error in adding a friend', err);
      });
    getNonFriends();
  });
};

// Remove A Friend From Your Friends List

const removeFriend = () =>
{
  $(document).on('click', '.rmvFriend', (e) =>
  {
    const friendId = $(e.target).closest('.friendCard').data('firebaseid');
    deleteAFriend(friendId)
      .then(() => { showFriends(); })
      .catch((err) => { console.error(err); });
  });
};

// New Friend Request Indication

const checkFriendRequest = () =>
{
  getFriendRequests()
    .then((results) =>
    {
      const pending = results.length;
      if (pending !== 0)
      {
        $('#friendsBtn').append(`<span class="badge">${pending}</span>`);
      };
    })
    .catch();
};

// Update Your Friends List On Accept

const updateFriendsList = () =>
{
  $(document).on('click', '.acceptMe', (e) =>
  {
    const friendToUpdateCard = $(e.target).closest('.friendRequestCard');
    const friendUid = friendToUpdateCard.find('h3').data('frienduid');
    const friendId = $(e.target).closest('.friendRequestCard').data('firebaseid');
    const updatedFriend =
    {
      'username': friendToUpdateCard.find('h3').text(),
      'friendUid': friendUid,
      'isAccepted': true,
      'isPending': false,
    };
    updateFriendsDb(updatedFriend, friendId)
      .then(() => { showFriends(); })
      .catch((err) => { console.error(err); });
  });
};

// Show A list of your friends

const findUserName = (userObj) =>
{
  getAllUsers()
    .then((users) =>
    {
      users.forEach(user =>
      {
        if (user.uid === userObj.friendUid)
        {
          userObj.username = user.username;
          console.log(userObj);
          friendArr.push(userObj);
        }
      });
    })
    .catch((err) => { console.error(err); });

};

const showFriends = () =>
{
  getAllFriends()
    .then((result) =>
    {
      getFriendRequests()
        .then((friendRequests) =>
        {
          result.forEach(friend => {
            findUserName(friend);
            console.log(friendArr);

          });
          friendsList(friendArr);
          friendRequestCard(friendRequests);
        });
    })
    .catch((err) =>
    {
      console.error(err);
    });
};

const showMyFriends = () =>
{
  $(document).on('click', '#showFriendsBtn', (e) =>
  {
    showFriends();
  });
};

const initEvents = () =>
{
  getAllUsersEvent();
  addAFriendEvent();
  showMyFriends();
  updateFriendsList();
  removeFriend();
};

module.exports =
{
  initEvents,
  checkFriendRequest,
  setMyUsername,
};
