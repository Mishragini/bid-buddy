import { database } from "@/db/database";
import { auth } from "@/auth";
import S3Image from "@/components/s3-images";



const Home = async () => {
  const session = await auth();
  const allItems = await database.query.items.findMany();

  if (!session) return null;

  const user = session.user;

  if (!user) return null;


 

  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-4xl font-bold">Items for sale</h1>
      <div className="grid grid-cols-4 gap-8">
        {allItems.map((item, index) => (
          <div key={item.id} className="border p-8 rounded-xl space-y-2">
            <S3Image fileKey={item.fileKey}/>
            <h2 className="text-xl font-bold">{item.name}</h2>
            <p className="text-lg">starting price: ${item.startingPrice / 100}</p>
            
          </div>
        ))}
      </div>
    </main>
  );
}

export default Home;
