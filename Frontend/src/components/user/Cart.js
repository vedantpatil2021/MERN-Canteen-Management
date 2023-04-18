import {
  Box,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  NumberInput,
  NumberInputField,
  Text,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Center,
  Divider,
  Button,
  Image,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import UserNavbar from "../navbar/UserNavbar";
import SupportedCard from "../../Images/SupportedCards.png";
import { BsCreditCard2BackFill, BsCashStack } from "react-icons/bs";
import { DeleteIcon } from "@chakra-ui/icons";
import "./Cart.css";
import { useCart } from "react-use-cart";
import { RoleContext } from "../../App";
import { useContext } from "react";

export default function ItemPage() {
  const role = useContext(RoleContext);
  const { isEmpty, items, cartTotal, updateItemQuantity, removeItem, emptyCart } = useCart();
  let totalprice;
  let order = {
    orders: [{}],
  };
  const addorder = async () => {
    totalprice = cartTotal;
    order.orders = items;
    let paymentStatus = "Pending";
    try {
      const res = await fetch("/addOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order,
          totalprice,
          studentname:role.name,
          stuid:role._id,
          paymentStatus,
        }),
      });

      const dataa = await res.json();

      if (dataa === "404") {
        return alert("Wrong");
      }
      if (dataa === "200") {
        alert("Success");
      }
    } catch (err) {
      alert(err);
    }
    emptyCart();
  };
  // if (isEmpty) return <h1 className=" text-center "> Your Cart is Empty </h1>;
  return (
    <>
      <UserNavbar />
      <Flex flexDirection="row" justifyContent="space-between" p="5">
        <div className="responsive-div">
          <Box
            w="100%"
            h="100%"
            p="5"
            borderColor="white"
            border="1px"
            borderRadius="8px"
          >
            <Heading as="h2" fontSize="2.8rem" noOfLines={1}>
              Food Cart
            </Heading>
            <Center>
              <Divider orientation="horizontal" />
            </Center>
            <TableContainer mt="14">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th fontSize="lg"></Th>
                    <Th fontSize="lg">Photo</Th>
                    <Th fontSize="lg">Name</Th>
                    <Th fontSize="lg">Price</Th>
                    <Th fontSize="lg">Quantity</Th>
                    <Th fontSize="lg" isNumeric>
                      SubTotal
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {isEmpty && (
                    <Tr>
                      <Td>Your Cart Is Empty</Td>
                    </Tr>
                  )}
                  {items.map((item, index) => {
                    return (
                      <Tr key={item.id}>
                        <Td>{index + 1}</Td>
                        <Td>
                          <Image
                            // borderRadius="full"
                            objectFit="contain"
                            boxSize="100px"
                            src={item.image}
                            alt="Dan Abramov"
                          />{" "}
                        </Td>
                        <Td>{item.name}</Td>
                        <Td>{item.price}</Td>
                        <Td>
                          <NumberInput
                            w="16"
                            value={item.quantity}
                            defaultValue={1}
                            min={0}
                            max={5}
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper
                                onClick={() =>
                                  updateItemQuantity(item.id, item.quantity + 1)
                                }
                              />
                              <NumberDecrementStepper
                                onClick={() =>
                                  updateItemQuantity(item.id, item.quantity - 1)
                                }
                              />
                            </NumberInputStepper>

                            <IconButton
                              colorScheme="teal"
                              aria-label="Call Segun"
                              size="md"
                              variant="outline"
                              onClick={() => {
                                removeItem(item.id);
                              }}
                              icon={<DeleteIcon />}
                            />
                          </NumberInput>
                        </Td>
                        <Td isNumeric>{item.itemTotal}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th></Th>
                    <Th></Th>
                    <Th isNumeric></Th>
                    <Th isNumeric></Th>
                    <Th isNumeric fontSize="lg">
                      Grand Total
                    </Th>
                    <Th isNumeric fontSize="lg">
                      {cartTotal}
                    </Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </Box>
          {/* <Center height='600'>
            <Divider orientation='vertical' />
          </Center> */}
          <Box w="100%" h="100%" p="6">
            <Heading as="h2" fontSize="2.4rem" noOfLines={1}>
              Billing
            </Heading>
            <Center>
              <Divider orientation="horizontal" />
            </Center>
            <Box p="10" display="flex" justifyContent="space-between">
              <Text fontSize="2xl">Grand Total</Text>
              <Text fontSize="2xl">
                <strong>₹{cartTotal}</strong>
              </Text>
            </Box>
            <Center>
              <Divider orientation="horizontal" />
            </Center>
            <Text fontSize="2xl" mt="5">
              WE ACCEPT:
            </Text>
            <Image src={SupportedCard} alt="" />
            <Button colorScheme="teal" w="100%" mt="10" size="lg">
              <Icon as={BsCreditCard2BackFill} />
              &nbsp;&nbsp;Pay
            </Button>
            <Divider orientation="horizontal" mt="8" />
            <Button colorScheme="teal" w="100%" mt="10" size="lg" onClick={addorder}>
              <Icon as={BsCashStack} /> &nbsp;&nbsp;Pay By Cash
            </Button>
          </Box>
        </div>
      </Flex>
    </>
  );
}
