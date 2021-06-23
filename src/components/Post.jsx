import { useCommentsState } from '../hooks/commentsState.js';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';
import { randRange } from '../util.js';

function Post({id, title, body, skeleton}) {
  const isSkeleton = skeleton;

  const {
    commentsState,
    setCommentsState,
  } = useCommentsState();

  return (
    <Box mb={4} py={1} px={3} align="left" style={{ cursor: isSkeleton ? 'auto' : 'pointer' }} clone>
      <Paper onClick={() => {
        setCommentsState({
          ...commentsState,
          dialogOpen: true,
          postId: id,
          postTitle: title,
        });
      }}>
        <Box mt={1} clone>
          {
            isSkeleton ?
              <Skeleton animation="wave" width={`${randRange(30, 85)}%`} style={{ marginTop: 10, marginBottom: 25 }} />
              :
              <h3>{title}</h3>
          }
        </Box>
        <Box>
          {
            isSkeleton ?
              <>
                <Skeleton animation="wave" height={10} style={{ marginBottom: 25 }} width={`${randRange(15,95)}%`} />
                <Skeleton animation="wave" height={10} style={{ marginBottom: 25 }} width={`${randRange(15,95)}%`} />
                <Skeleton animation="wave" height={10} style={{ marginBottom: 25 }} width={`${randRange(15,95)}%`} />
                <Skeleton animation="wave" height={10} style={{ marginBottom: 20 }} width={`${randRange(15,95)}%`} />
              </>
              :
              body.split('\n').map((x, i) => <p key={i}>{x}</p>)
          }
        </Box>
      </Paper>
    </Box>
  )
}

export default Post;