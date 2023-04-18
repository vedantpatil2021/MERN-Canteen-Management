import React from 'react'
import Navbar from "../navbar/Navbar"
import {
    Box,
    Flex,
    Heading,
    useColorModeValue,
    SimpleGrid
} from '@chakra-ui/react';
import Order from "../../pages/Product/Order";

export default function Dashboard() {
    return (
        <>
            <Navbar />
            <Box p='2' borderStyle={'solid'} borderColor={useColorModeValue('gray.200', 'gray.900')} borderBottom={1}>
                <Flex h={16} p='8' alignItems={'center'} justifyContent={'space-between'} >
                    <Box w='100' gap='30px' display='flex' alignItems={'center'} justifyContent={'center'}>
                        <Heading as='h2' size='3xl' noOfLines={1}>
                            Current Orders
                        </Heading>
                    </Box>
                </Flex>
            </Box>
            <Box p='8'>
                {/* <SimpleGrid minChildWidth='250px' spacing={2} p='10'> */}
                    <Box><Order /></Box>
                {/* </SimpleGrid> */}
            </Box>
        </>
    )
}
