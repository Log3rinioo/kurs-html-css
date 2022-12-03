const notifications = document.querySelectorAll('div.notification');
const notifyWrapper = document.querySelector('div.notifyWrapper');

notifications.forEach(el => {
    let closeButton = document.createElement('button');
    el.appendChild(closeButton);

    let closeIcon = document.createElement('i');
    closeIcon.className = 'fa-solid fa-xmark fa-xl';
    closeButton.appendChild(closeIcon);
    
    closeButton.onclick = () => {
        el.classList.add('close');
        setTimeout(() => {
            el.remove();
        }, 400);
    }
})

/*const notifyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.innerText == 'Moje prace') {
                // Strona główna - moje prace
                // if (notifications[0].classList.contains('hide')) {
                //     let audio = new Audio('../assets/notification.mp3');
                //     audio.play();
                // }
                // notifications[0].classList.remove('hide');
                // return;
                console.log('eo')
            } 
        }
    });
}, {
    threshold: 0.9
});

const anim = document.querySelectorAll('div#gridWrapper h2');
anim.forEach(anim => {
    notifyObserver.observe(anim);
}); */

// var height = iframe.contentWindow.document.body.currentPos;

// iframe.contentWindow.document.body.addEventListener('scroll', () => {
//     console.log('a')
// })
// let audio = new Audio('assets/notification.mp3');

// setInterval(() => {
//     let status = sessionStorage.getItem('notifications');
//     if (status) {
//         switch (status) {
//             case 'prace':
//                 console.log('eo');
//                 sessionStorage.removeItem('notifications')
//                 break;
//         }
//     }
// }, 500);

/* 
if (status) {
        switch (status) {
            case 'prace':
                console.log(notifications[0])
                if (notifications[0].classList.contains('hide')) {
                    audio.play();
                    notifications[0].classList.remove('hide');
                }
                sessionStorage.removeItem('notifications');
                break;
                
        }
    }
*/