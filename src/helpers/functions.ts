import { PagedQueryModel } from "src/common/interfaces/paged-query-model.dto";

export function norimalizePagedQueryModel(queryModel: PagedQueryModel): PagedQueryModel {    
    return {
        term: queryModel?.term?.trim() || '',
        page: +queryModel.page || 1,
        limit: +queryModel.limit || 18,
        sortBy: queryModel.sortBy || 'id',
        isAsc: queryModel.isAsc
    } as PagedQueryModel;
}