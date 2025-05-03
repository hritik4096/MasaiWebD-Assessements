import { Box, Grid, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

function MainContent() {
  const { theme } = useContext(ThemeContext);
  const bg = theme === 'light' ? 'gray.100' : 'gray.700';
  const cardBg = theme === 'light' ? 'white' : 'gray.800';

  const products = ['Laptop', 'Phone', 'Monitor', 'Keyboard', 'Mouse'];

  return (
    <Box flex="1" p="4" bg={bg}>
      <Grid templateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} gap="4">
        {products.map((item) => (
          <Box key={item} p="4" bg={cardBg} shadow="md" borderRadius="md">
            <Text>{item}</Text>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
export default MainContent;