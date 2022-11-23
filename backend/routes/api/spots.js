const express = require("express");
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { User, Spot, Review, ReviewImage, SpotImage, Booking, Sequelize, sequelize } = require("../../db/models");
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

// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
  const { user } = req
  const spots = await Spot.findAll({
    where: {
      ownerId: user.id
    }
  });

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
})

// Get details for a Spot from an id

router.get('/:spotId', async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    res.status(404);
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    });
  }

  const reviewData = await spot.getReviews({
    attributes: [[Sequelize.fn("AVG", Sequelize.col("stars")), "avgStarRating"]],
  });

  const avgStarRating = reviewData[0].toJSON().avgStarRating;

  const numReviews = await Review.count({
    where: {
      spotId: spot.id
    }
  });

  const spotImages = await SpotImage.findAll({
    where: {
      spotId: spot.id
    },
    attributes: ['id', 'url', 'preview']
  });

  const owner = await User.findByPk(spot.ownerId, {
    attributes: ['id', 'firstName', 'lastName']
  });

  res.json({
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
      numReviews: numReviews,
      avgStarRating: avgStarRating,
      SpotImages: spotImages,
      Owner: owner
  })
});

module.exports = router;