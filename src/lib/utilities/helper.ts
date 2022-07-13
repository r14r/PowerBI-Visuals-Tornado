"use strict";

var _debuglevel = 4;

/**/
export function set_debuglevel(level) {
  _debuglevel = level;
}

export function get_debuglevel() {
  return _debuglevel;
}

/**/
export function debug(
  level: number,
  line: string,
  data: any = null,
  mode = "log"
): void {


  var logger = {
    "log": console.log,
    "info": console.info,
    "warn": console.warn,
    "error": console.error
  }

  var log;
  if (mode in logger) {
    log = logger[mode];
  } else {
    log = console.log;
  }

  if (level <= _debuglevel) {
    if (data) {
      log(`${level}/${_debuglevel}] ${line}`, data);
    } else {
      log(`${level}/${_debuglevel}] ${line}`);
    }
  }
}
