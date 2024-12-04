// 1:
// let lastScrollY = window.scrollY; // Initial scroll position
// class FrameService {
//     frame = null;
//     debounce = (callback, ...args) => {
//         if (this.frame) this.cancel()

//         this.frame = requestAnimationFrame(() => {
//             this.frame = null
//             callback(...args)
//         })
//     }
//     cancel = () => {
//         cancelAnimationFrame(this.frame)
//     }
// }
// const frameService = new FrameService();

// const scroll = (e) => {
//     frameService.debounce(() => {
//         const currentScrollY = window.scrollY;
//         if (currentScrollY > lastScrollY) {
//             camera.position.z += 0.2;
//         } else if (currentScrollY < lastScrollY) {
//             camera.position.z -= 0.2;
//         }
//         lastScrollY = currentScrollY;
//         console.log(camera.position.z)
//     })
// }

// window.addEventListener("scroll", scroll);


// 2:
// let isScrolling = false;
// let lastScrollY = window.scrollY;

// window.addEventListener('scroll', () => {
//     if (!isScrolling) {
//         isScrolling = true;
//         requestAnimationFrame(() => {
//             const currentScrollY = window.scrollY;
//             if (currentScrollY > lastScrollY) {
//                 camera.position.z += 0.07;
//             } else if (currentScrollY < lastScrollY) {
//                 camera.position.z -= 0.07;
//             }
//             lastScrollY = currentScrollY;
//             isScrolling = false;
//         });
//     }
// });


// 3:
// (function () {
//     let lastScrollTop = 0;
//     let ticking = false;

//     const scrollListener = (callback) => {
//         window.addEventListener('scroll', function () {
//             if (!ticking) {
//                 window.requestAnimationFrame(() => {
//                     const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//                     const scrollHeight = document.documentElement.scrollHeight;
//                     const windowHeight = window.innerHeight;

//                     // Check if we're at the top or bottom
//                     const isAtTop = scrollTop === 0;
//                     const isAtBottom = (windowHeight + scrollTop) >= scrollHeight;

//                     // If we're at the top or bottom, do not fire the callback
//                     if (isAtTop || isAtBottom) {
//                         ticking = false;  // Reset ticking to allow future scroll events
//                         return;
//                     }

//                     // Only trigger callback if scroll position has changed
//                     if (scrollTop !== lastScrollTop) {
//                         callback(scrollTop, lastScrollTop);
//                         lastScrollTop = scrollTop; // Update last scroll position
//                     }

//                     ticking = false;  // Reset ticking after the callback is executed
//                 });

//                 ticking = true; // Indicate that a scroll event is being processed
//             }
//         });
//     };

//     // Example of the callback function that will be triggered
//     scrollListener((currentPos, lastPos) => {
//         console.log('Scrolled:', currentPos, 'Last position:', lastPos);
//     });
// })();