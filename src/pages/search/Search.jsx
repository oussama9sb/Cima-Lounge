import { useContext, useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Flex,
  Grid,
  Skeleton,
} from "@chakra-ui/react";
import { searchData } from "../../services/api";
import { SearchContext } from "../../context/Context";
import CardMovie from "../../components/CardMovie";

const Search = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { searchValue, activePage } = useContext(SearchContext);

  // console.log(searchValue, activePage);

  useEffect(() => {
    try {
      const getSearchedData = async () => {
        const res = await searchData(searchValue, activePage);
        setData(res?.results);
      };

      const timer = setTimeout(() => {
        if (searchValue) getSearchedData();
      }, 1500);

      return () => clearTimeout(timer);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [searchValue, activePage]);

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Container maxW={"container.xl"}>
        <Flex alignItems={"baseline"} gap={"4"} my={"10"}>
          <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
            Search
          </Heading>
        </Flex>
        {/* Searched content */}

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

export default Search;
