export interface PagedQueryModel {
    term: string;
    page: number;
    limit: number;
    sortBy: string;
    isAsc: boolean;
}

export const INIT_PAGED_QUERY = {
    page: 0,
    sortBy: 'id',
    limit: 18,
    term: '',
    isAsc: true,
} as PagedQueryModel;