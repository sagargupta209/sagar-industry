const mongoose = require('mongoose');

const uri = process.argv[2];
if (!uri) {
  console.log('Usage: node test-conn.js <uri>');
  process.exit(1);
}

console.log('Testing connection to:', uri.split('@')[1]);

const opts = {
  serverSelectionTimeoutMS: 5000,
  family: 4
};

mongoose.connect(uri, opts)
  .then(() => {
    console.log('SUCCESS: Connected to MongoDB');
    process.exit(0);
  })
  .catch(err => {
    console.error('FAILED:', err.name, err.message);
    if (err.reason) {
      console.error('REASON:', JSON.stringify(err.reason, null, 2));
    }
    process.exit(1);
  });
