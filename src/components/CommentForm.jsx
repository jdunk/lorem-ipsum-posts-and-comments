import { useState } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { useCommentsState } from '../hooks/commentsState.js';

function CommentForm({ postId }) {
  const [ formVals, setFormVals ] = useState({
    Name: '',
    Email: '',
    Comment: '',
  });
  const [ formErrors, setFormErrors ] = useState({
    Name: '',
    Email: '',
    Comment: '',
  });
  const {
    userComments,
    setUserComments
  } = useCommentsState();

  const setVal = (fieldName, val) => {
    setFormVals({
      ...formVals,
      [fieldName]: val,
    });
  };

  const validate = () => {
    let hasErrors = false;

    // Required validation
    const errors = Object.keys(formVals).reduce((carry, k) => {
      if (!formVals[k]) {
        carry[k] = `${k} is required`
        hasErrors = true;
      }
      else {
        carry[k] = '';
      }
       
      return carry;
    }, {});

    // Additional validation

    if (formVals.Email && formVals.Email.indexOf('@') === -1) {
      errors.Email = 'Invalid email address';
    }

    setFormErrors({
      ...formErrors,
      ...errors,
    });

    return !hasErrors;
  }

  const addComment = (e) => {
    e.preventDefault();

    if (!validate())
      return;

    const newComment = {
      name: formVals.Name,
      email: formVals.Email,
      body: formVals.Comment,
      id: Number(new Date()),
    };

    const postUserComments = userComments[postId] ?? [];
    postUserComments.push(newComment);

    setUserComments({
      ...userComments,
      [postId]: postUserComments,
    });

    setFormVals({
      ...formVals,
      Comment: '',
    })
  };

  return (
    <Box mt={1}>
      <h2 style={{ color: '#333', marginBottom: 8 }}>Add a Comment</h2>
      <Box mb={1}>
        <TextField
          required
          error={!!formErrors.Name}
          id="comment-form-name"
          label="Name"
          placeholder="Connie Commenter"
          helperText={formErrors.Name}
          variant="outlined"
          fullWidth
          margin="dense"
          value={formVals.Name}
          onChange={e => setVal('Name', e.target.value)}
        />
      </Box>
      <Box pb={1}>
        <TextField
          required
          error={!!formErrors.Email}
          id="comment-form-email"
          label="Email"
          placeholder="connie@commenter.com"
          helperText={formErrors.Email}
          variant="outlined"
          fullWidth
          margin="dense"
          value={formVals.Email}
          onChange={e => setVal('Email', e.target.value)}
        />
      </Box>
      <Box mb={2}>
        <TextField
          error={!!formErrors.Comment}
          id="comment-form-body"
          label="Comment"
          helperText={formErrors.Comment}
          variant="outlined"
          fullWidth
          margin="dense"
          multiline
          rows={4}
          value={formVals.Comment}
          onChange={e => setVal('Comment', e.target.value)}
        />
      </Box>
      <Button
        variant="contained"
        align="center"
        onClick={addComment}
      >
        Submit
      </Button>
    </Box>
  );
}

export default CommentForm;