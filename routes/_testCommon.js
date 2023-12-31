"use strict";

const db = require("../db.js");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const Prompt = require("../models/prompt.js");

const testPromptIds = [];

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM prompts");

  await User.register({
    username: "u1",
    firstName: "U1F",
    lastName: "U1L",
    email: "user1@user.com",
    password: "password1",
  });
  await User.register({
    username: "u2",
    firstName: "U2F",
    lastName: "U2L",
    email: "user2@user.com",
    password: "password2",
  });
  await User.register({
    username: "u3",
    firstName: "U3F",
    lastName: "U3L",
    email: "user3@user.com",
    password: "password3",
  });

  testPromptIds[0] = (await Prompt.create({
    username: "u1",    
    title: "Title Prompt Test 1",
    date: "2022-02-02",
    prompt_text: "Prompt Text Test 1",
    comments: "Comment Text Test 1"
  })).promptID;
  testPromptIds[1] = (await Prompt.create({
    username: "u1",    
    title: "Title Prompt Test 2",
    date: "2022-02-02",
    prompt_text: "Prompt Text Test 2",
    comments: "Comment Text Test 2"
  })).promptID;

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


const u1Token = createToken({ username: "u1" });
const u2Token = createToken({ username: "u2" });



module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
  testPromptIds
};
