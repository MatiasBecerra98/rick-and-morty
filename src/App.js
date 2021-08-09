import { Button, Flex, Image, Input, Select, Spinner } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import RickAndMorty from './img/rick-and-morty-title.png'
import InfiniteScroll from 'react-infinite-scroll-component'
import Character from './Character'

function App() {
  const [characters, setCharacter] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchCharacter, setSearchCharacter] = useState('')
  const [status, setStatus] = useState('')
  const [hasMore, setHasMore] = useState(true)
  const [nextPage, setNextPage] = useState('')

  useEffect(() => {
    const characters = getCharacters()

    setCharacter(characters)
  }, [])

  const getCharacters = async () => {
    setIsLoading(true)

    const data = await fetch('https://rickandmortyapi.com/api/character').then(
      (response) => response.json()
    )

    setNextPage(data.info.next)
    setCharacter(data.results)
    setIsLoading(false)
  }

  const reSearch = async () => {
    setIsLoading(true)
    const data = await fetch(nextPage).then((response) => response.json())
    setNextPage(data.info.next)
    data.info.next ? setHasMore(true) : setHasMore(false)
    const newData = characters.concat(data.results)
    setCharacter(newData)
    setIsLoading(false)
  }

  const findCharacter = async () => {
    setIsLoading(true)
    const data = await fetch(
      `https://rickandmortyapi.com/api/character/?name=${searchCharacter}&status=${status}`
    ).then((response) => response.json())

    data.info.next ? setHasMore(true) : setHasMore(false)
    setNextPage(data.info.next)
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
      <Flex>
        <Image width="400px" src={RickAndMorty} />
      </Flex>
      <Flex
        width="100%"
        marginTop="30px"
        alignItems="center"
        justifyContent="center"
      >
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
      <InfiniteScroll
        dataLength={characters.length}
        next={reSearch}
        hasMore={hasMore}
        loader={
          <Flex justifyContent="center">
            <Spinner size="xl" />
          </Flex>
        }
        style={{ overflow: 'hidden' }}
      >
        <Flex
          width="100%"
          marginTop="50px"
          padding="25px"
          flexWrap="wrap"
          gridGap="50px"
        >
          {characters.length > 0 &&
            characters.map((character, index) => (
              <Character key={index} info={character} />
            ))}
        </Flex>
      </InfiniteScroll>
    </Flex>
  )
}

export default App
