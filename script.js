const saveButton = document.getElementById('save-button')
let isDown;
let divs = document.querySelectorAll('.dashboard-slot');
var movableAria = document.getElementById('top-part')

saveButton.addEventListener('click', () => {
    divs.forEach((div, i) => {
        var savedInformaitonAboutDashboard = {
            className: div.className,
            top: div.style.top,
            left: div.style.left,
            idOfChild: div.firstElementChild?.id
        }
        sessionStorage.setItem(`dashboard${i}`, JSON.stringify(savedInformaitonAboutDashboard))
    });
});

window.addEventListener('load', () => {

    var { dashboard0, dashboard1, dashboard2 } = getDashboardsFromSessionStorage();

    var { one, two, three } = getDashboardElements();

    reinitializeDashboardStyles(dashboard0, one, dashboard1, two, dashboard2, three);

})

function getDashboardElements() {
    var one = document.querySelector('.one');
    var two = document.querySelector('.two');
    var three = document.querySelector('.three');
    return { one, two, three };
}

function getDashboardsFromSessionStorage() {
    var dashboard0 = JSON.parse(sessionStorage.getItem('dashboard0'));
    var dashboard1 = JSON.parse(sessionStorage.getItem('dashboard1'));
    var dashboard2 = JSON.parse(sessionStorage.getItem('dashboard2'));
    return { dashboard0, dashboard1, dashboard2 };
}

function reinitializeDashboardStyles(dashboard0, one, dashboard1, two, dashboard2, three) {
    if (dashboard0 != null && one != null) {
        setValues(one, dashboard0);
    }

    if (dashboard1 != null && two != null) {
        setValues(two, dashboard1);
    }

    if (dashboard2 != null && two != null) {
        setValues(three, dashboard2);
    }
}

const setValues = (element, dashboard) => {
    if (dashboard.idOfChild != null) {
        var childElement = document.getElementById(dashboard.idOfChild)
        var cloneElement = childElement.cloneNode(true);
        element.appendChild(cloneElement);
        element.classList.remove('dashed-border')
        element.classList.remove('blue-icon-container')
    }
    element.style.top = dashboard.top;
    element.style.left = dashboard.left;
};


const allowDrop = ev => {
    ev.preventDefault();
};

const dragStart = ev => {
    ev.dataTransfer.setData("text", ev.target.id);
};

const drop = ev => {

    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var element = document.getElementById(data);
    var cloneElement = element.cloneNode(true);
    ev.target.appendChild(cloneElement);
    removeCSSAttrubutes(ev.target);
};

const removeCSSAttrubutes = element => {
    element.classList.remove('dashed-border');
    element.classList.remove('blue-icon-container');
    if (element.classList.contains('two')) {
        element.style.left = '500px'
    } else if (element.classList.contains('three')) {
        element.style.left = '0px'
        element.style.top = '400px'
    } 
};

const dragEnterDashboard = (e) => {
    enterActionOnDashboardSlot(e.target);
};

const dragLeaveDashboard = (e) => {
    leaveActionOnDashboardSlot(e.target);
};


const leaveActionOnDashboardSlot = (element) => {
    element.classList.remove("shadow-box");
};

const enterActionOnDashboardSlot = (element) => {
    element.classList.add("shadow-box");
};


divs.forEach(div => {
    div.addEventListener(
        "mousedown",
        function (e) {
            isDown = true;
            offset = [div.offsetLeft - e.clientX, div.offsetTop - e.clientY];
            targetDiv = div;
        },
        true
    );

    movableAria.addEventListener(
        "mouseup",
        function () {
            isDown = false;
        },
        true
    );

    movableAria.addEventListener(
        "mousemove",
        function (event) {
            event.preventDefault();
            if (isDown) {
                mousePosition = {
                    x: event.clientX,
                    y: event.clientY,
                };
                targetDiv.style.left = mousePosition.x + offset[0] + "px";
                targetDiv.style.top = mousePosition.y + offset[1] + "px";
            }
        },
        true
    )
})




