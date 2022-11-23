const express = require("express");
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { User, Spot, Review, ReviewImage, SpotImage, Booking, Sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { Op } = require("sequelize");

// Get reviews of current user
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    const reviews = await Review.findAll({
        include: [
            {
                model: User,
                attributes: ["id", "firstName", "lastName"]
            },
            {
                model: Spot,
                attributes: {
                    exclude: ["createdAt", "updatedAt", "description"]
                }
            },
            {
                model: ReviewImage,
                attributes: ["id", "url"]
            }
        ],
        where: {
            userId: user.id,
        },
        attributes: ["id", "userId", "spotId", "review", "stars", "createdAt", "updatedAt"]
    });

// need to add previewImage to Spot => find from spotimage table
    for (let i = 0; i < reviews.length; i++) {
        reviews[i] = reviews[i].toJSON();

        let previewImage = await SpotImage.findOne({
            where: {
                spotId: reviews[i].spotId,
                preview: true
            }
        })
// conditional if it has a previewImage or not
        if (previewImage) {
            reviews[i].Spot.previewImage = previewImage.url;
        } else {
            reviews[i].Spot.previewImage = null;
        }
    }

    res.json({"Reviews": reviews});
})










module.exports = router;
