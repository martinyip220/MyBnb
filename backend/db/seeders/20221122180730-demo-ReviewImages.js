'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: 'hugespaceandcozy.url'
      },
      {
        reviewId: 2,
        url: 'awesomestudio.url'
      },
      {
        reviewId: 3,
        url: 'centralarea.url'
      },
      {
        reviewId: 4,
        url: 'priceybutnice.url'
      },
      {
        reviewId: 5,
        url: 'lookattheview.url'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
