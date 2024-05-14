import React, { ReactNode } from "react";
import { Flex, Text } from "@radix-ui/themes";
import { PiListPlusBold } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { FaDollarSign } from "react-icons/fa";
import { RiDiscountPercentLine } from "react-icons/ri";
import { IoQrCode, IoStatsChart } from "react-icons/io5";
import { MdOutlineAccountCircle, MdRestaurantMenu } from "react-icons/md";

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
  return (
    <Flex gap="2">
      {items.map((item) => (
        <Link to={"/dashboard/" + item.name} key={item.name}>
          <Flex
            direction="column"
            align="center"
            className={
              "w-20 pb-2 pt-2 px-2 " +
              (section === item.name
                ? "bg-white text-orange-700 rounded-t-2xl"
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
    </Flex>
  );
};

export default NavbarIcons;
