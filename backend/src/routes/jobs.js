const express = require('express');
const { body, validationResult } = require('express-validator');
const { getAllJobs, getJobById, createJob, updateJobStatus, deleteJob } = require('../controllers/jobsController');

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
  next();
};

const createJobRules = [
  body('title').notEmpty().withMessage('title is required').trim(),
  body('description').notEmpty().withMessage('description is required').trim(),
  body('contactEmail').optional({ checkFalsy: true }).isEmail().withMessage('contactEmail must be a valid email'),
];

router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.post('/', createJobRules, validate, createJob);
router.patch('/:id', updateJobStatus);
router.delete('/:id', deleteJob);

module.exports = router;
