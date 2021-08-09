const express = require('express');
const createError = require('http-errors');

const Race = require('../../models/race.model');
const raceService = require('./service');

exports.create = (req, res, next) => {
    const validationErrors = new Race(req.body).validateSync();
    if (validationErrors) {
        return next(
            new createError.BadRequest(validationErrors)
        );
    }

    return raceService.create(req.body)
        .then(createdRace => {
            res.status(201);
            res.json(createdRace);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
};

exports.findAll = (req, res, next) => {
    return raceService.findAll()
        .then( races => {
            res.json(races);
        });
};

exports.findOne = (req, res, next) => {
    return raceService.findOne(req.params.id)
        .then( race => {
            if (!race) {
                return next(new createError.NotFound("Race is not found"));
            }
            return res.json(race);
        });
};

exports.update = (req, res, next) => {
    const validationErrors = new Race(req.body).validateSync();
    if (validationErrors) {
        return next(
            new createError.BadRequest(validationErrors)
        );
    }

    return raceService.update(req.params.id, req.body)
        .then(race => {
            res.json(race);
        })
        .catch( err => {
            next(new createError.InternalServerError(err.message));
        });
};

exports.delete = (req, res, next) => {
    return raceService.delete(req.params.id)
        .then( () => res.json({}) )
        .catch( err => {
            next(new createError.InternalServerError(err.message));
        } );
};
