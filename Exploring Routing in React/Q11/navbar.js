import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Flex, Text, Button } from '@chakra-ui/react';

function Navbar() {
  return (
    <Box bg="gray.800" w="100%" p={4} color="white">
      <Flex justify="space-between" align="center">
        {/* Logo Section */}
        <Text fontSize="xl" fontWeight="bold" color="white">
          My Website
        </Text>

        {/* Navigation Links */}
        <Flex display={{ base: 'none', md: 'flex' }} gap={4}>
          <NavLink 
            to="/" 
            style={({ isActive }) => ({
              color: isActive ? 'blue.500' : 'white',
              textDecoration: 'none',
              fontWeight: isActive ? 'bold' : 'normal',
            })}
            activeClassName="active-link"
          >
            <Button variant="link">Home</Button>
          </NavLink>
          <NavLink 
            to="/about" 
            style={({ isActive }) => ({
              color: isActive ? 'blue.500' : 'white',
              textDecoration: 'none',
              fontWeight: isActive ? 'bold' : 'normal',
            })}
            activeClassName="active-link"
          >
            <Button variant="link">About</Button>
          </NavLink>
          <NavLink 
            to="/contact" 
            style={({ isActive }) => ({
              color: isActive ? 'blue.500' : 'white',
              textDecoration: 'none',
              fontWeight: isActive ? 'bold' : 'normal',
            })}
            activeClassName="active-link"
          >
            <Button variant="link">Contact</Button>
          </NavLink>
          <NavLink 
            to="/services" 
            style={({ isActive }) => ({
              color: isActive ? 'blue.500' : 'white',
              textDecoration: 'none',
              fontWeight: isActive ? 'bold' : 'normal',
            })}
            activeClassName="active-link"
          >
            <Button variant="link">Services</Button>
          </NavLink>
        </Flex>

        {/* Mobile Menu Button */}
        <Button display={{ md: 'none' }} colorScheme="teal">
          Menu
        </Button>
      </Flex>

      {/* Mobile Links (Stacked Vertically on Small Screens) */}
      <Flex
        direction="column"
        display={{ base: 'flex', md: 'none' }}
        mt={4}
        gap={4}
      >
        <NavLink to="/" style={({ isActive }) => ({
          color: isActive ? 'blue.500' : 'white',
          textDecoration: 'none',
        })}>
          <Button variant="link">Home</Button>
        </NavLink>
        <NavLink to="/about" style={({ isActive }) => ({
          color: isActive ? 'blue.500' : 'white',
          textDecoration: 'none',
        })}>
          <Button variant="link">About</Button>
        </NavLink>
        <NavLink to="/contact" style={({ isActive }) => ({
          color: isActive ? 'blue.500' : 'white',
          textDecoration: 'none',
        })}>
          <Button variant="link">Contact</Button>
        </NavLink>
        <NavLink to="/services" style={({ isActive }) => ({
          color: isActive ? 'blue.500' : 'white',
          textDecoration: 'none',
        })}>
          <Button variant="link">Services</Button>
        </NavLink>
      </Flex>
    </Box>
  );
}

export default Navbar;