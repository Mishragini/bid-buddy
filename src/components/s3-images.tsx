
const getImage = async (fileKey:string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/images?fileKey=${fileKey}`);
    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }
    const data = await response.text()
    return data
  } catch (error) {
    console.error('Error fetching image:', error);
  }
}

export default async function S3Image({fileKey}:{fileKey:string}) {
  console.log("filekey in component",fileKey)
 const imageUrl = await getImage(fileKey)
 
  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} alt="s3url" width='1200' height='1200'/>
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
};