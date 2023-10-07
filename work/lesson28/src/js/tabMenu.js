import { format, differenceInCalendarDays } from "date-fns";
const tabMenu = document.getElementById("js-tab-menu");

const API = {
  news: "https://myjson.dit.upm.es/api/bins/few5",
  book: "https://myjson.dit.upm.es/api/bins/49np",
  travel: "https://myjson.dit.upm.es/api/bins/d2v5",
  economy: "https://myjson.dit.upm.es/api/bins/hsm9",
};

const articleAPI = {
  "8b5ae244-cddb-4b94-a5cd-b1ca4201c945":
    "https://myjson.dit.upm.es/api/bins/9mk5",
  "8b5ae244-cddb-4b94-a5cd-b1ca4201c946":
    "https://myjson.dit.upm.es/api/bins/ghh1",
  "7cb39430-d000-4b2a-8bbd-29a6ff6c7694":
    "https://myjson.dit.upm.es/api/bins/cml1",
  "7cb39430-d000-4b2a-8bbd-29a6ff6c7697":
    "https://myjson.dit.upm.es/api/bins/8ktt",
  "4c42eb6a-dc41-4138-ac0a-49062e4a55e3":
    "https://myjson.dit.upm.es/api/bins/dakx",
  "9d50f525-b5a3-469d-ad28-0bbaa3f38fcc":
    "https://myjson.dit.upm.es/api/bins/bkup",
  "9d50f525-b5a3-469d-ad28-0bbaa3f38fce":
    "https://myjson.dit.upm.es/api/bins/9nep",
};

const createElementWithClassName = (type, className) => {
  const element = document.createElement(type);
  element.className = className;
  return element;
};

const createLoading = () => {
  const loading = createElementWithClassName("img", "loading");
  loading.id = "js-loading";
  loading.src = "./img/loading-circle.gif";
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

const getArticleData = async () => {
  const newsSection = document.getElementById("js-news");
  try {
    const data = await Promise.all(Object.values(API).map(getJsonOrError));
    return data.filter((value) => value !== undefined);
  } catch (e) {
    newsSection.appendChild(createErrorMessage(e));
  }
};

const createTabMenu = (data) => {
  const tabMenuFrag = document.createDocumentFragment();
  for (let i = 0; i < data.length; i++) {
    const tabMenuItem = createElementWithClassName("li", "news-tab__menu-item");
    tabMenuItem.id = data[i].category;
    tabMenuItem.textContent = data[i].category;
    tabMenuFrag.appendChild(tabMenuItem);
  }
  return tabMenuFrag;
};

const createTabContent = () => {
  const tabContent = createElementWithClassName("div", "news-tab__content");
  const imageWrapper = createElementWithClassName(
    "div",
    "news-tab__img-wrapper"
  );
  const tabContentList = document.createElement("ul");

  tabContent.id = "js-tab-content";
  tabContentList.id = "js-tab-list";
  imageWrapper.id = "js-tab-img";

  tabContent.appendChild(tabContentList);
  tabContent.appendChild(imageWrapper);
  return tabContent;
};

const configUIfromFetchData = async () => {
  const data = await getArticleData();
  if (data) {
    tabMenu.after(createTabContent());
    tabMenu.appendChild(createTabMenu(data));
    const hasSelectData = data.find((value) => value.select === true);
    const tab = document.getElementById(hasSelectData.category);
    tab.classList.add("tab-select");
    document
      .getElementById("js-tab-list")
      .append(createArticleElements(hasSelectData));
    document
      .getElementById("js-tab-img")
      .append(createCategoryImg(hasSelectData));
  }
};

const isSpecifiedPeriod = (date) => {
  const newArrivalDays = 3;
  const today = format(new Date(), "yyyy,MM,dd");
  const articleDate = format(new Date(date), "yyyy,MM,dd");
  const periodOfDays = differenceInCalendarDays(
    new Date(today),
    new Date(articleDate)
  );
  const result = periodOfDays <= newArrivalDays;
  return result;
};

const createNewIcon = () => {
  const newIcon = createElementWithClassName("img", "new-icon");
  newIcon.src = "./img/new-icon.svg";
  return newIcon;
};

const hasComment = (commentLength) => commentLength > 0;

const createCommentLength = (commentLength) => {
  const commentWrapper = createElementWithClassName("span", "comment-length");
  const commentIcon = createElementWithClassName("img", "comment-icon");
  commentIcon.src = "./img/comment-icon.svg";
  commentWrapper.appendChild(commentIcon);
  commentWrapper.insertAdjacentHTML("beforeend", commentLength);
  setClickEventInCommentIcon(commentWrapper);
  return commentWrapper;
};

const createArticleElements = ({ article }) => {
  const articleFrag = document.createDocumentFragment();
  for (let i = 0; i < article.length; i++) {
    const metaWrapper = createElementWithClassName("div", "meta-wrapper");
    const commentLength = article[i].comment.length;
    isSpecifiedPeriod(article[i].date) &&
      metaWrapper.appendChild(createNewIcon());
    hasComment(commentLength) &&
      metaWrapper.appendChild(createCommentLength(commentLength));

    const li = document.createElement("li");
    li.id = article[i].id;
    const anchor = document.createElement("a");
    anchor.href = "#";
    anchor.insertAdjacentHTML("beforeend", article[i].title);
    articleFrag.appendChild(li).appendChild(anchor).after(metaWrapper);
  }
  return articleFrag;
};

const createCategoryImg = ({ image }) => {
  const categoryImg = document.createElement("img");
  categoryImg.src = image;
  return categoryImg;
};

const createClickedTabContent = async (target) => {
  const tabContent = document.getElementById("js-tab-content");
  const targetId = await target.id;
  const json = await tryGetData(tabContent, API[targetId]);
  document
    .getElementById("js-tab-list")
    .appendChild(createArticleElements(json));
  document.getElementById("js-tab-img").appendChild(createCategoryImg(json));
  target.style.pointerEvents = "auto";
};

const tryGetData = async (parent, resource) => {
  parent.appendChild(createLoading());
  try {
    return await getJsonOrError(resource);
  } catch (e) {
    parent.appendChild(createErrorMessage(e));
  } finally {
    removeLoading();
  }
};

const createModal = () => {
  const modal = createElementWithClassName("div", "modal");
  const modalInner = createElementWithClassName("div", "modal__inner");
  modal.id = "js-modal";
  modalInner.id = "js-modal-inner";
  modal.appendChild(modalInner);
  return modal;
};

const createModalCloseIcon = () => {
  const modalCloseIconWrapper = createElementWithClassName(
    "div",
    "modal__close-wrapper"
  );
  const closeIcon = document.createElement("img");
  closeIcon.src = "./img/cross-icon.svg";
  setClickEventForModalClose(closeIcon);
  modalCloseIconWrapper.appendChild(closeIcon);
  return modalCloseIconWrapper;
};

const createOverLay = () => {
  const overLay = createElementWithClassName("div", "overlay");
  overLay.id = "js-over-lay";
  setClickEventForModalClose(overLay);
  return overLay;
};

const addModal = () => {
  const newsSection = document.querySelector(".news");
  newsSection.appendChild(createModal()).appendChild(createModalCloseIcon());
};

const addOverLay = () => {
  document.querySelector("body").appendChild(createOverLay());
};

const setClickEventForModalClose = (target) => {
  target.addEventListener("click", () => {
    document.getElementById("js-modal-inner").textContent = "";
    document.querySelector("body").classList.remove("modal-open");
  });
};

const openModalAndOverLay = () => {
  document.querySelector("body").classList.add("modal-open");
};

const setClickEventInCommentIcon = (target) => {
  target.addEventListener("click", async (e) => {
    openModalAndOverLay();
    const toAppendElement = document.getElementById("js-modal-inner");
    const targetParentId = e.currentTarget.closest("li").id;
    const commentData = await getComment(targetParentId, toAppendElement);
    toAppendElement.appendChild(createModalContent(commentData));
  });
};

const getClickedArticleData = async (resource, parent) => {
  return await tryGetData(parent, articleAPI[resource]);
};

const getComment = async (targetId, parent) => {
  const responseData = await getClickedArticleData(targetId, parent);
  const { comment } = responseData;
  return comment;
};

const createModalContent = (commentData) => {
  const commentContentFrag = document.createDocumentFragment();
  for (const { name, detail, icon } of commentData) {
    const modalItem = createElementWithClassName("div", "modal-item");
    const detailWrapper = createElementWithClassName(
      "div",
      "modal__detail-wrapper"
    );
    const imgWrapper = createElementWithClassName("div", "modal__img-wrapper");
    const userName = createElementWithClassName("p", "user-name");
    const image = createElementWithClassName("img", "user-icon");
    const comment = createElementWithClassName("p", "user-comment");
    userName.textContent = name;
    comment.textContent = detail;
    image.src = icon;
    detailWrapper.appendChild(userName);
    detailWrapper.appendChild(comment);
    imgWrapper.appendChild(image);
    commentContentFrag.appendChild(modalItem).appendChild(detailWrapper);
    modalItem.insertBefore(imgWrapper, detailWrapper);
  }
  return commentContentFrag;
};

configUIfromFetchData();
addModal();
addOverLay();

tabMenu.addEventListener("click", (e) => {
  const hasActiveClassElement = document.querySelector(".tab-select");
  if (hasActiveClassElement && e.currentTarget !== e.target) {
    hasActiveClassElement.classList.remove("tab-select");
    e.target.classList.add("tab-select");

    const imgWrapper = document.getElementById("js-tab-img");
    const tabContentList = document.getElementById("js-tab-list");

    tabContentList.textContent = "";
    imgWrapper.textContent = "";
    e.target.style.pointerEvents = "none";
    createClickedTabContent(e.target);
  }
});
