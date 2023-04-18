import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Image,
  IconProps,
} from '@chakra-ui/react';

export default function CallToActionWithIllustration() {
  return (
    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        //py={{ base: 20, md: 28 }}
        >
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}>
          Happy{' '}
          <Text as={'span'} color={'orange.400'}>
            Pallate
          </Text>
        </Heading>
        <Text color={'gray.500'} maxW={'3xl'}>
          Canteen is a very favourite place of all students. The college canteen doesn’t only provide food to the students but also wonderful memories. The college has a very small canteen selling only packaged foods for munching such as chips, cakes, biscuits etc.
        </Text>
        <Flex w={'full'}>
          <Image w='full' h='60vh' src='https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg' alt='food_image' />
        </Flex>
      </Stack>
    </Container>
  );
}

