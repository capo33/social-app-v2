import axios from "axios";

type CloudinaryProps = {
  setFormData: Function;
  formData: any;
};
const Cloudinary = ({ setFormData , formData}: CloudinaryProps) => {
  const uploadImageCLoud = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", process.env.REACT_APP_PRESET_NAME as string);
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/upload`,
      data
    );

    setFormData({
      ...formData,
      image: response.data.secure_url,
    });
  };
  return (
    <input hidden accept='image/*' type='file' onChange={uploadImageCLoud} />
  );
};

export default Cloudinary;
