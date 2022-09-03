import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import gql from "graphql-tag";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { createContext, ReactNode, Suspense, useEffect, useState } from "react";
import Container from "../../components/Container";
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

interface TBadge {
    color?: string
    children: ReactNode
}

function Badge(props:TBadge) {
    return (
        <p className="px-1 leading-none text-xs uppercase text-bold bg-blue-400 w-fit h-fit p-0.5">{props.children}</p>
    )
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
            <Container>
                <div className="h-[32rem] container flex flex-col min-w-lg max-w-2xl mx-auto mb-16">
                    <h1 className="uppercase tracking-tighter drop-shadow-nier text-6xl mb-4">Blog</h1>
                    <Suspense>
                        <div className="flex flex-row w-full grow">
                            <div className="hidden md:flex flex-row space-x-2 h-full mr-2">
                                <div className="w-3 h-full bg-black"></div>
                                <div className="w-1 h-full bg-black"></div>
                            </div>
                            <div className="flex flex-col grow">
                                <div className="flex flex-row w-full group bg-yellow-400">
                                    <div className="hidden md:block w-[276px] h-[158px] bg-fuchsia-500 sepia group-hover:sepia-0 transition-all"></div>
                                    <div className="flex flex-col bg-yellow-800/0 w-full pb-2.5 group-hover:bg-yellow-800/50 transition-colors">
                                        <div className="flex flex-row justify-between w-full bg-purple-300 px-1.5 py-0.5 group-hover:bg-green-400 transition-colors">
                                            <div className="flex flex-row shrink w-11/12">
                                                <div className="h-3 w-3 md:h-4 md:w-4 bg-green-400 self-center mr-2 group-hover:bg-purple-300 transition-colors"></div>
                                                <p className="w-full break-all line-clamp-1">Title asdasdasdasdasdasasasasasasada</p>
                                            </div>
                                            <p className="hidden md:block">Date</p>
                                        </div>
                                        <div className="flex flex-col mt-2 ml-4 ">
                                            <Badge>WEB DEVELOPMENT</Badge>
                                            <p className="block md:hidden mr-2 text-xs">03/08/2022</p>
                                        </div>
                                        <p className="ml-4 line-clamp-3 mr-2 text-sm group-hover:text-white transition-colors tracking-tighter">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc mollis maximus felis at congue. Aenean condimentum, neque non pellentesque porttitor, massa mi bibendum velit, eget volutpat sem libero eu magna. Ut ante nibh, pulvinar non faucibus in, vestibulum sagittis augue. Aliquam pulvinar cursus orci, vulputate hendrerit urna sagittis id. Integer consequat et dolor sit amet porttitor. Quisque mattis, ligula id sollicitudin venenatis, purus dolor interdum purus, a placerat quam leo eget mauris. Curabitur in eleifend arcu, ut pharetra sem. Curabitur feugiat, velit id suscipit finibus, ante libero aliquam eros, </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* {data.allPage.map((page:any, key:number) => (<p key={key}>{page.slug.current}</p>))} */}
                    </Suspense>
                </div>
            </Container>
        </>
    )
}
 

