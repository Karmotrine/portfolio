import { dehydrate, QueryClient } from "@tanstack/react-query";
import gql from "graphql-tag";
import { request } from "graphql-request";
import { NextPageContext } from "next";
import { useProjects } from "../lib/hooks/useProjects";

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
    if (isLoading) 
        return <p>Loading...</p>
    if (props.isError) 
        return <p>Error! : {props.errorMsg}</p>
    return (
        <>
            <p>Project Page</p>
            {data.allProject.map((item:any, key:number) => (<p key={key}>{JSON.stringify(item)}</p>))}
        </>
    )
}