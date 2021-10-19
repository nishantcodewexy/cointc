"use strict";

const faker = require("faker");
const { nanoid } = require("nanoid");
const len = 10;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    this.queryInterface = queryInterface;
    this.Sequelize = Sequelize;

    await seedBasicUser.call(this);
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
    await queryInterface.bulkDelete("tbl_basic_users_profile", null, {});
    await queryInterface.bulkDelete("tbl_admin_users_profile", null, {});
  },
};
/**
 * @function seedAdminUser - Seed admin users
 * @returns
 */
async function seedAdminUser() {
  const userTableRecords = [];
  const profileTableRecords = [];
  return this.queryInterface.sequelize.transaction(async (t) => {
    for (let i = 0; i < len; ++i) {
      let id = faker.datatype.uuid();
      let email = faker.internet.email();

      // Add a general superadmin user as the first query
      if (i === 0) {
        const superadmin = {
          id,
          email: "superadmin@mail.com",
          //password - p@55w0rd
          password:
            "$2a$10$IvL78DSLxzFjDjtwba5hcuZog4kc5XsooEBtmt0gZaWTmvwc7gO4u",
          created_at: faker.date.recent(),
          updated_at: faker.date.recent(),
          role: "admin",
        };
        userTableRecords.push(superadmin);
      }

      profileTableRecords.push({
        profile_id: faker.datatype.uuid(),
        nickname: faker.name.firstName(),
        user_id: id,
        created_at: faker.date.recent(),
        updated_at: faker.date.recent(),
        // country: faker.address.countryCode(),
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
        // profile_id
      });
    }
    // console.log({ userTableRecords, adminProfile: profileTableRecords });

    await this.queryInterface.bulkInsert(
      "tbl_admin_users_profile",
      profileTableRecords,
      { transaction: t }
    );
    await this.queryInterface.bulkInsert("tbl_users", userTableRecords, {
      transaction: t,
    });
  });
}

/**
 * @function seedBasicUser - Seed basic user records
 * @returns
 */
async function seedBasicUser() {
  let ids = [];
  const userTableRecords = [];
  const profileTableRecords = [];
  const referralTableRecords = [];

  return this.queryInterface.sequelize.transaction(async (t) => {
    for (let i = 0; i < len; ++i) {
      const id = faker.datatype.uuid();
      const email = faker.internet.email();
      ids.push(id);
      let referee_id =
        ids[Math.floor(Math.random() * ids.length)] !== id
          ? ids[Math.floor(Math.random() * ids.length)]
          : null;

      userTableRecords.push({
        id: id,
        email,
        password: faker.internet.password(),
        created_at: faker.date.recent(),
        updated_at: faker.date.recent(),
        role: "basic",
      });

      profileTableRecords.push({
        profile_id: faker.datatype.uuid(),
        referral_code: nanoid(10),
        nickname: faker.name.lastName(),
        email,
        user_id: id,
        created_at: faker.date.recent(),
        country: faker.address.countryCode(),
        updated_at: faker.date.recent(),
        // referrer_id: referee_id
      });

      if (referee_id !== null) {
        referralTableRecords.push({
          user_id: id,
          referee_id: referee_id,
        });
      }
    }
    /*  console.log({
      referralTableRecords,
      userTableRecords,
      profileTableRecords,
    }); */
    await this.queryInterface.bulkInsert("tbl_users", userTableRecords, {
      transaction: t,
    });

    await this.queryInterface.bulkInsert(
      "tbl_basic_users_profile",
      profileTableRecords,
      { transaction: t }
    );

    await this.queryInterface.bulkInsert(
      "tbl_referrals",
      referralTableRecords,
      { transaction: t }
    );
  });
}
