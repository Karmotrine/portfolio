import { dehydrate, QueryClient } from "@tanstack/react-query"
import request from "graphql-request"
import gql from "graphql-tag"
import { useBlog } from "../../lib/hooks/useBlog"
import { MDXRemote } from "next-mdx-remote"
import { serialize } from 'next-mdx-remote/serialize'
import Test from "../../components/Test"
import Container from "../../components/Container"
import { Suspense } from "react"
import Badge from "../../components/Badge"
import Image from "next/image"
import rehypePrism from 'rehype-prism-plus';
import rehypeCodeTitles from 'rehype-code-titles';

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
                excerpt,
                content
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
    const data = {
        ...res.allPage[0],
        content: await serialize(res.allPage[0].content, {
            mdxOptions: {
                rehypePlugins : [
                    rehypeCodeTitles,
                    rehypePrism
                ]
            }
        })}
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
            <Container>
                <Suspense>
                <div className="min-h-fit container flex flex-col min-w-lg max-w-2xl mx-auto mb-16">
                    <Badge>{data.tag}</Badge>
                    <h1 className="text-4xl md:text-7xl font-lato font-bold">{data.title}</h1>
                    <div className="flex flex-col md:flex-row md:space-x-8 mt-2">
                        <span className="text-md font-lato font">Yuan Ureña</span>
                        <span className="text-md font-lato">{new Date(data.publishedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="relative aspect-video w-full mb-8 mt-2">
                        <Image src={data.cover.asset.url} layout="fill" objectFit="cover" priority={true}/>
                    </div>
                    <MDXRemote {...body} components={mdComponents} />
                </div>
                </Suspense>
            </Container>
        </>
    )
}

