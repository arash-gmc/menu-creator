import React, { ReactNode, useContext } from "react";
import { Avatar, Flex, Text } from "@radix-ui/themes";
import { PiListPlusBold } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { FaDollarSign } from "react-icons/fa";
import { RiDiscountPercentLine } from "react-icons/ri";
import { IoQrCode, IoStatsChart } from "react-icons/io5";
import { MdOutlineAccountCircle, MdRestaurantMenu } from "react-icons/md";
import { UserContext } from "../Providers";

interface Item {
  name: string;
  title: string;
  icon: ReactNode;
}

const items: Item[] = [
  { name: "mymenu", title: "My Menu", icon: <MdRestaurantMenu /> },
  { name: "add", title: "Add", icon: <PiListPlusBold /> },
  { name: "edit", title: "Edit", icon: <FiEdit /> },
  { name: "price", title: "Price", icon: <FaDollarSign /> },
  { name: "discount", title: "Discount", icon: <RiDiscountPercentLine /> },
  { name: "statistic", title: "Statistic", icon: <IoStatsChart /> },
];

const NavbarIcons = () => {
  const { pathname } = useLocation();
  const section = pathname.split("/")[2];
  const user = useContext(UserContext);
  if (!user) return null;
  return (
    <Flex
      gap={{ initial: "0", md: "2" }}
      direction={{ initial: "column", md: "row" }}
    >
      {items.map((item) => (
        <Link to={"/dashboard/" + item.name} key={item.name}>
          <Flex
            direction={{ md: "column" }}
            align="center"
            gap="2"
            className={
              "lg:w-20 p-2 " +
              (section === item.name
                ? "bg-white text-orange-700 lg:rounded-t-2xl"
                : "")
            }
          >
            <Text size="6">{item.icon}</Text>
            <Text size="2" weight="bold" wrap="nowrap">
              {item.title}
            </Text>
          </Flex>
        </Link>
      ))}
      <Flex align="center" justify="end" gap="3" p="2">
        <Text weight="bold">{user.name}</Text>
        <Avatar
          fallback={user.name[0].toUpperCase()}
          color="indigo"
          variant="solid"
        />
      </Flex>
    </Flex>
  );
};

export default NavbarIcons;
