const sequelize = require('../config/connection');
const { User, BlogPost, Comments } = require('../models');

const userData = require('./userData.json');
const blogpostData = require('./blogpostData.json');
const commentData = require('./commentsData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blogpost of blogpostData) {
    await BlogPost.create({
      ...blogpost,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  const comments = await Comments.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });
    for (const comment of comments) {
        await Comments.create({
        ...comment,
        user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }
  process.exit(0);
};

seedDatabase();
