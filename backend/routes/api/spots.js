const express = require('express');
const router = express.router();

const mongoose = require('mongoose');
const validateSpot = require('../../validations/spot');

const Spot = mongoose.model(Spot);

// router.post('/spots')