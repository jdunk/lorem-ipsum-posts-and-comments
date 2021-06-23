import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import { randRange } from '../util.js';

function Comment({ name, email, body, skeleton }) {
  return (
    <Box mb={3} pb={1} style={{
      borderBottom: '1px solid #ddd'
    }}>
      <Box display="flex" alignItems={ skeleton ? 'top' : 'baseline' } mt={0}>
        <Box my={0} clone>
        {
          skeleton ?
            <Skeleton animation="wave" height={20} width={`${randRange(25, 70)}%`} style={{ marginBottom: 25 }} />
            :
          <h4>{name}</h4>
        }
        </Box>
        <Box ml={1} style={{ fontSize: '0.84rem', fontWeight: 400 }}>
        {
          skeleton ?
            <Skeleton animation="wave" height={20} width={80}/>
            :
          <>({email})</>
        }
        </Box>
      </Box>
      <Box>
        {
          skeleton ?
            <>
              <Skeleton animation="wave" height={10} style={{ marginBottom: 30 }} width={`${randRange(15,95)}%`} />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 30 }} width={`${randRange(15,95)}%`} />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 30 }} width={`${randRange(15,95)}%`} />
              <Skeleton animation="wave" height={10} style={{ marginBottom: 30 }} width={`${randRange(15,95)}%`} />
            </>
            :
            body.split('\n').map((x, i) => <p key={i}>{x}</p>)
        }
      </Box>
    </Box>
  )
}

export default Comment;