"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Button } from "./ui/button"

const Navbar = () => {


    const { data: session } = useSession()
    const user = session?.user
    console.log("navbar session",session);
    


    return (
        <nav className="flex flex-row items-center justify-between w-full bg-yellow-400 p-2">
            <div>
                <Link href="#" className="text-2xl font-extrabold">mysteryMessages</Link>
            </div>
            {
                session ? (
                    <div className="flex items-center justify-center space-x-5">
                        <div>
                            <p>Hey {user?.username || user?.email}</p>
                        </div>
                        <Button onClick={() => signOut()}>
                            Logout
                        </Button>
                    </div>
                ) : (
                    <Link href="/sign-in">
                        <Button>
                            Login
                        </Button>
                    </Link>
                )
            }
        </nav>
    )
}

export default Navbar