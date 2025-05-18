const User = require('../models/User');
const Address = require('../models/Address');

// Create user
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Add address to user
exports.addAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    const address = await Address.create(req.body);
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { addresses: address._id } },
      { new: true }
    );
    res.status(201).json({ user, address });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get user with addresses
exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('addresses');
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Summary of users and addresses
exports.getSummary = async (req, res) => {
  try {
    const users = await User.find().populate('addresses');
    const totalUsers = users.length;
    const totalAddresses = users.reduce((acc, user) => acc + user.addresses.length, 0);
    const userList = users.map(user => ({
      name: user.name,
      addressCount: user.addresses.length
    }));

    res.json({ totalUsers, totalAddresses, userList });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete address from user
exports.deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    await User.findByIdAndUpdate(userId, {
      $pull: { addresses: addressId }
    });

    await Address.findByIdAndDelete(addressId);

    res.json({ message: 'Address removed successfully.' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
