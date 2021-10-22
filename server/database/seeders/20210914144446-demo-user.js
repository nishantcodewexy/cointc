"use strict";

const faker = require("faker");
const { nanoid } = require("nanoid");
const len = 10;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    this.queryInterface = queryInterface;
    this.Sequelize = Sequelize;

    await seedUser.call(this);
    await seedAdminUser.call(this);
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
    await queryInterface.bulkDelete("tbl_basic_users_profile", null, {});
    await queryInterface.bulkDelete("tbl_admin_users_profile", null, {});
  },
};

async function seedAdminUser() {
  const userTableRecords = [];
  const profileTableRecords = [];

  for (let i = 0; i < len; ++i) {
    let id = faker.datatype.uuid();
    let email = faker.internet.email();
    let profile_id = faker.datatype.uuid();

    // Add a general superadmin user as the first query
    if (i === 0) {
      email = "superadmin@mail.com";
      const superadmin = {
        id,
        email,
        //password - p@55w0rd
        password:
          "$2a$10$IvL78DSLxzFjDjtwba5hcuZog4kc5XsooEBtmt0gZaWTmvwc7gO4u",
        created_at: faker.date.recent(),
        updated_at: faker.date.recent(),
        role: "admin",
        access_level: 3,
        // profile_id
      };
      userTableRecords.push(superadmin);
    }

    profileTableRecords.push({
      profile_id,
      oname: faker.name.firstName(),
      lname: faker.name.lastName(),
      user_id: id,
      created_at: faker.date.recent(),
      updated_at: faker.date.recent(),
      email,
    });

    if (i == 0) continue;

    userTableRecords.push({
      id,
      email,
      password: faker.internet.password(),
      // referral_code: 'seet7pcH'
      created_at: faker.date.recent(),
      updated_at: faker.date.recent(),
      role: "admin",
      access_level: 2,
    });
  }
  await this.queryInterface.bulkInsert("tbl_users", userTableRecords);

  await this.queryInterface.bulkInsert(
    "tbl_users_profile",
    profileTableRecords
  );
}

async function seedUser() {
  for (let i = 0; i < len; ++i) {
    const id = faker.datatype.uuid();
    const email = faker.internet.email();
    let profile_id = faker.datatype.uuid();

    await this.queryInterface.bulkInsert(
      "tbl_users",
      [
        {
          id: id,
          email,
          password: faker.internet.password(),
          access_level: 1,
          created_at: faker.date.recent(),
          updated_at: faker.date.recent(),
          role: "basic",
        },
      ],
      {}
    );

    await this.queryInterface.bulkInsert("tbl_users_profile", [
      {
        profile_id,
        referral_code: nanoid(10),
        oname: faker.name.firstName(),
        lname: faker.name.lastName(),
        email,
        user_id: id,
        created_at: faker.date.recent(),
        updated_at: faker.date.recent(),
      },
    ]);
  }
}
