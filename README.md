# 🍕 Fast React Pizza Co.

A beautiful and responsive pizza menu website built with vanilla HTML, CSS, and JavaScript. 

## ✨ Features

- 🎨 **Beautiful Design** - Clean and modern UI with smooth animations
- 📱 **Fully Responsive** - Works perfectly on all devices
- ⏰ **Dynamic Opening Hours** - Shows different messages based on current time
- 🍕 **Pizza Menu** - Displays authentic Italian pizzas with details
- 🚫 **Sold Out Indicator** - Visual indication for unavailable items
- 🎯 **Interactive Order Button** - Click to place your order

## 📁 Project Structure

```
pizza-menu/
│
├── index.html              # Main HTML file
├── css/
│   └── style.css          # All styling
├── js/
│   ├── pizzaData.js       # Pizza menu data
│   └── app.js             # Application logic
└── README.md              # Project documentation
```

## 🚀 How to Use

1. 📥 Clone or download this repository
2. 🌐 Open `index.html` in your web browser
3. 👀 Browse through the delicious pizza menu
4. 🛒 Click "Order Now" to place an order (demo functionality)

## 💻 Technologies Used

- ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
- ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## 🎨 Features Breakdown

### Dynamic Content
- Pizzas are loaded dynamically from JavaScript
- Sold out items are automatically styled differently
- Footer updates based on business hours (12:00 - 22:00)

### Responsive Design
- Mobile-first approach
- Breakpoints at 768px and 480px
- Flexbox and Grid layouts for optimal viewing

### Interactive Elements
- Hover effects on order button
- Smooth transitions and animations
- Alert messages for order confirmation

## 🔧 Customization

### Adding New Pizzas
Edit `js/pizzaData.js` and add new pizza objects:

```javascript
{
    name: "Pizza Name",
    ingredients: "Your ingredients here",
    price: 15,
    photoName: "image-url-here",
    soldOut: false,
}
```

### Changing Opening Hours
Edit the `openHour` and `closeHour` variables in `js/app.js`:

```javascript
const openHour = 12;  // Change to your opening hour
const closeHour = 22; // Change to your closing hour
```

### Styling
Modify colors and styles in `css/style.css`. CSS variables are defined in `:root`:

```css
:root {
    --color-primary: #edc84b;
    --color-secondary: #e67e22;
    --color-text: #252525;
    --color-text-light: #6c757d;
    --color-red: #e74c3c;
    --color-grey-light: #f8f9fa;
}
```

## 🔮 Future Enhancements

- 🛒 Shopping cart functionality
- 💳 Payment integration
- 🔐 User authentication
- 📝 Order history
- 🌍 Multi-language support
- 🗺️ Location finder
- ⭐ Customer reviews
- 🎁 Promotional offers

## 📸 Screenshots

### Desktop View
![Pizza Menu Desktop](https://via.placeholder.com/800x400/edc84b/252525?text=Pizza+Menu+Desktop+View)

### Mobile View
![Pizza Menu Mobile](https://via.placeholder.com/400x600/edc84b/252525?text=Pizza+Menu+Mobile+View)

## 🌟 Demo

Check out the live demo: [Pizza Menu Demo](#)

## 📄 License

This project is open source and available for educational purposes. 📚

## 👨‍💻 Author

Created by **Yash** with ❤️ for pizza lovers!

### 🌟 Show Your Support

Give a ⭐️ if you like this project!

## 📞 Connect With Me

- 💼 GitHub: [@YashChotu](https://github.com/YashChotu)

---

**Enjoy your pizza! 🍕**
