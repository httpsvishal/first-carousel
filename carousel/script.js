const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressBar = document.getElementById("progress-bar");
const carouselContainer = document.getElementById("carousel");
const paginationContainer = document.getElementById("pagination");
let slides = null;
let pages = null;
let images = null;

let currSlide = 0;
let totalSlides = null;
let interval = null;
let intervalTime = 3000;
let progress = 50;
let progressInterval = null;
let numberOfSlides = 8;

const createSlides = ()=>{
    for(let i = 0 ; i < numberOfSlides ; i++){
        let slide = document.createElement("div");
        slide.setAttribute("class","slide");
        const img = document.createElement("img");
        img.src = `https://picsum.photos/seed/slide${i+1}/1080/720`;
        slide.append(img);
        carouselContainer.append(slide);
    }
    slides = document.querySelectorAll(".slide");
    totalSlides = numberOfSlides;
    images = document.querySelectorAll("img");
}

const createPagination = () =>{
    for(let i = 0 ; i < numberOfSlides ; i++){
        let page = document.createElement("span");
        page.classList.add("page");
        paginationContainer.append(page);
    }
    pages = document.querySelectorAll(".page");
}

let showProgress = () => {
    progress++;
    progressBar.style.width = `${progress}%`;
}


let resetProgress = () => {
    if (progressInterval) clearInterval(progressInterval);
    progressInterval = setInterval(showProgress, (intervalTime/100));
}

const addActivePage = () =>{
    console.log(pages);
    pages.forEach(page => page.classList.remove("active-page"));
    pages[currSlide].classList.add("active-page");
}

const adjustSlides = () => {
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${(index - currSlide) * 100}%)`;
    })
    progress = 0;
    resetProgress();
    addActivePage();
}

const setPrevSlide = () => {
    currSlide = (currSlide - 1 + totalSlides) % totalSlides;
    adjustSlides();
}

const setNextSlide = () => {
    currSlide = (currSlide + 1) % totalSlides;
    adjustSlides();
}

const pauseOnHover = () => {
    console.log("hey");
    clearInterval(interval);
    clearInterval(progressInterval);

}

const playOnMouseRemove = () => {
    resetProgress();
    autoChangeSlide();
}

const addEventListeners = () => {
    prevBtn.addEventListener("click", setPrevSlide);
    nextBtn.addEventListener("click", setNextSlide);
    pages.forEach((page,index) =>{
        page.addEventListener("click",()=>{
            console.log("hey");
            currSlide = index;
            adjustSlides();
        })
    })
    images.forEach(image =>{
        image.addEventListener("mouseover",pauseOnHover);
        image.addEventListener("mouseout",playOnMouseRemove);
    })
}

const autoChangeSlide = () => {
    if (interval) clearInterval(interval);
    interval = setInterval(setNextSlide, intervalTime);
}

const runApp = () => {
    createSlides();
    createPagination();
    adjustSlides();
    addEventListeners();
    autoChangeSlide();
}

runApp();





