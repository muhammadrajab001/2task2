const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;


let posts = [
  { id: 1, title: 'Post 1', body: 'This is the first post.' },

];

let comments = [
  { id: 1, postId: 1, name: 'Commenter 1', email: 'commenter1@example.com', body: 'This is a comment on post 1.' },
 
];

let nextPostId = posts.length + 1; 
let nextCommentId = comments.length + 1; 

app.use(cors()); 
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));


app.get('/posts', (req, res) => {
  res.json(posts);
});

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.post('/posts', (req, res) => {
  try {
    const newPost = { ...req.body, id: nextPostId++ };
    posts.push(newPost);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании поста' });
  }
});

app.post('/comments', (req, res) => {
  try {
    const newComment = { ...req.body, id: nextCommentId++ };
    comments.push(newComment);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании комментария' });
  }
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
