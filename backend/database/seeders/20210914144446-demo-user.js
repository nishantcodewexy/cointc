"use strict";

const faker = require("faker");
const { nanoid } = require("nanoid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    this.queryInterface = queryInterface;
    this.Sequelize = Sequelize;
    await seedUser.call(this);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("tbl_users", null, {});
    await queryInterface.bulkDelete("tbl_users_profile", null, {});
  },
};

async function seedUser(len = 10) {
  for (let i = 0; i < len; i++) {
    const id = faker.datatype.uuid();
    const email = faker.internet.email();
    await this.queryInterface.bulkInsert(
      "tbl_users",
      [
        {
          id: id,
          email,
          password: faker.internet.password(),
          role: faker.datatype.boolean() ? "admin" : "standard",
          // referral_code: 'seet7pcH'
        },
      ],
      {}
    );
    await this.queryInterface.bulkInsert("tbl_users_profile", [
      {
        id: faker.datatype.uuid(),
        referral_code: nanoid(10),
        nickname: faker.name.firstName(),
        email,
        user_id: id,
      },
    ]);
  }
}
