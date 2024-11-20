import supabase from "../configs/supabaseClient";

export const uploadImage = async (image: File | null | undefined) => {
  if (!image) {
    console.error("Please select a file.");
    return null;
  }
  const selectedImage = image;
  const fileName = `${Date.now()}-${selectedImage?.name}`;
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("gigglehub-bucket")
    .upload(fileName, selectedImage);

  if (uploadError) {
    console.error("Error uploading image:", uploadError);
    console.error("Image upload failed. Please try again.");
    return null;
  }

  // Get the file URL from Supabase Storage
  return uploadData?.path;
};
