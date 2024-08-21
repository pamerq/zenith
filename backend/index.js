const express = require('express');
const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());

const taskRoutes = require('./routes/taskRoutes');
app.use('/api', taskRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
