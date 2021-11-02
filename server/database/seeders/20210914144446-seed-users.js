"use strict";

const faker = require("faker");
const { nanoid } = require("nanoid");
const { tableNames } = require("../../consts");
const len = 10;

const UsersSeeder = {
  up: async (queryInterface, Sequelize) => {
    this.queryInterface = queryInterface;
    this.Sequelize = Sequelize;

    await seedUsers.call(this);
    await seedAdminUsers.call(this);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(tableNames?.USER || "tbl_users", null, {});
    await queryInterface.bulkDelete(
      tableNames?.PROFILE || "tbl_user_profiles",
      null,
      {}
    );
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
        access_level: 3,
        verified: true,
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
      access_level: 2,
      verified: faker.datatype.boolean(),
    });
  }
  await this.queryInterface.sequelize.transaction(
    async (t) =>
      await Promise.all([
        this.queryInterface.bulkInsert(
          tableNames?.USER || "tbl_users",
          userTableRecords,
          {
            transaction: t,
          }
        ),
        this.queryInterface.bulkInsert(
          tableNames?.PROFILE || "tbl_user_profiles",
          profileTableRecords,
          { transaction: t }
        ),
        this.queryInterface.bulkInsert(
          tableNames?.SECURITY || "tbl_user_securities",
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
  const referralTableRecords = [];
  const ID = [];

  let randID = () =>
    ID?.length > 1 ? ID[Math.floor(Math.random() * (ID?.length + 1))] : ID[0];

  for (let i = 0; i < len; ++i) {
    const user_id = faker.datatype.uuid();
    let email = faker.internet.email();
    let profile_id = faker.datatype.uuid();
    ID.push(user_id);
    let picked = randID();

    if (i === 5) {
      email = "basic@mail.com";
      const dummy = {
        id: user_id,
        email,
        //password - p@55w0rd
        password:
          "$2a$10$IvL78DSLxzFjDjtwba5hcuZog4kc5XsooEBtmt0gZaWTmvwc7gO4u",
        created_at: faker.date.recent(),
        updated_at: faker.date.recent(),
        access_level: 1,
        verified: true,
      };
      userTableRecords.push(dummy);
    }
    if (ID.length && picked != user_id)
      referralTableRecords.push({
        id: faker.datatype.uuid(),
        commission_in_percent: 20,
        user_id: picked,
        invited_id: user_id,
      });
    profileTableRecords.push({
      profile_id,
      invite_code: nanoid(10),
      oname: faker.name.firstName(),
      lname: faker.name.lastName(),
      email,
      user_id: user_id,
      created_at: faker.date.recent(),
      updated_at: faker.date.recent(),
    });

    securityTableRecords.push({
      id: faker.datatype.uuid(),
      user_id: user_id,
      created_at: faker.date.recent(),
      updated_at: faker.date.recent(),
    });
    if (i == 5) continue;

    userTableRecords.push({
      id: user_id,
      email,
      password: faker.internet.password(),
      access_level: 1,
      created_at: faker.date.recent(),
      updated_at: faker.date.recent(),
      verified: faker.datatype.boolean(),
    });
  }

  await this.queryInterface.sequelize.transaction(
    async (t) =>
      await Promise.all([
        this.queryInterface.bulkInsert(
          tableNames?.USER || "tbl_users",
          userTableRecords,
          {
            transaction: t,
          }
        ),
        this.queryInterface.bulkInsert(
          tableNames?.PROFILE || "tbl_user_profiles",
          profileTableRecords,
          { transaction: t }
        ),
        this.queryInterface.bulkInsert(
          tableNames?.SECURITY || "tbl_user_securities",
          securityTableRecords,
          { transaction: t }
        ),
        this.queryInterface.bulkInsert(
          tableNames?.REFERRAL || "tbl_referrals",
          referralTableRecords,
          { transaction: t }
        ),
      ])
  );
}

module.exports = UsersSeeder;
