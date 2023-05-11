import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
  } from '@chakra-ui/react';
import { useState, ChangeEvent } from 'react';
import {User} from '../types/user';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import signUp from '../components/sign-up';
import UserRequests from '../requests/user.requests';
const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [information, setInformation] = useState('');
    const setUsernameHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }
    const setEmailHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }
    const setPasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }
    const handleSignUp = async () => {
        try{if (username === '' || email === '' || password === '') {
            setInformation('Please fill in all the fields');
            return;
        }
        const user = await UserRequests.registerUser(username, email, password);
        if (user) {
            setUser(user);
            setInformation('Successfully registered');
        }}catch(error){
            setInformation(error.message);
        }


            
    }
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool features ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <Text id="information" color={'red.500'} fontSize={'sm'}>
                            {information}
                        </Text>
                        <HStack>
                            <Box>
                                <FormControl id="username" isRequired>
                                    <FormLabel>Username</FormLabel>
                                    <Input type="text" onChange={setUsernameHandler} />
                                </FormControl>
                            </Box>
                        </HStack>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" onChange={setEmailHandler} />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'} onChange={setPasswordHandler} />
                                <InputRightElement h={'full'}>
                                    <Button

                                        h={'full'}
                                        size={'md'}
                                        onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10}>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                onClick={handleSignUp}>
                                Sign up
                            </Button>
                            <Stack direction={'row'} align={'center'} justify={'center'}>
                                <Text>Already have an account?</Text>
                                <Link color={'blue.400'}>Sign in</Link>
                            </Stack>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};
export default Register;
