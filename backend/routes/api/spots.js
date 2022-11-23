const express = require("express");
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { User, Spot, Review, ReviewImage, SpotImage, Booking, Sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

//GET ALL SPOTS
router.get("/", async (req, res) => {
  const spots = await Spot.findAll();

  const spotsInfo = [];
  for (let i = 0; i < spots.length; i++) {
    const spot = spots[i];

// find avgRating
    const reviewData = await spot.getReviews({
      attributes: [[Sequelize.fn("AVG", Sequelize.col("stars")), "avgRating"]],
    });

    const avgRating = reviewData[0].toJSON().avgRating;

// find spotimage url if exists
    let spotImagePreview = await SpotImage.findOne({
        where: {
            spotId: spot.id,
            preview: true
        }
    });

      if (spotImagePreview) {
          spotImagePreview = spotImagePreview.url
      } else {
          spotImagePreview = null
      }

    const info = {
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      avgRating: avgRating,
      previewImage: spotImagePreview
    };
      spotsInfo.push(info);
  }

    res.json({"Spots": spotsInfo})
});

module.exports = router;
