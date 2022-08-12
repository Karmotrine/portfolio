import gql from "graphql-tag"
import { useGQLQuery } from "./useGQLQuery"

export const useBlog = (id: string) => {
    const GET_POST = gql`
        query getPost($postId: String!){
            page(id: $postId) {
                title
                slug
                content
            }
        }
    `;
    return useGQLQuery([
        "blogs", id], 
        GET_POST,
        {
            postId: id,
        },
        { 
            enabled: !!id
        }
    );
}

//const { status, data, error, isFetching } = useBlog(id);