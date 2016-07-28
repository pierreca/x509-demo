var Registry = require('azure-iothub').Registry;

var connectionString = '<IOTHUB CONNECTION STRING>';
var deviceId = '<DEVICE ID>'

var registry = Registry.fromConnectionString(connectionString);

registry.delete(deviceId, function(err) {
  if (err) {
    console.error('Error deleting the device: ' + err.constructor.name);
  } else {
    console.log(deviceId + ' was successfully removed from the device registry.');
  }
});