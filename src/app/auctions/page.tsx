import { auth } from "@/auth";
import S3Image from "@/components/s3-images";
import { items } from "@/db/schema";
import { eq } from "drizzle-orm";
import { database } from "@/db/database";
import { EmptyState } from "./empty-state";
import { pageTitleStyles } from "@/styles";
import { ItemCard } from "@/components/item-card";


export default async function MyAuctionPage(){
    const session = await auth();
    if(!session || !session.user) {
        throw new Error("Unauthorized");
    }
    const userId = session.user.id

    const allItems = await database.query.items.findMany({
        where: eq(items.userId,userId!)
    });

    const hasItems = allItems.length >0;

    

    return (
        <main className="space-y-8">
            <h1 className={pageTitleStyles}>Your Current Auctions</h1>
            {hasItems?<div className="grid grid-cols-4 gap-8">
              {allItems.map((item, index) => (
                <ItemCard key={index} itemId={item.id} fileKey={item.fileKey} itemName={item.name} startingPrice={item.startingPrice} endsOn={item.endDate}/>
              ))}
            </div>
              :
              <EmptyState/>
            }
        </main>
    )
}