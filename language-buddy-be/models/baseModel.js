exports.baseModel = {
  env: {
    type: String,
    default: process.env.NODE_ENV,
    require: true,
    immutable: true,
  },
};
