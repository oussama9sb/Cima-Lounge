import { useEffect, useState } from "react";
import { fetchTopRatedTvShows } from "../../services/api";
import { Box, Container, Grid, Heading, Skeleton } from "@chakra-ui/react";
import CardMovie from "../../components/CardMovie";

const TopratedShows = () => {
  const [topRatedShows, setTopRatedShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopRatedTvShows()
      .then((res) => {
        setTopRatedShows(res);
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
          top rated tv shows
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
          {topRatedShows &&
            topRatedShows?.map((item, i) =>
              loading ? (
                <Skeleton key={i} height={300} />
              ) : (
                <CardMovie key={item?.id} item={item} type={"tv"} />
              ),
            )}
        </Grid>
      </Container>
    </Box>
  );
};

export default TopratedShows;
