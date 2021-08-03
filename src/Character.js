import { Box, Flex, Heading, Image, Badge } from '@chakra-ui/react'

const Character = ({ info }) => {
  const isAlive = () => {
    return info.status === 'Alive'
  }

  const characterStatus = (status) => {
    if (status === 'Alive') {
      return 'green'
    } else if (status === 'Dead') {
      return 'red'
    } else {
      return 'gray'
    }
  }

  return (
    <Box borderWidth="1px" borderRadius="lg" width="400px" height="400px">
      <Flex
        p="10px"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        <Heading as="h3" size="md">
          {info.name}
        </Heading>
        <p>{info.species}</p>
        <Badge ml="1" colorScheme={characterStatus(info.status)}>
          {info.status}
        </Badge>
      </Flex>
      <Flex justifyContent="center" alignItems="center">
        <Image
          src={info.image}
          alt={info.name}
          width="300px"
          height="300px"
          opacity={isAlive() ? 'unset' : '0.2'}
        />
      </Flex>
    </Box>
  )
}

export default Character
