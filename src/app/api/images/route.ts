import { NextRequest, NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";

type ResponseData = {
 url: string,
}

export async function GET(request :NextRequest): Promise<ResponseData> {

  const { searchParams } = new URL(request.url);
  const fileKey = searchParams.get('fileKey');

  console.log("fileKey",fileKey);

  if (!fileKey) {
    return new NextResponse('fileKey query parameter is missing', { status: 400 });
  }

  
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: fileKey,
    });

    const { Bucket, Key } = (command as any).input; 
    const url = `https://${Bucket}.s3.amazonaws.com/${Key}`;

    return new NextResponse(url)
  } catch (error) {
    console.error('Error fetching image from S3:', error);
    return new NextResponse('Error fetching image from S3');
  }
}
