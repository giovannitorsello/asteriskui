var amilib = require("ami-io");
var logger = require("./logger.js").logger;



var amisrv = amilib.createClient({ host: '127.0.0.1', port: '5038', login: 'admin', password: 'admin', encoding: 'ascii' });
amisrv.useLogger(logger);


amisrv.on('incorrectServer', function () {
    amisrv.logger.error("Invalid AMI welcome message. Are you sure if this is AMI?");
    process.exit();
});
amisrv.on('connectionRefused', function () {
    amisrv.logger.error("Connection refused.");
    process.exit();
});
amisrv.on('incorrectLogin', function () {
    amisrv.logger.error("Incorrect login or password.");
    process.exit();
});
amisrv.on('event', function (event) {
    amisrv.logger.info('event:', event);
});
amisrv.connect();
amisrv.on('connected', function () {

    sendAction();

    setTimeout(function () {
        amisrv.disconnect();
        amisrv.on('disconnected', process.exit());
    }, 30000);
});

function sendAction() {
    var action = new amilib.Action.ShowDialPlan();
    amisrv.send(action, function (err, data) {
        if (err) {
            console.log(err);
        }
        console.log(data);
    });
}