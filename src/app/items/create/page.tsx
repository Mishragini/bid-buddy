import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/auth";
import { createItemAction } from "./actions";


export default async function createPage(){
    const session = await auth();
    return (
        <main className=" container mx-auto py-12 space-y-8">
      <h1 className="text-4xl font-bold">
        Post an Item to Sell
      </h1>
      <form
      className="flex flex-col border p-8 rounded-xl space-y-4 max-w-md"
      action={createItemAction}
      >
        <Input required className="max-w-lg" name="name" placeholder="Name your item"/>
        <Input
         required 
         className="max-w-lg"
         name="startingPrice" 
         type="number"
         step="0.01"
         placeholder="What to start your auction at"
         />

        <Button className="self-end" type="submit">Place Item</Button>
      </form>
      </main>
    )
}