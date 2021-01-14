import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService {

    paginationCalculation(total: number, limit: number, page: number) {
        if (page < 1) {
            page = 1;
        }
        if (limit <= 0) {
            throw new Error('Invalid items per page');
        }

        const pageCount = Math.ceil(total / limit);

        let itemsPage = limit;
        const totalBudgeted = page * limit;
        if (totalBudgeted > total) {
            const itemsBudgeted = pageCount * limit;
            if (totalBudgeted > itemsBudgeted) {
                itemsPage = 0;
            } else {
                itemsPage = total % limit;
            }
        }

        const beginPage = (page - 1) * limit;
        const endPage = page * limit;

        return {
            total: total,
            items_page: itemsPage,
            limit,
            total_pages: pageCount,
            current_page: page,
            begin_items: beginPage,
            end_items: endPage,
        };

    }

}
