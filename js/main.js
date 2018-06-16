const {authorizationEvents,} = require('./users/authEvents');
const {retrieveKeys,} = require('./apiKeys');
const taskMain = require('./tasks/taskMain');
const {eventInitializer,} = require('./events/eventsMain');
const messagesMain = require('./messages/messageMain');
const friendsMain = require('./friends/friendsMain');
const {clickBack,} = require('./backBtnEvent');

retrieveKeys();
authorizationEvents();
taskMain;
eventInitializer();
messagesMain;
friendsMain;
clickBack();
