const fs = require('fs');

fs.writeFileSync(
  'web-build/index.html',
  fs
    .readFileSync('web-build/index.html', 'utf8')
    .split('src="/anchor-usd-app/')
    .join(['src="/'])
    .split('href="/anchor-usd-app/')
    .join(['href="/'])
);

fs.writeFileSync(
  'package.json',
  fs
    .readFileSync('package.json', 'utf8')
    .split('"homepage": "http://tonyhhart.github.io/anchor-usd-app"')
    .join(['"homepage": "/"'])
);
