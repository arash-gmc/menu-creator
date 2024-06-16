// @ts-nocheck
import { Button } from "@radix-ui/themes";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  onUploadDone: (publicId: string) => void;
  folder: string;
  label?: string;
  size?: "1" | "2" | "3";
}

const UploadWidget = ({ onUploadDone, folder, label, size }: Props) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const { t } = useTranslation();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_PRESET,
        folder: "foodmon/" + folder,
      },
      function (error, result) {
        if (result.info.public_id) onUploadDone(result.info.public_id);
        if (error) console.log(error);
      }
    );
  }, []);
  return (
    <Button
      variant="surface"
      size={size}
      onClick={() => widgetRef.current.open()}
      type="button"
    >
      {label || t("common.upload")}
    </Button>
  );
};

export default UploadWidget;
