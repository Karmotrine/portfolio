import { GraphQLClient, request } from "graphql-request"

export default function supabaseGQLClient() {
    const client = new GraphQLClient(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/graphql/v1`)
    client.setHeaders({
        apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        authorization: `Bearer: ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`
    })
    return client;
}