/** Port that the server will run on -> default is 443 for all HTTPS connections */
module.exports.PORT = 3000;

/** URL path to which vendor files can be accessed from */
module.exports.BUILD_URL = `http://localhost:${module.exports.PORT}/assets/`;

/** Path in the local file system to which the vendor files will be emitted */
module.exports.BUILD_OUTPUT_PATH = ['build'];

/** Path in the local file system to the client-side React root */
module.exports.REACT_ENTRY_PATH = ['src', 'index.tsx'];

/** Filename of the vendor bundle on local system */
module.exports.VENDOR_BUNDLE_FILENAME = 'vendor.bundle.js';

/** Path in the local file system to the vendor DLL JSON file */
module.exports.VENDOR_JSON_PATH = ['build', 'vendor.json'];

/** Path in the local file system to the vendor DLL javascript file */
module.exports.VENDOR_BUNDLE_PATH = ['build', module.exports.VENDOR_BUNDLE_FILENAME];

/** Array of vendors to bundle in DLL */
module.exports.vendors = [
  'antd',
  'axios',
  'core-js',
  'immer',
  'moment',
  'react',
  'react-dom',
  'react-router-dom',
  'react-redux',
  'redux',
  'redux-thunk',
];
