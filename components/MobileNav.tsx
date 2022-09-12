import NextLink from "next/link";
import { ReactNode, useState } from "react";
import { NAV_LINKS } from "../components/Container";

interface TNavItem {
    href : string
    name : string
    icon : ReactNode
}

function NavItem({href, name, icon} : TNavItem) {
    
    return (
        <NextLink href={href}>
            <div className="flex cursor-pointer h-1/8 group w-full border-y-2 border-transparent transition-border-width py-0.5 duration-500 ease-linear hover:border-brown-800 hover:py-0.5">
                <div className="h-1/8 transition-slowest ease z-10 w-0 bg-brown-800 transition-width duration-200 ease-in-and-out group-hover:w-full">
                    <div className="z-20 flex flex-row space-x-8 p-2">
                        <div className="absolute h-6 w-6 place-content-center">
                            {icon}
                        </div>
                    <p className="absolute font-lato font-bold text-brown-800 group-hover:text-gray-250">{name}</p>
                    </div>
                </div>
                <div className="group h-10 flex-1 bg-beige-400 group-hover:bg-transparent"></div>
            </div>
        </NextLink>
    )
}

export default function Test() {
    const [menuOpen, setMenuOpen] = useState(false)
    return (
        <>
            <button onClick={() => setMenuOpen(!menuOpen)} className="relative">open</button>
            {menuOpen && 
            <div className={`fixed z-[100] bg-gray-250 w-screen h-screen left-0 top-0 `}>
                <ul className="flex flex-col justify-start items-start max-w-2xl bg-yellow-200 px-8 py-12 ">
                    {NAV_LINKS.map((item,key) => 
                        <NavItem key={`Mobile_NavItem#${key}`} href={item.href} name={item.name} icon={item.icon}/>
                    )}
                </ul>
                <button onClick={() => setMenuOpen(!menuOpen)}>close</button>
            </div>
            }
        </>
    )
}