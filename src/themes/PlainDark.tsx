import React from "react";
import { Item, Restaurant } from "../interfaces";
import { Container, Flex, Text } from "@radix-ui/themes";

interface Props {
  items: Item[] | undefined;
  restaurant: Restaurant | undefined;
}

const PlainDark = ({ items, restaurant }: Props) => {
  return (
    <div className="vazir bg-slate-800 text-white">
      <Container>
        <h1 className="text-center text-2xl py-5">{restaurant?.title}</h1>

        {items?.map((item, index) => (
          <div key={item.id}>
            {(index === 0 ||
              (index !== 0 && item.category !== items[index - 1].category)) && (
              <h2 className="text-center text-xl font-bold p-4 text-pink-400 underline">
                {item.category}
              </h2>
            )}

            <Flex p="5" justify="between">
              <Flex
                align="center"
                className="border-2 rounded-xl w-10 h-10 "
                justify="center"
              >
                <Text>{item.price}</Text>
              </Flex>
              <Flex direction="column" align="end">
                <Text size="5">{item.name}</Text>
                <Text size="2">{item.description}</Text>
              </Flex>
            </Flex>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default PlainDark;
