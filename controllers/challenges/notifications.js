var admin = require("firebase-admin");
const Notification = require("../../models/challenges/Notification");

admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: "edini-32lak",
    private_key_id: "261071e04e9fdb52548791ff80c03c8722dde2ad",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC0zc17yUF+Aimg\nG0qX7CexzsP0DFJi0+MSSXo41d1Vq76UZNTxWXaJtnk1bC/7UQejcxPa8pYSshbQ\n6s4nOiFvXBG5wLfn0PtbD+CteFtR7EOKcqvxtG3fyVqEN4G6/ZC2Vx3XC+LSmizN\n+7aGU5tmSJbiePsbRqLO1oYf7yjRyZK5m8ANvewoWhKFm17uWmqRwkgO/QwUQKHT\nWEUNoPg78ks4/OnPfvhhBC62U9hvFvmb6GjygZJ4jL2mPmlvgOz0gm1cOy/TehYf\nU+Pa/WGDzXyQ3J3KMenvYcgWANegyyN/cMrhTHxLZoe71yobnKuedj25yY0nwFq9\nGyWJm/sxAgMBAAECggEABRcKIuL+kgKTk2tRRUejsnDEuXkjVJ7sdJZW94Slz4Sf\nP+Q6znSbTrMxZFygWS3lzicuNuq/aNVUqRsDJL2RNWZdJWKUitUqTlz7EUcjIwJI\nwHwL9SkEMtmjT7eUUmRTD58SOvydrRokCsR8VfnClTWT8dpAD3uEl9gYPIvqFUXQ\nWubKNEp03xYrHMtJ2FLc6EkgYFBnE4nJakOasS0z+e/sXfAZpO6BeOijvVE/Pd1o\n19kSoDrDzgOppADNJJ/2ziK8EBz8luZXI8iSjoBRa5JtyS7auVs+XRorAIVKOdBb\nBRmFvfBCFJkj68RkAYf6yA8qNPQwbz69tL95YcUlBQKBgQDbrdxqmhCbJ+iY40tW\nvap9ag/zIFDS6GDCSWy4u88aoQdW3Z08/yaFEQhLBYDbWZQbspdnnwOgEPT6B7JD\nhmyEAt78d19oTKGcgNZWVBqhwI0wSjWRTehRDiSLItHqmJqkzzMM+fXEngx+0DOK\n9pclMvXWGrMApv6P/EB7kstd+wKBgQDSsoJEg0Oz24eCYXWLpLm+7fhy+w1vbqJF\n7oN9OdR7Eh7x4O2tgNGqM4Yi994masERoXQuy5kjRsg8qJ1402tZQDyY4EXUB8Ha\nUCJ7wZiG45oFkMv4VkYHR5DAzxEhDNONnFL+OKXxayK9LIhRl6JF5OsRt3QnSp5q\nqwt8slYfwwKBgHQCR4EgJR7an3GFrrZ66LrcNNoOub/3KYnQXpLb003btdWAqNWa\nZIwm53s+x8KOdrF9yYjWJ4LzEXusbs5MAahhH8Kxg3e/6CSOwSHLvlinJ6hVuB4o\nx0NutYuocrRxrFDWfr4ejlQrpqudZWrAOCdT1xEe/mKczZfZ/W+EoNLbAoGBAIJU\nj4YH2Go6AnGhDY/qvkcfds7RAreKLPCrIETm78uNIv0l0H/Brm/k3TVmM9F5uaHJ\nSE/l+v06PIRhHL9vr/iOZq1+FVOZ1MzRQvNghpPx2AVXUwRzgW/hUeYicAsMnxP6\nvc+phOR4DA4OrOgjruojN1FHNJ9VZfa/hSSGQAX3AoGALvgoxZmybsvKXkrD3SRr\nx/tqyjbYJmMYQpc/lYvlTBGDp6Yj3j8skR+eVM/v989PeIXIRVEYcSKtxdVXZxo8\nWf5ZH02izzww0eROMRJ+CXxtLHBjrQfh0ssq5U7o7UTCw1tOo66kGM7qBfQmwDxY\nCF9ZFFOqioq7mCW6FoQdhh8=\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-9w320@edini-32lak.iam.gserviceaccount.com",
    client_id: "108693667647597661694",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-9w320%40edini-32lak.iam.gserviceaccount.com",
  }),
});

module.exports = {
  pushNotification: async (req, res) => {
    try {
      const { title, body } = req.body;

      const message = {
        topic: "allDevices",
        notification: { title, body },
      };

      await admin
        .messaging()
        .send(message)
        .catch((err) => {
          res.status(400).json({
            success: false,
            message: "Notifications Failed to Send",
            ERROR: err,
          });
        });

      const newNotification = new Notification({ title, body });

      await newNotification.save();

      res.status(200).json({
        success: true,
        message: "Notifications Sent",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something went wrong try again later!",
        ERROR: err,
      });
    }
  }, // Push notifiactions to all users

  getNotifications: async (req, res) => {
    try {
      const notifications = await Notification.find()
        .sort({ _id: -1 })
        .catch((err) => {
          res.status(400).json({
            success: false,
            message: "Can't get all notifications",
            ERROR: err,
          });
        });
      res.status(200).json({
        success: true,
        result: notifications,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something went wrong try again later!",
        ERROR: err,
      });
    }
  }, // Retrieve all notifications
};
