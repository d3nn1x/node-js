const fs = require('fs/promises');

const path = require('path');
const contactsPath = path.join(__dirname, '/contacts.json');
const { v4: uuidv4 } = require('uuid');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
};

const getContactById = async contactId => {
  try {
    const contacts = await listContacts();
    const contact =
      contacts.find(({ id }) => id.toString() === contactId) ||
      `Contact ID${contactId} not found`;
    return contact;
  } catch (error) {
    throw error;
  }
};

const removeContact = async contactId => {
  try {
    const deletedContact = getContactById(contactId);
    if (!deletedContact) return;

    const contacts = await listContacts();
    const filteredContacts = contacts.filter(contact => {
      return contact.id !== contactId;
    });
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null));
    return deletedContact;
  } catch (error) {
    throw error;
  }
};

const addContact = async body => {
  try {
    const contacts = await listContacts();
    const newContact = { id: uuidv4(), ...body };
    const contactsArray = [...contacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(contactsArray, null));
    return newContact;
  } catch (error) {
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(({ id }) => id.toString() === contactId);
    if (index === -1) return;
    contacts[index] = { ...contacts[index], ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null));
    return contacts[index];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
