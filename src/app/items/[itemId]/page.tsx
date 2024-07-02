import S3Image from "@/components/s3-images"
import { Button } from "@/components/ui/button"
import { database } from "@/db/database"
import { bids, items } from "@/db/schema"
import { pageTitleStyles } from "@/styles"
import { desc, eq } from "drizzle-orm"
import Image from "next/image"
import Link from "next/link"
import { formatDistance } from "date-fns"
import { createBidAction } from "./actions"
import { auth } from "@/auth"
import { Badge } from "@/components/ui/badge"

function formatTimestamp(timestamp:Date){
    return formatDistance(timestamp, new Date(), { addSuffix: true })
}

export default async function ItemPage({
    params:{ itemId }
}:{
    params:{
        itemId: string
    }
}){
    const session = await auth()
    const item = await database.query.items.findFirst({
        where : eq(items.id,parseInt(itemId))
    })
    if(!item){
        return <div className="space-y-8 flex flex-col items-center p-12">
             <Image
              src="/package.svg"
              alt="Package"
              width="200"
              height="200"
              />
            <h1 className={pageTitleStyles}>Item not found</h1>
            <p className="text-center">The item you&apos;re trying to view is invalid.
                <br/> 
                Please go back and serach for a different auction item</p>
            <Button asChild>
                <Link href="/">View Auctions</Link>
            </Button>
        </div>
    }
    const allBids = await database.query.bids.findMany({
        where : eq(bids.itemId,parseInt(itemId)),
        orderBy : desc(bids.id),
        with : {
            user : {
                columns : {
                    image : true,
                    name :true
                }
            }
        }
    })

    const hasBids = allBids.length > 0
    const isBidActive = item.endDate > new Date()
    const canPlaceBid = session && item.userId !== session.user.id && isBidActive

    return(
        <main className="container mx-auto py-12 space-y-8">
            <div className="flex gap-8">
                <div className="flex flex-col gap-6">
                    <h1 className="text-4xl font-bold">
                        <span className="font-normal">Auction for</span> {item.name}
                    </h1>
                    {
                        !isBidActive &&
                        <Badge  className="w-fit" variant="destructive">Bidding Over</Badge>
                    }
                    <S3Image fileKey={item.fileKey}/>
                    <div className="text-xl space-y-4">
                    <div>
                            Current Bid {" "}
                            <span className="font-bold">${(item.currentBid/100).toFixed(2)}</span>
                        </div>
                        <div>
                            Starting Price of {" "}
                            <span className="font-bold">${(item.startingPrice/100).toFixed(2)}</span>
                        </div>
                        <div>Bid Interval <span className="font-bold">${(item.bidInterval/100).toFixed(2)}</span></div>
                       
                    </div>
                </div>
                <div className="space-y-4 flex-1">
                    <div className="flex justify-between">
                        <h2 className="tetx-2xl font-bold">Current bids</h2>
                        {canPlaceBid && <form action={createBidAction.bind(null,item.id)}>
                            <Button>Place a Bid</Button>
                        </form>}
                        
                    </div>
                    {hasBids?
                        <ul className="space-y-4">
                        {allBids.map((bid)=> (
                            <li key={bid.id} className="bg-gray-100 rounded-xl p-8">
                                <div className="flex gap-4">
                                    <div>
                                        <span className="font-bold">${(bid.amount/100).toFixed(2)}</span> by {" "}
                                        <span className="font-bold">{bid.user.name}</span> 
                                    </div>
                                    
                                    <div className="">{formatTimestamp(bid.timestamp)}</div> 
                                </div>
                                
                            </li>
                        ))}
                        </ul>
                    :
                    <div className="flex flex-col items-center gap-8 bg-gray-100 rounded-xl p-12">
                        <Image src="/package.svg" width="200" height="200" alt="Package"/>
                        <h2 className="text-2xl font-bold">No bids yet</h2>
                        {canPlaceBid && 
                            <form action={createBidAction.bind(null,item.id)}>
                            <Button>Place a Bid</Button>
                            </form>
                        }
                        
                    </div>
                    }

                </div>
            </div>
                
        </main>
    )
}