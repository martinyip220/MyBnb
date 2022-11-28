const express = require("express");
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { User, Spot, Review, ReviewImage, SpotImage, Booking, Sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { Op } = require("sequelize");
const booking = require("../../db/models/booking");

// Get all of the current user's bookings
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;

    const allBookings = await Booking.findAll({
        include: [
            {
                model: Spot,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'description']
                },
                include: [
                    {
                        model: SpotImage
                    }
                ]
            }
        ],
        where: {
            userId: user.id
        }
    })

    const bookingList = [];

    allBookings.forEach(booking => {
        bookingList.push(booking.toJSON())
    });

    bookingList.forEach(booking => {
        booking.Spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                booking.Spot.previewImage = image.url;
            }
        })
        delete booking.Spot.SpotImages
    });

    res.json({ "Bookings": bookingList})
});







module.exports = router;
