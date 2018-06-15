const domStringBuild = (allUsersArr) =>
{
  let domString = '';
  allUsersArr.forEach(user =>
  {
    domString += `<div class="col-md-100 userCard">`;
    domString += `<div class="panel panel-default">`;
    domString += `<div class="panel-body">`;
    domString += `<h3 data-friendUid="${user.uid}">${user.username}</h3>`;
    domString += `<button class="btn btn-danger addThisFriend">Add</button>`;
    domString += `</div>`;
    domString += `</div>`;
    domString += `</div>`;
  });
  $('#newFriendsBay').html(domString);
};

const friendsList = (friendsArr) =>
{
  let domString = '';
  friendsArr.forEach(user =>
  {
    domString += `<div class="col-md-100 ">`;
    domString += `<div class="panel panel-default">`;
    domString += `<div class="panel-body friendCard" data-firebaseId="${user.id}">`;
    domString += `<h3 data-friendUid="${user.uid}">${user.username} `;
    if (user.isPending === true)
    {
      domString += `<span class="label label-primary">Pending</span>`;
    }
    domString += `</h3>`;
    if (user.isPending === false && user.isAccepted)
    {
      domString += `<button class="btn-danger rmvFriend">Remove Friend</button>`;
    }
    domString += `</div>`;
    domString += `</div>`;
    domString += `</div>`;
  });
  $('#myFriendsList').html(domString);
};

const friendRequestCard = (fRArr) =>
{
  let domString = '';
  fRArr.forEach(user =>
  {
    domString += `<div class="col-md-100">`;
    domString += `<div class="panel panel-default">`;
    domString += `<div class="panel-body friendRequestCard" data-firebaseId="${user.id}">`;
    domString += `<h3 data-friendUid="${user.uid}" >${user.username} `;
    domString += `</h3>`;
    if (user.isPending === true)
    {
      domString += `<button class="btn btn-primary acceptMe">Accept</button>`;
    }
    domString += `</div>`;
    domString += `</div>`;
    domString += `</div>`;
  });
  $('#pendingFriendRequests').html(domString);
};

module.exports =
{
  domStringBuild,
  friendsList,
  friendRequestCard,
};
