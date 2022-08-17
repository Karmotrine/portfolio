import { dehydrate, QueryClient } from "@tanstack/react-query"
import request from "graphql-request"
import gql from "graphql-tag"
import { useBlog } from "../../lib/hooks/useBlog"
import { MDXRemote } from "next-mdx-remote"
import { serialize } from 'next-mdx-remote/serialize'
import Test from "../../components/Test"

const mdComponents = { Test }

async function fetchAllBlogs() {
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
    const res = await request(endpoint, GET_POSTS);
    return res;
}

async function fetchBlog(slug:string) {
    const endpoint = process.env.NEXT_PUBLIC_SANITY_GRAPHQL_API || ""
    const GET_POST = gql`
        query($thisSlug: String!) {
            allPage(where: { slug: {current: { eq: $thisSlug } }}) {
                title
                content
                publishedDate
            }
        }
    `
    const variables = {
        thisSlug:slug,
    }
    const res = await request(endpoint, GET_POST, variables)
    return res
}

export async function getStaticPaths() {
    const res = await fetchAllBlogs();
    return {
        paths: res.allPage.map((item:any) => ({params: {slug: item.slug.current}})),
        fallback: 'blocking'
    }
}

export async function getStaticProps(ctx:any) {
    const slug = Array.isArray(ctx.params.slug) ? ctx.params.slug[0] : ctx.params.slug;
    const queryClient = new QueryClient()
    const res = await fetchBlog(slug!)
    const data = {...res.allPage[0], content: await serialize(res.allPage[0].content)}
    let isError = false;
    let errorMessage = "";
    try {
        await queryClient.fetchQuery(['blogs', slug], async () => (data))
    } catch (err) {
        errorMessage = err! ? JSON.stringify(err) : "";
        isError = true
    }
    return {
        props: {
            slug: slug,
            errorMsg:errorMessage,
            isError,
            dehydratedState: dehydrate(queryClient)
        }
    }
}

export default function BlogPostPage(props:any) {
    const { status, data, error, isFetching } = useBlog(props.slug);
    const body = data.content
    return (
        <>
            Test for {data.title}
            <p>Date:{new Date(data.publishedDate).toLocaleDateString()}</p>
            <MDXRemote {...body} components={mdComponents} />
        </>
    )
}

