const {getAllUsers, addAFriend,} = require('./friendsCrud');
const {domStringBuild,} = require('./friendsDom');

$('#friendsBtn').click(() =>
{
  $('#friends').removeClass('hide');
  $('#welcome').addClass('hide');
});

const getAllUsersEvent = () =>
{
  $('#getFriendsBtn').click(() =>
  {
    getAllUsers()
      .then((results) =>
      {
        console.log(results);
        domStringBuild(results);
      })
      .catch((err) =>
      {
        console.error(err);
      });
  });
};

const addAFriendEvent = () =>
{
  $(document).on('click', '.addThisFriend', (e) =>
  {
    console.log($(e.target));
    const friendToAddCard = $(e.target).closest('.friendCard');
    const friendUid = friendToAddCard.find('h3').data('frienduid');
    const friendToAdd =
    {
      'userUid': firebase.auth().currentUser.uid,
      'friendUid': friendUid,
      'isAccepted': false,
      'isPending': true,
    };
    addAFriend(friendToAdd).then()
      .catch((err) =>
      {
        console.error('Error in adding a friend', err);
      });
  });
};

const initEvents = () =>
{
  getAllUsersEvent();
  addAFriendEvent();
};

module.exports =
{
  initEvents,
};
