'use strict'
const {Model} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // Order.belongsTo(models.User, {
      //     foreignKey: 'userId'
      // })
      // Order.hasOne(models.ShippingAddress, {
      //     foreignKey: 'shippingAddressId'
      // })
      Order.hasMany(models.OrderItem),
      Order.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      })
    }
  }
  Order.init({
    orderItems: DataTypes.JSON,
    shippingAddress: DataTypes.JSON,
    paymentMethod: DataTypes.STRING,
    shippingMethod: DataTypes.STRING,
    itemsPrice: DataTypes.FLOAT,
    shippingPrice: DataTypes.FLOAT,
    totalPrice: DataTypes.FLOAT,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    isPaid: DataTypes.BOOLEAN,
    paidAt: DataTypes.DATE,
    isDelivered: DataTypes.BOOLEAN,
    deliveredAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Order'
  })
  return Order
}
