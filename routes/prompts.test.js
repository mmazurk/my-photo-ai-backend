"use strict";

const request = require("supertest");

const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
  testPromptIds
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /prompts */

describe("POST /prompts", function () {
  test("ok for user", async function () {
    const resp = await request(app)
        .post(`/prompts`)
        .send({
        username: 'u1',
        title: 'New Prompt Title',
        date: new Date().toISOString().split('T')[0],
        prompt_text: 'New prompt text.',
        comments: "New comments."
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      prompt: {
        promptID: expect.any(Number),
        username: "u1",
        title: 'New Prompt Title',
        date: expect.any(String), // when we put it into JSON it turns it into a string
        promptText: 'New prompt text.',
        comments: "New comments."
      },
    });
  });

  test("bad request with missing data", async function () {
    const resp = await request(app)
        .post(`/prompts`)
        .send({
          username: "u1"
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request with invalid data", async function () {
    const resp = await request(app)
        .post(`/prompts`)
        .send({
            username: 'u1',
            title: 'New Prompt Title'
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });
});

// /************************************** GET /prompts */

describe("GET /prompts", function () {
  test("ok for logged in user", async function () {
    const resp = await request(app).get(`/prompts`)
    .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
          prompts: [
            {
              promptID: expect.any(Number),
              username: 'u1',
              title: 'Title Prompt Test 1',
              date: expect.any(String),
              promptText: 'Prompt Text Test 1',
              comments: 'Comment Text Test 1'
            },
            {
              promptID: expect.any(Number),
              username: 'u1',
              title: 'Title Prompt Test 2',
              date: expect.any(String),
              promptText: 'Prompt Text Test 2',
              comments: 'Comment Text Test 2'
            },
          ],
        },
    );
  });
})

// /************************************** GET /prompts/:id */

describe("GET /prompts/:id", function () {
  test("get prompts by id works", async function () {
    const resp = await request(app).get(`/prompts/${testPromptIds[0]}`)
    .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      prompt: {
        promptID: testPromptIds[0],
        title: 'Title Prompt Test 1',
        date: expect.any(String),
        promptText: 'Prompt Text Test 1',
        comments: 'Comment Text Test 1'
        }
    });
  });

  test("not found for no such prompt", async function () {
    const resp = await request(app).get(`/prompts/0`)
    .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });
});

// /************************************** PATCH /promnpts/:id */

// describe("PATCH /prompts/:id", function () {
//   test("works", async function () {
//     const resp = await request(app)
//         .patch(`/prompts/1`)
//         .send({
//           title: "Updated Title Prompt Test 1",
//         })
//         .set("authorization", `Bearer ${u1Token}`);
//     expect(resp.body).toEqual({
//       prompt: {
//         id: 1,
//         username: "u1",    
//         title: "Updated Title Prompt Test 1",
//         date: expect.any(Date),
//         prompt_text: "Prompt Text Test 1",
//         comments: "Comment Text Test 1"
//       },
//     });
//   });

//   test("unauth for others", async function () {
//     const resp = await request(app)
//         .patch(`/prompts/1`)
//         .send({
//           title: "Updated Title Prompt Test 1",
//         })
//     expect(resp.statusCode).toEqual(401);
//   });

//   test("not found on no such prompt", async function () {
//     const resp = await request(app)
//         .patch(`/prompts/0`)
//         .send({
//           handle: "new",
//         })
//         .set("authorization", `Bearer ${u1Token}`);
//     expect(resp.statusCode).toEqual(400);
//   });

//   test("bad request on handle change attempt", async function () {
//     const resp = await request(app)
//         .patch(`/prompts/1`)
//         .send({
//           handle: "new",
//         })
//         .set("authorization", `Bearer ${u1Token}`);
//     expect(resp.statusCode).toEqual(400);
//   });

//   test("bad request with invalid data", async function () {
//     const resp = await request(app)
//         .patch(`/prompts/1`)
//         .send({
//           title: 7777
//         })
//         .set("authorization", `Bearer ${u1Token}`);
//     expect(resp.statusCode).toEqual(400);
//   });
// });

// /************************************** DELETE /prompts/:id */

// describe("DELETE /prompts/:id", function () {
//   test("works", async function () {
//     const resp = await request(app)
//         .delete(`/prompts/1`)
//         .set("authorization", `Bearer ${u1Token}`);
//     expect(resp.body).toEqual({ deleted: 1 });
//   });

//   test("unauth for others", async function () {
//     const resp = await request(app)
//         .delete(`/prompts/1`)
//         .set("authorization", `Bearer ${u2Token}`);
//     expect(resp.statusCode).toEqual(401);
//   });

//   test("unauth for anon", async function () {
//     const resp = await request(app)
//         .delete(`/prompts/1`);
//     expect(resp.statusCode).toEqual(401);
//   });

//   test("not found for no such prompt", async function () {
//     const resp = await request(app)
//         .delete(`/prompts/0`)
//         .set("authorization", `Bearer ${u1Token}`);
//     expect(resp.statusCode).toEqual(404);
//   });
// });
