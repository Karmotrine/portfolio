import { ReactNode } from "react"

interface TBadge {
    color?: string
    children: ReactNode
}

export default function Badge(props:TBadge) {
    return (
        <p className="px-1 leading-none text-xs uppercase font-bold text-gray-50 bg-main-50 w-fit h-fit p-0.5">{props.children}</p>
    )
}