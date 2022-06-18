// const slideItems = [
//     {
//         key: 1, 
//         appUrl: 'https://anime-quotes-ruby.vercel.app/', 
//         imgUrl: 'img/works_images/raq.png', 
//         altText: 'genshin-food-lists', 
//         cardTitle: 'Random Anime Quotes', 
//         cardBody: 'A simple web app created on HTML, CSS and vanilla JavaScript utilizing 3rd party API',
//         info: false
//     },
//     {
//         key: 2, 
//         appUrl: 'https://teyvat-playlists.web.app/', 
//         imgUrl: 'img/works_images/tp2.png', 
//         altText: 'teyvat-playlists', 
//         cardTitle: 'Teyvat Playlists', 
//         cardBody: 'Playlist manager created on Vue.js and Firebase',
//         info: false
//     },
//     {
//         key: 3, 
//         appUrl: 'https://genshin-food-inv.herokuapp.com/', 
//         imgUrl: 'img/works_images/gfl2.png', 
//         altText: 'genshin-food-lists', 
//         cardTitle: 'Genshin Foods List', 
//         cardBody: 'Genshin Food ingredients tracker created on Vue.js, MongoDB and Node.js',
//         info: false
//     },
//     {
//         key: 4, 
//         appUrl: 'https://genshinwishcounter.xyz/', 
//         imgUrl: 'img/works_images/sgc3.png', 
//         altText: 'genshin-wish-counter', 
//         cardTitle: 'Gacha Counter', 
//         cardBody: 'A gacha counter utilizing Vite, Vuex, Vue.js',
//         info: false
//     },
// ];

// function createSlideItems(slideItems) {
//     const sliderDiv = document.querySelector('.slider');
//     const slideDiv = document.createElement('div');
//     slideDiv.classList.add('slide');
//     const appHref = document.createElement('a');
//     appHref.setAttribute('href', slideItems.appUrl);
//     appHref.setAttribute('target', '_blank');
//     const innerHrefDiv = document.createElement('div');
//     const cardImg = document.createElement('img');
//     cardImg.classList.add('card-img');
//     cardImg.setAttribute('src', slideItems.imgUrl);
//     cardImg.setAttribute('alt', slideItems.altText);
//     const cardTextDiv = document.createElement('div');
//     cardTextDiv.classList.add('card-text');
//     const cardTitleH2 = document.createElement('h2');
//     cardTitleH2.classList.add('card-title');
//     cardTitleH2.innerHTML = slideItems.cardTitle;
//     const cardBodyP = document.createElement('p');
//     cardBodyP.classList.add('card-body');
//     cardBodyP.innerHTML = slideItems.cardBody;
//     cardTextDiv.appendChild(cardTitleH2);
//     cardTextDiv.appendChild(cardBodyP);
//     innerHrefDiv.appendChild(cardImg);
//     innerHrefDiv.appendChild(cardTextDiv);
//     appHref.appendChild(innerHrefDiv);
//     slideDiv.appendChild(appHref);
//     sliderDiv.appendChild(slideDiv);
// }

// slideItems.forEach((slideItem) => {
//     createSlideItems(slideItem);
// });

const slider = document.querySelector('.slider');
        const nextBtn = document.querySelector('.next-btn');
        const prevBtn = document.querySelector('.prev-btn');
        const slides = document.querySelectorAll('.slide');
        const slideIcons = document.querySelectorAll('.slide-icon');
        const numberOfSlides = slides.length;
        let slideNumber = 0;

        // next button function
        nextBtn.addEventListener("click", () => {

            slides.forEach((slide) => {
                slide.classList.remove('active');
            });

            slideIcons.forEach((slideIcon) => {
                slideIcon.classList.remove('active');
            });

            slideNumber++;

            if(slideNumber > (numberOfSlides - 1)) {
                slideNumber = 0;
            }

            slides[slideNumber].classList.add('active');
            slideIcons[slideNumber].classList.add('active');
        });

        prevBtn.addEventListener("click", () => {
            slides.forEach((slide) => {
                slide.classList.remove('active');
            });

            slideIcons.forEach((slideIcon) => {
                slideIcon.classList.remove('active');
            });

            slideNumber--;

            if(slideNumber < 0) {
                slideNumber = numberOfSlides - 1;
            }

            slides[slideNumber].classList.add('active');
            slideIcons[slideNumber].classList.add('active');
        });

        let playSlider;

        let repeater = () => {
            playSlider = setInterval(function(){
                slides.forEach((slide) => {
                    slide.classList.remove('active');
                });

                slideIcons.forEach((slideIcon) => {
                    slideIcon.classList.remove('active');
                });

                slideNumber++;

                if(slideNumber > (numberOfSlides - 1)) {
                    slideNumber = 0;
                }

                slides[slideNumber].classList.add('active');
                slideIcons[slideNumber].classList.add('active');
            }, 4000);
        }

        repeater();

        // stop the image slider autoplay on mouseover

        slider.addEventListener("mouseover", () => {
            clearInterval(playSlider);
        });

        slider.addEventListener("mouseout", () => {
            repeater();
        });