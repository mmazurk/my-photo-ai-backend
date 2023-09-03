"use strict";

const db = require("../db");
const { NotFoundError} = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");


class Prompt {

  /** Creates a prompt for a user */

  static async create(data) {
    const result = await db.query(
          `INSERT INTO prompts (username,
                             title,
                             date,
                             prompt_text,
                             comments)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING prompt_id AS "promptID", date, username, title, date, prompt_text AS "promptText", comments`,
        [
          data.username,
          data.title,
          data.date,
          data.prompt_text,
          data.comments,
        ]);
    let prompt = result.rows[0];
    return prompt;
  }

  /** Gets all prompts for a user */

  static async getAll(username) {
    const result = await db.query(`SELECT 
                        p.username,
                        p.prompt_id as "promptID",
                        p.title,
                        p.date,
                        p.prompt_text as "promptText",
                        p.comments
                  FROM prompts p 
                  WHERE username = $1`, [username]);
    
    const prompts = result.rows;
    return prompts;
  }

  /** Gets a specific prompt */

  static async get(id) {
    const result = await db.query(
          `SELECT p.prompt_id as "promptID",
                  p.title,
                  p.date,
                  p.prompt_text as "promptText",
                  p.comments
           FROM prompts p
           WHERE prompt_id = $1`, [id]);

    const prompt = result.rows[0];

    if (!prompt) throw new NotFoundError("A prompt with that id was not found.")

    return prompt;
  }

  /** Update prompt */

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(
        data,
        {
          promptText: "prompt_text"
        });
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE prompts 
                      SET ${setCols} 
                      WHERE prompt_id = ${idVarIdx} 
                      RETURNING p.prompt_id as "promptID",
                                p.title,
                                p.date,
                                p.prompt_text as "promptText,"
                                p.comments`;
    const result = await db.query(querySql, [...values, id]);
    const prompt = result.rows[0];

    if (!prompt) throw new NotFoundError(`No prompt: ${id}`);

    return prompt;
  }

  /** Delete prompt from the database; returns undefined */ 

  static async remove(id) {
    const result = await db.query(
          `DELETE
           FROM prompts
           WHERE id = $1
           RETURNING id`, [id]);
    const prompt = result.rows[0];

    if (!prompt) throw new NotFoundError(`No prompt: ${id}`);
  }
}

module.exports = Prompt;