const {authorizationEvents,} = require('./authEvents');
const {retrieveKeys,} = require('./apiKeys');
const taskMain = require('./tasks/taskMain');
const friendsMain = require('./friends/friendsMain');

retrieveKeys();
authorizationEvents();
taskMain;
friendsMain;
