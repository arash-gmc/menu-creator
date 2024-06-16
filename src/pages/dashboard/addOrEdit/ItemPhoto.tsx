import { Flex, Button } from "@radix-ui/themes";
import { t } from "i18next";
import React from "react";
import CldImage from "../../../components/CldImage";
import UploadWidget from "../../../components/UploadWidget";
import { useTranslation } from "react-i18next";

interface Props {
  photoPublicId: string | undefined;
  setPhotoPublicId: (publicId: string | undefined) => void;
}

const ItemPhoto = ({ photoPublicId, setPhotoPublicId }: Props) => {
  const { t: tr } = useTranslation();
  const t = tr("dashboard.itemForm") as any;
  return (
    <Flex gap="3" align="center" direction={{ initial: "column", sm: "row" }}>
      {photoPublicId && <CldImage publicId={photoPublicId} size={200} />}
      <Flex
        direction={{ initial: "row", sm: "column" }}
        gap={{ initial: "2", sm: "4" }}
      >
        <UploadWidget
          onUploadDone={(publicId) => setPhotoPublicId(publicId)}
          folder="items"
          label={tr("dashboard.itemForm.uploadPhoto")}
        />
        {photoPublicId && (
          <Button
            variant="surface"
            color="red"
            type="button"
            onClick={() => setPhotoPublicId(undefined)}
          >
            {t.removePhoto}
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default ItemPhoto;
