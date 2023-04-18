import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  SimpleGrid,
  // useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  useToast,
  Button,
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "react-use-cart";
import { useNavigate } from "react-router-dom";
import Veg from "../../Images/icons8-vegetarian-food-symbol-48.png";
import NonVeg from "../../Images/icons8-non-vegetarian-food-symbol-48.png";
import "./Order.css";

function ProductAddToCart(props) {
  const navigate = useNavigate();
  const toast = useToast();
  const { addItem, items } = useCart();
  return (
    <>
      <SimpleGrid minChildWidth="250px" spacing={2} p="10">
        <Flex
          className="flex-div"
          gap="15px"
          alignItems="stretch"
          flexWrap="wrap"
          // justifyContent="center"
        >
          {props.itm.length === 0 && (
            <Box>
              <h1>No Items</h1>
            </Box>
          )}
          {props.itm.map((data) => {
            return (
              <Box
                // bg={useColorModeValue("white", "gray.800")}
                maxW="sm"
                borderWidth="1px"
                rounded="lg"
                shadow="lg"
                position="relative"
                // w="250px"
                // h="full"
                key={data.id}
              >
                {data.isNew && (
                  <Circle
                    size="10px"
                    position="absolute"
                    top={2}
                    right={2}
                    bg="red.200"
                    border="2"
                  />
                )}

                <Image
                  src={data.image}
                  alt={`Picture of ${data.name}`}
                  roundedTop="lg"
                  w="270px"
                  h="270px"
                  objectFit="cover"
                />

                <Box p="6">
                  <Box d="flex" alignItems="baseline">
                    {data.isNew && (
                      <Badge
                        rounded="full"
                        px="2"
                        fontSize="0.8em"
                        colorScheme="red"
                      >
                        New
                      </Badge>
                    )}
                  </Box>
                  <Flex
                    mt="1"
                    justifyContent="space-between"
                    alignContent="center"
                  >
                    <Box
                      fontSize="2xl"
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                    >
                      {data.name}
                    </Box>
                  </Flex>

                  <Flex justifyContent="space-between" alignContent="center">
                    <Box
                      fontSize="2xl"
                      // color={useColorModeValue("gray.800", "white")}
                    >
                      <Box as="span" color={"gray.600"} fontSize="lg">
                        ₹
                      </Box>
                      {data.price}
                    </Box>
                  </Flex>
                  <Flex justifyContent="space-between" alignContent="center">
                    <Box
                      fontSize="2xl"
                      // color={useColorModeValue("gray.800", "white")}
                    >
                      <Box as="span" color={"gray.600"} fontSize="lg"></Box>
                      {data.type === "Veg" ? (
                        <Image src={Veg}></Image>
                      ) : (
                        <Image src={NonVeg}></Image>
                      )}
                    </Box>
                  </Flex>
                  <Flex
                    justifyContent="space-between"
                    alignContent="center"
                    mt="2"
                  >
                    <Box
                      fontSize="2xl"
                      // color={useColorModeValue("gray.800", "white")}
                    >
                      <Button
                        colorScheme="teal"
                        w="100"
                        onClick={() => {
                          navigate("/user/item-page");
                          addItem(data);
                        }}
                      >
                        Buy Now
                      </Button>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="center"
                      flexDirection="column-reverse"
                      alignItems="center"
                      mr="20"
                    >
                      <Tooltip
                        label="Add to cart"
                        bg="white"
                        placement={"top"}
                        color={"gray.800"}
                        fontSize={"1.2em"}
                      >
                        <chakra.a href={"#"} display={"flex"}>
                          <Icon
                            onClick={() => {
                              addItem(data);
                              toast({
                                title: `Added ${data.name} into Cart`,
                                position: "top-right",
                                status: "success",
                                isClosable: true,
                              });
                            }}
                            as={FiShoppingCart}
                            h={7}
                            w={7}
                            alignSelf={"center"}
                          />
                        </chakra.a>
                      </Tooltip>
                      {items.map((item, index) => {
                        if (item.name === data.name) {
                          return (
                            <Badge key={index} colorScheme="green">
                              {item.quantity}
                            </Badge>
                          );
                        }
                        // return <Badge colorScheme="green">0</Badge>;
                      })}
                    </Box>
                  </Flex>
                </Box>
              </Box>
            );
          })}
        </Flex>
      </SimpleGrid>
    </>
  );
}

export default ProductAddToCart;
