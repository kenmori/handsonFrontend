const slideList = document.getElementById("js-slide-list");
const slideWrapper = document.getElementById("js-slide");

const createElementWithClassName = (type, className) => {
  const element = document.createElement(type);
  element.className = className;
  return element;
};

const createLoading = () => {
  const loading = createElementWithClassName("img", "loading");
  loading.id = "js-loading";
  loading.src = "./img/loading-line.gif";
  return loading;
};

const removeLoading = () => document.getElementById("js-loading").remove();

const createErrorMessage = (error) => {
  const errorMessage = createElementWithClassName("p", "error-message");
  errorMessage.textContent = error;
  return errorMessage;
};

const fetchErrorHandling = async (response) => {
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("サーバーエラーが発生しました");
  }
};

const getJsonOrError = async (url) => {
  const response = await fetch(url);
  const json = await fetchErrorHandling(response);
  return json;
};

const getSlideImgData = async () => {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(getJsonOrError("https://myjson.dit.upm.es/api/bins/h8k1")),
      3000
    );
  });
};

const tryGetSlideImgData = async () => {
  slideWrapper.appendChild(createLoading());
  try {
    const slideImgData = await getSlideImgData();
    if (slideImgData.length === 0) {
      slideWrapper.appendChild(createErrorMessage("画像が登録されていません"));
      return;
    }
    return slideImgData;
  } catch (e) {
    slideWrapper.appendChild(createErrorMessage(e));
  } finally {
    removeLoading();
  }
};

const init = async () => {
  const imgData = await tryGetSlideImgData();
  if (imgData) {
    initSlideItem(imgData);
    initArrowButtons();
    initIndicator(imgData.length);
    slideWrapper.appendChild(createCounterOfSlide(imgData));
    autoPlay.start();
  }
};

init();

/**
 * index of the element being displayed.
 * @type {Number}
 */
let currentIndex = 0;

const playOfSlideshow = () => {
  switchIndicator();
  switchSlideImg();
  updateOfCounter();
  toggleTheDisabled();
};

const autoPlay = (function () {
  let autoPlayerId;
  const start = () => {
    autoPlayerId = setInterval(() => {
      const slideItems = [...document.querySelectorAll(".slide__item")];
      currentIndex < slideItems.length - 1
        ? ++currentIndex
        : (currentIndex = 0);
      playOfSlideshow();
    }, 3000);
  };
  const reset = () => {
    clearInterval(autoPlayerId);
    start();
  };
  return {
    start,
    reset,
  };
})();

const initSlideItem = (imgSources) => {
  for (let i = 0; i < imgSources.length; i++) {
    const createdSlideItem = createSlideItem(imgSources[i]);
    /**
     * Set the is-displaying class to the first element by default
     */
    i === 0 && createdSlideItem.classList.add("is-displaying");
    slideList.appendChild(createdSlideItem);
  }
};

const initArrowButtons = () => {
  const createdArrowButtons = createArrowButtons();
  slideWrapper.appendChild(createdArrowButtons);
  setClickEventInArrowButton();
};

const initIndicator = (data) => {
  slideWrapper.appendChild(createIndicator(data));
  setClickEventInIndicator();
};

const createSlideItem = ({ image }) => {
  const slideItem = createElementWithClassName("li", "slide__item");
  const slideImg = document.createElement("img");
  slideImg.src = image;
  slideItem.appendChild(slideImg);
  return slideItem;
};

const createArrowButtons = () => {
  const arrowBtnWrapper = createElementWithClassName("div", "arrow-buttons");
  const arrowDirections = ["previous", "next"];
  arrowDirections.forEach((arrowDirection) => {
    const button = createElementWithClassName(
      "button",
      `arrow-button --${arrowDirection}`
    );
    button.id = `js-${arrowDirection}Btn`;
    button.value = arrowDirection;
    /**
     * Set previous attribute to disabled by default.
     */
    button.value === "previous" && button.setAttribute("disabled", true);
    arrowBtnWrapper
      .appendChild(button)
      .appendChild(document.createElement("span"));
  });
  return arrowBtnWrapper;
};

const createIndicator = (imgLength) => {
  const ul = createElementWithClassName("ul", "indicator-list");
  for (let i = 0; i < imgLength; i++) {
    const li = createElementWithClassName("li", "indicator-item");
    li.setAttribute("data-num", i);
    /**
     * Set the is-selected class to the first element by default
     */
    i === 0 && li.classList.add("is-selected");
    ul.appendChild(li);
  }
  return ul;
};

const createCounterOfSlide = (data) => {
  const counterWrapper = createElementWithClassName("div", "counter");
  const orderOfDisplayedItem = createElementWithClassName(
    "span",
    "current-number"
  );
  const totalSlideItem = createElementWithClassName("span", "total-number");
  totalSlideItem.textContent = data.length;
  /**
   * Add 1 to the currently displayed index and display the count.
   */
  orderOfDisplayedItem.textContent = currentIndex + 1;
  counterWrapper
    .appendChild(orderOfDisplayedItem)
    .insertAdjacentHTML("afterend", "/");
  counterWrapper.appendChild(totalSlideItem);
  return counterWrapper;
};

const toggleTheDisabled = () => {
  const lastSlideItem = slideList.lastElementChild;
  const firstSlideItem = slideList.firstElementChild;
  const displayingEl = document.querySelector(".is-displaying");
  const disabledEl = document.querySelector("[disabled]");
  disabledEl && disabledEl.removeAttribute("disabled");
  displayingEl === lastSlideItem &&
    document.getElementById("js-nextBtn").setAttribute("disabled", true);
  displayingEl === firstSlideItem &&
    document.getElementById("js-previousBtn").setAttribute("disabled", true);
};

const updateOfCounter = () => {
  /**
   * The counter will display the value of index plus one.
   */
  document.querySelector(".current-number").textContent =
    Number(currentIndex) + 1;
};

const switchIndicator = () => {
  const selectedIndicator = document.querySelector(".is-selected");
  const indicators = [...document.querySelectorAll(".indicator-item")];
  selectedIndicator.classList.remove("is-selected");
  indicators[currentIndex].classList.add("is-selected");
};

const switchSlideImg = () => {
  const displayedSlideItem = document.querySelector(".is-displaying");
  displayedSlideItem.classList.remove("is-displaying");
  const slideItems = [...document.querySelectorAll(".slide__item")];
  slideItems[currentIndex].classList.add("is-displaying");
};

const setClickEventInIndicator = () => {
  const indicators = document.querySelectorAll(".indicator-item");
  indicators.forEach((indicator) => {
    indicator.addEventListener("click", (e) => {
      autoPlay.reset();
      currentIndex = e.target.dataset.num;
      playOfSlideshow();
    });
  });
};

const setClickEventInArrowButton = () => {
  const arrowButtons = document.querySelectorAll(".arrow-button");
  arrowButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      autoPlay.reset();
      e.currentTarget.value === "next" ? ++currentIndex : --currentIndex;
      playOfSlideshow();
    });
  });
};
