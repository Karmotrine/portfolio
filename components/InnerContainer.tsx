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
            <div className="flex flex-row h-fit bg-gray-900/80  w-full text-gray-250 py-1 pl-2 space-x-2 text-sm leading-none">
                <div className="w-4 h-4 bg-main-100">{icon}</div>
                <p className="font-lato ">{title}</p>
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