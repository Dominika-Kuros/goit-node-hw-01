const fs = require("fs");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

function listContacts() {
  const data = fs.readFile(contactsPath);
  return JSON.parse(data);
}

function getContactById(contactId: string) {
  const contacts = listContacts();
  return contacts.find((contact: Contact) => contact.id === contactId);
}

function removeContact(contactId: string) {
  const contacts = listContacts();
  const deleteContact = contacts.filter(
    (contact: Contact) => contact.id !== contactId
  );
  fs.writeFileSync(contactsPath, JSON.stringify(deleteContact, null, 2));
}

function addContact(contact: Contact) {
  const contacts = listContacts();
  const newContact = {
    id: nanoid(),
    contact,
  };
  contacts.push(newContact);
  fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
