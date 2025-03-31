exports.PORT = process.env.PORT;
exports.BUCKET_NAME = process.env.BUCKET_NAME;
exports.AWS_REGION = process.env.AWS_REGION;
exports.AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
exports.AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
exports.DB = process.env.DB;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.CLIENTPARAMS = {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};
