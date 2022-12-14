'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/c32698e9-84d2-4db3-b494-e3514e34c56e.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-34816258/original/2d7809ce-da38-4c1f-a225-097229c56561.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/c96bebc7-3e49-459a-befb-89ad83af634a.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53415843/original/27d8c3b0-429b-4fe9-9982-5f8100148937.jpeg?im_w=1440',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-7615380/original/232a2ebb-4d4e-4b3e-8fee-1de0929f710c.jpeg?im_w=1200',
        preview: true
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
