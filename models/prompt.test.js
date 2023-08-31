"use strict";

const { NotFoundError, BadRequestError } = require("../expressError");
const db = require("../db.js");
const Prompt = require("./prompt.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe("create", function () {
  let newPrompt = {
    username: 'u1',
    title: 'New Prompt Title',
    prompt_text: 'New prompt text.',
    comments: "New comments."
  };

  test("works", async function () {
    let prompt = await Prompt.create(newPrompt);
    expect(prompt).toEqual({
      ...newprompt,
      id: expect.any(Number),
      date: expect.any(Date)
    });
  });
});

/************************************** getAll */

describe("getAll", function () {
  test("works", async function () {
    let prompts = await Prompt.getAll('u2');
    expect(prompts).toEqual([
      {
        prompt_id: expect.any(Number),
        username: 'u2',
        title: 'title2',
        date: '2022-02-02',
        prompt_text: 'Make a prompt test2',
        commments: 'Comment2',
      }
    ]);
  });

/************************************** get */

describe("get", function () {
  test("works", async function () {
    let prompt = await Prompt.get(1);
    expect(prompt).toEqual({
      prompt_id: 1,
      username: "u1",
      title: "title1",
      date: expect.any(Date),
      prompt_text: "Make a prompt test1",
      comments: "Comment1"
      })
    });
  });

  test("not found if no such promopt", async function () {
    try {
      await Prompt.get(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** update */

describe("update", function () {
  let updateData = {
    title: "NewTitle1",
    date: '2023-03-03',
    prompt_text: "Updated Prompt Text1",
    comments: "Updated Comments1"
  };
  test("works", async function () {
    let prompt = await Prompt.update(1, updateData);
    expect(prompt).toEqual({
      prompt_id: 1,
      username: "u1",
      ...updateData,
    });
  });

  test("not found if no such prompt", async function () {
    try {
      await Prompt.update(0, {
        title: "test",
      });
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  test("bad request with no data", async function () {
    try {
      await Prompt.update(0, {});
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** remove */

describe("remove", function () {
  test("works", async function () {
    await Prompt.remove(1);
    const res = await db.query(
        "SELECT prompt_id FROM prompts WHERE id=$1", [1]);
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such prompt", async function () {
    try {
      await Prompt.remove(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});