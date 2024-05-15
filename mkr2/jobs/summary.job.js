const CronJob = require('cron').CronJob;
const halereyaModel = require('../models/halereya.model');
const halereyaService = require('../services/halereya.service')
const fs = require('fs');

function startSummaryJob() {
    const job = new CronJob(
        '*/10 * * * * *',
        async () => {
            const halereya = await halereyaService.find();
            summary = 0;
            halereya.items.forEach((item) => {
                summary += item.price;
            })
            console.log('Summary price: ' + summary);
        },
    );

    job.start();
}

module.exports = startSummaryJob;