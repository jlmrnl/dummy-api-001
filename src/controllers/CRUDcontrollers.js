const Subject = require('../models/CRUDmodels');
const { handleError, handleNotFound, handleServerError } = require('../utils/errorHelpers');

exports.createSubject = async (req, res) => {
  try {
    const { subjectCode, description, units } = req.body;
    const newSubject = await Subject.create({ subjectCode, description, units });
    res.status(201).json(newSubject);
  } catch (err) {
    handleError(res, 400, err.message);
  }
};

exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json(subjects);
  } catch (err) {
    handleServerError(res, err);
  }
};

exports.getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return handleNotFound(res);
    }
    res.status(200).json(subject);
  } catch (err) {
    handleServerError(res, err);
  }
};

exports.updateSubjectById = async (req, res) => {
  try {
    const { subjectCode, description, units } = req.body;
    const updatedSubject = await Subject.findByIdAndUpdate(req.params.id, { subjectCode, description, units }, { new: true });
    if (!updatedSubject) {
      return handleNotFound(res);
    }
    res.status(200).json(updatedSubject);
  } catch (err) {
    handleServerError(res, err);
  }
};

exports.deleteSubjectById = async (req, res) => {
  try {
    const deletedSubject = await Subject.findByIdAndDelete(req.params.id);
    if (!deletedSubject) {
      return handleNotFound(res);
    }
    res.status(200).json({ message: 'Subject deleted successfully' });
  } catch (err) {
    handleServerError(res, err);
  }
};
