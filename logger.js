var winston = require("winston");

const winstonLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log` 
      // - Write all logs error (and below) to `error.log`.
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' })
    ]
  });
  
  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  // 
  //if (process.env.NODE_ENV !== 'production') {
    winstonLogger.add(new winston.transports.Console({
      format: winston.format.simple()
    }));
  //}



exports.logger= {
    trace: function(data) {
      console.log(data);},
    debug: function(strlog,data) {
      console.log(data);},
    info:  function(strlog,data) {
      console.log(strlog,data);},
    warn:  function(strlog,data) {
      console.log(data);},
    error: function(strlog,data) {
      console.log(data);},
    fatal: function(strlog,data) {
      console.log(data);}
}