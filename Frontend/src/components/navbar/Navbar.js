import {
    Box,
    Flex,
    // Link,
    Heading,
    useDisclosure,
    useColorModeValue,
    Button,
    useColorMode,
} from '@chakra-ui/react';
import { ButtonProps } from '@chakra-ui/react';
import { BsSun, BsMoonStarsFill } from 'react-icons/bs';
import React from 'react'
import { HamburgerIcon,ChevronRightIcon } from '@chakra-ui/icons';
import { DrawerBody, DrawerHeader, DrawerContent, DrawerOverlay, Drawer, Icon, Divider } from '@chakra-ui/react'
import { Link } from 'react-router-dom';


export default function Simple(props: ButtonProps) {
    const { colorMode, toggleColorMode } = useColorMode()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [placement] = React.useState('left')
    return (
        <>
            <Box p='2' borderStyle={'solid'} borderColor={useColorModeValue('gray.200', 'gray.900')} borderBottom={1}>
                <Flex h={16} p='8' alignItems={'center'} justifyContent={'space-between'} >
                    <Box w='100' gap='30px' display='flex' alignItems={'center'} justifyContent={'center'}>
                        <Button colorScheme='teal' variant='outline' onClick={onOpen}>
                            <HamburgerIcon />
                        </Button>
                        <Heading as='h2' size='md' noOfLines={1}>
                            Happy Plates
                        </Heading>
                    </Box>
                    <Button
                        aria-label="Toggle Color Mode"
                        onClick={toggleColorMode}
                        _focus={{ boxShadow: 'none' }}
                        w="fit-content"
                        {...props}>
                        {colorMode === 'light' ? <BsMoonStarsFill /> : <BsSun />}
                    </Button>
                </Flex>
            </Box>
            <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth='1px'>Logo</DrawerHeader>
                    <DrawerBody>
                        <Link to="/canteen" >
                            <Flex align="center"
                                p="4"
                                mx="-2"
                                borderRadius="lg"
                                role="group"
                                cursor="pointer"
                                _hover={{
                                    bg: 'cyan.400',
                                    color: 'white',
                                }}>
                                <ChevronRightIcon mr="4"
                                    fontSize="16"
                                    _groupHover={{
                                        color: 'white',
                                    }} />
                                Home
                            </Flex>
                        </Link>
                        <Divider />
                        <Link to="/canteen/add-category" _focus={{ boxShadow: 'none' }}>
                            <Flex align="center"
                                p="4"
                                mx="-2"
                                borderRadius="lg"
                                role="group"
                                cursor="pointer"
                                _hover={{
                                    bg: 'cyan.400',
                                    color: 'white',
                                }}>
                                <ChevronRightIcon mr="4"
                                    fontSize="16"
                                    _groupHover={{
                                        color: 'white',
                                    }} />
                                Add Category
                            </Flex>
                        </Link>
                        <Divider />
                        <Link to="/canteen/add-items" _focus={{ boxShadow: 'none' }}>
                            <Flex align="center"
                                p="4"
                                mx="-2"
                                borderRadius="lg"
                                role="group"
                                cursor="pointer"
                                _hover={{
                                    bg: 'cyan.400',
                                    color: 'white',
                                }}>
                                <ChevronRightIcon mr="4"
                                    fontSize="16"
                                    _groupHover={{
                                        color: 'white',
                                    }} />
                                Add Items
                            </Flex>
                        </Link>
                        <Divider />
                        <Link to="/canteen/total-order" _focus={{ boxShadow: 'none' }}>
                            <Flex align="center"
                                p="4"
                                mx="-2"
                                borderRadius="lg"
                                role="group"
                                cursor="pointer"
                                _hover={{
                                    bg: 'cyan.400',
                                    color: 'white',
                                }}>
                                <ChevronRightIcon mr="4"
                                    fontSize="16"
                                    _groupHover={{
                                        color: 'white',
                                    }} />
                                Total Order
                            </Flex>
                        </Link>
                        <Divider />
                        <Link to="/" _focus={{ boxShadow: 'none' }}>
                            <Flex align="center"
                                p="4"
                                mx="-2"
                                borderRadius="lg"
                                role="group"
                                cursor="pointer"
                                _hover={{
                                    bg: 'cyan.400',
                                    color: 'white',
                                }}>
                                <ChevronRightIcon mr="4"
                                    fontSize="16"
                                    _groupHover={{
                                        color: 'white',
                                    }} />
                                Logout
                            </Flex>
                        </Link>
                        <Divider />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}