const winston = require('winston');
const { format } =  require('winston')
const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.json()
    ),

  
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({ filename: 'programlogs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'programlogs/combined.log'})
  ],
});

module.exports = logger