import { Box, Heading, Text } from "@radix-ui/themes";
import CategoryIcon from "../components/CategoryIcon";
import ApiClient from "../services/apiClient";
import toast, { Toaster } from "react-hot-toast";

const Test = () => {
  const api = new ApiClient();
  const items = api.getViews().then((res) => console.log(res));

  return (
    <>
      <Box p="8">
        <p>Hello</p>
      </Box>
    </>
  );
};

export default Test;
