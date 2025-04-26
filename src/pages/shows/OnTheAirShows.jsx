import { useEffect, useState } from "react";
import { fetchOnTheAirTvShows } from "../../services/api";
import { Box, Container, Grid, Heading, Skeleton } from "@chakra-ui/react";
import CardMovie from "../../components/CardMovie";

const OnTheAirShows = () => {
  const [onTheAir, setOnTheAir] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOnTheAirTvShows()
      .then((res) => {
        setOnTheAir(res);
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
          popular movies
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
          {onTheAir &&
            onTheAir?.map((item, i) =>
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

export default OnTheAirShows;
