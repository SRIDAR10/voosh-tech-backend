const catchAsync = require("../middlewares/catchAsync");
const logger = require('../middlewares/logger');
const httpStatus = require('http-status');
const { DashboardService } = require("../services");


const getTasks = catchAsync(async (req, res) => {
  try {
    const response = await DashboardService.getTasks(req.query.sortOption, req.query.searchTerm);
    console.log("res", response);
    res.status(httpStatus.OK).send(response);
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json(error.message);
    logger.error("Error occured while fetching tasks", error);
  }
});

const addTask = catchAsync(async (req, res) => {
  try {
    const response = await DashboardService.addTask(req.body);
    res.status(httpStatus.OK).json(response);
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json(error.message);
    logger.error("Error occured in summary", error);
  }
});

const updateTask = catchAsync(async (req, res) => {
  try {
    const response = await DashboardService.updateTask(req.body);
    res.status(httpStatus.OK).json(response);
  } catch (error) {
    res.status(500).json(error.message);
    logger.error("Error occured while updating task", error);
  }
});

const updateStatus = catchAsync(async (req, res) => {
  try {
    const response = await DashboardService.updateStatus(req.body);
    res.status(httpStatus.OK).json(response);
  } catch (error) {
    res.status(500).json(error.message);
    logger.error("Error occured while updating task status", error);
  }
});

const deleteTask = catchAsync(async (req, res) => {
  console.log(req.params);
  try {
    const response = await DashboardService.deleteTask(req.params?.id);
    res.status(httpStatus.OK).json(response);
  } catch (error) {
    res.status(500).json(error.message);
    logger.error("Error occured while deleting task", error);
  }
});


module.exports = {
  addTask,
  updateTask,
  deleteTask,
  updateStatus,
  getTasks
};
