/*!
* Start Bootstrap - Grayscale v7.0.6 (https://startbootstrap.com/theme/grayscale)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0 && document.location.pathname.indexOf('index.html') != -1) {
            // only shrink navbar on index.html (Front Page)            
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});




function getTodayString() {
    // finding day 
    const date = new Date();
    // convert date time format to : yyyy-mm-dd  2024-09-24
    var today = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
    return today;
}
function setCookie(value, minutes) {
    const date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000)); // Convert minutes to milliseconds
    const expires = "expires=" + date.toUTCString();
    const cookieValue = `${value}|expiresAt=${date.toUTCString()}`; // Store expiry in value
    document.cookie = `user=${cookieValue};${expires};path=/`;
}
function getCookie(name) {
    const nameEQ = "user=" + name;
    const cookiesArray = document.cookie.split(';');
    for (let i = 0; i < cookiesArray.length; i++) {
        let cookie = cookiesArray[i].trim();
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null; // Return null if the cookie is not found
}
function getCookieExpiry(name) {
    const cookie = getCookie(name);
    if (cookie) {
        // Assume the cookie value is in the format "value|expiresAt=expiry_time"
        const parts = cookie.split('|');
        for (let part of parts) {
            if (part.startsWith("expiresAt=")) {
                const expiryTime = part.split('=')[1];
                return new Date(expiryTime);
            }
        }
    }
    return null; // If expiry time is not found
}

function sign_in_checker() {
    const pwd = localStorage.getItem('pwd');
    // password exist ?
    if (pwd == undefined) {
        window.location='login.html'; // redirect to login.html
        return ; // end
    }
    // has signed in ?
    if (getCookieExpiry(pwd) < new Date()) {
        window.location='login.html';
        return ;
    } 
}