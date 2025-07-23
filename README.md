# 🔐 Advanced Password Generator

A modern, secure, and feature-rich password generator built with vanilla HTML, CSS, and JavaScript. Generate strong passwords with customizable options including length, character types, and even emojis!

![Password Generator Demo](https://img.shields.io/badge/Status-Active-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🎯 Core Functionality
- **Secure Password Generation**: Uses cryptographically secure random number generation
- **Customizable Length**: Generate passwords from **4** to **64** characters
- **Multiple Character Sets**: Include uppercase, lowercase, numbers, symbols, and emojis
- **Real-time Strength Analysis**: Visual password strength meter with entropy calculation
- **One-Click Copy**: Easy clipboard integration
- **Instant Regeneration**: Quickly generate new passwords with the same settings

### 🎨 Modern UI/UX
- **Glassmorphism Design**: Beautiful frosted glass effect with backdrop blur
- **Dark/Light Theme**: Toggle between dark and light modes
- **Floating Particles Animation**: Dynamic background particles for visual appeal
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Smooth Animations**: Engaging micro-interactions and transitions
- **Toast Notifications**: User-friendly feedback messages

### 🔒 Security Features
- **Entropy Calculation**: Real-time calculation of password entropy in bits
- **Crack Time Estimation**: Estimates time needed to crack the password
- **Character Type Validation**: Ensures at least one character from each selected type
- **Secure Randomization**: Uses browser's crypto API for true randomness

### 😊 Unique Features
- **Emoji Support**: Add fun emojis to your passwords
- **Custom Emoji Selection**: Choose from a curated set of emojis
- **Dice Animation**: Fun rolling dice animation during generation
- **Strength Visualization**: Color-coded strength meter (Very Weak to Very Strong)

## 🚀 Quick Start

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies or installations required

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Daksh-Vermaa/PASSWORD-GENERATOR.git
   cd password-generator
   ```

2. **Open in browser**
   ```bash
   # Simply open the HTML file in your browser
   open index.html
   # or
   double-click index.html
   ```

3. **Optional: Serve locally**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Then visit http://localhost:8000
   ```

## 📖 Usage

### Basic Usage
1. **Adjust Password Length**: Use the slider to set desired length (4-64 characters)
2. **Select Character Types**: Check/uncheck boxes for uppercase, lowercase, numbers, symbols, or emojis
3. **Generate Password**: Click the "Generate" button with the dice icon
4. **Copy Password**: Click "Copy" to copy the password to your clipboard
5. **Regenerate**: Click "Regenerate" to create a new password with the same settings

### Advanced Features

#### Theme Switching
- Click the moon/sun icon in the top-right corner to toggle between dark and light themes

#### Emoji Passwords
1. Enable the "Emojis" checkbox
2. The emoji selector will appear
3. Click on emojis to include/exclude them from your password
4. Generate your password with emojis included

#### Understanding Strength Meter
- **Very Weak** (Red): < 30 bits of entropy
- **Weak** (Orange): 30-49 bits of entropy
- **Medium** (Yellow): 50-69 bits of entropy
- **Strong** (Light Green): 70-89 bits of entropy
- **Very Strong** (Green): 90+ bits of entropy

## 🛠️ Technical Details

### File Structure
```

├── index.html          # Main HTML structure
├── style.css           # Styling and animations
├── script.js           # Core functionality
├── .gitignore          # ignore needless files
├── LICENSE             # License filere
├── README.md           # Documentation
```

### Key Technologies
- **HTML5**: Semantic markup with modern input types
- **CSS3**: Custom properties, Grid, Flexbox, animations, glassmorphism
- **Vanilla JavaScript**: ES6+ features, modern APIs, event handling

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Security Implementation
- Uses `crypto.getRandomValues()` for cryptographically secure randomness
- Calculates entropy using `log₂(character_pool_size) × password_length`
- Implements character type validation to ensure password complexity

## 🎨 Customization

### Themes
The application supports custom CSS variables for easy theming:

```css
:root {
  --primary: #6366f1;
  --secondary: #8b5cf6;
  --accent: #f59e0b;
  /* ... more variables */
}
```

### Adding New Character Sets
To add new character types, modify the `charSets` object in `script.js`:

```javascript
const charSets = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
  newType: "your-custom-characters" // Add your custom set
};
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style and conventions
- Test on multiple browsers and devices
- Ensure accessibility standards are maintained
- Add comments for complex functionality

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspired by modern glassmorphism trends
- Icons and emojis from Unicode standard
- Strength calculation based on NIST guidelines

## 📞 Support

If you have any questions or run into issues:

- **Create an Issue**: [GitHub Issues](https://github.com/Daksh-Vermaa/PASSWORD-GENERATOR/issues)
- **Feature Requests**: Use the issue tracker with the "enhancement" label
- **Security Concerns**: Please report privately via email

---

**Made by <a href="https://github.com/Daksh-Vermaa" target="_blank">Daksh Verma </a>⚡ with ❤️**

*Remember: Always use unique, strong passwords for different accounts and consider using a password manager for better security!*
