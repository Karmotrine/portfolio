import { supabase } from "../lib/supabase"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import useGuestbook from "../lib/hooks/useGuestbook"
import { Suspense, useEffect, useState } from "react"
import { dehydrate, QueryClient, useHydrate } from "@tanstack/react-query"
import Container from "../components/Container"
import InnerContainer from "../components/InnerContainer"

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
        <Container>
            <div className="container flex flex-col min-w-lg max-w-2xl mx-auto mb-16">
            <h1 className="uppercase tracking-tighter drop-shadow-nier text-6xl mb-4">Guestbook</h1>
                <InnerContainer title="Guestbook">
                    <p>Hi {metadata?.full_name}</p>
                    <p>email: {metadata?.email}</p>

                    {!metadata ? 
                    <button className="cursor-pointer group" onClick={() => signInWithTwitter()}>
                        <div className="flex h-10 w-40 justify-center bg-beige-400 transition-all group-hover:bg-brown-800">
                            <div className="grid h-10 w-11/12 place-content-center border-x-4 border-brown-800 transition-all group-hover:border-beige-400">
                                <span className="text-brown-800 group-hover:text-beige-400 font-semibold">Sign-in</span>
                            </div>
                        </div>
                    </button>
                    :
                    <form 
                        onSubmit={(e) => {e.preventDefault(); insertEntry(user.id, metadata.name, metadata.email, comment);}}
                        className="flex w-full justify-between flex-row bg-stone-200 h-10"
                    >
                        <div className="flex flex-row">
                            <div className="w-3.5 h-full min-h-80 bg-gray-600 mr-2"></div>
                            <div className="w-1 h-full min-h-80 bg-gray-600 mr-5"></div>
                        </div>    
                            <input
                                type="text"
                                value={comment}
                                onChange={(e) => {const thisValue = e.target.value; setComment(thisValue)}}
                                className="bg-transparent appearance-none border-none focus:outline-none w-full"
                                placeholder="Write something..."
                            />
                            <button className="w-6 h-6 mr-4 ml-2" type = 'submit'>
                                <svg viewBox="0 0 20 20">
                                    <path d="M17.218,2.268L2.477,8.388C2.13,8.535,2.164,9.05,2.542,9.134L9.33,10.67l1.535,6.787c0.083,0.377,0.602,0.415,0.745,0.065l6.123-14.74C17.866,2.46,17.539,2.134,17.218,2.268 M3.92,8.641l11.772-4.89L9.535,9.909L3.92,8.641z M11.358,16.078l-1.268-5.613l6.157-6.157L11.358,16.078z"></path>
                                </svg>
                            </button>
                    </form>}
                </InnerContainer>
                <div>
                <Suspense>
                        {!isLoading && !isRefetching ? Array.isArray(data) && data.map((item,key) => {
                            return (
                                <section key={`comment#${key}`}className="relative mt-7 border-2 border-black bg-black/10 p-4">
                                    <span className="absolute -top-2.5 bg-amber-500 leading-none py-0.5 text-sm">{item?.name}@{formatDate(item.created_at)}</span>
                                    <p className="break-all">{/*JSON.stringify(item)*/item.text}</p>
                                    {user?.id === item.uid &&
                                     <button
                                        onClick={(e) => {
                                                e.preventDefault();
                                                deleteEntry(user?.id, item.id);
                                            
                                            }
                                        }
                                    >
                                        Delete
                                    </button>}
                                </section>
                            )
                        }) : <p>Loading...</p>}
                    </Suspense>
                </div>
            </div>
        </Container>
    )
}

function formatDate(date:Date) {
    const tDate = new Date(date);
    // returns mm/dd/yyyy string
    return (`${tDate.getMonth()}/${tDate.getDate()}/${tDate.getFullYear()}`)
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
