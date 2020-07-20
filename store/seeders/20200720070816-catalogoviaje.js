'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
       */
    return queryInterface.bulkInsert('CatalogoViajes', [{
        descripcion: 'GUAYAQUIL',
        estado: "A",
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        descripcion: 'QUITO',
        estado: "A",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        descripcion: 'CUENCA',
        estado: "A",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        descripcion: 'SANTO DOMINGO',
        estado: "A",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};