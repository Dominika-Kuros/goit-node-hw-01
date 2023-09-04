const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  const data = fs.readFileSync(contactsPath);
  return JSON.parse(data);
}

function getContactsById(contactId) {
  const contacts = listContacts();
  return contacts.find((contact) => contact.id === contactId);
}

function removeContact(contactId) {
  const contacts = listContacts();
  const deleteContact = contacts.filter((contact) => contact.id !== contactId);
  fs.writeFileSync(contactsPath, JSON.stringify(deleteContact));
}

function addContact(name, email, phone) {
  const contacts = listContacts();
  const newContact = {
    id: uuid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}
module.exports = {
  listContacts,
  getContactsById,
  removeContact,
  addContact,
};
