import {snowflake} from "@/utils/snowflake";

// 生成 ID
const id = snowflake.generate();
console.log('Snowflake:', id); // 输出: 一个大整数 ID
