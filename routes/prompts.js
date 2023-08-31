"use strict";

/** Routes for prompts. */

const jsonschema = require("jsonschema");

const express = require("express");
const { BadRequestError } = require("../expressError");
const { ensureLoggedIn } = require("../middleware/auth");
const Job = require("../models/job");
const newPromptSchema = require("../schemas/newPrompt.json");
const postSearchSchema = require("../schemas/newSearch.json");
const promptUpdateSchema = require("../schemas/updatePrompt.json")

const router = express.Router({ mergeParams: true });


/** POST route to create a new prompt */

router.post("/", ensureLoggedIn, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, newPromptSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const prompt = await Prompt.create(req.body);
    return res.status(201).json({ prompt });
  } catch (err) {
    return next(err);
  }
});

/** GET route to retieve all prompts */

router.get("/", ensureLoggedIn, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, postSearchSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    // Note that res.local.user is set in the middleware function 'authenticateJWT'
    // This is middleware that runs in between every request and response

    const username = res.locals.user;
    const prompts = await Prompt.getAll(username);
    return res.json({ prompts });
  } catch (err) {
    return next(err);
  }
});

/** GET route to retrieve a prompt by id */

router.get("/:id", ensureLoggedIn, async function (req, res, next) {
  try {
    const prompt = await Prompt.get(req.params.id);
    return res.json({ prompt });
  } catch (err) {
    return next(err);
  }
});


/** PATCH route to edit prompt */

router.patch("/:id", ensureLoggedIn, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, promptUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const prompt = await Prompt.update(req.params.id, req.body);
    return res.json({ prompt });
  } catch (err) {
    return next(err);
  }
});

/** DELETE route for prompt */

router.delete("/:id", ensureLoggedIn, async function (req, res, next) {
  try {
    await Prompt.remove(req.params.id);
    return res.json({ deleted: +req.params.id });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
