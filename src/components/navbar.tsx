import { useState, useContext, ChangeEvent, ReactNode, FC } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

import {
  Box,
  useColorModeValue,
  Flex,
  HStack,
  Link,
  IconButton,
  Menu,
  LinkProps,
  Button,
  Avatar,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react';

import { UserContext } from '../context/user.context';

const Links = ['Toplist', 'Watchlist'];

type NavLinkProps = {} & LinkProps;

const NavLink: FC<NavLinkProps> = ({ children, ...otherProps }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    {...otherProps}>
    {children}
  </Link>
);

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
          />
          <HStack spacing={8} alignItems={'center'}>
            <NavLink
              onClick={() => {
                navigate('/');
              }}>
              Home
            </NavLink>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {user &&
                Links.map((link) => (
                  <NavLink
                    key={link}
                    onClick={() => {
                      navigate(`/${link.toLocaleLowerCase()}`);
                    }}>
                    {link}
                  </NavLink>
                ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'} gap={3}>
            {user ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  textDecoration="none !important"
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar name={user.username} size={'sm'} />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => navigate(`/profile/${user.userId}`)}>
                    👤 Profile
                  </MenuItem>
                  <MenuItem onClick={() => navigate('/find-users')}>
                    🧑 Find users
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem>➡️ Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <>
                <Button
                  colorScheme="green"
                  variant={'outline'}
                  onClick={() => navigate('/login')}>
                  Log In
                </Button>
                <Button
                  colorScheme={'green'}
                  bg={'green.400'}
                  _hover={{
                    bg: 'green.500',
                  }}
                  onClick={() => navigate('/register')}>
                  Register
                </Button>
              </>
            )}
          </Flex>
        </Flex>
      </Box>
      <Outlet />
    </>
  );
};

export default Navbar;
