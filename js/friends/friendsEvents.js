const {getAllUsers, addAFriend, getAllFriends, getFriendRequests, updateFriend, deleteAFriend, getUsers, addANewFriend, getMyFriends,} = require('./friendsCrud');
const {modFriendsList, friendsList, friendRequestCard,} = require('./friendsDom');;
const {getOurEvents,} = require('./getOurEvents');
let friendUid = '';
const friendArr = [];
// const myFriend = [];

$('#friendsBtn').click(() =>
{
  $('#friends').fadeIn(1000).removeClass('hide');
  $('#welcome').addClass('hide');
  $('#backBtn').removeClass('hide');
  showFriends();
  $('#myFriendsList').html('');
  $('#friendsList').html('');
  $('#pendingFriendRequests').html('');
});

$(document).on('click', '#logout', () =>
{
  domClean();
});

// Will Clear the Dom

const domClean = () =>
{
  let domString = '';
  domString += `<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">`;
  domString += `<span class="sr-only">Toggle navigation</span>`;
  domString += `<span class="icon-bar"></span>`;
  domString += `<span class="icon-bar"></span>`;
  domString += `<span class="icon-bar"></span>`;
  domString += `</button>`;
  domString += `<a class="navbar-brand" href="#">Nutshell App</a>`;
  $('#myFriendsList').html('');
  $('#friendsList').html('');
  $('#pendingFriendRequests').html('');
  $('#friendsBtn').html('Friends');
  $('.navbar-header').html(domString);
};

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
      getMyFriends()
        .then((myFriendsList) =>
        {

          myFriendsList.forEach(friend =>
          {
            friendUid = friend.friendUid;
            if (addableUsers.findIndex(isFriends) !== -1)
            {
              addableUsers = addableUsers.filter(user => user.uid !== friend.friendUid && friend.friendUid !== firebase.auth().currentUser.uid);
            }
          });
          modFriendsList(addableUsers);
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
        $('.navbar-header').append(`<a class="navbar-brand" href="#">${firebase.auth().currentUser.username}</a>`);
      }
    });
  }).catch();
};

const addAFriendEvent = () =>
{
  $(document).on('click', '.addThisFriend', (e) =>
  {
    const friendToAddCard = $(e.target).closest('.userCard');
    const friendUid = friendToAddCard.find('li').data('frienduid');
    const friendToAdd =
    {
      'username': firebase.auth().currentUser.username,
      'friendUsername': friendToAddCard.find('h3').text(),
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
    showFriends();
  });
};

// Remove A Friend From Your Friends List

const removeFriend = () =>
{
  $(document).on('click', '.rmvFriend', (e) =>
  {
    const friendId = $(e.target).closest('.friendCard').data('firebaseid');
    deleteAFriend(friendId)
      .then(() =>
      {
        $('#friendsList').html('');
        getNonFriends();
        $('#myFriendsList').html('');
        friendArr.length = 0;
        showFriends();
      }).catch((err) => { console.error(err); });
  });
};

$(document).on('click', '.rmvFriend', (e) =>
{
  getAllFriends().then((allFriends) =>
  {
    allFriends.forEach((friend) =>
    {
      const myUid = `${firebase.auth().currentUser.uid}`;
      const myUsername = `${firebase.auth().currentUser.username}`;
      if (friend.friendUid === myUid) // && friend.uid === friendUid)
      {
        getAllUsers()
          .then((users) =>
          {
            users.forEach(user =>
            {
              const friendToDel = $(e.target).closest('.friendCard');
              const friendUsername = friendToDel.find('h3').text();
              let friendUid = friendToDel.find('h3').data('frienduid');
              if (user.username === friendUsername)
              {
                friendUid = user.uid;
                if (friend.uid === friendUid && friend.username === myUsername)
                {
                  deleteAFriend(friend.id);
                }
              }
            });
          });
      };
    });
  }).catch((err) =>
  {
    console.error(err);
  });
});

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

// Update The Senders and Recievers Friends List On Accept

const acceptFR = () =>
{
  $(document).on('click', '.acceptMe', (e) =>
  { // Update the reciever
    const friendToUpdateCard = $(e.target).closest('.friendRequestCard');
    const friendUid = friendToUpdateCard.find('h3').data('frienduid');
    const friendId = $(e.target).closest('.friendRequestCard').data('firebaseid');
    const updatedFriend =
    {
      'username': friendToUpdateCard.find('h3').text(),
      'friendUsername': `${firebase.auth().currentUser.username}`,
      'friendUid': friendUid,
      'isAccepted': true,
      'isPending': false,
    };
    updateFriend(updatedFriend, friendId)
      .then(() =>
      { // Update the sender
        const friendToUpdateCard = $(e.target).closest('.friendRequestCard');
        const friendUid = friendToUpdateCard.find('h3').data('frienduid');
        const newFriend =
        {
          'username': `${firebase.auth().currentUser.username}`,
          'friendUsername': friendToUpdateCard.find('h3').text(),
          'friendUid': `${firebase.auth().currentUser.uid}`,
          'isAccepted': true,
          'isPending': false,
          'uid': friendUid,
        };
        addANewFriend(newFriend)
          .then(() => { showFriends(); });
      })
      .catch((err) => { console.error(err); });
  });
};

// Update The Senders and Recievers Friends List On Decline

const declineFR = () =>
{
  $(document).on('click', '.declineMe', (e) =>
  {
    const friendToUpdateCard = $(e.target).closest('.friendRequestCard');
    const friendUid = friendToUpdateCard.find('h3').data('frienduid');
    const friendId = $(e.target).closest('.friendRequestCard').data('firebaseid');
    const updatedFriend =
    {
      'username': friendToUpdateCard.find('h3').text(),
      'friendUid': friendUid,
      'isAccepted': false,
      'isPending': false,
    };
    updateFriend(updatedFriend, friendId)
      .then(() =>
      {
        deleteAFriend(friendId);
      })
      .catch((err) => { console.error(err); });
    showFriends();
  });
};

// Returns the username of the given user
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
          friendArr.length = 0;
          friendArr.push(userObj);
        }
      });
    })
    .catch((err) => { console.error(err); });
};

// Show A list of your friends

const showFriends = () =>
{
  getMyFriends()
    .then((result) =>
    {
      console.log(result);
      getFriendRequests()
        .then((friendRequests) =>
        {
          result.forEach(friend => {
            findUserName(friend);
          });
          friendArr.forEach(element =>
          {
            if (element.friendUid !== firebase.auth().currentUser.uid)
            {
              friendsList(result);
            }
          });

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
  $('#showFriendsBtn').click((e) =>
  {
    showFriends();
  });
};

// Show Friends Events

$('#eventsBtn').click(() =>
{
  getOurEvents();
});

const initEvents = () =>
{
  getAllUsersEvent();
  addAFriendEvent();
  showMyFriends();
  acceptFR();
  removeFriend();
  declineFR();
};

module.exports =
{
  initEvents,
  checkFriendRequest,
  setMyUsername,
};
