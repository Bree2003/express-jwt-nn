import { Sequelize } from "sequelize";

// database connection
export const sequelize = new Sequelize("example", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

export const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await sequelize.sync();
    console.log("database synchornized");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
