// import { supabase } from './supabaseClient'; // Adjust the import path as needed

import supabase from "../supabase";

const uploadAvatar = async (file) => {
  try {
    // Create a unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    // Upload the file to Supabase Storage
    const { data, error: uploadError } = await supabase.storage
      .from('avatars') // Ensure the bucket name is correct
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      throw new Error('File upload failed');
    }

console.log(filePath);
  
return filePath
  } catch (error) {
    console.error('Error in uploadAvatar:', error.message);
    return null;
  }
};

export default uploadAvatar;
