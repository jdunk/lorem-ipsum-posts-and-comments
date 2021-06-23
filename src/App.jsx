import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { CommentsStateProvider } from './hooks/commentsState.js';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CSSBaseline from '@material-ui/core/CssBaseline';
import PostsList from './components/PostsList.jsx';
import Comments from './components/Comments.jsx';
import lightBlue from '@material-ui/core/colors/lightBlue';

const theme = createMuiTheme({
  palette: {
    background: {
      default: lightBlue[100],
    }
  }
});

export default function App() {
  return (
    <CommentsStateProvider>
      <ThemeProvider theme={theme}>
        <CSSBaseline />
        <Container fixed>
          <Box align="center" mt={3}>
            <PostsList />
            <Comments />
          </Box>
        </Container>
      </ThemeProvider>
    </CommentsStateProvider>
  );
}