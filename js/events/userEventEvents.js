const {saveNewEvent, getAllEventsFromFb,} = require('./eventsFirebase');
const {eventDomString,} = require('./eventsDom');

const eventsFeatureEvents = () => {
  $('#eventsBtn').click(() => {
    $('#events, #backBtn').removeClass('hide');
    $('#welcome').addClass('hide');
  });

  $('#eventsBackBtn').click(() => {
    $('#events').addClass('hide');
    $('#welcome').removeClass('hide');
  });

  $('#saveEvent').click(() => {
    const eTitle = $('#eventTitle').val();
    const eDate = $('#eventDate').val();
    const eLocation = $('#eventLocation').val();
    const newEventObj = {
      title: eTitle,
      date: eDate,
      location: eLocation,
    };
    saveNewEvent(newEventObj);
    $('#eventTitle, #eventDate, #eventLocation').val('');
    retrieveAllEvents();
  });
};

const retrieveAllEvents = () => {
  getAllEventsFromFb()
    .then((results) => {
      eventDomString(results);
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = {
  eventsFeatureEvents,
  retrieveAllEvents,
};
