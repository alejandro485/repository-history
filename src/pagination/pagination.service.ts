import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService {

    paginationCalculation(total: number, items: number, page: number) {

        if (page < 1) {
            page = 1;
        }

        if (items <= 0) {
            throw new Error('Invalid items per page');
        }

        const pageCount = Math.ceil(total / items);

        let itemsPage = items;
        const totalBudgeted = page * items;
        if (totalBudgeted > total) {
            const itemsBudgeted = pageCount * items;
            if (totalBudgeted > itemsBudgeted) {
                itemsPage = 0;
            } else {
                itemsPage = total % items;
            }
        }

        const beginPage = (page - 1) * items;
        const endPage = page * items;

        return {
            total_items: total,
            items_page: itemsPage,
            items_per_page: items,
            total_pages: pageCount,
            current_page: page,
            begin_page: beginPage,
            end_page: endPage,
        };

    }

}
