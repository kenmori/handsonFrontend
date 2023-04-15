const ul = document.getElementById("js-pict-list");
const pagination = document.getElementById("js-pagination");
const previousButton = document.getElementById("js-button-previous");
const nextButton = document.getElementById("js-button-next");

const createElementWithClassName = (type, className) => {
    const element = document.createElement(type);
    element.className = className;
    return element;
};

const addLoading = () => {
    const img = document.createElement("img");
    const imgWrapper = createElementWithClassName("div", "loading");

    img.src = "./img/loading-circle.gif";
    img.id = "js-loading";
    ul.appendChild(imgWrapper).appendChild(img);
};

const removeLoading = () => {
    document.getElementById("js-loading").remove();
};

const fetchData = async(api) => {
    const response = await fetch(api);

    if(!response.ok){
        const errorMessage = `${response.status}:${response.statusText}`;
        ul.appendChild(createErrorMessage(errorMessage));
        console.error(errorMessage);
        return;
    }
    return await response.json();
};

const fetchImgData = async() => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(fetchData("https://mocki.io/v1/2db56900-1359-4d61-bd4c-d477c01b0122")), 3000);
        // setTimeout(() => resolve(fetchData("https://mocki.io/v1/f12ae2d1-310d-4120-8749-47773d65e236")), 3000);//空配列
        // setTimeout(() => resolve(fetchData("https://httpstat.us/503")), 3000);//503 error
    })
};

const getImgData = async() => {
    addLoading();
    try {
        const json = await fetchImgData();
        if (!json) return;

        const data = json.data;
        if (data.length === 0) {
            ul.textContent = "まだデータがありません";
            console.log("まだデータがありません");
        }
        return data;

    } catch(e) {
        console.error(e);
        ul.appendChild(createErrorMessage(e));
    } finally {
        removeLoading();
    }
};

const createErrorMessage = (text) => {
    const errorText = createElementWithClassName("p", "tab__error");
    errorText.textContent = text;
    return errorText;
};

const renderListOfImg = (data) => {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < data.length; i++) {
        const li = createElementWithClassName("li", "slideshow__pict-item js-slideshow-item");
        const img = document.createElement("img");

        li.dataset.index = `${i}`;
        img.src = data[i].img;
        img.alt = data[i].alt;
    
        //JSONデータでdisplay:trueの場合はis-activeを付与
        data[i].display && li.classList.add("is-active");

        fragment.appendChild(li).appendChild(img);
    }
    ul.appendChild(fragment);
};

const renderListOfPagination = (data) => {
    const paginationList = document.getElementById("js-pagination-list");
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < data.length; i++) {
        const li = createElementWithClassName("li", "pagination__item js-pagination-item");
        const button = createElementWithClassName("li", "pagination__btn js-pagination-btn");

        li.dataset.index = `${i}`;
        button.dataset.index = `${i}`;

        //JSONデータでdisplay:trueの場合はis-activeを付与
        data[i].display && li.classList.add("is-active");

        fragment.appendChild(li).appendChild(button);
    }
    pagination.insertAdjacentElement("afterbegin",paginationList).appendChild(fragment);
};

const init = (data) => {
    const allofCountElement = document.getElementById("js-counter-all");
    
    allofCountElement.textContent = data.length;
    incrementCurrentIndex(getCurrentIndex());
    toggleButtonDisabled(data.length);
};

const toggleButtonDisabled = (dataLength) => {
    const currentIndex = getCurrentIndex();
    const firstIndex = 0;
    const lastIndex = dataLength - 1;

    previousButton.disabled = currentIndex === firstIndex;
    nextButton.disabled = currentIndex === lastIndex;
};

const getCurrentIndex = () => {
    const activeImg = ul.querySelector(".is-active");
    return Number(activeImg.dataset.index);
};

const incrementCurrentIndex = (number) => {
    const currentCountElement = document.getElementById("js-counter-current");
    currentCountElement.textContent = ++number;
};

const switchImg = (number) => {
    const activeImg = ul.querySelector(".is-active");
    const imgItems = [...document.getElementsByClassName("js-slideshow-item")];
    activeImg.classList.remove("is-active");
    imgItems[number].classList.add("is-active");
};

const switchPagination = (number) => {
    const ul = document.getElementById("js-pagination-list");
    const paginationItems = [...document.getElementsByClassName("js-pagination-item")];
    const activeItem = ul.querySelector(".is-active");
    activeItem.classList.remove("is-active");
    paginationItems[number].classList.add("is-active");
};

const addEventListenerForButton = (dataLength) => {
    const buttons = document.querySelectorAll(".js-button-arrow");

    buttons.forEach((button) => {
        button.addEventListener ("click", (e) => {
            let currentIndex = getCurrentIndex();
            e.currentTarget.id === "js-button-next" ? ++currentIndex : --currentIndex;

            switchImg(currentIndex);
            switchPagination(currentIndex);
            incrementCurrentIndex(currentIndex);
            toggleButtonDisabled(dataLength);
            initAutoMoveSlide(dataLength);
        })
    })
};

const addEventListenerForPagination = (dataLength) => {
    const paginationList = document.getElementById("js-pagination-list");

    paginationList.addEventListener ("click", (e) => {

        //buttonとbuttonの間はクリック対象外にする
        if (e.currentTarget === e.target) {
            return;
        }

        const clickedItemIndex = Number(e.target.dataset.index);

        switchImg(clickedItemIndex);
        switchPagination(clickedItemIndex);
        incrementCurrentIndex(clickedItemIndex);
        toggleButtonDisabled(dataLength);
        initAutoMoveSlide(dataLength);
    })
};

//タイマー停止用のID
const intervalCount = { count: 0 };

const autoMoveSlide = (dataLength) => {
    intervalCount.count = setInterval(() => {
        let currentIndex = getCurrentIndex();
        currentIndex++;
    
        if (currentIndex === dataLength) {
            currentIndex = 0;
        }
    
        switchImg(currentIndex);
        switchPagination(currentIndex);
        incrementCurrentIndex(currentIndex);
        toggleButtonDisabled(dataLength);
    }, 3000);
};

const initAutoMoveSlide = (dataLength) => {
    clearInterval(intervalCount.count);
    autoMoveSlide(dataLength);
};

const addSlide = async() => {
    const data = await getImgData();

    if(data){
        renderListOfImg(data);
        renderListOfPagination(data);
        init(data);
        addEventListenerForButton(data.length);
        addEventListenerForPagination(data.length);
        autoMoveSlide(data.length);
    }
};

addSlide();
