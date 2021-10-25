"use strict";

const faker = require("faker");
const { nanoid } = require("nanoid");
const len = 10;

const UsersSeeder = {
  up: async (queryInterface, Sequelize) => {
    this.queryInterface = queryInterface;
    this.Sequelize = Sequelize;

    await seedUsers.call(this);
    await seedAdminUsers.call(this);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("tbl_users", null, {});
    await queryInterface.bulkDelete("tbl_users_profile", null, {});
    await queryInterface.bulkDelete("tbl_basic_users_profile", null, {});
    await queryInterface.bulkDelete("tbl_admin_users_profile", null, {});
  },
};

/**
 * @function seedAdminUsers - Seeds adminsitrator users
 */
async function seedAdminUsers() {
  const userTableRecords = [];
  const profileTableRecords = [];
  const securityTableRecords = [];

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

    securityTableRecords.push({
      id: faker.datatype.uuid(),
      user_id: id,
      created_at: faker.date.recent(),
      updated_at: faker.date.recent(),
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
  await this.queryInterface.sequelize.transaction(
    async (t) =>
      await Promise.all([
        this.queryInterface.bulkInsert("tbl_users", userTableRecords, {
          transaction: t,
        }),
        this.queryInterface.bulkInsert(
          "tbl_users_profile",
          profileTableRecords,
          { transaction: t }
        ),
        this.queryInterface.bulkInsert(
          "tbl_users_security",
          securityTableRecords,
          { transaction: t }
        ),
      ])
  );
}

/**
 * @function seedUser - seeds basic users
 */
async function seedUsers() {
  const userTableRecords = [];
  const profileTableRecords = [];
  const securityTableRecords = [];

  for (let i = 0; i < len; ++i) {
    const id = faker.datatype.uuid();
    const email = faker.internet.email();
    let profile_id = faker.datatype.uuid();

    userTableRecords.push({
      id: id,
      email,
      password: faker.internet.password(),
      access_level: 1,
      created_at: faker.date.recent(),
      updated_at: faker.date.recent(),
      role: "basic",
    });

    profileTableRecords.push({
      profile_id,
      invite_code: nanoid(10),
      oname: faker.name.firstName(),
      lname: faker.name.lastName(),
      email,
      user_id: id,
      created_at: faker.date.recent(),
      updated_at: faker.date.recent(),
    });

    securityTableRecords.push({
      id: faker.datatype.uuid(),
      user_id: id,
      created_at: faker.date.recent(),
      updated_at: faker.date.recent(),
    });
  }

  await this.queryInterface.sequelize.transaction(
    async (t) =>
      await Promise.all([
        this.queryInterface.bulkInsert("tbl_users", userTableRecords, {
          transaction: t,
        }),
        this.queryInterface.bulkInsert(
          "tbl_users_profile",
          profileTableRecords,
          { transaction: t }
        ),
        this.queryInterface.bulkInsert(
          "tbl_users_security",
          securityTableRecords,
          { transaction: t }
        ),
      ])
  );
}

module.exports = UsersSeeder;
