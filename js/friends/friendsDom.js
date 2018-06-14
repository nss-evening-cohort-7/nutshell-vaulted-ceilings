const domStringBuild = (allUsersArr) =>
{
  let domString = '';
  allUsersArr.forEach(user =>
  {
    domString += `<div class="col-md-3 friendCard">`;
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

module.exports =
{
  domStringBuild,
};
