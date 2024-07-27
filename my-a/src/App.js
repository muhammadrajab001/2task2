import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Button } from '@mui/material';
import FormComponent from './com/FormComponent';
import TableComponent from './com/TableComponent';
import CommentsComponent from './com/CommentsComponent';

const App = () => {
  const [showComments, setShowComments] = useState(false);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsResponse = await axios.get('http://localhost:3000/posts');
        setPosts(postsResponse.data);
        const commentsResponse = await axios.get('http://localhost:3000/comments');
        setComments(commentsResponse.data);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddRecord = (newRecord) => {
    if (showComments) {
      setComments((prevComments) => [...prevComments, newRecord]);
    } else {
      setPosts((prevPosts) => [...prevPosts, newRecord]);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        ЗАДАЧКА
      </Typography>
      <Box mb={4}>
        <FormComponent onAddRecord={handleAddRecord} showComments={showComments} />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowComments(!showComments)}
      >
        {showComments ? 'Показать сообщения' : 'Показать комментарии'}
      </Button>
      <Box mt={4}>
        {showComments ? (
          <CommentsComponent comments={comments} />
        ) : (
          <TableComponent data={posts} columns={['id', 'title', 'body']} />
        )}
      </Box>
    </Container>
  );
};

export default App;
