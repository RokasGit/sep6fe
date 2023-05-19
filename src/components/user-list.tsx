import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/user';
import { Box, Button, Card, CardBody, Text } from '@chakra-ui/react';

type UserListProps = {
  users: User[] | null;
};

const UserList: FC<UserListProps> = ({ users }) => {
  const navigate = useNavigate();

  return (
    <>
      {users && users.length === 0 ? (
        <Text>No users found 😕</Text>
      ) : (
        <>
          {users &&
            users.map((user) => (
              <Card key={user.userId} maxW="sm" margin="2rem auto !important">
                <CardBody>
                  <Box display="flex" flexDir="column" gap={4}>
                    <Text>{user.username}</Text>
                    <Button onClick={() => navigate(`/profile/${user.userId}`)}>
                      See full profile
                    </Button>
                  </Box>
                </CardBody>
              </Card>
            ))}
        </>
      )}
    </>
  );
};

export default UserList;
