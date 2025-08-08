// Navigation Start

HTMLElement.prototype.slideToggle = function (duration, callback) {
    if (this.clientHeight === 0) {
        _s(this, duration, callback, true);
    } else {
        _s(this, duration, callback);
    }
};

HTMLElement.prototype.slideUp = function (duration, callback) {
    _s(this, duration, callback);
};

HTMLElement.prototype.slideDown = function (duration, callback) {
    _s(this, duration, callback, true);
};

function _s(el, duration, callback, isDown) {
    if (typeof duration === "undefined") duration = 400;
    if (typeof isDown === "undefined") isDown = false;

    el.style.overflow = "hidden";
    if (isDown) el.style.display = "block";

    var elStyles = window.getComputedStyle(el);

    var elHeight = parseFloat(elStyles.getPropertyValue("height"));
    var elPaddingTop = parseFloat(elStyles.getPropertyValue("padding-top"));
    var elPaddingBottom = parseFloat(elStyles.getPropertyValue("padding-bottom"));
    var elMarginTop = parseFloat(elStyles.getPropertyValue("margin-top"));
    var elMarginBottom = parseFloat(elStyles.getPropertyValue("margin-bottom"));

    var stepHeight = elHeight / duration;
    var stepPaddingTop = elPaddingTop / duration;
    var stepPaddingBottom = elPaddingBottom / duration;
    var stepMarginTop = elMarginTop / duration;
    var stepMarginBottom = elMarginBottom / duration;

    var start;

    function step(timestamp) {
        if (start === undefined) start = timestamp;

        var elapsed = timestamp - start;

        if (isDown) {
            el.style.height = stepHeight * elapsed + "px";
            el.style.paddingTop = stepPaddingTop * elapsed + "px";
            el.style.paddingBottom = stepPaddingBottom * elapsed + "px";
            el.style.marginTop = stepMarginTop * elapsed + "px";
            el.style.marginBottom = stepMarginBottom * elapsed + "px";
        } else {
            el.style.height = elHeight - stepHeight * elapsed + "px";
            el.style.paddingTop = elPaddingTop - stepPaddingTop * elapsed + "px";
            el.style.paddingBottom =
                elPaddingBottom - stepPaddingBottom * elapsed + "px";
            el.style.marginTop = elMarginTop - stepMarginTop * elapsed + "px";
            el.style.marginBottom =
                elMarginBottom - stepMarginBottom * elapsed + "px";
        }

        if (elapsed >= duration) {
            el.style.height = "";
            el.style.paddingTop = "";
            el.style.paddingBottom = "";
            el.style.marginTop = "";
            el.style.marginBottom = "";
            el.style.overflow = "";
            if (!isDown) el.style.display = "none";
            if (typeof callback === "function") callback();
        } else {
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);
}

// JS
const overlays = document.querySelector(".overlay");
const body = document.querySelector("body");
const menuBtn = document.querySelector(".menu-btn");
const menuItems = document.querySelector(".menu-items");

// Add class to a tag and ul tag if li parent contains sub-menu
const liElems = document.querySelectorAll(".menu-items li");
liElems.forEach((elem) => {
    const childrenElems = elem.querySelectorAll(".dropdown-menu");
    if (childrenElems.length > 0) {
        elem.firstElementChild.classList.add("expand-btn");
        elem.classList.add("dropdown");
    }
});

function toggle() {
    // disable overflow body
    body.classList.toggle("overflow");
    // dark background
    overlays.classList.toggle("overlay--active");
    // add open class
    menuBtn.classList.toggle("open");
    menuItems.classList.toggle("open");
}

// Open Menu Mobile
menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggle();
});

// Closes when the Esc key is pressed
window.onkeydown = function (event) {
    const key = event.key; // const {key} = event; in ES6+
    const active = menuItems.classList.contains("open");
    if (key === "Escape" && active) {
        toggle();
    }
};

// Closes when clicked outside the area
document.addEventListener("click", (e) => {
    let target = e.target,
        its_menu = target === menuItems || menuItems.contains(target),
        its_hamburger = target === menuBtn,
        menu_is_active = menuItems.classList.contains("open");
    if (!its_menu && !its_hamburger && menu_is_active) {
        toggle();
    }
});

// Mobile menu expand
const expandBtn = document.querySelectorAll(".expand-btn");
expandBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        if (window.innerWidth <= 1024) {
            // Prevent Default Anchor Click Behavior
            event.preventDefault();
            btn.classList.toggle("open");
            btn.nextElementSibling.slideToggle(300);
        }
    });
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
        // Off menu mobile on desktop
        if (menuBtn.classList.contains("open")) {
            toggle();
        }
        // Change arrow menu on Desktop
        for (var i = 0; i < expandBtn.length; i += 1) {
            expandBtn[i].classList.remove("open");
        }
        // Off SlideToggle Menu on Desktop
        const dropdownMenu = document.querySelectorAll(
            ".menu-items .dropdown-menu"
        );
        for (var i = 0; i < dropdownMenu.length; i += 1) {
            dropdownMenu[i].style.display = "";
        }
    }
});
// Navigatin End

// CheckOut Page Options

//E-Wallets
$(".jazzcash").click(function(){
    document.getElementById("e-pay-label").innerHTML = "JazzCash Account Number/IBAN";
});
$(".easypaisa").click(function(){
    document.getElementById("e-pay-label").innerHTML = "EasyPaisa Account Number/IBAN";
});

//Internet Banking
$(".sadapay").click(function(){
    $(".sadapay").addClass("a")
    $(".nayapay, .payoneer, .skrill, .neteller").removeClass("a")
    document.getElementById("ib-label").innerHTML = "NayaPay Account Number";
});
$(".nayapay").click(function(){
    $(".nayapay").addClass("a")
    $(".sadapay, .payoneer, .skrill, .neteller").removeClass("a")
    document.getElementById("ib-label").innerHTML = "SadaPay Account Number";
});
$(".payoneer").click(function(){
    $(".payoneer").addClass("a")
    $(".sadapay, .nayapay, .skrill, .neteller").removeClass("a")
    document.getElementById("ib-label").innerHTML = "Payoneer Account Number";
});
$(".skrill").click(function(){
    $(".skrill").addClass("a")
    $(".sadapay, .nayapay, .payoneer, .neteller").removeClass("a")
    document.getElementById("ib-label").innerHTML = "Skrill Account Number";
});
$(".neteller").click(function(){
    $(".neteller").addClass("a")
    $(".sadapay, .nayapay, .payoneer, .skrill").removeClass("a")
    document.getElementById("ib-label").innerHTML = "Neteller Account Number";
});


//T-Shirt Color Option Start
// Change The Picture and Associated Element Color when Color Options Are Clicked.
$(".product-colors span").click(function () {
    $(".product-colors span").removeClass("active");
    $(this).addClass("active");
    $(".active").css("border-color", $(this).attr("data-color-sec"))
    $(".content h2").css("color", $(this).attr("data-color-sec"));
    $(".content h3").css("color", $(this).attr("data-color-sec"));
    $(".container .details button").css("background", $(this).attr("data-color-sec"));
});

function black() {
    $(".color-pr2, .color-pr3").addClass("d-none")
    $(".color-pr1").removeClass("d-none")
}
function red() {
    $(".color-pr1, .color-pr3").addClass("d-none")
    $(".color-pr2").removeClass("d-none")
}
function orange() {
    $(".color-pr1, .color-pr2").addClass("d-none")
    $(".color-pr3").removeClass("d-none")
}
//T-Shirt Color Option End

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

// Cart drawer functionality
$(document).ready(function () {
    $drawerRight = $('.cart-drawer-right');
    $cart_list = $('.cart-drawer-btn, .cart-drawer-close-btn');

    $cart_list.click(function () {
        $(this).toggleClass('active');
        $('body').toggleClass('cart-drawer-pushtoleft');
        $drawerRight.toggleClass('cart-drawer-open');
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



// Add to cart button
addToCartBtn.addEventListener('click', () => {
    // Show success message
    alert('Item added to cart!');
});


// Carousel

var owl = $('.owl-carousel');
owl.owlCarousel({
    items: 4,
    // items change number for slider display on desktop

    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true
});

function bycard(){
    $(".by-card").addClass("pay-active")
    $(".e-wallets, .internet-banks").removeClass("pay-active")
    $(".c-pay").removeClass("d-none")
    $(".e-pay, .internet-bank").addClass("d-none")
    $(".p1").addClass("pay-select-arrow")
    $(".p2, .p3").removeClass("pay-select-arrow")
}
function ewallets(){
    $(".e-wallets").addClass("pay-active")
    $(".by-card, .internet-banks").removeClass("pay-active")
    $(".e-pay").removeClass("d-none")
    $(".c-pay,.internet-bank").addClass("d-none")
    $(".p2").addClass("pay-select-arrow")
    $(".p1, .p3").removeClass("pay-select-arrow")
}
function internetbanks(){
    $(".internet-banks").addClass("pay-active")
    $(".by-card, .e-wallets").removeClass("pay-active")
    $(".internet-bank").removeClass("d-none")
    $(".c-pay, .e-pay").addClass("d-none")
    $(".p3").addClass("pay-select-arrow")
    $(".p2, .p1").removeClass("pay-select-arrow")
}



