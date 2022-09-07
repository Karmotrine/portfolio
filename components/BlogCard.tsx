import Image from "next/image";
import Link from "next/link";
import Badge from "./Badge";

interface TBlogCard {
    title: string
    publishedDate: any
    excerpt: string
    slug: {
        current: string
    }
    tag: string
    cover: {
        asset : {
            url : string
        }
    }
}

export default function BlogCard(props:TBlogCard) {
    return (
        <Link href={`/blog/${encodeURIComponent(props.slug.current)}`} passHref={true}>
            <a className="cursor-pointer flex flex-row w-full group">
                {props.cover !== null ?
                    <div className="w-[286px] h-[138px] relative hidden md:block "> <Image src={props.cover.asset.url} alt="cover" layout="fill" className="sepia group-hover:sepia-0 transition-all"/> </div> :
                    <div className="hidden md:block w-[286px] h-[138px] bg-fuchsia-500 sepia group-hover:sepia-0 transition-all"></div>
                }
                <div className="flex flex-col bg-black/0 w-full pb-2.5 group-hover:bg-black/20 transition-colors">
                    <div className="flex flex-row justify-between w-full bg-beige-400 px-1.5 py-0.5 group-hover:bg-brown-800 transition-colors">
                        <div className="flex flex-row shrink w-11/12">
                            <div className="h-3 w-3 md:h-4 md:w-4 bg-brown-800 self-center mr-2 group-hover:bg-beige-400 transition-colors"></div>
                            <p className="w-full break-all line-clamp-1 text-white">{props.title}</p>
                        </div>
                        <p className="hidden md:block text-white">{`${new Date(props.publishedDate).toLocaleDateString()}`}</p>
                    </div>
                    <div className="flex flex-col mt-2 ml-4 ">
                        <Badge>{props.tag}</Badge>
                        <p className="block md:hidden mr-2 text-xs">{`${new Date(props.publishedDate).toLocaleDateString()}`}</p>
                    </div>
                    <p className="ml-4 line-clamp-3 mr-2 text-sm group-hover:text-white transition-colors tracking-tighter">
                        {props.excerpt}
                    </p>
                </div>
            </a>
        </Link>
    )
}