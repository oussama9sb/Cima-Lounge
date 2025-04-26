import { Link } from "react-router-dom";
import { Flex, List, Text } from "@chakra-ui/react";
import { IoIosArrowDown } from "react-icons/io";

const Showdropdown = ({ Showsdropdown, setShowsdropdown }) => {
  return (
    <List.Root
      display={"flex"}
      flexDirection={"column"}
      alignItems={"end"}
      textAlign={"center"}
      position={"absolute"}
      top={"-4"}
      right={"0"}
      zIndex={"11"}
      listStyle={"none"}
      color={"#fafafa"}
      onMouseEnter={() => setShowsdropdown(true)}
      onMouseLeave={() => setShowsdropdown(false)}
    >
      <List.Item width="5.5rem" mb="3" py="4px" bg="#0ea5e9">
        <Flex alignItems={"center"}>
          <Text width="5rem" as="span">
            Tv Shows
          </Text>
          <IoIosArrowDown />
        </Flex>
      </List.Item>
      {Showsdropdown && (
        <>
          <List.Item
            width={"9rem"}
            py="4px"
            bg="#404040"
            borderBottom={"1px solid rgba(255,255,255, 0.2)"}
            borderRadius={"5px 5px 0 0"}
          >
            <Link to="/shows/popular">Popular</Link>
          </List.Item>
          <List.Item
            width={"9rem"}
            py="4px"
            bg="#404040"
            borderBottom={"1px solid rgba(255,255,255, 0.2)"}
          >
            <Link to="/shows/top-rated">Toprated</Link>
          </List.Item>
          <List.Item
            width={"9rem"}
            py="4px"
            bg="#404040"
            borderBottom={"1px solid rgba(255,255,255, 0.2)"}
            borderRadius={"0 0 5px 5px"}
          >
            <Link to="/shows/on-the-air">On The air</Link>
          </List.Item>
        </>
      )}
    </List.Root>
  );
};

export default Showdropdown;
