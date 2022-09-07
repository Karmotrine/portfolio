import { ReactNode } from "react"

interface TInnerContainer {
    title?: string
    icon?: ReactNode
    children: ReactNode
}
export default function InnerContainer({title,icon,children}: TInnerContainer) {
    return (
    <div className="w-full bg-transparent shadow-nier border-beige-400 border bg-gray-250" >
        {title &&
            <div className="flex flex-row h-fit bg-beige-400 w-full text-white py-1 pl-2 space-x-2 text-sm leading-none">
                <div className="w-4 h-4 bg-brown-300">{icon}</div>
                <h3 className="font-lato ">{title}</h3>
            </div>
        }
        <div className="min-w-full h-fit py-0.5 pr-1.5 pl-2">
            <div className="w-full h-full border-y-2 border-r-2 pb-1 border-brown-500">
                    {children}
            </div>
        </div>
    </div>
    )
}