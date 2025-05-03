import { Flex, Text, Button } from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { ThemeContext } from '../ThemeContext';

function Navbar() {
  const { isLoggedIn, toggleAuth } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const bg = theme === 'light' ? 'gray.100' : 'gray.700';

  return (
    <Flex bg={bg} p="4" justify="space-between" align="center">
      <Text>{isLoggedIn ? 'Logged In' : 'Logged Out'}</Text>
      <Flex gap="4">
        <Button onClick={toggleAuth}>{isLoggedIn ? 'Log Out' : 'Log In'}</Button>
        <Button onClick={toggleTheme}>Toggle Theme</Button>
      </Flex>
    </Flex>
  );
}
export default Navbar;