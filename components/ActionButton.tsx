import { ReactNode } from "react"

interface TActionButton {
    action?: Promise<void>
    children: ReactNode
}

export default function ActionButton({action, children}:TActionButton) {
    return (
    <button className="w-full cursor-pointer group" onClick={() => action}>
        <div className="flex h-full justify-center bg-yellow-400 transition-all group-hover:bg-red-700">
            <div className="grid h-full w-11/12 place-content-center border-x-4 border-red-700 transition-all group-hover:border-yellow-400">
                {children}
            </div>
        </div>
    </button>
    )
}