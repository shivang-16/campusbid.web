export const uploadImageToS3 = async (file: any, signedUrl: string) => {
    const response = await fetch(signedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image to S3");
    }
  };