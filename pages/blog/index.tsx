import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import gql from "graphql-tag";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { createContext, ReactNode, Suspense, useEffect, useState } from "react";
import BlogCard from "../../components/BlogCard";
import Container from "../../components/Container";
import { useBlogs } from "../../lib/hooks/useBlogs"
import Link from 'next/link';   
import usePagination from "../../lib/hooks/usePagination";
import Pagination from "../../components/Pagination";
import Loader from "../../components/Loader";
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
                title, 
                publishedDate, 
                slug {
                    current
                }, 
                tag, 
                cover {
                    asset {
                        url
                    }
                },
                excerpt
            }
        }
    `;
    const variables = {
        totalOffset:totalOffset,
    }
    return async () => await request(endpoint, GET_POSTS, variables)
}

function fetchAllBlogs() {
    const endpoint = process.env.NEXT_PUBLIC_SANITY_GRAPHQL_API || ""
    const GET_POSTS = gql`
    query AllPages {
        allPage {
            slug {
                current
            }
        }
    }
    `;
    const res = async () => request(endpoint, GET_POSTS);
    return res;
}

export async function getServerSideProps(ctx: Context) {
    let page = 0;
    if (ctx.query?.page) {
        const pageQuery = ctx.query.page
        const pageParams = Array.isArray(pageQuery) ? parseInt(pageQuery[0]) : parseInt(pageQuery)
        page = pageParams
    }
    const queryClient = new QueryClient()
    let isError = false;
    let errorMessage = "";
    const res = fetchBlogs(page)
    const resCount = fetchAllBlogs()
    try {
        await queryClient.fetchQuery(['blogs'], res)
        await queryClient.fetchQuery(['blogs','count'], resCount)
    } catch(err) {
        errorMessage = err! ? JSON.stringify(err) : "";
        isError = true
    }
    return {
        props: {
            errorMsg:errorMessage,
            isError,
            dehydratedState: dehydrate(queryClient),
        },
    }
}


export default function BlogCatalog({errorMsg, isError}:BlogProps) {
    const router = useRouter();
    const [pageParams, setPageParams] = useState(Array.isArray(router.query.page!) ? router.query.page[0] : router.query.page)
    const resCount = fetchAllBlogs()
    const [page, setPage] = useState(parseInt(pageParams!) || 1);
    const { status, data, error, isFetching, isLoading, refetch } = useBlogs(page)
    const { data: countData } = useQuery(['blogs', 'count'], resCount); // countData.allPage.length
    const maxRecord = countData.allPage.length as number
    useEffect(() => {
        setPageParams(Array.isArray(router.query.page!) ? router.query.page[0] : router.query.page)
        setPage(pageParams !== undefined ? parseInt(pageParams!) : 1)
        refetch()
    }, [router.query,router.isReady, pageParams, refetch])

    return (
        <>
            <Container>
                <div className="md:h-[44rem] container flex flex-col min-w-lg max-w-2xl mx-auto mb-16">
                    <h1 className="uppercase tracking-tighter drop-shadow-nier text-6xl mb-4">Blog</h1>
                    <Suspense fallback={<Loader/>}>
                        <div className="flex flex-row w-full grow">
                            <div className="hidden md:flex flex-row space-x-2 h-full mr-2">
                                <div className="w-3 h-full bg-black"></div>
                                <div className="w-1 h-full bg-black"></div>
                            </div>
                            <div className="flex flex-col grow space-y-4 md:space-y-1">
                                {data?.allPage.map((page:any, key:number) => (
                                    <BlogCard {...page} key={page.slug.current}/>
                                ))
                                }
                            </div>
                        </div>
                        <Pagination
                            maxRecord={maxRecord}
                            currentPage={page}
                            siblingCount={3}
                            redirect="/blog"
                        />
                    </Suspense>
                </div>
            </Container>
        </>
    )
}
 

