const { createUnit, getUnitList } = require('../services/journeyUnitService');

exports.getListUnit = async (req, res) => {
  let error;
  const units = await getUnitList(req.params).catch((err) => {
    error = err;
  });
  if (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  } else {
    res.status(201).json({ status: 'success', data: units });
  }
};

exports.createUnit = async (req, res) => {
  let error;
  const unit = await createUnit(req.body).catch((err) => (error = err));
  if (error) {
    res.status(400).json({
      status: 'fail',
      message: err._message,
    });
  } else {
    res
      .status(201)
      .json({ status: 'success', data: { id: unit._id.toString() } });
  }
};
