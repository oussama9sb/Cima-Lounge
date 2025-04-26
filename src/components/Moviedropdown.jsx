import { Link } from "react-router-dom";
import { Flex, List, Text } from "@chakra-ui/react";
import { IoIosArrowDown } from "react-icons/io";

const Moviedropdown = ({ setMoviesdropdown, Moviesdropdown, timeOut }) => {
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
      onMouseEnter={() => setMoviesdropdown(true)}
      onMouseLeave={() => setMoviesdropdown(false)}
    >
      <List.Item width="5.5rem" pl="1rem" py="4px" mb="3" bg="#0ea5e9">
        <Flex alignItems={"center"}>
          <Text as="span" pr={"2px"}>
            Movies
          </Text>
          <IoIosArrowDown />
        </Flex>
      </List.Item>
      {Moviesdropdown && (
        <>
          <List.Item
            width={"9rem"}
            py="4px"
            bg="#404040"
            borderBottom={"1px solid rgba(255,255,255, 0.2)"}
            borderRadius={"5px 5px 0 0"}
          >
            <Link to="/movies/popular">Popular</Link>
          </List.Item>
          <List.Item
            width={"9rem"}
            py="4px"
            bg="#404040"
            borderBottom={"1px solid rgba(255,255,255, 0.2)"}
          >
            <Link to="/movies/top-rated">Toprated</Link>
          </List.Item>
          <List.Item
            width={"9rem"}
            py="4px"
            bg="#404040"
            borderBottom={"1px solid rgba(255,255,255, 0.2)"}
            borderRadius={"0 0 5px 5px"}
          >
            <Link to="/movies/upcoming">Upcoming</Link>
          </List.Item>
        </>
      )}
    </List.Root>
  );
};

export default Moviedropdown;
