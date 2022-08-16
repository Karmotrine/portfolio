import gql from "graphql-tag"
import { useGQLQuery } from "./useGQLQuery"

export const useProjects = () => {
    const GET_PROJECT = gql`
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
    return useGQLQuery(['projects'], GET_PROJECT)
}