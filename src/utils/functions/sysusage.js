"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sysusage = void 0;
const os_1 = __importDefault(require("os"));
const util_1 = __importDefault(require("util"));
const child_process_1 = require("child_process");
const execPromisify = util_1.default.promisify(child_process_1.exec);
const sysusage = {
    cpu: async () => {
        const platform = os_1.default.platform();
        const load = os_1.default.loadavg();
        const strLoad = `[${load[0].toFixed(2)}, ${load[1].toFixed(2)}, ${load[2].toFixed(2)}]`;
        let cpuPercent = '0%';
        if (platform === 'win32') {
            try {
                const { stdout, stderr } = await execPromisify('wmic cpu get LoadPercentage');
                if (stderr) {
                    throw new Error(stderr);
                }
                const loadArr = stdout.split('\r\r\n').filter((item) => !isNaN(parseInt(item)));
                const totalLoad = loadArr.reduce((acc, load) => acc + parseInt(load), 0);
                const avgLoad = Math.round(totalLoad / loadArr.length);
                cpuPercent = avgLoad + '%';
            }
            catch (error) {
                console.error('Error getting CPU load:', error);
            }
        }
        else {
            cpuPercent = await getCpuPercentage() + '%';
        }
        console.log(`CPU: ${cpuPercent}  ${strLoad}`);
        return {
            percent: cpuPercent,
            detail: strLoad
        };
    },
    ram: () => {
        const totalRam = os_1.default.totalmem();
        const usedRam = process.memoryUsage().rss;
        const usedRatio = ((usedRam / totalRam * 10000) / 100).toFixed(1);
        const totalMb = (totalRam / (1024 * 1024)).toFixed(0);
        const usedMb = (usedRam / (1024 * 1024)).toFixed(0);
        console.log(`Ram: ${usedRatio}%  (${usedMb} / ${totalMb} MB)`);
        return {
            percent: `${usedRatio}%`,
            detail: `(${usedMb} / ${totalMb} MB)`
        };
    },
    heap: () => {
        const totalHeap = process.memoryUsage().heapTotal;
        const usedHeap = process.memoryUsage().heapUsed;
        const usedRatio = ((usedHeap / totalHeap * 10000) / 100).toFixed(1);
        const totalMb = (totalHeap / (1024 * 1024)).toFixed(0);
        const usedMb = (usedHeap / (1024 * 1024)).toFixed(0);
        console.log(`Heap: ${usedRatio}%  (${usedMb} / ${totalMb} MB)`);
        return {
            percent: `${usedRatio}%`,
            detail: `(${usedMb} / ${totalMb} MB)`
        };
    }
};
exports.sysusage = sysusage;
const getCpuLoad = () => {
    const cpus = os_1.default.cpus();
    let totalIdle = 0, totalTick = 0;
    cpus.forEach(cpu => {
        for (let type in cpu.times) {
            totalTick += cpu.times[type];
        }
        totalIdle += cpu.times.idle;
    });
    return {
        idle: totalIdle / cpus.length,
        total: totalTick / cpus.length
    };
};
const getCpuPercentage = () => {
    const firstLoad = getCpuLoad();
    return new Promise(resolve => {
        setTimeout(() => {
            const secondLoad = getCpuLoad();
            const idleDiff = secondLoad.idle - firstLoad.idle;
            const totalDiff = secondLoad.total - firstLoad.total;
            const avgLoad = 100 - ~~(100 * idleDiff / totalDiff);
            resolve(avgLoad);
        }, 1000);
    });
};
