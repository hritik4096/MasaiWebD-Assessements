import { ChakraProvider, Flex } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import { AuthContextProvider } from './AuthContext';
import { ThemeContextProvider } from './ThemeContext';

function App() {
  return (
    <AuthContextProvider>
      <ThemeContextProvider>
        <ChakraProvider>
          <Flex direction="column" minHeight="100vh">
            <Navbar />
            <Flex flex="1">
              <Sidebar />
              <MainContent />
            </Flex>
            <Footer />
          </Flex>
        </ChakraProvider>
      </ThemeContextProvider>
    </AuthContextProvider>
  );
}

export default App;