import { auth } from "@/auth";
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import Image from "next/image";
import Link from "next/link";

export default async function Header(){
  const session = await auth()
    
    return (
    <div className="bg-gray-200 py-2">
        <div className="container flex justify-between items-center">
            <div className="flex items-center gap-12">
                <Link href="/" className="flex items-center gap-2 hover:underline">
                    <Image src="/logo.png" width="50" height="50" alt="Logo"/>
                    BidBuddy.com
                </Link>
                <div>
                    <Link href="/items/create" className="flex items-center gap-2 hover:underline">
                        Auction an item
                    </Link>
                </div>
                
            </div>
               
            <div className="flex items-center gap-4">
                <div>{session?.user?.name}</div>
                <div>{session ? <SignOut/> : <SignIn/>}</div>
            </div>
        </div>
    </div>
    )
}