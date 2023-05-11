import { useState, useContext, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../context/user.context';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import UserRequests from '../requests/user.requests';

const defaultFormFields = {
  email: '',
  password: '',
};

const Login = () => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { email, password } = formFields;

  const { setUser } = useContext(UserContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    if (!email || !password) {
      setError('Please fill in all the fields');
      return;
    }

    try {
      const user = await UserRequests.loginUser(email, password);
      if (user) {
        resetFormFields();
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        setError('');
        navigate('/');
      }
    } catch (e) {
      setError((e as Error).message);
    }

    setIsLoading(false);
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
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
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                {/* <Checkbox>Remember me</Checkbox> */}
                <Link color={'blue.400'} onClick={() => navigate('/register')}>
                  Don't have an account?
                </Link>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleLogin}
                isLoading={isLoading}>
                Sign in
              </Button>
              <Text color={'red.500'} fontSize={'sm'}>
                {error}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
