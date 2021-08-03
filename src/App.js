import { Button, Flex, Heading, Input, Select, Spinner } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Character from './Character'

function App() {
  const [characters, setCharacter] = useState([])
  const [info, setInfo] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [searchCharacter, setSearchCharacter] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    const characters = getCharacters()

    setCharacter(characters)
  }, [])

  const getCharacters = async () => {
    setIsLoading(true)

    const data = await fetch('https://rickandmortyapi.com/api/character')
      .then((response) => response.json())
      .then((data) => data)

    setInfo(data.info)
    setCharacter(data.results)
    setIsLoading(false)
  }

  // const reSearch = async () => {
  //   setIsLoading(true)
  //   const nextPage = info.next

  //   const data = await fetch(nextPage)
  //     .then((response) => response.json())
  //     .then((data) => data)

  //   setInfo(data.info)
  //   const newData = characters.concat(data.results)
  //   setCharacter(newData)
  //   setIsLoading(false)
  // }

  const findCharacter = async () => {
    setIsLoading(true)

    const data = await fetch(
      `https://rickandmortyapi.com/api/character/?name=${searchCharacter}&status=${status}`
    )
      .then((response) => response.json())
      .then((data) => data)

    setInfo(data.info)
    setCharacter(data.error ? [] : data.results)
    setIsLoading(false)
  }

  const handleSearchChange = ({ target: { value } }) => {
    setSearchCharacter(value)
  }

  const hanldeStatus = ({ target: { value } }) => {
    setStatus(value)
  }

  return (
    <Flex
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100hv"
      flexDir="column"
      width="100hv"
    >
      <Heading>Rick And Morty</Heading>
      <Flex marginTop="30px" alignItems="center" justifyContent="center">
        <Input
          variant="filled"
          placeholder="Find Character"
          width="xl"
          onChange={handleSearchChange}
          value={searchCharacter}
        />
        <Select
          variant="filled"
          placeholder="Status"
          marginRight="5px"
          marginLeft="10px"
          width="120px"
          height="40px"
          borderRadius="5px"
          onChange={hanldeStatus}
        >
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </Select>
        <Button marginLeft="5" onClick={findCharacter}>
          Buscar &nbsp; {isLoading && <Spinner />}
        </Button>
      </Flex>
      <Flex
        width="100%"
        marginTop="50px"
        padding="25px"
        flexWrap="wrap"
        gridGap="50px"
      >
        {!isLoading &&
          characters.map((character, index) => (
            <Character key={index} info={character} />
          ))}
      </Flex>
    </Flex>
  )
}

export default App
