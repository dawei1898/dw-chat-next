
/**
 * 接口返参结构
 */
export interface ApiResponse<T = any> {
    code: number
    message: string
    data: T
}

/**
 * 分页查询参数
 */
export interface PageParam {
    pageNum?: number
    pageSize?: number
}

/**
 * 分页查询返参
 */
export interface PageResult<T = any> {
    pageNum?: number
    pageSize?: number
    pages?: number
    total: number
    list: T[]
}
