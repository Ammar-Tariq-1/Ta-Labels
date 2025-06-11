$(document).ready(function() {
    function hideNavOnResize() {
        if ($(window).width() <= 992) {
            $('.nav_ul').hide();
        } else {
            $('.nav_ul').show();
        }
    }

})    

$(document).ready(function(){
    $(".navbar-toggler").click(function(){
        $("#navbarNav").slideToggle();
    });

    
});

// Product Detail

 // Image gallery functionality
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail-btn');
    
    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', () => {
        // Update main image
        mainImage.src = thumb.getAttribute('data-image');
        
        // Update active thumbnail
        thumbnails.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
    });
    
    // Color selector
    const colorOptions = document.querySelectorAll('.color-option');
    const selectedColorText = document.getElementById('selected-color');
    
    colorOptions.forEach(option => {
      option.addEventListener('click', () => {
        // Update selected color
        colorOptions.forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
        
        // Update text
        selectedColorText.textContent = option.getAttribute('data-color-name');
      });
    });
    
    // Size selector
    const sizeOptions = document.querySelectorAll('.size-option');
    const selectedSizeText = document.getElementById('selected-size');
    
    sizeOptions.forEach(option => {
      option.addEventListener('click', () => {
        // Update selected size
        sizeOptions.forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
        
        // Update text
        selectedSizeText.textContent = option.getAttribute('data-size');
      });
    });
    
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active tab button
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update active tab pane
        const tabId = btn.getAttribute('data-tab') + '-tab';
        tabPanes.forEach(pane => pane.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
      });
    });
    
    // Cart drawer functionality
    const openCartBtn = document.getElementById('open-cart');
    const cartBtn = document.getElementById('cart-button');
    const cartDrawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    const qtyPlus = document.querySelector('.qty-plus');
    const qtyMinus = document.querySelector('.qty-minus');
    const qtyDisplay = document.querySelector('.qty-display');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const addToCartBtn = document.getElementById('add-to-cart');
    
    function openCart() {
      cartDrawer.classList.add('open');
      backdrop.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
    
    function closeCart() {
      cartDrawer.classList.remove('open');
      backdrop.style.display = 'none';
      document.body.style.overflow = '';
    }
    
    openCartBtn.addEventListener('click', openCart);
    cartBtn.addEventListener('click', openCart);
    backdrop.addEventListener('click', closeCart);
    
    // Quantity controls
    let quantity = 1;
    const price = 79.99;
    
    function updateTotal() {
      const total = (price * quantity).toFixed(2);
      cartSubtotal.textContent = `$${total}`;
    }
    
    qtyPlus.addEventListener('click', () => {
      quantity++;
      qtyDisplay.textContent = quantity;
      updateTotal();
    });
    
    qtyMinus.addEventListener('click', () => {
      if (quantity > 1) {
        quantity--;
        qtyDisplay.textContent = quantity;
        updateTotal();
      }
    });
    
    // Add to cart button
    addToCartBtn.addEventListener('click', () => {
      // Show success message
      alert('Item added to cart!');
    });