import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { Cloudinary } from "@cloudinary/url-gen/index";

interface Props {
  publicId?: string;
  size: number;
}

const CldImage = ({ publicId, size }: Props) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    },
  });
  if (!publicId) return null;
  const itemPhoto = cld.image(publicId);
  itemPhoto
    .resize(fill().width(size).height(size))
    .roundCorners(byRadius(size / 2));
  return <AdvancedImage cldImg={itemPhoto} />;
};

export default CldImage;
