const fs = require('fs');

fs.writeFileSync(
  'web-build/index.html',
  fs
    .readFileSync('web-build/index.html', 'utf8')
    .split(['src="/'])
    .join('src="/anchor-usd-app/')
    .split(['href="/'])
    .join('href="/anchor-usd-app/')
);

fs.writeFileSync(
  'package.json',
  fs
    .readFileSync('package.json', 'utf8')
    .split(['"homepage": "/"'])
    .join('"homepage": "http://tonyhhart.github.io/anchor-usd-app"')
);
