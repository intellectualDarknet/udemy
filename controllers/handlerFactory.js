const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError');
const { Model } = require('mongoose');

exports.deleteOne = Model => catchAsync(async (req, res, next) => {
  const doc = await Model.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(201).json({
    status: 'success',
    data: null
  });
});

exports.updateOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new AppError('No tour found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        doc
      }
    });
  });

exports.createOne = Model => catchAsync(async (req, res, next) => {
  const newTour = await Model.create(req.body);

  res.status(201).json({
    status: 'success',
    data: newTour
  });
});