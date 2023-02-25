const express = require('express');
const routeParamsVerify = require('../../middleware/routeParamsVerify.middleware');
const { body, param } = require('express-validator');

const {
  getAll,
  getById,
  set,
  update,
  deleteNoteById,
} = require('./notes.controller');

const router = express.Router();

router.get('/', getAll);
router.get(
  '/:id',
  [
    param('id')
      .exists()
      .withMessage('id field must be provided.')
      .isInt({ min: 0 })
      .withMessage('id must be a non negative integer'),
  ],
  routeParamsVerify,
  getById
);

const noteValidationCheck = [
  body('title')
    .exists()
    .withMessage('title field must be provided.')
    .isLength({ min: 2, max: process.env.TITLE_LENGTH })
    .withMessage(
      `title can only be of 2-${process.env.TITLE_LENGTH} chars long.`
    ),
  body('content')
    .exists()
    .withMessage('content field must be provided.')
    .isLength({ min: 1, max: process.env.CONTENT_LENGTH })
    .withMessage(
      `content can only be of 1-${process.env.CONTENT_LENGTH} chars long.`
    ),
];

router.post('/', noteValidationCheck, routeParamsVerify, set);
router.put(
  '/:id',
  noteValidationCheck,
  [
    param('id')
      .exists()
      .withMessage('id field must be provided.')
      .isInt({ min: 0 })
      .withMessage('id must be a non negative integer'),
  ],
  routeParamsVerify,
  update
);

router.delete(
  '/:id',
  [
    param('id')
      .exists()
      .withMessage('id field must be provided.')
      .isInt({ min: 0 })
      .withMessage('id must be a non negative integer'),
  ],
  routeParamsVerify,
  deleteNoteById
);

module.exports = router;
