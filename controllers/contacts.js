const { Contact } = require("../models/contact");

const HttpError = require("../helpers/HttpError");
const ctrlWrapper = require("../helpers/ctrlWrapper");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const filter = favorite === undefined ? { owner } : { owner, favorite };

  const allContacts = await Contact.find(filter, "-createdAt -updatedAt", { skip, limit });
  res.status(200).json(allContacts);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contactById = await Contact.findById(contactId, "-createdAt -updatedAt");
  if (!contactById) {
    throw HttpError(404);
  }
  res.status(200).json(contactById);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const updateContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updateContact) throw HttpError(404);

  res.status(200).json(updateContact);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const updateContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updateContact) throw HttpError(404);

  res.status(200).json(updateContact);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const deleteContact = await Contact.findByIdAndDelete(contactId);
  if (!deleteContact) throw HttpError(404);
  res.status(200).json({ message: "Contact was deleted" });
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  removeContact: ctrlWrapper(removeContact),
};
