const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const router = express.Router();
const User = require('../../models/User');
const tripRouter = express.Router({mergeParams: true});
const Trip = require('../../models/Trip');