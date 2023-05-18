import { useState, useEffect, ChangeEvent, useContext } from 'react';
import { Box, Container, Heading, Input, Stack } from '@chakra-ui/react';

import UserList from '../components/user-list';

import UserRequests from '../requests/user.requests';
import { UserContext } from '../context/user.context';
import { User } from '../types/user';

const FindUsers = () => {
  const [userDetails, setUserDetails] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await UserRequests.getUsers();
      setUsers(users);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (userDetails === '') {
      setFilteredUsers([]);
      return;
    }
    const filteredUsers = users.filter(
      (u) =>
        (u.email.includes(userDetails) || u.username.includes(userDetails)) &&
        u.userId !== user?.userId
    );
    setFilteredUsers(filteredUsers);
  }, [userDetails, users]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserDetails(event.target.value);
  };

  return (
    <Container maxW={'10xl'}>
      <Stack
        as={Box}
        textAlign={'center'}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 16, md: 30 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '2xl', md: '4xl' }}
          lineHeight={'110%'}>
          Start typing <br /> to search for users
        </Heading>
        <Box mt={2}>
          <Input
            placeholder="Enter email or username"
            onChange={handleChange}
            value={userDetails}
            width="30rem"
          />
        </Box>
        <UserList users={filteredUsers} />
      </Stack>
    </Container>
  );
};

export default FindUsers;
