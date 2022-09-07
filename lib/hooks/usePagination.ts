import { useMemo } from "react";
const CONST_BUTTON_COUNT = 3;
const CONST_ARROW_COUNT = 2;
export const ELLIPSIS = `...`;
const CONTENT_PER_PAGE = 5;


interface TPaginationHook {
    maxRecord: number
    currentPage: number
    siblingCount: 1|2|3|4|5
}

function Range(start:number, end:number) {
    const length = end - start + 1;
    return Array.from({length:length}, (_, index) => index + start);
}

export default function usePagination(props:TPaginationHook) {
    const { maxRecord, currentPage, siblingCount } = props;

    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(maxRecord/CONTENT_PER_PAGE);

        // Constant buttons (first, current, last) + 2 (< & >) + Sibling (on each side)
        const totalPageNumbers = CONST_BUTTON_COUNT + CONST_ARROW_COUNT + siblingCount

        /** Case: [1,2,3,4] 
         *  If we have less pages to show, taking account of the total pages we have
         *  and the siblings we have set.
         */ 
        if (totalPageNumbers >= maxRecord) {
            return Range(1, maxRecord);
        }

        const firstIndex = 1
        const lastIndex  = totalPageCount
        const leftIndex  = Math.max(currentPage - siblingCount, 1);
        const rightIndex = Math.min(currentPage + siblingCount, totalPageCount)

        const hasLeftExtra  = leftIndex > 2
        const hasRightExtra = rightIndex <= totalPageCount - 2
        const offset        = CONST_BUTTON_COUNT + CONST_ARROW_COUNT * siblingCount


        // Case: (1) {2 3} {4} {5 6} [>] (10)
        if (!hasLeftExtra && hasRightExtra) {
            const extraPages = Range(1, leftIndex);
            return [...extraPages, ELLIPSIS, totalPageCount]
        }

        // Case: (1) [<] {5 6} {7} {8 9} (10)
        if(hasLeftExtra && !hasRightExtra) {
            const extraPages = Range(totalPageCount-rightIndex+1, totalPageCount)
            return [firstIndex, ELLIPSIS, ...extraPages]
        }

        // Case: (1) [<] {4 5} [6] {7 8} [>] (10)
        if (hasLeftExtra && hasRightExtra) {
            const middleRange = Range(leftIndex, rightIndex);
            return [firstIndex, ELLIPSIS, middleRange, ELLIPSIS, lastIndex]
        }
    }, [maxRecord, currentPage, siblingCount])
    return paginationRange;
}