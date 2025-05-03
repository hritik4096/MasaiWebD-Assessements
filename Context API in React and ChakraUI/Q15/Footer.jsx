import { Box, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

function Footer() {
  const { theme } = useContext(ThemeContext);
  const bg = theme === 'light' ? 'gray.300' : 'gray.900';
  return (
    <Box p="4" bg={bg} color="white" textAlign="center">
      <Text>Footer Section</Text>
    </Box>
  );
}
export default Footer;