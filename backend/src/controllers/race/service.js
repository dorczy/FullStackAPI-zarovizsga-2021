const Race = require('../../models/race.model');

exports.create = raceData => {
    const race = new Race(raceData);
    return race.save();
};

exports.findAll = () => Race.find().populate();

exports.findOne = id => Race.findById(id).populate();

exports.update = (id, updateData) => Race.findByIdAndUpdate(id, updateData, {new: true});

exports.delete = id => Race.findByIdAndRemove(id);
