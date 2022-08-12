import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import gql from "graphql-tag";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { useBlogs } from "../../lib/hooks/useBlogs"
/**
 * @see https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#on-demand-revalidation
 */

interface BlogProps {
    errorMsg: String
    isError: boolean
}

interface Context extends NextPageContext {

}

function fetchBlogs(currentPage:number) {
    const endpoint = process.env.NEXT_PUBLIC_SANITY_GRAPHQL_API || ""
    const totalOffset = 5*currentPage
    const GET_POSTS = gql`
        query AllPages($totalOffset: Int!) {
            allPage(limit:5, offset:$totalOffset, sort:[{_createdAt: DESC}]) {
                slug {
                    current
                }
            }
        }
    `;
    const variables = {
        totalOffset:totalOffset,
    }
    return async () => await request(endpoint, GET_POSTS, variables)
}

export async function getServerSideProps(ctx: Context) {
    let page = 0;
    if (ctx.query?.page) {
        const pageQuery = ctx.query.page
        const pageParams = Array.isArray(pageQuery) ? parseInt(pageQuery[0]) : parseInt(pageQuery)
        page = pageParams - 1
    }
    console.log(`server page:${page}`)
    const queryClient = new QueryClient()
    let isError = false;
    let errorMessage = "";
    const res = fetchBlogs(page)
    try {
        await queryClient.fetchQuery(['blogs'], res)
    } catch(err) {
        errorMessage = err! ? JSON.stringify(err) : "";
        isError = true
    }
    return {
        props: {
            errorMsg:errorMessage,
            isError,
            dehydratedState: dehydrate(queryClient)
        },
    }
}

export default function BlogCatalog({errorMsg, isError}:BlogProps) {
    const router = useRouter();
    const pageParams = Array.isArray(router.query.page!) ? router.query.page[0] : router.query.page
    const [page, setPage] = useState(parseInt(pageParams!) || 0);
    const { status, data, error, isFetching, isLoading } = useBlogs(page)

    /*
    function onPageChange(e, value) {
        setPage(value)
        router.push(`blog?=page${value}`, undefined, { shallow: true })
    }
    */

    if (isLoading) 
        return <p>Loading...</p>
    if (isError) 
        return <p>Error!:{errorMsg}</p>

    return (
        <>
            {data.allPage.map((page:any, key:number) => (<p key={key}>{page.slug.current}</p>))}
        </>
    )
}
 

