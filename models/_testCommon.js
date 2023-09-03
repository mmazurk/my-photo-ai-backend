
const bcrypt = require("bcrypt");
const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

const testPromptIds = [];

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM prompts");
  await db.query("DELETE FROM users");

  await db.query(`
        INSERT INTO users(username,
                          password,
                          first_name,
                          last_name,
                          email)
        VALUES ('u1', $1, 'U1F', 'U1L', 'u1@email.com'),
               ('u2', $2, 'U2F', 'U2L', 'u2@email.com')
        RETURNING username`,
      [
        await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
        await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
      ]);

    const resultList = await db.query(`
        INSERT INTO prompts(username,
                          title,
                          date,
                          prompt_text,
                          comments)
        VALUES ('u1', 'title1', '2022-02-02', 'Make a prompt test1', 'Comment1'),
               ('u1', 'title2', '2022-02-02', 'Make a prompt test2', 'Comment2'),
               ('u2', 'title3', '2022-02-02', 'Make a prompt test3', 'Comment3')
        RETURNING prompt_id
               `);
        testPromptIds.splice(0,0, ...resultList.rows.map(r => r.prompt_id));
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testPromptIds
};