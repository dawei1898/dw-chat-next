import {Snowflake} from 'snowflake-uid';

// 创建实例
export const snowflake = new Snowflake({
    epoch: 1735689600000, // 自定义纪元开始时间 (2025-01-01)
    workerId: 1,    // 工作进程 ID
    processId: 1,   // 数据中心 ID
    toString: false,
});
