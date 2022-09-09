import { useTheme } from 'next-themes';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect, ReactNode } from 'react';
import NextLink from 'next/link';
import cn from 'classnames';
import Footer from './Footer';
import NavButton from './NavButton';
import { HOME, GUESTBOOK, BLOG, PROJECTS } from "./ContainerIcons"

interface TNavItem {
    href : string
    name : string
    icon : ReactNode
}

const NAV_LINKS = [
    {
        href: "/", 
        name: "Home",
        icon: HOME,
    },
    {
        href: "/guestbook", 
        name:"Guestbook",
        icon: GUESTBOOK,
    },
    {
        href: "/blog", 
        name:"Blog",
        icon: BLOG,
    },
    {
        href: "/projects",
        name:"Projects",
        icon: PROJECTS,
    },
    //{href: "", name:""},
]

function NavItem({href, name, icon} : TNavItem) {
    const router = useRouter();
    const isActive = router.asPath === href;

    return (
        <NextLink href={href}>
            <div className="hidden cursor-pointer h-1/8 group md:flex flex-1 border-y-2 border-transparent transition-border-width py-0.5 duration-500 ease-linear hover:border-brown-800 hover:py-0.5">
                <div className="h-1/8 transition-slowest ease z-10 w-0 bg-brown-800 transition-width duration-200 ease-in-and-out group-hover:w-full">
                    <div className="z-20 flex flex-row space-x-8 p-2">
                        <div className="absolute h-6 w-6 place-content-center group-hover:text-white">
                            {icon}
                        </div>
                    <a className="absolute font-lato font-bold text-brown-800 group-hover:text-gray-250">{name}</a>
                    </div>
                </div>
                <div className="group h-10 flex-1 bg-beige-400 group-hover:bg-transparent"></div>
            </div>
        </NextLink>
    )
}

export default function Container(props:any) {
    const [mounted, setMounted] = useState(false);
/*     const { theme, setTheme } = useTheme();
     */
    useEffect(() => setMounted(true), []);

    const router = useRouter();
    const { children, ...customMeta } = props;
    const meta = {
        title: 'Yuan Ureña',
        description: 'CS Student, Aspiring Full-stack developer',
        image: '',
        type: 'website',
        ...customMeta
    }
    return (
        <>
            <div className="bg-grid bg-szgrid bg-transparent"> {/* bg-gray-250 dark:bg-gray-900 */}
        <Head>
            <title>{meta.title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta name="robots" content="follow, index"/>
            <meta content={meta.description} name="description"/>
            {/*<link rel="canonical" href={``} />*/}
            {/*<meta property="og:url" content={}*/}
            <meta property="og:site_name" content="Yuan Ureña | " />
            <meta property="og:title" content={meta.title} />
            <meta property="og:description" content={meta.description} />
            <meta property="og:image" content={meta.image} />
            <meta property="twitter:card" content="summary_large_image"/>
            {/*<meta property="twitter:site" content="@"*/}
            <meta property="twitter:title" content={meta.title} />
            <meta property="twitter:description" content={meta.description} />
            <meta property="twitter:image" content={meta.image} />
            {meta.date && <meta property="article:published_time" content={meta.date}/>}
            {/** Add JSON-LD for blog posts */}
        </Head>
        <div className="flex flex-col justify-center px-8 bg-grid bg-szgrid bg-grey-250">
                    <nav className="flex w-full relative max-w-4xl border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-8 sm:pb-16  text-gray-900 dark:text-gray-100" > {/* bg-gray-250  dark:bg-gray-900 bg-opacity-60*/}
                        <div className="flex items-center justify-between w-full relative max-w-4xl border-b-2 padding pb-2 border-gray-800 padding p-1 space-x-2" >
                        <div className="flex items-start w-full relative max-w-xl space-x-2" >
                            <div className="flex-row space-x-2 mr-3 content-center hidden md:flex">
                                <div className="w-3 h-12 bg-black"></div>
                                <div className="w-1 h-12 bg-black"></div>
                            </div>
                            {NAV_LINKS.map((item, key) => (
                                <NavItem key={`NavItem#${key}`} href={item.href} name={item.name} icon={item.icon}/>
                            ))}
                        </div>
                        {/* <MobileMenu /> */}
                        </div>
                    </nav>
                </div>
                <main
                    id="skip"
                    className="flex flex-col justify-center px-8 bg-grid bg-szgrid" /* bg-gray-250 dark:bg-gray-900 */
                >
                    <div className="min-h-screen">
                    {children}
                    </div>
                </main>
            </div>
            <Footer/>
        </>
    )
}
/**
 * 
 *                         <button
                            aria-label="Toggle Dark Mode"
                            type="button"
                            className="w-9 h-9 bg-gray-250 rounded-lg dark:bg-gray-600 flex items-center justify-center  hover:ring-2 ring-gray-300  transition-all"
                            onClick={() =>
                                setTheme(theme === 'dark' ? 'light' : 'dark')
                            }
                        >
                            {mounted && (
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                className="w-5 h-5 text-gray-800 dark:text-gray-200"
                                >
                                    {theme === 'dark' ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                        />
                                        ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                        />
                                    )}
                                </svg>
                            )}
                        </button>
 */