import { NextRequest, NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";

// Define the ResponseData type
type ResponseData = {
  url: string,
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const fileKey = searchParams.get('fileKey');

  console.log("fileKey", fileKey);

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

    const responseData: ResponseData = { url };

    return NextResponse.json(responseData); // Wrapping your custom data in a NextResponse
  } catch (error) {
    console.error('Error fetching image from S3:', error);
    return new NextResponse('Error fetching image from S3', { status: 500 });
  }
}
