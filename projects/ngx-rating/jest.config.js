const { defaults } = require('jest-config');

module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['projects/ngx-rating/src/**/*.ts'],
};
