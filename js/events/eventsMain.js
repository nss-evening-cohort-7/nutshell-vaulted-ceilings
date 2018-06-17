const {eventsFeatureEvents, retrieveAllEvents, deleteAnEvent, editAnEvent,} = require('./userEventEvents');
// const {getAllEventsFromFb,} = require('./eventsFirebase');

const eventInitializer = () => {
  retrieveAllEvents();
  eventsFeatureEvents();
  deleteAnEvent();
  editAnEvent();
};

module.exports = {
  eventInitializer,
};
