var Registry = require('azure-iothub').Registry;

var connectionString = '<IOTHUB CONNECTION STRING>';
var device = {
  deviceId: '<DEVICE ID>',
  status: 'enabled',
  authentication: {
    x509Thumbprint: {
      primaryThumbprint: '<CERTIFICATE THUMBPRINT>'
    }
  }
};

var registry = Registry.fromConnectionString(connectionString);

registry.create(device, function(err) {
  if (err) {
    console.error('Error creating the device: ' + err.message);
  } else {
    console.log(device.deviceId + ' was successfully added to the device registry.');
  }
});