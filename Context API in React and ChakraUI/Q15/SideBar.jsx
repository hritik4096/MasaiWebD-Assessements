import { Box, Text, useBreakpointValue } from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { ThemeContext } from '../ThemeContext';

function Sidebar() {
  const { isLoggedIn } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (isMobile) return null;

  const bg = theme === 'light' ? 'gray.200' : 'gray.600';

  return (
    <Box w="250px" p="4" bg={bg}>
      {isLoggedIn && <Text>Welcome, User!</Text>}
    </Box>
  );
}
export default Sidebar;