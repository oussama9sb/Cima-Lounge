import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { imagePath } from "../services/api";
import { FaStar } from "react-icons/fa";

const NavCardMovie = ({ item, type }) => {
  return (
    <Link to={`/${type}/${item?.id}`}>
      <Box
        position={"relative"}
        transform={"scale(1)"}
        _hover={{
          transform: { base: "scale(1)x", md: "scale(1.08)" },
          transition: "transform 0.2s ease-in-out",
          zIndex: 10,
          "& .overlay": {
            opacity: 1,
          },
        }}
      >
        <Image
          src={`${imagePath}/${item?.poster_path}`}
          alt={item?.title || item?.name}
          height={"16.4rem"}
          maxW={"10rem"}
          borderRadius={"md"}
          shadow={"1px 5px 8px -1px rgba(0,0,0,0.53);"}
        />
        <Box
          className="overlay"
          pos={"absolute"}
          p="2"
          bottom={"0"}
          left={"0"}
          w={"100%"}
          h={"33%"}
          bg={"rgba(0,0,0,0.9)"}
          opacity={"0"}
          transition={"opacity 0.3s ease-in-out"}
          borderRadius={"0 0 5.2px 5.2px "}
        >
          <Text textAlign={"center"} fontSize={".8rem"}>
            {item?.title || item?.name}
          </Text>
          <Text textAlign={"center"} fontSize={"x-small"} color={"gray.200"}>
            {new Date(
              item?.release_date || item?.first_air_date,
            ).getFullYear() || "N/A"}
          </Text>
          <Flex alignItems={"center"} justifyContent={"center"} gap="2" mt="1">
            <FaStar color={"#ca8a04"} />
            <Text fontSize={"sm"}>{item?.vote_average?.toFixed(1)}</Text>
          </Flex>
        </Box>
      </Box>
    </Link>
  );
};

export default NavCardMovie;
