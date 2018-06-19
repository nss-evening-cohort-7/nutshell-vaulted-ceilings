const modFriendsList = (friendsArr) =>
{
  let domString = '';
  friendsArr.forEach(friend =>
  {
    domString += `<div class="userCard">`;
    domString += `<li class="list-group-item" data-friendUid="${friend.uid}">`;
    domString += `${friend.username}`;
    domString += ` <button class="btn btn-success addThisFriend">Add</button>`;
    domString += `</li>`;
    domString += `</div>`;
  });
  $('#friendsList').html(domString);
};

const friendsList = (friendsArr) =>
{
  console.log(friendsArr);
  let domString = '';
  friendsArr.forEach(bud =>
  {
    domString += `<div class="col-md-100 ">`;
    domString += `<div class="panel panel-default">`;
    domString += `<div class="panel-body friendCard" data-firebaseId="${bud.id}">`;
    bud.username = bud.username;
    domString += `<h3 data-friendUid="${bud.uid}">${bud.username}`;
    if (bud.isPending === true)
    {
      domString += `<span class="label label-primary">Pending</span>`;
    }
    domString += `</h3>`;
    if (bud.isPending === false && bud.isAccepted)
    {
      domString += `<button class="btn-danger rmvFriend">Remove Friend</button>`;
    }
    domString += `</div>`;
    domString += `</div>`;
    domString += `</div>`;
  });
  $('#myFriendsList').html('');
  $('#myFriendsList').append(domString);
};

const friendRequestCard = (fRArr) =>
{
  let domString = '';
  fRArr.forEach(user =>
  {
    domString += `<div class="col-md-100">`;
    domString += `<div class="panel panel-default">`;
    domString += `<div class="panel-body friendRequestCard" data-firebaseId="${user.id}">`;
    domString += `<h3 data-friendUid="${user.uid}" >${user.username}`;
    domString += `</h3>`;
    if (user.isPending === true)
    {
      domString += `<button class="btn btn-primary acceptMe">Accept</button>`;
      domString += `<button class="btn btn-danger declineMe">Decline</button>`;
    }
    domString += `</div>`;
    domString += `</div>`;
    domString += `</div>`;
  });
  $('#pendingFriendRequests').html('');
  $('#pendingFriendRequests').html(domString);
};

module.exports =
{
  friendsList,
  friendRequestCard,
  modFriendsList,
};
