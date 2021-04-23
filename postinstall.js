const fs = require('fs');

const ENV = {
  /** Parse an envfile string */
  parse(src) {
    // Try parse envfile string
    const result = {};
    const lines = src.toString().split('\n');
    // eslint-disable-next-line no-restricted-syntax
    for (const line of lines) {
      const match = line.match(/^([^=:#]+?)[=:](.*)/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim();
        result[key] = value;
      }
    }
    return result;
  },

  /** Turn an object into an envfile string */
  stringify(obj) {
    // Prepare
    let result = '';

    // Stringify
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(obj)) {
      if (key) {
        const line = `${key}=${String(value)}`;
        result += `${line}\n`;
      }
    }

    // Return
    return result;
  },
};

const defaultEnv = ENV.parse(fs.readFileSync('.env.sample', 'utf8'));

const envJson = fs.existsSync(`${__dirname}/.env`)
  ? ENV.parse(fs.readFileSync('.env', 'utf8'))
  : {};

fs.writeFileSync('.env', ENV.stringify({ ...defaultEnv, ...envJson }, null, 2));
