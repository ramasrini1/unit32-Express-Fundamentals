const express = require('express');
const app = express();
const { findMean, convertAndValidateNumsArray, findMedian, findMode } = require('./helpers');
const ExpressError = require('./expressError');

app.get('/mean', function(req, res, next) {
  let numsAsStrings = req.query.nums.split(',');
  // check if anything bad was put in
  let nums = convertAndValidateNumsArray(numsAsStrings);
  if (nums instanceof Error) {
    throw new ExpressError(nums.message);
  }

  let result = {
    operation: "mean",
    result: findMean(nums)
  }
  return res.send(result);
  
});

app.get('/median', function(req, res, next) {
 
  let numsAsStrings = req.query.nums.split(',');
  // check if anything bad was put in
  let nums = convertAndValidateNumsArray(numsAsStrings);
  if (nums instanceof Error) {
    throw new ExpressError(nums.message);
  }

  let result = {
    operation: "meadian",
    result: findMedian(nums)
  }
  return res.send(result);
  
});

app.get('/mode', function(req, res, next) {
  console.log(req.query.nums);
  let numsAsStrings = req.query.nums.split(',');
  // check if anything bad was put in
  let nums = convertAndValidateNumsArray(numsAsStrings);
  if (nums instanceof Error) {
    throw new ExpressError(nums.message);
  }

  let result = {
    operation: "mode",
    result: findMode(nums)
  }
  return res.send(result);
  
});

/** general error handler */

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found",404);

  // pass the error to the next piece of middleware
  return next(err);
});


/** general error handler */

app.use(function (err, req, res, next) {
  
  res.status(err.status || 500);

  return res.json({
    status: err.status || 500,
    message: err.message
  });
});


/** Start server on port 3000 */

app.listen(3000, function() {
  console.log('Server started on port 3000.');
});
