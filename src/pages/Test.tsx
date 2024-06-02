import { Box, Button, Heading } from "@radix-ui/themes";
import React, { Suspense, useEffect } from "react";
import { Cloudinary } from "@cloudinary/url-gen/index";
import UploadWidget from "../components/UploadWidget";
import i18next from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";

const Test = () => {
  const { t } = useTranslation();
  return (
    <Suspense fallback={"loading..."}>
      <Navbar />
      <Box p="8">
        <Heading>{t("test")}</Heading>
        <Button
          onClick={() => {
            i18next.changeLanguage("fa");
          }}
        >
          Change Language
        </Button>
      </Box>
    </Suspense>
  );
};

export default Test;
