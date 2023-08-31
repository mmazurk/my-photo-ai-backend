"use strict";

const db = require('../db');
const bcrypt = require("bcrypt");
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../expressError");
const { BRCRYPT_WORK_FACTOR} = require("../config.js");

/** These will be static class methods to perform user-related tasks. */

class User {

    static async authenticate(username, password) {

        const result = await db.query( 
            `SELECT username,
            password,
            first_name AS "firstName",
            last_name AS "lastName",
            email
            FROM users
            WHERE username = $1`,
            [username],
        );

        const user = result.rows[0];
        console.log(user);
    }

}

module.exports = User; 
