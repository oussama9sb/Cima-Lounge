import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <Box mt="7" pt="5" borderTop={"1px solid rgba(255, 255, 255, 0.1)"}>
      <Container maxW={"container.xl"}>
        <Flex
          alignItems={"center"}
          gap="1"
          justifyContent={"center"}
          color="gray.400"
        >
          <Text as="span">Made With</Text>
          <FaHeart />
          <Text as="span">by Oussama</Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
