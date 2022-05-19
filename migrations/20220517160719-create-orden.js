'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orden', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_cliente: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_vendedor: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_producto: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      metodo_pago: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      monto: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      direccion_envio: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      orden_status: {
        type: Sequelize.STRING,
        defaultValue: 'ORDEN_CREATED'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orden');
  }
};