const { readData, writeData } = require('../models/ticketModel');

function getAllTickets(req, res) {
  const data = readData();
  res.status(200).json(data);
}

function getTicketById(req, res) {
  const { id } = req.params;
  const data = readData();
  const ticket = data.find(t => t.id == id);
  if (ticket) res.status(200).json(ticket);
  else res.status(404).json({ error: "Ticket not found" });
}

function createTicket(req, res) {
  const data = readData();
  const newTicket = { ...req.body, id: Date.now(), status: "pending" };
  data.push(newTicket);
  writeData(data);
  res.status(201).json(newTicket);
}

function updateTicket(req, res) {
  const { id } = req.params;
  const data = readData();
  const index = data.findIndex(t => t.id == id);
  if (index !== -1) {
    data[index] = { ...data[index], ...req.body };
    writeData(data);
    res.status(200).json(data[index]);
  } else res.status(404).json({ error: "Ticket not found" });
}

function deleteTicket(req, res) {
  const { id } = req.params;
  let data = readData();
  const index = data.findIndex(t => t.id == id);
  if (index !== -1) {
    const deleted = data.splice(index, 1);
    writeData(data);
    res.status(200).json(deleted[0]);
  } else res.status(404).json({ error: "Ticket not found" });
}

function resolveTicket(req, res) {
  const { id } = req.params;
  const data = readData();
  const index = data.findIndex(t => t.id == id);
  if (index !== -1) {
    data[index].status = "resolved";
    writeData(data);
    res.status(200).json(data[index]);
  } else res.status(404).json({ error: "Ticket not found" });
}

module.exports = { getAllTickets, getTicketById, createTicket, updateTicket, deleteTicket, resolveTicket };