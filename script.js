// ข้อมูลหนังสือตัวอย่าง
const books = [
    {
        id: 1,
        title: 'การเขียนโปรแกรมเบื้องต้น',
        price: 250,
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 2,
        title: 'การออกแบบเว็บไซต์',
        price: 300,
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 3,
        title: 'การจัดการฐานข้อมูล',
        price: 280,
        image: 'https://via.placeholder.com/150',
    }
];

// แสดงหนังสือในหน้าเว็บ
function displayBooks() {
    const bookGrid = document.querySelector('.book-grid');
    bookGrid.innerHTML = books.map(book => `
        <div class="book-card">
            <img src="${book.image}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>${book.price} บาท</p>
            <button onclick="addToCart(${book.id})">เพิ่มลงตะกร้า</button>
        </div>
    `).join('');
}

// ฟังก์ชันสำหรับตะกร้าสินค้า
let cart = [];

function addToCart(bookId) {
    const book = books.find(b => b.id === bookId);
    cart.push({ title: book.title, price: book.price, image: book.image });
    updateCartUI();
    document.getElementById('cart-sidebar').classList.add('active');
}

function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    // อัพเดทจำนวนสินค้า
    cartCount.textContent = cart.length;
    
    // แสดงรายการสินค้า
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-details">
                <h4>${item.title}</h4>
                <p class="cart-item-price">${item.price} บาท</p>
            </div>
        </div>
    `).join('');
    
    // คำนวณราคารวม
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = total;
}

function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.toggle('active');
}

function checkout() {
    if (cart.length === 0) {
        alert('กรุณาเลือกสินค้าก่อนสั่งซื้อ');
        return;
    }
    alert('ขอบคุณสำหรับการสั่งซื้อ');
    cart = [];
    updateCartUI();
    toggleCart();
}

// เรียกใช้ฟังก์ชันแสดงหนังสือเมื่อโหลดหน้าเว็บ
document.addEventListener('DOMContentLoaded', function() {
    displayBooks();
    const addButtons = document.querySelectorAll('.book-card button');
    addButtons.forEach(button => {
        button.onclick = function() {
            const card = button.closest('.book-card');
            const title = card.querySelector('h3').textContent;
            const price = parseFloat(card.querySelector('p').textContent);
            const image = card.querySelector('img').src;
            addToCart(title, price, image);
        };
    });
});