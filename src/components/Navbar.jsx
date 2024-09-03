"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Button } from "./ui/button"
import { useEffect } from "react"
import { useToast } from "./ui/use-toast"

const Navbar = () => {
    const { data: session } = useSession()
    const user = session?.user
    const {toast} = useToast()
    useEffect(()=>{
  

    },[])
    


    return (
        <nav className="flex text-black  flex-row items-center justify-between w-full bg-white p-2">
            <div>
                <Link href="/" className="text-2xl font-extrabold ">mysteryMessages</Link>
            </div>
            {
                session ? (
                    <div className="flex items-center justify-center space-x-5">
                        <div>
                            <p className="font-bold text-xl">Hey {user?.username || user?.email}</p>
                        </div>
                        <Button onClick={() => {
                            signOut()
                            toast({
                                title:"Successfully logged out"
                            })
                        }
                        }>
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