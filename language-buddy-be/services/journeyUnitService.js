const JourneyUnit = require('../models/journeyUnitModel');

async function createUnit(req) {
  const newUnit = await JourneyUnit.create(req);
  return newUnit;
}

async function getUnitList(req) {
  const units = await JourneyUnit.find(req);
  return units;
}

module.exports = {
  createUnit,
  getUnitList,
};
