const express = require('express');
const router = express.Router();
const { createSubject, getAllSubjects, getSubjectById, updateSubjectById, deleteSubjectById } = require('../controllers/CRUDcontrollers');
const authenticateUser = require('../middlewares/authMiddleware');

// Routes for CRUD operations
router.post('/subjects', authenticateUser, createSubject);
router.get('/subjects', authenticateUser, getAllSubjects);
router.get('/subjects/:id', authenticateUser, getSubjectById);
router.put('/subjects/:id', authenticateUser, updateSubjectById);
router.delete('/subjects/:id', authenticateUser, deleteSubjectById);

module.exports = router;
