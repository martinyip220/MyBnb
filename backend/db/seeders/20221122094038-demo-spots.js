'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '123 Filmore St',
        city: 'San Francisco',
        state: 'California',
        Country: 'USA',
        lat: 52.89024,
        lng: 25.57242,
        name: 'Luxury Home',
        description: '3Bed/2Bath',
        price: 250
      },
      {
        ownerId: 2,
        address: '815 Battery St',
        city: 'San Francisco',
        state: 'California',
        Country: 'USA',
        lat: 50.84392,
        lng: 22.23473,
        name: 'Spacious Studio',
        description: '1Bed/1Bath',
        price: 175
      },
      {
        ownerId: 3,
        address: '90 Dolores Ave',
        city: 'San Francisco',
        state: 'California',
        Country: 'USA',
        lat: 42.12398,
        lng: 20.23748,
        name: 'Scenic Views Prime Location',
        description: '2Bed/2Bath',
        price: 200
      },
      {
        ownerId: 1,
        address: '500 Jackson St',
        city: 'San Francisco',
        state: 'California',
        Country: 'USA',
        lat: 46.98234,
        lng: 19.90174,
        name: 'Cozy Suite',
        description: '2Bed/1Bath',
        price: 190
      },
      {
        ownerId: 2,
        address: '230 Geneva Ave',
        city: 'San Francisco',
        state: 'California',
        Country: 'USA',
        lat: 70.12417,
        lng: 36.98234,
        name: 'Spacious Home',
        description: '4Bed/3Bath',
        price: 400
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: { [Op.in]: ['123 Filmore St', '815 Battery St', '90 Dolores Ave', '500 Jackson St', '230 Geneva Ave'] }
    }, {});
  }
};
