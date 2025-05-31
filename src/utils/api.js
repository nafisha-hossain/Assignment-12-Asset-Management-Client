import axios from 'axios';

async function imageUpload(img) {
  const formData = new FormData();
  formData.append('image', img);
  try {
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_API_KEY}`,
      formData,
    );
    return data.data.display_url;
  } catch (error) {
    console.log(error);
  }
}

export { imageUpload };
