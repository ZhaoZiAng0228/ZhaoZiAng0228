"use strict";
module.exports = (app) => {
  return function* (next) {
    // this.socket.emit("res", this.packet[1]);
    // console.log("packet------:", this.packet[1]);
    // console.log(next);
    yield* next;
  };
};
