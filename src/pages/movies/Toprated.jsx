import { useEffect, useState } from "react";
import { fetchTopRatedMovies } from "../../services/api";
import { Box, Container, Grid, Heading, Skeleton } from "@chakra-ui/react";
import CardMovie from "../../components/CardMovie";

const Toprated = () => {
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopRatedMovies()
      .then((res) => {
        setTopRated(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Container maxW={"container.xl"}>
        <Heading as="h2" fontSize={"lg"} mb="5" textTransform={"uppercase"}>
          top rated movies
        </Heading>

        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(5, 1fr)",
          }}
          gap={"4"}
        >
          {topRated &&
            topRated?.map((item, i) =>
              loading ? (
                <Skeleton key={i} height={300} />
              ) : (
                <CardMovie key={item?.id} item={item} type={"movie"} />
              ),
            )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Toprated;
