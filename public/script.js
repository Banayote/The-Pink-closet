// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const crypto = require('crypto');
const jwt = require('jsonwebtoken'); // Add JWT
const http = require('http'); // For creating the server
const socketIO = require('socket.io'); // Add Socket.IO for real-time functionality

const app = express();
const port = process.env.PORT || 3003;
const server = http.createServer(app); // Create an HTTP server
const io = socketIO(server); // Initialize Socket.IO with the server

// Secret for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'mySuperSecretKey';

// MongoDB URI from environment variable
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/myDatabase';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Add support for JSON bodies

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Middleware to verify JWT and set the user on the request object
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

  if (!token) {
    return res.status(401).send('Access Denied');
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Invalid Token');
    req.user = user;
    next();
  });
}

// Middleware to check user roles
function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).send('Forbidden: You do not have access to this resource');
    }
    next();
  };
}

// Define the User schema and model with roles
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  profileLink: String,
  role: { type: String, default: 'user' }, // Add role field
  blockedUsers: [mongoose.Schema.Types.ObjectId]
});

const User = mongoose.model('User', userSchema);

// Update the Message schema to include media
const messageSchema = new mongoose.Schema({
  senderId: mongoose.Schema.Types.ObjectId,
  receiverId: mongoose.Schema.Types.ObjectId,
  conversationId: mongoose.Schema.Types.ObjectId,  // Add conversationId for threading
  content: String,
  mediaType: { type: String, enum: ['text', 'image', 'video', 'audio'], default: 'text' }, // Add mediaType
  mediaPath: String, // Path to media file
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// Define the Conversation schema and model
const conversationSchema = new mongoose.Schema({
  participants: [mongoose.Schema.Types.ObjectId],
  lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' }, // Reference to the last message in the thread
  updatedAt: { type: Date, default: Date.now }
});

const Conversation = mongoose.model('Conversation', conversationSchema);

// Define the Product schema and model
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
  category: String,
  userId: mongoose.Schema.Types.ObjectId
});

const Product = mongoose.model('Product', productSchema);

// Route for the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route for handling user registration
app.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  const username = `${firstName} ${lastName}`;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const profileLink = crypto.randomBytes(4).toString('hex');

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profileLink: `/profile/${profileLink}`,
      role: role || 'user'  // Assign role (default to 'user')
    });

    await newUser.save();
    res.redirect(`/profile/${profileLink}`);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route for handling login and issuing JWT
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      // Generate JWT
      const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, message: 'Login successful!', profileLink: user.profileLink });
    } else {
      res.status(400).send('Invalid email or password');
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route for displaying user profile
app.get('/profile/:profileLink', authenticateToken, async (req, res) => {
  const { profileLink } = req.params;

  try {
    const user = await User.findOne({ profileLink: `/profile/${profileLink}` });

    if (user) {
      res.send(`
        <h1>${user.username}'s Profile</h1>
        <p>Profile Link: ${user.profileLink}</p>
      `);
    } else {
      res.status(404).send('Profile not found');
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint to fetch all products (protected route)
app.get('/api/products', authenticateToken, async (req, res) => {
  try {
    const products = await Product.find(); 
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route for adding a new product (with image upload) - restricted to admin role
app.post('/api/products', authenticateToken, authorizeRole('admin'), upload.single('image'), async (req, res) => {
  try {
    const { name, price, description, category, userId } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newProduct = new Product({
      name,
      price,
      image,
      description,
      category,
      userId
    });

    await newProduct.save();
    res.send('Product added successfully!');
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Messaging Routes (protected)

// Route to start a conversation or retrieve an existing one
app.post('/conversations/start', authenticateToken, async (req, res) => {
  const { receiverId } = req.body;
  const senderId = req.user.id;

  try {
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId]
      });
      await conversation.save();
    }

    res.json(conversation);
  } catch (error) {
    console.error('Error starting conversation:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to send a message in a conversation
app.post('/messages/send', authenticateToken, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), async (req, res) => {
  const { receiverId, content, conversationId } = req.body;
  const senderId = req.user.id;

  try {
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (receiver.blockedUsers.includes(senderId)) {
      return res.status(403).send('You are blocked by this user.');
    }

    const mediaType = req.files && (req.files.image || req.files.video || req.files.audio) ? (req.files.image ? 'image' : req.files.video ? 'video' : 'audio') : 'text';
    const mediaPath = req.files && (req.files.image[0].path || req.files.video[0].path || req.files.audio[0].path);

    const newMessage = new Message({
      senderId,
      receiverId,
      content,
      conversationId,  // Link the message to the conversation
      mediaType,
      mediaPath: mediaPath ? `/${mediaPath.replace('public', '')}` : null // Remove 'public' from the path
    });

    await newMessage.save();

    // Update the conversation's last message and timestamp
    const conversation = await Conversation.findById(conversationId);
    conversation.lastMessage = newMessage._id;
    conversation.updatedAt = Date.now();
    await conversation.save();

    io.emit('newMessage', newMessage); // Emit the new message event in real-time
    res.send('Message sent successfully');
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to block/unblock a user
app.post('/block', authenticateToken, async (req, res) => {
  const { userId, blockUserId } = req.body;

  try {
    const user = await User.findById(userId);

    if (user.blockedUsers.includes(blockUserId)) {
      user.blockedUsers.pull(blockUserId);
      await user.save();
      res.send('User unblocked');
    } else {
      user.blockedUsers.push(blockUserId);
      await user.save();
      res.send('User blocked');
    }
  } catch (error) {
    console.error('Error blocking/unblocking user:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to fetch conversation messages with pagination
app.get('/conversations/:conversationId/messages', authenticateToken, async (req, res) => {
  const { conversationId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  
  try {
    const messages = await Message.find({ conversationId })
      .sort({ timestamp: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
      
    res.json(messages);
  } catch (error) {
    console.error('Error fetching conversation messages:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for typing events
  socket.on('typing', ({ senderId, conversationId }) => {
    io.emit('typing', { senderId, conversationId });
  });

  // Listen for stopTyping events
  socket.on('stopTyping', ({ senderId, conversationId }) => {
    io.emit('stopTyping', { senderId, conversationId });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// Route to fetch all conversations for a user
app.get('/conversations', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const conversations = await Conversation.find({ participants: userId })
      .populate('lastMessage') // Populate lastMessage for convenience
      .sort({ updatedAt: -1 }); // Sort by last updated

    res.json(conversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).send('Internal Server Error');
  }
});
// Route to fetch all messages in a conversation
app.get('/conversations/:conversationId/messages', authenticateToken, async (req, res) => {
  const { conversationId } = req.params;
  
  try {
    const messages = await Message.find({ conversationId })
      .sort({ timestamp: 1 }); // Sort messages in chronological order

    res.json(messages);
  } catch (error) {
    console.error('Error fetching conversation messages:', error);
    res.status(500).send('Internal Server Error');
  }
});
// Function to fetch conversations
async function fetchConversations() {
  const response = await fetch('/conversations', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}` // Use your token
    }
  });

  const conversations = await response.json();
  // Render conversations on the frontend
}

// Function to fetch messages in a specific conversation
async function fetchMessages(conversationId) {
  const response = await fetch(`/conversations/${conversationId}/messages`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}` // Use your token
    }
  });

  const messages = await response.json();
  // Render messages on the frontend
}

// Call these functions when the user navigates to the conversations page





