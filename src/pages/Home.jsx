import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Skeleton,
} from "@chakra-ui/react";
import { fetchTrending } from "../services/api";

import CardMovie from "../components/CardMovie";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeWindow, setTimeWindow] = useState("day");

  console.log("data", data);

  useEffect(() => {
    setLoading(true);
    fetchTrending(timeWindow)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [timeWindow]);

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Container maxW={"container.xl"}>
        <Flex alignItems={"baseline"} gap={"4"} my={"10"}>
          <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
            Trending
          </Heading>
          <Flex
            alignItems={"center"}
            gap={"2"}
            border={"1px solid teal"}
            borderRadius={"20px"}
          >
            <Button
              px="3"
              py="1"
              borderRadius={"20px"}
              bg={`${timeWindow === "day" ? "gray.700" : "gray.900"}`}
              onClick={() => setTimeWindow("day")}
            >
              Today
            </Button>
            <Button
              px="3"
              py="1"
              borderRadius={"20px"}
              bg={`${timeWindow === "week" ? "gray.700" : "gray.900"}`}
              onClick={() => setTimeWindow("week")}
            >
              This week
            </Button>
          </Flex>
        </Flex>
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(5, 1fr)",
          }}
          gap={"4"}
        >
          {data &&
            data?.map((item, i) =>
              loading ? (
                <Skeleton key={i} height={300} />
              ) : (
                <CardMovie key={item?.id} item={item} type={item?.media_type} />
              ),
            )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
