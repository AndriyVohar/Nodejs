const halereyaModel = require("../models/halereya.model");

async function create(halereya) {
    return halereyaModel.create(halereya);
}

async function find() {
    filter = {};
    return {
        items: await halereyaModel.find(filter),
        count: await halereyaModel.countDocuments(filter),
    };
}

async function findById(id) {
    return halereyaModel.findById(id);
}

async function findByIdAndUpdate(id, update) {
    return halereyaModel.findByIdAndUpdate(id, update, { upsert: false, new: true });
}

async function findByIdAndDelete(id) {
    return halereyaModel.findByIdAndDelete(id);
}

module.exports = {
    create,
    find,
    findById,
    findByIdAndUpdate,
    findByIdAndDelete,
};
