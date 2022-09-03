import Image from 'next/image'
import ActionButton from './ActionButton'

interface TProjectCard {
    title: string
    description: string
    siteUrl: string
    sourceUrl: string
    projImage: { [key:string] : 
        {
            [key:string] : string
        }
    }
    stackTags: string[]
}
export default function ProjectCard(props:TProjectCard) {
    return (
    <div className="w-full bg-transparent shadow-nier border-beige-400 border" >
        <div className="flex flex-row h-fit bg-black w-full text-white py-1 pl-2 space-x-2 text-sm leading-none">
            <div className="w-4 h-4 bg-brown-300"></div>
            <h2>{props.title}</h2>
        </div>
        <div className="min-w-full h-fit p-3">
            <Image src={props.projImage.asset.url} alt={props.title} width="328" height="190"/>
            <p>{props.description}</p>
            <hr className="border bg-black border-black my-1"/>
            <ul>
                {props.stackTags.map((item, key)=> (<li key={key}>{item}</li>))}
            </ul>
            <div className="flex flex-row mt-2">
                <a href={props.siteUrl} rel="noopener noreferrer" target="_blank" className="w-full group h-8 mr-2">
                    <div className="flex h-full justify-center bg-yellow-400 transition-all group-hover:bg-red-700">
                        <div className="grid h-full w-11/12 place-content-center border-x-4 border-red-700 transition-all group-hover:border-yellow-400">
                            Live Demo
                        </div>
                    </div>
                </a>
                <a href={props.sourceUrl} rel="noopener noreferrer" target="_blank">
                <button className="group w-8 hover:bg-white hover:text-brown-400 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path 
                            fill="currentColor"
                            d="M0 0v24h24v-24h-24zm14.534 19.59c-.406.078-.534-.171-.534-.384v-2.195c0-.747-.262-1.233-.55-1.481 1.782-.198 3.654-.875 3.654-3.947 0-.874-.311-1.588-.824-2.147.083-.202.357-1.016-.079-2.117 0 0-.671-.215-2.198.82-.639-.18-1.323-.267-2.003-.271-.68.003-1.364.091-2.003.269-1.528-1.035-2.2-.82-2.2-.82-.434 1.102-.16 1.915-.077 2.118-.512.56-.824 1.273-.824 2.147 0 3.064 1.867 3.751 3.645 3.954-.229.2-.436.552-.508 1.07-.457.204-1.614.557-2.328-.666 0 0-.423-.768-1.227-.825 0 0-.78-.01-.055.487 0 0 .525.246.889 1.17 0 0 .463 1.428 2.688.944v1.489c0 .211-.129.459-.528.385-3.18-1.057-5.472-4.056-5.472-7.59 0-4.419 3.582-8 8-8s8 3.581 8 8c0 3.533-2.289 6.531-5.466 7.59z"
                        />
                    </svg>
                </button>
                </a>
            </div>
        </div>
    </div>
    )
}