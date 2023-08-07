"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOSVersion = void 0;
const os_1 = __importDefault(require("os"));
const child_process_1 = require("child_process");
const getOSVersion = () => {
    return new Promise((resolve, reject) => {
        const platform = process.platform;
        if (platform === "win32") {
            resolve(os_1.default.version());
        }
        else if (platform === "linux" || platform === "freebsd") {
            (0, child_process_1.exec)('cat /etc/*release | grep -E ^PRETTY_NAME', (error, stdout, stderr) => {
                if (error) {
                    resolve(os_1.default.type());
                }
                else {
                    const os_version = stdout.split('"')[1];
                    resolve(os_version);
                }
            });
        }
        else if (platform === "darwin") {
            (0, child_process_1.exec)('system_profiler SPSoftwareDataType', (error, stdout, stderr) => {
                if (error) {
                    resolve(os_1.default.type());
                }
                else {
                    const os_version = (stdout.match(/System Version: (.+)\n/)?.[1]) ?? os_1.default.type();
                    resolve(os_version);
                }
            });
        }
        else {
            resolve(os_1.default.type());
        }
    });
};
exports.getOSVersion = getOSVersion;
