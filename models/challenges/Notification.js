const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },

    expireAt: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true }
);

notificationSchema.index(
  { expireAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 14 }
);

Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
