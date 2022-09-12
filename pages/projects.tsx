import { dehydrate, QueryClient } from "@tanstack/react-query";
import gql from "graphql-tag";
import { request } from "graphql-request";
import { NextPageContext } from "next";
import { useProjects } from "../lib/hooks/useProjects";
import Container from "../components/Container";
import ProjectCard from "../components/ProjectCard";
import { Suspense } from "react";
import Loader from "../components/Loader";

function fetchProjects() {
    const endpoint = process.env.NEXT_PUBLIC_SANITY_GRAPHQL_API || ""
    const GET_PROJECTS = gql`
        query AllProjects {
            allProject {
                title 
                description 
                siteUrl 
                sourceUrl 
                projImage {
                    asset {
                        url
                    }
                }
                stackTags
            }
        }
    `
    return async () => await request(endpoint, GET_PROJECTS);
}


export async function getServerSideProps(ctx : any) {
    const queryClient = new QueryClient();
    const res = fetchProjects();
    let isError = false;
    let errorMessage = "";
    try {
        await queryClient.fetchQuery(['blogs'], res)
    } catch(err) {
        errorMessage = err! ? JSON.stringify(err) : "";
        isError = true
    }
    return {
        props: {
            errorMessage: errorMessage,
            isError,
            dehydratedState: dehydrate(queryClient)
        }
    }
}

export default function ProjectPage(props:any) {
    const { status, data, error, isFetching, isLoading } = useProjects()
    if (props.isError) 
        return <p>Error! : {props.errorMsg}</p>
    return (
        <>
            <Container>
                <div className="container flex flex-col min-w-lg max-w-2xl mx-auto mb-16">
                    <h1 className="uppercase tracking-tighter drop-shadow-nier text-6xl mb-4">Projects</h1>
                    <Suspense fallback={<Loader />}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                        {data?.allProject.map((item:any, key:number) => (<ProjectCard key={`projCard#${key}`}{...item}/>))}
                    </div>
                    </Suspense>
                </div>
            </Container>
        </>
    )
}