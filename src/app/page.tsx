import { database } from "@/db/database";
import { auth } from "@/auth";
import S3Image from "@/components/s3-images";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { pageTitleStyles } from "@/styles";
import { ItemCard } from "@/components/item-card";



const Home = async () => {
  const session = await auth();
  const allItems = await database.query.items.findMany();

  if (!session) return null;

  const user = session.user;

  if (!user) return null;

  return (
    <main className=" space-y-8">
      <h1 className={pageTitleStyles}>Items for sale</h1>
      <div className="grid grid-cols-4 gap-8">
        {allItems.map((item, index) => (
          <ItemCard key={index} itemId={item.id} fileKey={item.fileKey} itemName={item.name} startingPrice={item.startingPrice} endsOn={item.endDate}/>
        ))}
      </div>
    </main>
  );
}

export default Home;
