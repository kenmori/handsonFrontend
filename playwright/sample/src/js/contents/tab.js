import { format, differenceInCalendarDays } from "date-fns";
const tabNav = document.getElementById("js-tabNav");

const createElementWithClassName = (type, className) => {
    const element = document.createElement(type);
    element.className = className;
    return element;
};

const fetchData = async(endpoint) => {
    const response = await fetch(endpoint);
    if (!response.ok) {
        const errorMessage = `${response.status}:${response.statusText}`;
        tabNav.appendChild(createErrorMessage(errorMessage));
        console.error(errorMessage);
        return;
    }
    return await response.json();
};

const fetchArrayData = async() => {
    try {
        const json = await fetchData("https://mocki.io/v1/c437e37c-8c23-4255-abf1-fe6892bbeea9");
        // const json = await fetchData("https://mocki.io/v1/f12ae2d1-310d-4120-8749-47773d65e236");//空配列
        // const json = await fetchData("https://httpstat.us/503");//503 error
        
        if (!json) return;

        const data = json.data;
        if (data.length === 0) {
            tabNav.textContent = "まだデータがありません";
            console.log("まだデータがありません");
        }
        return data;

    } catch(e) {
        console.error(e);
        tabNav.appendChild(createErrorMessage(e));
    }
};

const createErrorMessage = (text) => {
    const errorText = createElementWithClassName("p", "tab__error");
    errorText.textContent = text;
    return errorText;
};

const isNewArrival = (date) => {
    const today = format(new Date(), "yyyy,MM,dd");
    const articleDate = format(new Date(date), "yyyy,MM,dd");
    const periodFromSubmission = differenceInCalendarDays(new Date(today), new Date(articleDate));
    const specificPeriod = 3;
    const newArrival = periodFromSubmission <= specificPeriod;
    return newArrival;
};

const createTabNav = (values) => {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < values.length; i++) {
        const li = createElementWithClassName("li", "tab__nav-item");
        const button = createElementWithClassName("button", "tab__nav-button js-tabNavButton");

        li.id = `js-tabNavItem${i+1}`;
        button.dataset.index = `${i}`;
        button.textContent = values[i].category;

        //JSONデータでdisplayがtrueのカテゴリの場合はis-activeを付与
        values[i].display && button.classList.add("is-active");

        fragment.appendChild(li).appendChild(button);
    }

    tabNav.appendChild(fragment);

    //タブの切り替え
    for (let i = 0; i < values.length; i++) {
        const button = document.getElementsByClassName("js-tabNavButton");
        button[i].addEventListener("click", toggleTabs);
    }
};

const toggleTabs = (e) => {
    const tabContents = document.getElementsByClassName("js-tabContents");
    const activeNav = tabNav.querySelector(".is-active");
    const clickedTabIndex = e.target.dataset.index;

    //全てのis-activeを削除
    activeNav.classList.remove("is-active");
    tabContents[activeNav.dataset.index].classList.remove("is-active");

    //選択したタブにis-activeを追加
    e.target.classList.add("is-active");
    tabContents[clickedTabIndex].classList.add("is-active");
}

const createTabContainer = () => {
    const div = createElementWithClassName("div", "tab");
    div.id = "js-tab";
    div.appendChild(tabNav.parentNode.replaceChild(div, tabNav));
}

const appendArticlesTitleFragment = (values) => {
    const fragment = document.createDocumentFragment();
    const articleTitles = values.map(value => value.title);
    const articleComments = values.map(value => value.comments);
    const articleDate = values.map(value => value.date);

      //記事タイトルの数だけliを追加
    for (let i = 0; i < articleTitles.length; i++) {
        const li = createElementWithClassName("li", "tab__contents-item");
        const a = createElementWithClassName("a", "tab__contents-link");
        const numberOfComments = articleComments[i].length;

        a.href = "#";
        a.textContent = articleTitles[i];

        fragment.appendChild(li).appendChild(a);

        //コメントがあれば件数とアイコンを表示
        if (numberOfComments > 0) {
            const commentInfo = createCommentInfo(articleComments[i]);
            li.appendChild(commentInfo);
        }

        //3日以内の投稿であればnewアイコンを表示
        isNewArrival(articleDate[i]) && li.insertAdjacentElement("beforeend", createNewIcon());
    }
    return fragment;
};

const createCommentInfo = (values) => {
    const fragment = document.createDocumentFragment();
    const commentIconWrapper = createElementWithClassName("div", "tab__contents-icon");
    const commentIcon = document.createElement("img");
    const commentLength = createElementWithClassName("div", "tab__contents-info");

    commentIcon.src = "./img/icon-comment.svg";
    commentLength.textContent = `${values.length}件`;
    commentIconWrapper.appendChild(commentIcon);

    fragment.appendChild(commentIconWrapper).insertAdjacentElement("afterend", commentLength)
    return fragment;
}

const createNewIcon = () => {
    const div = createElementWithClassName("div", "tab__contents-new");
    const img = document.createElement("img");

    img.src = "./img/icon-new.svg";
    div.appendChild(img);
    return div;
};

const createArticleContents = (data) => {
    const values = data.map(value => value.articles);
    const tabContainer = document.getElementById("js-tab");

    //記事データの数だけulを作成
    for (let i = 0; i < values.length; i++) {
        const tabContents = createElementWithClassName("div", "tab__contents js-tabContents");
        const tabContentsInner = createElementWithClassName("div", "tab__contents-inner");
        const ul = createElementWithClassName("ul", "tab__contents-list");

        //JSONデータでdisplayがtrueのカテゴリの場合はis-activeを付与
        data[i].display && tabContents.classList.add("is-active");

        const articleTitlesFragment = appendArticlesTitleFragment(values[i]);
        const contentsImgFragment = createImgFragments(data[i]);

        tabContainer.appendChild(tabContents).appendChild(tabContentsInner).appendChild(ul).appendChild(articleTitlesFragment);
        tabContentsInner.appendChild(contentsImgFragment);
    }
};

const createImgFragments = (data) => {
    const fragment = document.createDocumentFragment();
    const imgWrapper = createElementWithClassName("div", "tab__img-wrapper");
    const img = createElementWithClassName("img", "tab__img");

    img.src = `${data.img}`;
    fragment.appendChild(imgWrapper).appendChild(img);

    return fragment;
};

const addTabContents = async() => {
    const data = await fetchArrayData();

    if(data){
        createTabNav(data);
        createArticleContents(data);
    }
};

createTabContainer();
addTabContents();
