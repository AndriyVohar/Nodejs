const enableScheduleJobs = true;
const startHeartBeatJob = require('./heartbeat.job');
const startUserLoginReminderJob = require('./userLoginReminder.job');

function start() {
    if (!enableScheduleJobs) {
        console.warn('Jobs scheduling is not enabled.');
        return;
    }

    startHeartBeatJob();
    startUserLoginReminderJob();
}

module.exports = start;