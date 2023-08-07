"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboard = void 0;
const initial_1 = require("./initial");
const update_1 = require("./update");
const destroy_1 = require("./destroy");
const dashboard = {
    initial: initial_1.initial,
    update: update_1.update,
    destroy: destroy_1.destroy
};
exports.dashboard = dashboard;
