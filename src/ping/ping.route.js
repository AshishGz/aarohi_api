import express from 'express';

const router = express.Router();

router.route('/').get((req, res, next) => res.json({ message: 'Server is running' }));

export default router;
