import S3Image from "./s3-images";
import { format } from 'date-fns'
import { Button } from "./ui/button";
import Link from "next/link";


interface itemCardProps{
    itemId : number,
    fileKey : string,
    itemName : string,
    startingPrice : number,
    endsOn : Date
}

function isBidOver(endDate : Date){
    return endDate < new Date()
}

export function ItemCard({itemId,fileKey,itemName,startingPrice,endsOn}:itemCardProps){
    return(
        <div key={itemId} className="border p-8 rounded-xl space-y-2">
          <S3Image fileKey={fileKey}/>
          <h2 className="text-xl font-bold">{itemName}</h2>
          <p className="text-lg">Starting price: ${(startingPrice/100).toFixed(2)}</p>
          {isBidOver(endsOn) ? (
              <p className="text-lg">Bidding is Over</p>
            ) : (
              <p className="text-lg">
                Ends On: {format(endsOn, "eeee M/dd/yy")}
              </p>
            )}
    
            <Button asChild variant={isBidOver(endsOn) ? "outline" : "default"}>
              <Link href={`/items/${itemId}`}>
                {isBidOver(endsOn) ? "View Bid" : "Place Bid"}
              </Link>
            </Button>
            </div>
        )
}    