import { supabase } from "../lib/supabase"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import useGuestbook from "../lib/hooks/useGuestbook"
import { useEffect, useState } from "react"
import { dehydrate, QueryClient, useHydrate } from "@tanstack/react-query"

export default function GuestBookPage(props:any) {
    const router = useRouter()
    const user = props?.user
    const metadata = user?.user_metadata
    const [comment, setComment] = useState("");
    const {data, error, isLoading, refetch, isRefetching} = useGuestbook();

    async function insertEntry(thisUId: string, thisName: string,
                            thisEmail: string, thisBody: string) {
        try {
            const { data, error } = await supabase.from('comments')
                                                .insert([{
                                                    uid: thisUId,
                                                    name: thisName,
                                                    email: thisEmail,
                                                    text: thisBody,
                                                }])
        } catch (err) {
            console.error(`Error has occured in while Inserting Entry: ${err}`)
        } finally {
            refetch({cancelRefetch:true})
        }
    }

    async function deleteEntry(thisUId: string, commentId: number) {
        try {
            const { data, error } = await supabase.from('comments')
                                                  .delete()
                                                  .match({
                                                    uid: thisUId,
                                                    id: commentId
                                                   }) 
        } catch (err) {
            console.error(`Error has occured while Deleting entry: ${err}`)
        } finally {
            refetch({cancelRefetch:true})
        }
    }
    return (
        <>
            {<p>{JSON.stringify(props.user)}</p>}
            <p>Hi {metadata?.full_name}</p>
            <p>email: {metadata?.email}</p>
            <button
                onClick={() => signInWithTwitter()}
            >
                Sign-in
            </button>
            <hr/>
            <button
                onClick={() => {signOut(); router.replace(router.asPath)}}
            >
                Sign-out
            </button>
            <hr/>
            <form onSubmit={(e) => {e.preventDefault(); insertEntry(user.id, metadata.name, metadata.email, comment);}}>
                <input
                    type="text"
                    value={comment}
                    onChange={(e) => {const thisValue = e.target.value; setComment(thisValue)}}
                />
                <button type = 'submit'>Click to submit</button>
            </form>
            <hr/>
            <p>Comments</p>
            <hr/>
            <div>
                {!isLoading && !isRefetching ? Array.isArray(data) && data.map((item,key) => {
                    return (
                        <div key={`${user?.id}_${item.id}`}>
                            <p>
                                {JSON.stringify(item)}
                            </p>
                            <button
                                onClick={(e) => {
                                        e.preventDefault();
                                        deleteEntry(user?.id, item.id);
                                    
                                    }
                                }
                            >Delete</button>
                            <hr/>
                        </div>
                    )
                }) : <p>Loading...</p>}
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const { user } = await supabase.auth.api.getUserByCookie(req);
    const queryClient = new QueryClient();
    const res = async () => (await supabase.from('comments'));
    await queryClient.prefetchQuery(["guestbook"], res)
    if (user === null) {
     return { 
            props: {
                dehydratedState: dehydrate(queryClient), 
            } 
        }
    }
    return {
        props: { 
            user: user, 
            dehydratedState: dehydrate(queryClient)
        } 
    };
};

async function signInWithTwitter() {
    const { user, session, error } = await supabase.auth.signIn({
        provider:'twitter',
        //redirectTo:
    })
}

async function signOut() {
    const { error } = await supabase.auth.signOut();
}