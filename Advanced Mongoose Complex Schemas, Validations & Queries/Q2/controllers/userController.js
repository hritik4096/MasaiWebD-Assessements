const User = require('../models/User');

exports.addUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

exports.addProfile = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.profiles.push(req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const { profile } = req.query;
    const users = await User.find(profile
      ? { 'profiles.profileName': profile }
      : {});
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.search = async (req, res, next) => {
  try {
    const { name, profile } = req.query;
    const user = await User.findOne({ name });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const matchedProfile = user.profiles.find(p => p.profileName === profile);
    if (matchedProfile) return res.json(matchedProfile);

    res.json({ message: 'User found, but profile not found', user });
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { userId, profileName } = req.params;
    const { url } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const profile = user.profiles.find(p => p.profileName === profileName);
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    profile.url = url;
    await user.save();
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.deleteProfile = async (req, res, next) => {
  try {
    const { userId, profileName } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.profiles = user.profiles.filter(p => p.profileName !== profileName);
    await user.save();
    res.json({ message: 'Profile deleted', user });
  } catch (err) {
    next(err);
  }
};

