const express = require("express");
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { User, Spot, Review, ReviewImage, SpotImage, Booking, Sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { Op } = require("sequelize");

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
  const { user } = req;
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

// Create a Spot
router.post('/', requireAuth, async (req, res) => {
  const { user } = req;
  const { address, city, state, country, lat, lng, name, description, price, createdAt, updatedAt } = req.body;

  const error = {
    message: "Validation Error",
    statusCode: 400,
    errors: {},
  };

  if (!address) error.errors.address = "Street address is required";
  if (!city) error.errors.city = "City is required";
  if (!state) error.errors.state = "State is required";
  if (!country) error.errors.country = "Country is required";
  if (!lat) error.errors.lat = "Latitude is not valid";
  if (!lng) error.errors.lng = "Longitude is not valid";
  if (!name) error.errors.name = "Name must be less than 50 characters";
  if (!description) error.errors.description = "Description is required";
  if (!price) error.errors.price = "Price per day is required";

  if (!address || !city || !state || !country || !lat || !lng || !description || !price) {
    res.statusCode = 400;
    return res.json(error);
  }

  const spot = await Spot.create({
    ownerId: user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    createdAt,
    updatedAt
  });

  res.status(201);
  res.json(spot);
});

// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
  const { user } = req;
  const { spotId } = req.params;
  const { url, preview } = req.body;

  const spots = await Spot.findByPk(spotId);

  // check if spot exists with params spotId and is the owner of the spot, authorization
  if (spots && parseInt(spots.ownerId) === parseInt(user.id)) {
    const newSpotImg = await SpotImage.create({
      spotId,
      url,
      preview
    });

    res.json({
      id: newSpotImg.id,
      url: newSpotImg.url,
      preview: newSpotImg.preview
    });
    // check if spot exists with params spotId but is not the owner of the spot, authorization
  } else if (spots && parseInt(spots.ownerId) !== parseInt(user.id)) {
    res.status(403);
    res.json({
      message: "Forbidden",
      statusCode: 403
    })

  } else {
    res.status(404);
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }
});

// Edit a Spot by spotId
router.put('/:spotId', requireAuth, async (req, res) => {
  const { user } = req;
  const { spotId } = req.params;
  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  const spots = await Spot.findByPk(spotId);

  const error = {
    message: "Validation Error",
    statusCode: 400,
    errors: {},
  };

  if (!address) error.errors.address = "Street address is required";
  if (!city) error.errors.city = "City is required";
  if (!state) error.errors.state = "State is required";
  if (!country) error.errors.country = "Country is required";
  if (!lat) error.errors.lat = "Latitude is not valid";
  if (!lng) error.errors.lng = "Longitude is not valid";
  if (!name) error.errors.name = "Name must be less than 50 characters";
  if (!description) error.errors.description = "Description is required";
  if (!price) error.errors.price = "Price per day is required";

  if (!address || !city || !state || !country || !lat || !lng || !description || !price) {
    res.statusCode = 400;
    return res.json(error);
  }

  if (spots && parseInt(spots.ownerId) === parseInt(user.id)) {
    await spots.update({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    });

    res.json(spots);
    // check if spot exists with params spotId but is not the owner of the spot, authorization
  } else if (spots && parseInt(spots.ownerId) !== parseInt(user.id)) {
    res.status(403);
    res.json({
      message: "Forbidden",
      statusCode: 403
    })

  } else {
    res.status(404);
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }

});

// Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res) => {
  const { user } = req;
  const { spotId } = req.params;

  const spots = await Spot.findByPk(spotId);

  if (spots && parseInt(spots.ownerId) === parseInt(user.id)) {
    await spots.destroy();
    res.json({
      message: "Successfully deleted",
      statusCode: 200
    })
  } else if (spots && parseInt(spots.ownerId) !== parseInt(user.id)) {
    res.status(403);
    res.json({
      message: "Forbidden",
      statusCode: 403
    })
  } else {
    res.status(404);
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }
})

// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res) => {
  const { spotId } = req.params

  const spots = await Spot.findByPk(spotId);

  if (spots) {
    const reviews = await Review.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"]
        },
        {
          model: ReviewImage,
          attributes: ["id", "url"]
        }
      ],
      where: {
        spotId: spots.id
      },
      attributes: ["id", "userId", "spotId", "review", "stars", "createdAt", "updatedAt"]
    })
    res.status(200);
    res.json({ "Reviews": reviews });
  } else {
    res.status(404);
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }
});

// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
  const id = req.user.id;
  const spotId = req.params.spotId;
  const { review, stars } = req.body;

  const spots = await Spot.findByPk(spotId);

  if (!spots) {
    res.status(404);
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  };

  const error = {
    message: "Validation Error",
    statusCode: 400,
    errors: {},
  };

  if (!review) error.errors.review = "Review text is required";
  if (stars < 1 || stars > 5) error.errors.stars = "Stars must be an integer from 1 to 5"

  if (!review || (stars < 1 || stars > 5)) {
    res.statusCode = 400;
    return res.json(error)
  }

  const reviewInfo = await Review.findOne({
    where: {
      userId: id,
      spotId: spotId
    }
  });

  if (reviewInfo) {
    res.status(403);
    return res.json({
      message: "User already has a review for this spot",
      statusCode: 403
    })
  };

  const newReview = await Review.create({
    userId: id,
    spotId: spots.id,
    review,
    stars
  });

  res.status(201);
  res.json(newReview);
})









module.exports = router;
