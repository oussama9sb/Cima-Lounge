import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Flex,
  Image,
  Input,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { fetchDiscoverMovie } from "../services/api";
import { Button } from "./ui/button";
import { FaTelegram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaCircleArrowLeft } from "react-icons/fa6";

import logo from "../assets/logo.webp";
import Moviedropdown from "./Moviedropdown";
import Showdropdown from "./Showdropdown";
import NavCardMovie from "./NavCardMovie";
import { SearchContext } from "../context/Context";

const Navbar = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Moviesdropdown, setMoviesdropdown] = useState(false);
  const [Showsdropdown, setShowsdropdown] = useState(false);
  const [counter, setCounter] = useState(0);
  const box = useRef(null);

  const { searchValue, setSearchValue } = useContext(SearchContext);

  function handleSubmit(e) {
    e.preventDefault();
  }

  const btnpressprev = () => {
    let width = box.current.clientWidth;
    if (counter === 0) {
      setCounter(width);
      box.current.scrollLeft = width;
    } else {
      box.current.scrollLeft = box.current.scrollLeft - 200;
      setCounter(box.current.scrollLeft - 200);
    }
  };

  const btnpressnext = () => {
    let width = box.current.clientWidth;
    if (counter >= width) {
      setCounter(0);
      box.current.scrollLeft = 0;
    } else {
      box.current.scrollLeft = box.current.scrollLeft + 200;
      setCounter(box.current.scrollLeft + 200);
    }
  };

  useEffect(() => {
    fetchDiscoverMovie()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Box>
      <Box
        py="4"
        mb="2"
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        bg="#0ea5e9"
        fontWeight={"bold"}
        shadow={"0px 3px 10px 0px rgba(0,0,0,0.85)"}
      >
        <Container maxW={"container.xl"}>
          <Flex justifyContent={"space-between"}>
            <Link to="/">
              <Box
                fontSize={"2xl"}
                fontWeight={"bold"}
                color={"white"}
                letterSpacing={"widest"}
                bg="#171717"
                borderRadius={"3xl"}
                width="9rem"
              >
                <Flex
                  height={"2.5rem"}
                  alignItems={"center"}
                  justifyContent={"space-around"}
                >
                  <FaTelegram />
                  <FaTwitter />
                  <FaFacebook />
                </Flex>
              </Box>
            </Link>

            {/* Desktop */}
            <Flex gap="4" alignItems={"center"}>
              <Link to="/">Home</Link>
              <Box
                position={"relative"}
                _hover={{ cursor: "pointer" }}
                width="5rem"
              >
                <Moviedropdown
                  Moviesdropdown={Moviesdropdown}
                  setMoviesdropdown={setMoviesdropdown}
                />
              </Box>
              <Box
                position={"relative"}
                _hover={{ cursor: "pointer" }}
                width="5.5rem"
              >
                <Showdropdown
                  Showsdropdown={Showsdropdown}
                  setShowsdropdown={setShowsdropdown}
                />
              </Box>
            </Flex>
          </Flex>
        </Container>
      </Box>
      <Box display={"flex"} justifyContent={"center"} position={"relative"}>
        <Container maxW={"container.xl"}>
          <Flex
            flexDirection={{ base: "column", md: "row" }}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <form onSubmit={handleSubmit}>
              <Input
                width={{ base: "100%", md: "sm" }}
                bg="#0a0a0a"
                border={"none"}
                borderRadius={"3xl"}
                mt="3"
                placeholder="Search..."
                py="2"
                pl="6rem"
                position={"relative"}
                height="3rem"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Link to="/search">
                <Button
                  bg="#315fc3"
                  px="4"
                  height="2rem"
                  borderRadius="2xl"
                  position="absolute"
                  left="2"
                  top="5"
                  type="submit"
                >
                  Search
                </Button>
              </Link>
            </form>
            <Box
              position={"absolute"}
              top="7"
              left={{ base: "-11", md: "22rem" }}
            >
              <FaSearch />
            </Box>
            <Text
              as="h1"
              fontSize={"4xl"}
              fontWeight={"900"}
              letterSpacing={"wide"}
            >
              CimaL
              <Text as="span">
                <Image
                  src={logo}
                  height={"2rem"}
                  display={"inline"}
                  animation={"spin"}
                />
              </Text>
              unge
            </Text>
          </Flex>
        </Container>
      </Box>
      {/*The carousel  */}
      <Box position={"relative"}>
        <Box
          mt="4"
          pb="3"
          height={"350px"}
          width="100%"
          bg="#09090b"
          overflow={"hidden"}
          // position={"relative"}
          display={"flex"}
          ref={box}
          scrollBehavior={"smooth"}
        >
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            gap={"4"}
            pt="5"
          >
            {data &&
              data?.map((item, i) =>
                loading ? (
                  <Skeleton key={i} height={300} />
                ) : (
                  <NavCardMovie key={item?.id} item={item} type={"movie"} />
                ),
              )}
          </Flex>
          <Button
            position="absolute"
            top="50%"
            left="0"
            borderRadius="0 18px 18px 0"
            px="3"
            bg="#315fc3"
            zIndex="13"
            onClick={btnpressprev}
          >
            <FaCircleArrowLeft />
          </Button>
          <Button
            position="absolute"
            top="50%"
            right="0"
            borderRadius="18px 0 0 18px"
            px="3"
            bg="#315fc3"
            zIndex="13"
            onClick={btnpressnext}
          >
            <FaCircleArrowRight />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
