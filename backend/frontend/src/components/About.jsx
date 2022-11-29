import React from 'react'
import { Flex, Avatar, Box, Heading, Text, IconButton, Center, Stack, Link } from '@chakra-ui/react'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

const About = () => {
    return (
        <>
            <Box p={'10px 60px 10px 60px'}>

                <br></br><br></br>
                <Text fontSize='3xl' color="darkgreen">
                    About
                </Text>
                <br></br>

                <Box p={'0px 100px 0px 100px'}>
                    <Text fontSize='xl' align="left">
                        NYC Basics is a tool to help New Yorkers find and navigate to free basic amenities
                        like water fountains, toilets, benches, wifi spots and parking lots.
                    </Text>

                </Box>


                <br></br><br></br>


                <Text fontSize='3xl'  color="darkgreen">
                    The Team
                </Text>

                <br></br>

                <Center>
                    <Box>
                        <Stack
                            direction={{ base: 'column', md: 'row' }}
                            spacing={2} >

                            {/* Akshat Card */}
                            <Box
                                borderWidth='2px'
                                borderRadius='lg'
                                overflow='hidden'
                                _hover={{ boxShadow: "2xl" }}>


                                {/* Intro Box */}
                                <Box p={5}>
                                    <Flex spacing='4'>
                                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                            <Avatar name='Akshat Sharma' src='https://media-exp1.licdn.com/dms/image/C4E03AQFLSCoSVxrAGg/profile-displayphoto-shrink_400_400/0/1652409976930?e=1675296000&v=beta&t=RejgqBqRU2nNlpuSEHuaRsqyNFHWxUZs23ieAVJQ0-U' />

                                            <Box>
                                                <Heading size='sm'>Akshat Sharma</Heading>
                                                <Text>Developer</Text>
                                            </Box>
                                        </Flex>
                                    </Flex>
                                </Box>
                                <hr></hr>

                                {/* Icons box */}
                                <Center>

                                    <Box
                                        p={5} >
                                        <Stack
                                            direction="row"
                                            spacing="5px" >

                                            <Link
                                                href="src"
                                                target="_blank"
                                                rel="noopener">
                                                <IconButton
                                                    _focus={{ outline: "none" }}
                                                    _hover={{ color: "black" }}
                                                    isRound={true}
                                                    size='md'
                                                    fontSize='22px'
                                                    aria-label='Github Btn'
                                                    icon={<AiFillGithub />}
                                                    bgColor="green"
                                                    opacity={.7}
                                                />
                                            </Link>

                                            <Link
                                                href="src"
                                                target="_blank"
                                                rel="noopener">
                                                <IconButton
                                                    _focus={{ outline: "none" }}
                                                    _hover={{ color: "black" }}
                                                    isRound={true}
                                                    size='md'
                                                    fontSize='22px'
                                                    aria-label='Linkedin Btn'
                                                    icon={<AiFillLinkedin />}
                                                    bgColor="grey"
                                                    opacity={.7}
                                                />
                                            </Link>



                                        </Stack>

                                    </Box>
                                </Center>
                            </Box>


                            {/* Adnan Card */}
                            <Box
                                borderWidth='2px'
                                borderRadius='lg'
                                overflow='hidden'
                                _hover={{ boxShadow: "2xl" }}>


                                {/* Intro Box */}
                                <Box p={5}>
                                    <Flex spacing='4'>
                                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                            <Avatar name='Adnan Ahsan' src='https://media-exp1.licdn.com/dms/image/D4D35AQG2U9kmYG1Z8g/profile-framedphoto-shrink_400_400/0/1638043936719?e=1670220000&v=beta&t=PQKFg3YecDnVGQfJigG2WcWNys5-T1qVF8yyrcaPGac' />

                                            <Box>
                                                <Heading size='sm'>Adnan Ahsan</Heading>
                                                <Text>Developer</Text>
                                            </Box>
                                        </Flex>
                                    </Flex>
                                </Box>
                                <hr></hr>

                                {/* Icons box */}
                                <Center>

                                    <Box
                                        p={5} >
                                        <Stack
                                            direction="row"
                                            spacing="5px" >

                                            <Link
                                                href="src"
                                                target="_blank"
                                                rel="noopener">
                                                <IconButton
                                                    _focus={{ outline: "none" }}
                                                    _hover={{ color: "black" }}
                                                    isRound={true}
                                                    size='md'
                                                    fontSize='22px'
                                                    aria-label='Github Btn'
                                                    icon={<AiFillGithub />}
                                                    bgColor="green"
                                                    opacity={.7}
                                                />
                                            </Link>

                                            <Link
                                                href="src"
                                                target="_blank"
                                                rel="noopener">
                                                <IconButton
                                                    _focus={{ outline: "none" }}
                                                    _hover={{ color: "black" }}
                                                    isRound={true}
                                                    size='md'
                                                    fontSize='22px'
                                                    aria-label='Linkedin Btn'
                                                    icon={<AiFillLinkedin />}
                                                    bgColor="grey"
                                                    opacity={.7}
                                                />
                                            </Link>

                                        </Stack>
                                    </Box>
                                </Center>
                            </Box>



                            {/* Dinesh Card */}
                            <Box
                                borderWidth='2px'
                                borderRadius='lg'
                                overflow='hidden'
                                _hover={{ boxShadow: "2xl" }}>


                                {/* Intro Box */}
                                <Box p={5}>
                                    <Flex spacing='4'>
                                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                            <Avatar name='Dinesh Kumar' src='https://media-exp1.licdn.com/dms/image/D4D35AQEl20kSlCHorA/profile-framedphoto-shrink_400_400/0/1633484913595?e=1670220000&v=beta&t=QG3Voz3WF62kyuovqXqnEDZAmX2f7z6W01lgDTVpBy8' />

                                            <Box>
                                                <Heading size='sm'>Dinesh Kumar</Heading>
                                                <Text>Developer</Text>
                                            </Box>
                                        </Flex>
                                    </Flex>
                                </Box>
                                <hr></hr>

                                {/* Icons box */}
                                <Center>

                                    <Box
                                        p={5} >
                                        <Stack
                                            direction="row"
                                            spacing="5px" >

                                            <Link
                                                href="src"
                                                target="_blank"
                                                rel="noopener">
                                                <IconButton
                                                    _focus={{ outline: "none" }}
                                                    _hover={{ color: "black" }}
                                                    isRound={true}
                                                    size='md'
                                                    fontSize='22px'
                                                    aria-label='Github Btn'
                                                    icon={<AiFillGithub />}
                                                    bgColor="green"
                                                    opacity={.7}
                                                />
                                            </Link>

                                            <Link
                                                href="src"
                                                target="_blank"
                                                rel="noopener">
                                                <IconButton
                                                    _focus={{ outline: "none" }}
                                                    _hover={{ color: "black" }}
                                                    isRound={true}
                                                    size='md'
                                                    fontSize='22px'
                                                    aria-label='Linkedin Btn'
                                                    icon={<AiFillLinkedin />}
                                                    bgColor="grey"
                                                    opacity={.7}
                                                />
                                            </Link>



                                        </Stack>

                                    </Box>
                                </Center>
                            </Box>



                            {/* Suyash Card */}
                            <Box
                                borderWidth='2px'
                                borderRadius='lg'
                                overflow='hidden'
                                _hover={{ boxShadow: "2xl" }}>


                                {/* Intro Box */}
                                <Box p={5}>
                                    <Flex spacing='4'>
                                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                            <Avatar name='Suyash Soniminde' src='https://media-exp1.licdn.com/dms/image/C5603AQGH333B9WYQ9g/profile-displayphoto-shrink_400_400/0/1630367307066?e=1675296000&v=beta&t=4Qe5PlgUIArdZVorpBOtmSw3QVYn4qSVMxt_5q8Aijw' />

                                            <Box>
                                                <Heading size='sm'>Suyash Soniminde</Heading>
                                                <Text>Developer</Text>
                                            </Box>
                                        </Flex>
                                    </Flex>
                                </Box>
                                <hr></hr>

                                {/* Icons box */}
                                <Center>

                                    <Box
                                        p={5} >
                                        <Stack
                                            direction="row"
                                            spacing="5px" >

                                            <Link
                                                href="src"
                                                target="_blank"
                                                rel="noopener">
                                                <IconButton
                                                    _focus={{ outline: "none" }}
                                                    _hover={{ color: "black" }}
                                                    isRound={true}
                                                    size='md'
                                                    fontSize='22px'
                                                    aria-label='Github Btn'
                                                    icon={<AiFillGithub />}
                                                    bgColor="green"
                                                    opacity={.7}
                                                />
                                            </Link>

                                            <Link
                                                href="src"
                                                target="_blank"
                                                rel="noopener">
                                                <IconButton
                                                    _focus={{ outline: "none" }}
                                                    _hover={{ color: "black" }}
                                                    isRound={true}
                                                    size='md'
                                                    fontSize='22px'
                                                    aria-label='Linkedin Btn'
                                                    icon={<AiFillLinkedin />}
                                                    bgColor="grey"
                                                    opacity={.7}
                                                />
                                            </Link>



                                        </Stack>

                                    </Box>
                                </Center>
                            </Box>



                            {/* Viha Card */}
                            <Box
                                borderWidth='2px'
                                borderRadius='lg'
                                overflow='hidden'
                                _hover={{ boxShadow: "2xl" }}>


                                {/* Intro Box */}
                                <Box p={5}>
                                    <Flex spacing='4'>
                                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                            <Avatar name='Viha Gupta' src='https://media-exp1.licdn.com/dms/image/C4D03AQFKrYwNiiWqnA/profile-displayphoto-shrink_400_400/0/1638146099438?e=1675296000&v=beta&t=AX3xYCvykPmB3Jud934O7-JNjreY8tFsU2QT2gex4Ic' />

                                            <Box>
                                                <Heading size='sm'>Viha Gupta</Heading>
                                                <Text>Developer</Text>
                                            </Box>
                                        </Flex>
                                    </Flex>
                                </Box>
                                <hr></hr>

                                {/* Icons box */}
                                <Center>

                                    <Box
                                        p={5} >
                                        <Stack
                                            direction="row"
                                            spacing="5px" >

                                            <Link
                                                href="https://www.github.com/guptaviha"
                                                target="_blank"
                                                rel="noopener">
                                                <IconButton
                                                    _focus={{ outline: "none" }}
                                                    _hover={{ color: "black" }}
                                                    isRound={true}
                                                    size='md'
                                                    fontSize='22px'
                                                    aria-label='Github Btn'
                                                    icon={<AiFillGithub />}
                                                    bgColor="green"
                                                    opacity={.7}
                                                />
                                            </Link>

                                            <Link
                                                href="https://www.linkedin.com/in/vihagupta/"
                                                target="_blank"
                                                rel="noopener">
                                                <IconButton
                                                    _focus={{ outline: "none" }}
                                                    _hover={{ color: "black" }}
                                                    isRound={true}
                                                    size='md'
                                                    fontSize='22px'
                                                    aria-label='Linkedin Btn'
                                                    icon={<AiFillLinkedin />}
                                                    bgColor="grey"
                                                    opacity={.7}
                                                />
                                            </Link>



                                        </Stack>

                                    </Box>
                                </Center>
                            </Box>

                        </Stack>

                    </Box>
                </Center>

            </Box>
        </>
    )
}

export default About;