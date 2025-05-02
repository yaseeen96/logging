import { createLogger, format, transports } from "winston";
import winston from "winston";

let alignColorsAndTime = winston.format.combine(
  winston.format.colorize({
    all: true,
  }),
  winston.format.label({
    label: "LOGS",
  }),
  winston.format.timestamp({
    format: "YY-MM-DD HH:MM:SS",
  }),
  winston.format.printf(
    (info) =>
      ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`
  )
);

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: "TODO API" },
  transports: [
    //
    // - Write to all logs with level `info` and below to `quick-start-combined.log`.
    // - Write all logs error (and below) to `quick-start-error.log`.
    //
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/debug.log", level: "debug" }),
    new winston.transports.Console({
      format: alignColorsAndTime,
    }),
  ],
});

export default logger;
