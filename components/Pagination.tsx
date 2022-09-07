import usePagination, { ELLIPSIS } from "../lib/hooks/usePagination"
import NextLink from "next/link"
const CONTENT_PER_PAGE = 5;
const defaultProps = {
    currentPage: 1,
    siblingCount: 3,
}

type TPagination = {
    maxRecord: number
    currentPage: number
    siblingCount: 1|2|3|4|5
    redirect: string
} & typeof defaultProps

/**
 * @see https://stackoverflow.com/questions/40528557/how-does-array-fromlength-5-v-i-i-work
 * @see https://www.digitalocean.com/community/tutorials/how-to-build-custom-pagination-with-react
 */

// Range function = Array.from({length: totalPages}, (_, i) => i + 1)


export default function Pagination(props:TPagination) {
    const { maxRecord, currentPage, siblingCount, redirect} = props;
    const totalPageCount = Math.ceil(maxRecord/CONTENT_PER_PAGE);
    const paginationRange = usePagination({maxRecord, currentPage, siblingCount})
    const prevPage = `${currentPage-1}`
    const nextPage = `${currentPage+1}`
    return (
        <>
            <div className="flex flex-row justify-end space-x-2">
                <NextLink
                    href={{pathname: redirect, query:{page:prevPage}}}
                >
                    <a className={`${1 >= currentPage-1 ? "hidden" :"block"} cursor-not-allowed px-1 border-black border-2 py-0.5 bg-gray-700`}>
                        &lt;
                    </a>
                </NextLink>
                {paginationRange?.map((item, index) => {
                    if (item === ELLIPSIS) {
                        return(
                            <a key={`page_${index}`} className="px-1.5 border-black border-2 py-1 bg-gray-700 text-gray-250">
                                &#8230;
                            </a>
                        )
                    }
                    return (
                        <NextLink
                            key={`page_${index}`}
                            href={{pathname: redirect, query:{page:item}}}
                            
                        >
                            <a className={`px-1.5 py-1 border-black border-2 bg-gray-700 text-gray-250 ${currentPage === item && "font-bold"}`}>
                                {item}
                            </a>
                        </NextLink>
                    )
                })}
                <NextLink
                    href={{pathname: redirect, query:{page:nextPage}}}
                >
                    <a className={`${currentPage+1 > totalPageCount ? "hidden" :"block"} px-1 py-0.5 border-black border-2 bg-gray-700 text-gray-250`}>
                        &gt;
                    </a>
                </NextLink>
            </div>
        </>
    )
}