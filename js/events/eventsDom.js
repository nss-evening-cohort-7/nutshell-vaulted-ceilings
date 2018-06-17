const eventDomString = (eventArray) => {
  let strang = '';
  strang += `<div class="container-fluid">`;
  strang +=   `<div class="row text-center">`;
  eventArray.forEach((event) => {
    strang +=   `<div class="col-md-3 event-card" data-firebase-id="${event.id}">`;
    strang +=     `<h3 class="evt-title">${event.title}</h3>`;
    strang +=     `<ul class="list-group">`;
    strang +=       `<li class="list-group-item">Date: <span class="evt-date">${event.date}</li>`;
    strang +=       `<li class="list-group-item">Location: <span class="evt-loc">${event.location}</li>`;
    strang +=     `</ul>`;
    strang +=   `<div class="btn-group" role="group">`;
    strang +=     `<button type="button" class="deleteEvent btn btn-primary btn-sm"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete</button>`;
    strang +=     `<button type="button" class="editUserEvent btn btn-danger btn-sm" data-toggle="modal" data-target="#myModal"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Edit</button>`;
    strang +=   `</div>`;
    strang +=  `</div>`;
  });
  strang +=   `</div>`;
  strang += `</div>`;
  printToDom(strang, 'eventCards');
};

const printToDom = (string, whereToPrint) => {
  $(`#${whereToPrint}`).html(string);
};

module.exports = {
  eventDomString,
};
