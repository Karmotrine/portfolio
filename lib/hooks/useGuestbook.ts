import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase"

export const getGuestBook = async () => {
    try {
        let { data, error, status } = await supabase.from('comments');
        return data;
    } catch (err) {
        throw err;
    }
}

export default function useGuestbook() {
    return useQuery(["guestbook"], getGuestBook);
}