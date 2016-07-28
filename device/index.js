var fs = require('fs');
var Client = require('azure-iot-device').Client;
var Protocol = require('azure-iot-device-amqp').Amqp;
var Message = require('azure-iot-device').Message;

var x509ConnStr = '<DEVICE CONNECTION STRING>';

var client = Client.fromConnectionString(x509ConnStr, Protocol);

var options = {
  cert: fs.readFileSync('cert.pem'),
  key: fs.readFileSync('key.pem'),
  passphrase: undefined
};

client.setOptions(options);
client.open(function(err) {
  if (err) {
    console.error('Error opening the connection: ' + err.message);
  } else {

    client.on('message', function(msg){
      console.log('Message Received: ');
      console.log(msg.getData().toString());
      client.complete(msg, function(err) {
        if (err) {
          console.error('Error completing the message: ' + err.message);
        } else {
          console.log('Message Completed.');
        }
      });
    });

    setInterval(function() {
      console.log('Sending message');
      var msg = new Message('the quick brown fox jumps over the lazy grandma...');
      client.sendEvent(msg, function(err, result) {
        if (err) {
          console.error('Error sending the message: ' + err.message);
        } else {
          console.log(result.constructor.name);
        }
      });
    }, 2000);
  }
});
