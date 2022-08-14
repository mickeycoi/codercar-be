const mongoose = require("mongoose");

const { sendResponse, AppError } = require("../helpers/utils.js");
const { find } = require("../models/Car");
const Car = require("../models/Car");
const carController = {};

carController.createCar = async (req, res, next) => {
  try {
    const info = req.body;

    //always remember to control your inputs
    if (!info) throw new AppError(402, "Bad Request", "Create car Error");
    //mongoose query
    const created = await Car.create(info);
    sendResponse(
      res,
      200,
      true,
      { car: created, isDeleted: false },
      null,
      "Create Car Successfully"
    );
  } catch (err) {
    next(err);
  }
};

carController.getCars = async (req, res, next) => {
  try {
    // YOUR CODE HERE

    let {
      page,
      limit,
      make,
      model,
      release_date,
      transmission_type,
      size,
      style,
      price,
    } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    // const filterKeys = new Object.keys(filterQuery);
    // filterKeys.forEach((key) => {
    //   if (!allowedFilter.includes(key)) {
    //     const expection = new Error(`Querry ${key} is not allowed`);
    //     expection.statusCode = 401;
    //     throw expection;
    //   }
    // });
    const offset = limit * (page - 1);
    const filter = { isDeleted: false };
    const listOfCar = await Car.find(filter);

    sendResponse(
      res,
      200,
      true,
      {
        cars: listOfCar.slice(offset, offset + limit),
        page: page,
        total: listOfCar.length,
      },
      null,
      "Get Car list succesfully!"
    );
  } catch (err) {
    // YOUR CODE HERE
    next(err);
  }
};

carController.editCar = async (req, res, next) => {
  try {
    // YOUR CODE HERE
    const { id } = req.params;
    const infoUpdate = req.body;
    const option = { new: true };

    const updated = await Car.findByIdAndUpdate(id, infoUpdate, option);
    console.log(updated);
    sendResponse(
      res,
      200,
      true,
      { car: updated },
      null,
      "Update car succesfully!"
    );
  } catch (err) {
    // YOUR CODE HERE
    next(err);
  }
};

carController.deleteCar = async (req, res, next) => {
  try {
    // YOUR CODE HERE
    const { id } = req.params;

    const option = { new: true };
    const deleted = await Car.findByIdAndUpdate(
      id,
      { isDeleted: true },
      option
    );
    sendResponse(
      res,
      200,
      true,
      { car: deleted },
      null,
      "Delete Car Successfully!"
    );
  } catch (err) {
    // YOUR CODE HERE
    next(err);
  }
};

module.exports = carController;
