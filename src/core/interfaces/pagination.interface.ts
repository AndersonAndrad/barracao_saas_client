export interface PaginationRequest {
    page: number;
    size: number;
}

export interface PaginationResponse<T> {
    total: number;
    items: T[];
}

export interface PaginationObj {
    skip: number;
    total: number;
}
