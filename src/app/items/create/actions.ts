"use server"
import { auth } from "@/auth";
import { database } from "@/db/database";
import{ items } from "@/db/schema";
import { redirect } from "next/navigation";

export async function createItemAction(formData:FormData) {
    const session = await auth();
    if(!session){
        throw new Error("Unauthorized");
    }
    const user = session.user;

    if(!user || !user.id){
        throw new Error("Unauthorized");
    }

    const startingPrice = formData.get("startingPrice") as string
    const priceAsCents = Math.floor(parseFloat(startingPrice) * 100)

    const file = formData.get("file") as File;
    if (!file) {
        throw new Error("File is required");
    }
  
  
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + '/api/s3-upload',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ filename: file.name, contentType: file.type }),
        }
      )
      console.log("response:",response)
      if (!response.ok) {
        throw new Error('Failed to get pre-signed URL.');
      }
    
      const { url, fields ,fileKey} = await response.json();
    
      const formDataForUpload = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formDataForUpload.append(key, value as string);
      });
      formDataForUpload.append('file', file);
    
      const uploadResponse = await fetch(url, {
        method: 'POST',
        body: formDataForUpload,
      });
    
      if (!uploadResponse.ok) {
        throw new Error('Upload failed.');
      }

    await database.insert(items).values({
        name: formData.get("name") as string,
        startingPrice: priceAsCents,
        userId: user.id,
        fileKey : fileKey
      })
      redirect("/");
}