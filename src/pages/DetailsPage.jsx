import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Badge,
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Skeleton,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Button } from "../components/ui/button";
import {
  fetchDetails,
  fetchRecommendations,
  fetchVideos,
  imagePath,
  imagePathOriginal,
} from "../services/api";
import { FaCalendar, FaCheckCircle } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import CardMovie from "../components/CardMovie";
import VideoComponent from "../components/VideoComponent";

const DetailsPage = () => {
  const [details, setDetails] = useState({});
  const [recommend, setRecommand] = useState([]);
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useParams();
  const { type, id } = router;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recommendData, detailsData, videosData] = await Promise.all([
          fetchRecommendations(type, id),
          fetchDetails(type, id),
          fetchVideos(type, id),
        ]);

        //details
        setDetails(detailsData);
        //recommend
        setRecommand(recommendData);
        //vidoe
        const video = videosData?.results?.find(
          (video) => video?.type === "Trailer",
        );
        setVideo(video);

        const videos = videosData?.results
          ?.filter((video) => video?.type !== "Trailer")
          ?.slice(0, 4);
        setVideos(videos);
      } catch (err) {
        console.lgo(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [type, id]);

  // console.log(video, videos);

  if (loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  const title = details?.title || details?.name;
  const releaseDate =
    type === "tv" ? details?.first_air_date : details?.release_date;

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      mt={"5"}
    >
      <Container
        background={`linear-gradient(rgba(0,0,0,0.88), rgba(0,0,0,0.88)), url(${imagePathOriginal}${details?.backdrop_path})`}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        bakcgroundPosition={"center"}
        borderRadius={"8px"}
        h={{ base: "auto", md: "500px" }}
        py={"2"}
        px="6"
        display={"flex"}
        alignItems={"center"}
      >
        <Container>
          <Flex
            alignItems={"center"}
            gap="10"
            flexDirection={{ base: "column", md: "row" }}
          >
            <Image
              height={"450px"}
              borderRadius={"sm"}
              src={`${imagePath}/${details?.poster_path}`}
            />
            <Box>
              <Heading fontSize={"3xl"}>
                {title}{" "}
                <Text as="span" fontWeight={"normal"} color={"gray.400"}>
                  {new Date(releaseDate).getFullYear()}
                </Text>
              </Heading>
              {/*  */}
              <Flex alignItems={"center"} gap={"4"} mt={"3"} mb={"6"}>
                <Flex alignItems={"center"}>
                  <FaCalendar color={"#a1a1aa"} />
                  <Text fontSize={"sm"} pl={"2"}>
                    {new Date(releaseDate).toLocaleDateString("en-US")} (US)
                  </Text>
                </Flex>
              </Flex>
              {/* */}
              <Flex alignItems={"center"} gap={"4"}>
                <Text display={{ base: "none", md: "initial" }}>
                  User score
                </Text>
                <Button
                  display={"none"}
                  px={"2"}
                  variant={"outline"}
                  onClick={() => console.log("click")}
                  colorPalette="green"
                >
                  <FaCheckCircle />
                  In Watchlist
                </Button>
                <Button
                  px={"2"}
                  variant={"outline"}
                  color={"gray.500"}
                  onClick={() => console.log("click")}
                >
                  <IoIosAddCircle />
                  Add to Watchlist
                </Button>
              </Flex>
              <Text
                color={"gray.400"}
                fontSize={"sm"}
                fontStyle={"italic"}
                my="5"
              >
                {details?.tagline}
              </Text>
              <Heading fontSize="xl" mb="3">
                Overview
              </Heading>
              <Text fontSize={"md"} mb={"3"}>
                {details?.overview}
              </Text>
              <Flex mt="6" gap="2">
                {details?.genres.map((genre) => (
                  <Badge px="2" key={genre?.id}>
                    {genre?.name}
                  </Badge>
                ))}
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Container>
      {/* Video component */}
      <Container>
        <Heading
          as="h2"
          fontSize={"md"}
          textTransform={"uppercase"}
          mt="10"
          mb="5"
        >
          Videos
        </Heading>
      </Container>
      <Container>
        <VideoComponent id={video?.key} small={false} />
      </Container>
      <Flex mt="5" mb="10" overflowX={"hidden"} gap="5">
        {videos &&
          videos?.map((item) => (
            <Box key={item?.id}>
              <VideoComponent id={item?.key} />
              <Text fontSize={"sm"} fontWeight={"bold"} mt="2" noOfLines="2">
                {item?.name}
              </Text>
            </Box>
          ))}
      </Flex>
      <Container maxW={"container.xl"} mt="8">
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(5, 1fr)",
          }}
          gap={"4"}
        >
          {recommend &&
            recommend?.map((item, i) =>
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

export default DetailsPage;
