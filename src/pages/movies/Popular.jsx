import { useEffect, useState } from "react";
import { Box, Container, Grid, Heading, Skeleton } from "@chakra-ui/react";
import { fetchPopularMovies } from "../../services/api";
import CardMovie from "../../components/CardMovie";

const Popular = () => {
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPopularMovies()
      .then((res) => {
        setPopular(res);
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
          {popular &&
            popular?.map((item, i) =>
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

export default Popular;
