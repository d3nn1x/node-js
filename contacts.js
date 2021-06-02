const { v4 } = require("uuid");
const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const file = await fs.readFile(contactsPath);
    const data = JSON.parse(file);
    return data;
  } catch (error) {
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const data = await listContacts();
    return data.find((el) => el.id === contactId);
  } catch (error) {
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const data = await listContacts();
    const newData = data.filter((el) => el.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newData));
  } catch (error) {
    throw error;
  }
}

async function addContact(name, email, phone) {
  const id = v4();

  try {
    const data = await listContacts();
    await fs.writeFile(contactsPath, JSON.stringify([...data, { id, name, email, phone }]));
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
