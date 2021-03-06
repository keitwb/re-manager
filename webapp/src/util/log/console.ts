import { LogEntry, logger, LogHandler, LogLevel, LogLevelNames } from "./logger";

class ConsoleLogHandler implements LogHandler {
  // tslint:disable:no-console
  public receive(en: LogEntry) {
    if (en.severity === LogLevel.Error) {
      console.error(...en.message);
    } else {
      console.log(`[${LogLevelNames.get(en.severity)}]`, ...en.message);
    }
  }
}

logger.addHandler(new ConsoleLogHandler());
