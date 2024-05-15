const halereyaService = require('../services/halereya.service');
const fs = require('fs').promises;
const path = require('path');

async function createHalereya(req, res) {
    try {
        const newHalereya = await halereyaService.create(req.body);

        res.status(200).json({
            status: 200,
            data: newHalereya,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            error: err,
        });
    }
};

async function getHalereyas(req, res) {
    try {
        res.status(200)
            .json({
                status: 200,
                data: await halereyaService.find({}),
            });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            error: err,
        });
    }
};

async function getHalereya(req, res) {
    try {
        const { id } = req.params;
        const halereya = await halereyaService.findById(id);

        if (!halereya) {
            return res.status(400).json({
                status: 400,
                message: 'Halereya not found.',
            });
        }

        res.status(200).json({
            status: 200,
            data: halereya,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            error: err,
        });
    }
};

async function updateHalereya(req, res) {
    try {
        const { id } = req.params;
        const halereyaData = req.body;
        await halereyaService.findByIdAndUpdate(id, halereyaData);

        res.status(200).json({
            status: 200,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            error: err,
        });
    }
};

async function deleteHalereya(req, res) {
    try {
        const { id } = req.params;
        await halereyaService.findByIdAndDelete(id);

        res.status(200).json({
            status: 200,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            error: err,
        });
    }
};

async function createHalereyaFromJSONFile(req, res) {
    try {
        const fileItem = req.file;
        if (!fileItem) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const filePath = path.join(__dirname, '..', fileItem.path);
        const data = await fs.readFile(filePath, 'utf8');
        const halereyaItems = JSON.parse(data);
        console.log(halereyaItems);
        halereyaItems.forEach((item)=>{
            halereyaService.create(item);
        })

        res.status(201).json({
            status: 201,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            error: err,
        });
    }
}

module.exports = {
    createHalereya,
    getHalereyas,
    getHalereya,
    updateHalereya,
    deleteHalereya,
    createHalereyaFromJSONFile,
};