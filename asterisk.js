//Import configuration
var config = require("./config.json");

//Need for Asterisk Input-Output
var amilib = require("ami-io");
var logger = require("./logger.js").logger;

//Open asterisk connection
var amisrv = amilib.createClient(config.asterisk_server);
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

amisrv.on('disconnected', function () {
    console.log("Asterisk server disconnected");
    process.exit();
});

amisrv.on('connected', function () {
    console.log("Asterisk server connected");    
});


amisrv.on('event', function (event) {
    //amisrv.logger.info('event:', event);
    if(event.event==="FullyBooted"){console.log("Connection succeffully");}
    if(event.event==="SuccessfulAuth"){console.log("Authorization allowed");}
    
    //Update peer status
    if(event.event==="PeerStatus"){
        event.peer=event.peer.replace("SIP/","");
        if(module.exports.cache.peers["'"+event.peer+"'"])
            module.exports.cache.peers["'"+event.peer+"'"].status=event.peerstatus;
    }

    //Dial cycle per call
    if(event.event==="DialState"){
        console.log("DialState: "+event.destcalleridnum+"---"+event.channel+"---"+event.channelstatedesc);
    }
    
    if(event.event==="DialBegin"){
        console.log("DialBegin: "+event.destcalleridnum+"---"+event.channel+"---"+event.channelstatedesc);
    }
    
    if(event.event==="SoftHangupRequest"){
        console.log("SoftHangupRequest: "+event.exten+"---"+event.cause);
    }

    if(event.event==="HangupRequest"){
        console.log("HangupRequest: "+event.calleridnum+"---"+event.cause);
    }
    
    if(event.event==="Hangup"){
        console.log("Hangup: "+event.exten+"---"+event.cause+"---"+event.cause_txt);
    }

    if(event.event==="NewCallerid"){
        console.log("NewCallerid: "+event.extension+"---"+event.application+"---"+event.channelstatedesc);
    }
    
    if(event.event==="NewConnectedLine"){
        console.log("NewConnectedLine: "+event.extension+"---"+event.application+"---"+event.channelstatedesc);
    }
    
    if(event.event==="Newchannel"){
        console.log("Newchannel: "+event.exten+"---"+event.channel+"---"+event.channelstatedesc);
    }

    if(event.event==="Newstate"){
        console.log("Newstate: "+event.exten+"---"+event.channel+"---"+event.channelstatedesc);
    }
    
    if(event.event==="Newexten"){
        console.log("Newexten: "+event.exten+"---"+event.channel+"---"+event.channelstatedesc);
    }
    
    if(event.event==="ChallengeSent"){

    }
    /*
    if(event.event==="VarSet"){
        if(event.Variable==="DIALSTATUS") {
            console.log(event.exten+"---"+event.value);
        }
        if(event.Variable==="DIALEDPEERNUMBER") {
            console.log(event.exten+"---"+event.value+"---"+event.channelstatedesc);
        }
        if(event.Variable==="DIALEDPEERNAME") {
            console.log(event.exten+"---"+event.value+"---"+event.channelstatedesc);
        }
        if(event.Variable==="ANSWEREDTIME") {
            console.log(event.exten+"---"+event.value+"---"+event.channelstatedesc);
        }
        if(event.Variable==="ANSWEREDTIME_MS") {
            console.log(event.exten+"---"+event.value+"---"+event.channelstatedesc);
        }
        if(event.Variable==="DIALEDTIME") {
            console.log(event.exten+"---"+event.value+"---"+event.channelstatedesc);
        }
        if(event.Variable==="RINGTIME") {
            console.log(event.exten+"---"+event.value+"---"+event.channelstatedesc);
        }
        if(event.Variable==="RINGTIME_MS") {
            console.log(event.exten+"---"+event.value+"---"+event.channelstatedesc);
        }
        if(event.Variable==="PROGRESSTIME") {
            console.log(event.exten+"---"+event.value+"---"+event.channelstatedesc);
        }
        if(event.Variable==="PROGRESSTIME_MS") {
            console.log(event.exten+"---"+event.value+"---"+event.channelstatedesc);
        }
        if(event.Variable==="SIPCALLID") {
            console.log(event.exten+"---"+event.value+"---"+event.channelstatedesc);
        }
        if(event.Variable==="SIPDOMAIN") {
            console.log(event.exten+"---"+event.value+"---"+event.channelstatedesc);
        }
        if(event.Variable==="DIALEDPEERNUMBER") {
            console.log(event.exten+"---"+event.value+"---"+event.channelstatedesc);
        }
        if(event.Variable==="DIALEDPEERNAME") {
            console.log(event.exten+"---"+event.value+"---"+event.channelstatedesc);
        }
        if(event.Variable==="DIALSTATUS") {
            console.log(event.exten+"---"+event.value+"---"+event.channelstatedesc);
        }
        if(event.Variable==="RTPAUDIOQOS") {
            console.log(event.exten+"---"+event.value+"---"+event.channelstatedesc);
        }
        if(event.Variable==="RTPAUDIOQOSBRIDGED") {
            console.log(event.exten+"---"+event.value+"---"+event.channelstatedesc);
        }
        if(event.Variable==="RTPAUDIOQOSJITTER") {
            console.log(event.exten+"---"+event.value+"---"+event.channelstatedesc);
        }
        if(event.Variable==="RTPAUDIOQOSJITTERBRIDGED") {
            console.log(event.exten+"---"+event.value+"---"+event.channelstatedesc);
        }
        if(event.Variable==="RTPAUDIOQOSLOSS") {
            console.log(event.exten+"---"+event.value+"---"+event.channelstatedesc);
        }
        if(event.Variable==="RTPAUDIOQOSLOSSBRIDGED") {
            console.log(event.exten+"---"+event.value+"---"+event.channelstatedesc);
        }
        if(event.Variable==="RTPAUDIOQOSRTT") {
            console.log(event.exten+"---"+event.value+"---"+event.channelstatedesc);
        }
        if(event.Variable==="RTPAUDIOQOSRTTBRIDGED") {
            console.log(event.exten+"---"+event.value+"---"+event.channelstatedesc);
        }

    }*/

   
});

function CacheAsterisk() {
    this.name="CacheAsterisk"
    this.peers={};
    this.calls=[];

}

module.exports = {
    cache: new CacheAsterisk(),
    connect: function(config) {
        this.config=config;
        this.amisrv=amilib.createClient(config.asterisk_server);
        amisrv.connect();
    },
    disconnect: function(){amisrv.disconnect();},
    getSipPeers: function () {
        cache=this.cache;
        var action = new amilib.Action.SipPeers;
        amisrv.send(action, function (err, data) {
            if (err) {
                console.log(err);
            }
            if(data && data.events)
            data.events.forEach(function(currentValue, index, arr){
                if(currentValue.event==="PeerEntry"){
                    delete currentValue.event;
                    delete currentValue.actionid;
                    delete currentValue.incomingData;
                    delete currentValue.variables;
                    delete currentValue.__proto__;                    
                    cache.peers["'"+currentValue.objectname+"'"]=currentValue;
                }
            })
            
        });
    }


}