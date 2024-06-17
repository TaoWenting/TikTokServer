const jwt = require('jsonwebtoken');
const { readUserData, writeUserData } = require('../utils/videoDataUtils');
const bcrypt = require('bcrypt');

// User login controller
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await readUserData();
    const user = users.find(user => user.email === email);

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// User registration controller
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const users = await readUserData();
    if (users.find(user => user.email === email)) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: users.length + 1,
      username,
      email,
      password: hashedPassword
    };

    users.push(newUser);
    await writeUserData(users);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
