"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async (_client, node, error) => {
    console.error(`[LavaShark] Error on node "${node.identifier}":`, error.message);
};
