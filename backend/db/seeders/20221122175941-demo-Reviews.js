'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        review: 'The space was great! Very clean and comfy.',
        stars: 5
      },
      {
        spotId: 2,
        userId: 1,
        review: 'Awesome studio. Would definitely stay again.',
        stars: 5
      },
      {
        spotId: 3,
        userId: 2,
        review: 'Great central location. The price could be better though.',
        stars: 4
      },
      {
        spotId: 4,
        userId: 3,
        review: 'Ammenities were great! Great view of the city as well.',
        stars: 5
      },
      {
        spotId: 5,
        userId: 4,
        review: 'Close to the bus station and restaurants. Would recommend!',
        stars: 4
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
