import { ReactNode } from "react"

interface TNavButton {
    icon: ReactNode
    text: string
    href: string
}


export default function NavButton({icon, text, href} : TNavButton) {
    return (
    <a className="h-1/8 group flex flex-1 border-y-2 border-transparent transition-border-width py-0.5 duration-500 ease-linear hover:border-brown-800 hover:py-0.5" href={href}>
        <div className="h-1/8 transition-slowest ease z-10 w-0 bg-brown-800 transition-width duration-200 ease-in-and-out group-hover:w-full">
            <div className="z-20 flex flex-row space-x-8 p-2">
            <div className="absolute h-6 w-6 place-content-center">
                {icon}
            </div>
            <a className="font-semibold text-brown-800 group-hover:text-gray-250">{text}</a>
            </div>
        </div>
        <div className="group h-10 flex-1 bg-beige-400 group-hover:bg-transparent"></div>
    </a>
    )
}