const JourneyUnit = require('../models/journeyUnitModel');

async function createUnit(req) {
  const lastestRecord = await getHighestOrder();
  const order = lastestRecord ? lastestRecord.order + 1 : 1;
  const newUnit = await JourneyUnit.create({ ...req, order });
  return newUnit;
}

async function getUnitList(req) {
  const units = await JourneyUnit.find(req);
  return units;
}

async function getHighestOrder() {
  try {
    const [maxOrderResult] = await JourneyUnit.aggregate([
      {
        $group: {
          _id: null,
          maxOrder: { $max: '$order' },
        },
      },
    ]);

    if (!maxOrderResult) return null;

    const record = await JourneyUnit.findOne({
      order: maxOrderResult.maxOrder,
    });
    return record;
  } catch (error) {
    console.error('Error fetching record with highest order:', error);
  }
}

module.exports = {
  createUnit,
  getUnitList,
};
