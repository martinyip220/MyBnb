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
        country: 'USA',
        lat: 52.89024,
        lng: 25.57242,
        name: `Contemporary in San Francisco with Views`,
        description: `Reverse pandemic blues at this retreat charged 4 bedroom haven with an authentic Finnish sauna, canal-front jacuzzi consciousness, paddleboards, a tandem kayak, replete comfy zones to lazily exchange conversation.`,
        price: 250
      },
      {
        ownerId: 2,
        address: '815 Battery St',
        city: 'San Francisco',
        state: 'California',
        country: 'USA',
        lat: 50.84392,
        lng: 22.23473,
        name: 'The Perfect San Francisco Experience',
        description: `This sleek modern is flooded with natural light and open-concept spaces that define California living. With over 5 patios throughout the property this house seamlessly blends indoor and outdoor living.`,
        price: 175
      },
      {
        ownerId: 3,
        address: '90 Dolores Ave',
        city: 'San Francisco',
        state: 'California',
        country: 'USA',
        lat: 42.12398,
        lng: 20.23748,
        name: `Modern Luxury Home | Indoor-Outdoor`,
        description: `Enjoy the lower level of this private and gated end of cul-de-sac retreat.  The lower level is completely separate and has its own entrance and outdoor space.  It can accommodate up to 6 people.`,
        price: 200
      },
      {
        ownerId: 4,
        address: '500 Jackson St',
        city: 'San Francisco',
        state: 'California',
        country: 'USA',
        lat: 46.98234,
        lng: 19.90174,
        name: `Cliff House ~ Stunning Ocean Views!`,
        description: `A little bit of heaven awaits you at Twilight Ridge, located in the Mission Highlands area just 5 minutes to the restaurants, tasting rooms, boutiques, galleries and historic site of Sonoma Plaza.`,
        price: 190
      },
      {
        ownerId: 4,
        address: '230 Geneva Ave',
        city: 'San Francisco',
        state: 'California',
        country: 'USA',
        lat: 70.12417,
        lng: 36.98234,
        name: 'Spectacular Private Oceanfront Retreat',
        description: `Spectacular original mid century oceanfront home with panoramic views of the surfers and crashing waves from San Francisco, to Stinson, to Duxbury reef. Designed by famous Bay Area Architect Edward B Page.`,
        price: 400
      },
      {
        ownerId: 3,
        address: '55 Irving Ave',
        city: 'San Francisco',
        state: 'California',
        country: 'USA',
        lat: 70.12417,
        lng: 36.98234,
        name: 'Spectacular Private Oceanfront Retreat',
        description: `Channel the pursuit of pause in this one-of-a-kind earth house. The cozy retreat was hand-sculpted using local and sustainable natural materials, and features a central living space with cantilevered slab stairs.`,
        price: 300
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
