import { useState, ChangeEvent, ReactNode, FC } from 'react';
import { useNavigate, Outlet } from "react-router-dom";

import {
    Box,
    useColorModeValue,
    Flex,
    HStack,
    Link,
    IconButton,
    Menu,
    LinkProps,
  } from '@chakra-ui/react';

  const Links = ['Toplist', 'Watchlist'];

type NavLinkProps = {} & LinkProps

const NavLink: FC<NavLinkProps> = ({children , ...otherProps}) => (
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
            <Box>Logo</Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink 
                  key={link} onClick={() => {
                    navigate(`/${link.toLocaleLowerCase()}`);
                  }}>{link}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
            </Menu>
          </Flex>
        </Flex>
      </Box>
      <Outlet/>
      </>
    )
}

export default Navbar;