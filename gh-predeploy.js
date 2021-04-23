const fs = require('fs');

module.exports = function () {
  fs.writeFileSync(
    'web-build/index.html',
    fs
      .readFileSync('web-build/index.html', 'utf8')
      .split(['src="/'])
      .join('src="/anchor-usd-app/')
      .split(['href="/'])
      .join('href="/anchor-usd-app/')
  );
};
