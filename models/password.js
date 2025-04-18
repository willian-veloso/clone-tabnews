import bcryptjs from "bcryptjs";
require("dotenv").config();

async function hash(password) {
  const rounds = getNumberOfRounds();
  const passwordWithPepper = addPepper(password);
  return await bcryptjs.hash(passwordWithPepper, rounds);
}

function getNumberOfRounds() {
  return process.env.NODE_ENV === "production" ? 14 : 1;
}

function addPepper(password) {
  const pepper = process.env.POSTGRES_PASSWORD_PEPPER || "";
  return password + pepper;
}

async function compare(providedPassword, storedPassword) {
  const passwordWithPepper = addPepper(providedPassword);
  return await bcryptjs.compare(passwordWithPepper, storedPassword);
}

const password = {
  hash,
  compare,
};

export default password;
