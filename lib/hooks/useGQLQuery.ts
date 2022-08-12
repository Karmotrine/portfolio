import { useQuery } from "@tanstack/react-query"
import { GraphQLClient, request } from "graphql-request"
import { stringify } from "querystring"

export const useGQLQuery = (key:unknown[], query:any, variables?:object, config?:object ) => {
    const endpoint = process.env.NEXT_PUBLIC_SANITY_GRAPHQL_API || ""
    const fetchData = async () => await request(endpoint, query, variables)

    return useQuery(key, fetchData, config);
}

// const { status, data, error, isFetching } = useGQLQuery(key:unknown[], query:any, variables:object, config = {});
