const {eventsFeatureEvents, retrieveAllEvents,} = require('./userEventEvents');
// const {getAllEventsFromFb,} = require('./eventsFirebase');

const eventInitializer = () => {
  retrieveAllEvents();
  eventsFeatureEvents();
};

module.exports = {
  eventInitializer,
};
