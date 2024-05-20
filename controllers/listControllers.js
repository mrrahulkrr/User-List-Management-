const List = require('../models/listModel');
const User = require('../models/userModel');
const csv = require('csv-parser');
const fs = require('fs');
const { sendEmails } = require('../utils/emailUtils');

// Create a new list
const createList = async (req, res) => {
  try {
    const { title, customProperties } = req.body;
    const list = new List({ title, customProperties });
    await list.save();
    res.status(201).json(list);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add users to list via CSV
const addUsersToList = async (req, res) => {
  const { listId } = req.params;
  const filePath = req.file.path;
  const errors = [];
  let successCount = 0;

  try {
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    const customPropertiesMap = list.customProperties.reduce((acc, prop) => {
      acc[prop.title] = prop.fallback;
      return acc;
    }, {});

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', async (row) => {
        try {
          const customProperties = {};
          Object.keys(customPropertiesMap).forEach((prop) => {
            customProperties[prop] = row[prop] || customPropertiesMap[prop];
          });

          const user = new User({
            name: row.name,
            email: row.email,
            customProperties,
          });

          await user.save();
          list.users.push(user._id);
          successCount++;
        } catch (error) {
          errors.push({ row, error: error.message });
        }
      })
      .on('end', async () => {
        await list.save();
        fs.unlinkSync(filePath);
        res.json({
          successCount,
          errorCount: errors.length,
          errors,
          totalUsers: list.users.length,
        });
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Send email to users in list
const sendEmailToList = async (req, res) => {
  const { listId } = req.params;
  const { subject, body } = req.body;

  try {
    const list = await List.findById(listId).populate('users');
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    const users = list.users.filter(user => !user.unsubscribed);
    const emails = users.map(user => ({
      to: user.email,
      subject,
      html: body.replace(/\[([^\]]+)\]/g, (_, prop) => user.customProperties.get(prop) || '')
    }));

    sendEmails(emails);
    res.json({ message: 'Emails sent', count: emails.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Unsubscribe user
const unsubscribeUser = async (req, res) => {
  const { listId, userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.unsubscribed = true;
    await user.save();

    res.json({ message: 'User unsubscribed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createList,
  addUsersToList,
  sendEmailToList,
  unsubscribeUser,
};
