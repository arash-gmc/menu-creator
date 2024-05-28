import { Box } from "@radix-ui/themes";
import React from "react";
import { Cloudinary } from "@cloudinary/url-gen/index";
import UploadWidget from "../components/UploadWidget";

const Test = () => {
  const cld = new Cloudinary({ cloud: { cloudName: "doyqyrz9d" } });
  return (
    <Box p="8">
      <UploadWidget
        onUploadDone={(publicId) => {
          console.log(publicId);
        }}
        folder="items"
      />
    </Box>
  );
};

export default Test;
