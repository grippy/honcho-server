var options = {
	site: 'domain.com',
  timezone: -7,
  crawlers: [
    new RegExp(/(googlebot(?:-mobile)?)|facebookexternalhit|Yahoo! Slurp|msnbot|Baiduspider|bingbot|YandexBot|MLBot/i)
  ]
};

module.exports = require('honcho').init(options);