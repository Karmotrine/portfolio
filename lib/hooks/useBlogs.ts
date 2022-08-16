import gql from "graphql-tag"
import { useGQLQuery } from "./useGQLQuery"

export const useBlogs = (pageNumber?: number) => {
    let page = 0;
    if (pageNumber) {
        page = pageNumber - 1;
    }
    const totalOffset = 5*page
    const GET_POSTS = gql`
        query AllPages($totalOffset: Int!){
            allPage(limit:5, offset:$totalOffset, sort:[{_createdAt: DESC}]){
                slug {
                    current
                }
            }
        }
    `;
    const variables = {
        totalOffset:totalOffset,
    }
    return useGQLQuery(["blogs", page], GET_POSTS, variables);
    // {keepPreviousData : false}
}

//const { status, data, error, isFetching } = useBlog(id);