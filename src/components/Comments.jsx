import { useState, useEffect, useRef } from 'react';
import { useCommentsState } from '../hooks/commentsState.js';
import axios from 'axios';
import config from '../config.js';
import Comment from './Comment.jsx';
import CommentForm from './CommentForm.jsx';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Comments() {
  const [ fetchedComments, setFetchedComments ] = useState(null); // local state
  const {
    commentsState,
    setCommentsState,
    userComments,
  } = useCommentsState();
  const { dialogOpen, postId, postTitle } = commentsState;

  const displayComments = fetchedComments && [
    ...fetchedComments,
    ...(userComments[postId] ?? []),
  ];

  const setDialogOpen = (val) => setCommentsState({
    ...commentsState,
    dialogOpen: val
  });

  const loadComments = async (postId) => {
    if (!postId) return;

    setFetchedComments(null);

    try {
      const res = await axios.get(`${config.commentsApiEndpoint}?postId=${postId}`);
      
      if (!res?.data?.length)
        setFetchedComments(false);

      /* NOTE: Uncomment the next 3 lines to test the handling of API errors */
      // if (Math.random() > 0.5)
      //   setFetchedComments(false);
      // else
      setFetchedComments([...res.data]);
    }
    catch(e) {
      setFetchedComments(false);
    }
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const contentElementRef = useRef(null);
  useEffect(() => {
    if (dialogOpen) {
      const { current: contentElement } = contentElementRef;
      if (contentElement !== null) {
        contentElement.focus();
      }
    }
  }, [dialogOpen]);

  useEffect(() => {
    loadComments(postId);
  }, [postId]);

  const errorLoadingComments = (<>
    There was an error loading comments.{' '}
    <Button variant="contained" disableElevation onClick={() => loadComments(postId)}>Try again?</Button>
  </>);

  const commentsSkeleton = [
    ...Array(5).fill().map((x, i) => (
      <Comment
        key={`skeleton-${i}`}
        skeleton={true}
      />
    )),
    /**
     * Comments appear in a dialog with a dynamic width that stretches or
     * shrinks to fit its contents.
     * 
     * Because the actual API data contains some dubiously long "name"s, we
     * need to stretch the dialog's width accordingly in skeleton mode, or
     * else the skeleton version will be much skinnier than the real version,
     * causing a jarring user experience.
     * 
     * The regular Skeleton components (which are not text and do not
     * line-wrap) cannot properly stretch the modal. Therefore, we need a
     * non-skeleton Comment with dummy text content long enough to stretch
     * the dialog instead, and here one gets added at the very end (which
     * will likely never even be seen as it is at the bottom of a tall list
     * inside a scrollable area in the dialog).
     */
    <Comment
      key="skeleton-9999"
      name={Array(50).fill('.....').join(' ')}
      body={''}
    />
  ];

  return (
    <Dialog
      open={dialogOpen}
      onClose={handleClose}
      scroll={'paper'}
      aria-labelledby="scroll-dialog-title"
    >
      <DialogTitle id="scroll-dialog-title">Comments on "{postTitle}" ...</DialogTitle>
      <DialogContent
        dividers={true}
        id="scroll-dialog-content"
        ref={contentElementRef}
        tabIndex={-1}
      >
        {
          fetchedComments === false ? errorLoadingComments : (
            fetchedComments === null ?
              commentsSkeleton
              :
              <>
                {displayComments.map(c => <Comment
                    key={c.id}
                    name={c.name}
                    email={c.email}
                    body={c.body}
                  />)
                }
                <CommentForm
                  postId={postId}
                />
              </>
          )
        }
      </DialogContent>
      {/* Not used, but the dialog display will be messed up if <DialogActions> is removed */}
      <DialogActions style={{ display: 'none' }}>
      </DialogActions>
    </Dialog>
  )
}