"use strict";

const { NotFoundError, BadRequestError } = require("../expressError");
const db = require("../db.js");
const Prompt = require("./prompt.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testPromptIds
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);



/************************************** create */

describe("create", function () {
  let newPrompt = {
    username: 'u2',
    title: 'Created Prompt Title',
    date: new Date().toISOString().split('T')[0],
    prompt_text: 'Created prompt text.',
    comments: "Created comments."
  };

  // I had to put this in because I return the fields in JS naming format
	let { username, title, prompt_text: promptText, comments } = newPrompt;
	const returnPrompt = {username, title, promptText, comments }; 

  test("create function works", async function () {
    let prompt = await Prompt.create(newPrompt);
    expect(prompt).toEqual({
      ...returnPrompt,
      promptID: expect.any(Number),
      date: expect.any(Date)
    });
  });
});

/************************************** getAll */

describe("get all prompts for a user", function () {
  test("get all promts works", async function () {
    let prompts = await Prompt.getAll('u2');
    expect(prompts).toEqual([
      {
        promptID: expect.any(Number),
        username: 'u2',
        title: 'title3',
        date: expect.any(Date),
        promptText: 'Make a prompt test3',
        comments: 'Comment3',
      }
    ]);
  });
});

// /************************************** get */

describe("get a single prompt", function () {
  test("works", async function () {
    let prompt = await Prompt.get(`${testPromptIds[0]}`);
    expect(prompt).toEqual({
      promptID: testPromptIds[0],
      title: "title1",
      date: expect.any(Date),
      promptText: "Make a prompt test1",
      comments: "Comment1"
      })
    });

  test("not found if no such prompt", async function () {
    try {
      await Prompt.get(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

// /************************************** update */

describe("update", function () {
  let updateData = {
    title: "Update1",
    date: '2023-03-03',
    promptText: "Updated Prompt Text1",
    comments: "Updated Comments1"
  };
  test("update works", async function () {
    let prompt = await Prompt.update(testPromptIds[0], updateData);
    expect(prompt).toEqual({
      promptID: testPromptIds[0],
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

// /************************************** remove */

describe("remove", function () {
  test("remove works", async function () {
    await Prompt.remove(testPromptIds[0]);
    const res = await db.query(
        "SELECT prompt_id FROM prompts WHERE prompt_id=$1", [testPromptIds[0]]);
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