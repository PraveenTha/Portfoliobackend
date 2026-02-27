const Hero = require("../models/Hero");

exports.getHero = async (req, res) => {
  const hero = await Hero.findOne();
  res.json(hero);
};

exports.updateHero = async (req, res) => {
  const { heading, subheading, description } = req.body;

  let hero = await Hero.findOne();

  if (!hero) {
    hero = new Hero({});
  }

  hero.heading = heading;
  hero.subheading = subheading;
  hero.description = description;

  if (req.files?.image) {
    hero.image = req.files.image[0].path;
  }

  if (req.files?.resume) {
    hero.resume = req.files.resume[0].path;
  }

  await hero.save();
  res.json(hero);
};
