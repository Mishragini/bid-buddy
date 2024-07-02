'use client'

import { Button } from "@/components/ui/button";
import { NotificationCell, NotificationFeedPopover, NotificationIconButton } from "@knocklabs/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export default  function Header(){
  const session = useSession()
  const userId = session?.data?.user?.id;
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);
    return (
    <div className="bg-gray-200 py-2">
        <div className="container flex justify-between items-center">
            <div className="flex items-center gap-12">
                <Link href="/" className="flex items-center gap-2 hover:underline">
                    <Image src="/logo.png" width="50" height="50" alt="Logo"/>
                    BidBuddy.com
                </Link>
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2 hover:underline">
                        All Auctions
                    </Link>
                    {userId && 
                    <>
                    <Link href="/items/create" className="flex items-center gap-2 hover:underline">
                        Create Auction
                    </Link>
                    <Link href="/auctions" className="flex items-center gap-2 hover:underline">
                        My Auctions
                    </Link>
                    </>
                    }
                </div>
                
            </div>
               
            <div className="flex items-center gap-4">
                <NotificationIconButton
                  ref={notifButtonRef}
                  onClick={(e) => setIsVisible(!isVisible)}
                />
                <NotificationFeedPopover
                  buttonRef={notifButtonRef}
                  isVisible={isVisible}
                  onClose={() => setIsVisible(false)}
                  renderItem={({item,...props})=>
                    <NotificationCell {...props} item={item}>
                    <div className="rounded-xl">
                      <Link
                        className="text-blue-400 hover:text=blue-500"
                        onClick={() => {
                          setIsVisible(false);
                        }}
                        href={`/items/${item.data?.itemId}`}
                      >
                        Someone outbidded you on{" "}
                        <span className="font-bold">{item.data?.itemName}</span>{" "}
                        by ${(item.data?.bidAmount/100).toFixed(2)}
                      </Link>
                    </div>
                  </NotificationCell>
  
                  }
                />
                {session?.data?.user?.image && 
                <img
                className="rounded-full"
                src={session?.data?.user?.image} 
                width="40"
                height="40"
                alt="user avatar"
                />}
                <div>{session?.data?.user?.name}</div>
                <div>{userId ?
                 <Button
                 type="submit"
                 onClick={()=>
                    signOut({
                        callbackUrl: '/'
                    })
                 }
                 >
                    Sign Out
                 </Button> 
                 : 
                 <Button
                 type="submit"
                 onClick={()=>
                    signIn()
                 }
                 >
                    Sign In
                 </Button> 
                 }</div>
            </div>
        </div>
    </div>
    )
}