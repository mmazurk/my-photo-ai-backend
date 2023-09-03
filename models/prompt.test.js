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

describe("getAll", function () {
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

describe("get one", function () {
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

// // BEFORE YOU TEST THIS, YOU NEED TO MODIFY THE PROMPT_ID TO BE testPromptIds[0]

// describe("update", function () {
//   let updateData = {
//     title: "NewTitle1",
//     date: '2023-03-03',
//     promptText: "Updated Prompt Text1",
//     comments: "Updated Comments1"
//   };
//   test("works", async function () {
//     let prompt = await Prompt.update(1, updateData);
//     expect(prompt).toEqual({
//       prompt_id: 1,
//       username: "u1",
//       ...updateData,
//     });
//   });

//   test("not found if no such prompt", async function () {
//     try {
//       await Prompt.update(0, {
//         title: "test",
//       });
//       fail();
//     } catch (err) {
//       expect(err instanceof NotFoundError).toBeTruthy();
//     }
//   });

//   test("bad request with no data", async function () {
//     try {
//       await Prompt.update(0, {});
//       fail();
//     } catch (err) {
//       expect(err instanceof BadRequestError).toBeTruthy();
//     }
//   });
// });

// /************************************** remove */

// describe("remove", function () {
//   test("works", async function () {
//     await Prompt.remove(1);
//     const res = await db.query(
//         "SELECT prompt_id FROM prompts WHERE id=$1", [1]);
//     expect(res.rows.length).toEqual(0);
//   });

//   test("not found if no such prompt", async function () {
//     try {
//       await Prompt.remove(0);
//       fail();
//     } catch (err) {
//       expect(err instanceof NotFoundError).toBeTruthy();
//     }
//   });
// });