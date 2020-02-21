export { RenderApp, Container, Button, Condition, Loop, Gesture, Colors, Alert, Badge, ButtonGroup, Carousel, Line, Grid };

class Widget {
    constructor(type, child, color, bgColor, children, className, id) {
        this.child = child;
        this.children = children;
        this.type = type;
        this.bgColor = bgColor;
        this.color = color;
        this.className = className;
        this.id = id;
    }
    static btn({ ee, er }) {
        console.log(ee, er)
    }
    // a method used to create Widgets
    CreateWidget() {
        this.element = document.createElement(this.type);
        if (this.child != undefined) {
            if (typeof this.child == 'string') {
                this.element.innerHTML = this.child;
            }
            else {
                if (this.element != undefined) {
                    this.element.appendChild(this.child);
                }
            }
        }
        // setting the color
        if (this.color != undefined) {
            this.element.style.color = this.color;
        }
        // setting the background color
        if (this.bgColor != undefined) {
            this.element.style.backgroundColor = this.bgColor;
        }
        // setting the class
        // classname should be an array
        if (this.className != undefined) {
            if (typeof this.className == 'object') {
                for (let i = 0; i < this.className.length; i++) {
                    this.element.classList.add(this.className[i]);
                }
            }
        }
        // setting the id
        if (this.id != undefined) {
            this.CreateAttribute('id', this.id)
        }
        return this.element;

    }
    CreateChildren(children) {
        if (typeof children == 'object') {
            if (children.length > 0) {
                for (let i = 0; i < children.length; i++) {
                    if (typeof children[i] == 'string') {
                        this.element.append(children[i])
                    }
                    else {
                        if (children[i] != undefined) {
                            this.element.appendChild(children[i]);
                        }
                    }
                }
            }

        }
        else {
            console.error('The children property must be set to an Array')
        }
    }
    // a method used to create attributes;
    CreateAttribute(attr, value) {
        let condition = value != undefined;
        if (condition == true) {
            this.element.setAttribute(attr, value);
            return this.element;
        }
        else {
            return this.element;
        }
    }
    // a method to set values
    SetValue(value) {
        this.element.value = value;
    }

}
// the Gesture class
class Gesture {
    // for the click event
    static click = function (ele, func) {
        ele.addEventListener('click', () => {
            func();
        })
        return ele;
    }
    static hover = (ele, func) => {
        ele.addEventListener('mouseover', () => {
            func();
        })
        return ele;
    }
    static dblClick = (ele, func) => {
        ele.addEventListener('dblclick', () => {
            func();
        })
        return ele;
    }
}
// the Color class
class Colors {
    // normal colors
    static white = 'white';
    static black = 'black';
    static green = 'green';
    static teal = 'teal';
    static red = 'red';
    static orange = 'orange';
    static blue = 'blue';
    static tan = 'tan';
    static yellow = 'yellow';
    static grey = 'grey';
    static pink = 'pink';
    static indigo = 'indigo';
    // a method to get RGB colors
    static fromRGB = (red, green, blue) => {
        return `rgb(${red},${green},${blue})`;
    }
    // a method to get RGBA colors
    static fromRGBA = (red, green, blue, a) => {
        console.log([red, green, blue, a])
        return [red, green, blue, a];
    }
    // a method to give Hex colors
    static fromHex = (hex) => {
        return hex;
    }
}

// widgets that will be used in producing interfaces
// Text widget
function Text({ text, tagtype, color, bgColor, id, className }) {
    // listing all the posible tags
    let supportedTextTags = ['h1', 'h2', 'h3', 'h3', 'h5', 'h6', 'b', 'i', 'em', 'small', 'p', 'pre', 's', 'span'];
    if (supportedTextTags.includes(tagtype)) {
        let textWidget = new Widget();
        textWidget.type = tagtype;
        textWidget.bgColor = bgColor;
        textWidget.color = color;
        textWidget.id = id;
        textWidget.className = className;
        let ele = textWidget.CreateWidget();
        ele.innerHTML = text;
        return ele;
    }
    // sending out error messages to help
    else {
        if (tagtype == null) {
            console.error('The tagtype for Text({}) is required ');
        }
        else {
            console.error('Make sure you are using a supported Text({}) tagtype');
        }
    }

}
// Button widget
function Btn({ child, color, bgColor, click, hover, id, className }) {
    let btn = new Widget();
    btn.type = 'Button';
    btn.child = child;
    btn.color = color;
    btn.bgColor = bgColor;
    btn.id = id;
    btn.className = className;
    let ele = btn.CreateWidget();
    if (click != undefined) {
        Gesture.click(ele, click)
    }
    if (hover != undefined) {
        Gesture.hover(ele, hover)
    }
    return ele;
}
// Container widget
function Container({ children, color, bgColor, tagtype, id, className }) {
    // supported tags
    // make sure you create the element before creating the children
    let supportedTags = ['div', 'span', 'nav', 'aside', 'section'];
    if (supportedTags.includes(tagtype)) {
        let ctn = new Widget();
        ctn.type = tagtype;
        ctn.children = children;
        ctn.bgColor = bgColor;
        ctn.id = id;
        ctn.className = className;
        let ele = ctn.CreateWidget();
        ctn.CreateChildren(children);
        return ele;
    }
    // error messages for tagtype in Container
    else {
        if (tagtype == null) {
            console.error('The tagtype for Container({}) is required ');
        }
        else {
            console.error('Make sure you are using a supported Container({}) tagtype');
        }
    }
}
// The Anchor Widget

function Anchor({ href, children, download, target, color, bgColor, id, className }) {
    if (children != undefined && typeof children == 'object') {
        let ach = new Widget();
        ach.type = 'a';
        ach.color = color;
        ach.bgColor = bgColor;
        ach.id = id;
        ach.className = className;
        ach.CreateWidget();
        ach.CreateChildren(children);
        // setting the attributes
        let ele = ach.CreateAttribute('href', href);
        // making sure the download properties value is always a boolean
        if (download != undefined) {
            if (typeof download == 'boolean') {
                ele = ach.CreateAttribute('download', download);
            }
            else {
                console.error('The download prperty for Anchor({}) requires a boolean');
            }
        }
        ele = ach.CreateAttribute('target', target);
        return ele;
    }
    else {
        console.error('The child property for Anchor({}) is required');
    }
}
// List widget
function List({ type, data, children, id, className }) {
    // setting the default list type to UL
    if (type == undefined) {
        type = 'ul';
    }
    let lst = new Widget();
    lst.type = type;
    lst.children = children;
    lst.id = id;
    lst.className = className;
    let ele = lst.CreateWidget();
    lst.CreateChildren(children);
    return ele;
}
// the ListItem widget
function ListItem({ children, id, className }) {
    let li = new Widget();
    li.type = 'li';
    li.id = id;
    li.className = className;
    let ele = li.CreateWidget();
    li.children = children;
    li.CreateChildren(children);
    return ele;
}
// Image Widget
function Image({ src, alt, height, width, id, className }) {
    // making sure src is set
    if (src != undefined) {
        let img = new Widget();
        img.type = 'img';
        img.id = id;
        img.className = className;
        let ele = img.CreateWidget();
        img.CreateAttribute('src', src);
        // performing validation for the height, width and alt 
        if (alt != undefined) {
            img.CreateAttribute('alt', alt);
        }
        if (height != undefined) {
            img.CreateAttribute('height', height);
        }
        if (width != undefined) {
            img.CreateAttribute('width', width);
        }

        return ele;
    }
    else {
        console.error('The src for the Image({}) most be set');
    }
}
// the audio widget
function Audio({ src, controls, muted, auto, loop, id, className }) {
    if (src != undefined) {
        let au = new Widget();
        au.type = 'audio';
        au.id = id;
        au.className = className;
        let ele = au.CreateWidget();
        au.CreateAttribute('src', src);
        // controls
        if (controls != undefined) {
            if (typeof controls == 'boolean') {
                au.CreateAttribute('controls', controls);
            }
        }
        // muted
        if (muted != undefined) {
            if (typeof muted == 'boolean') {
                au.CreateAttribute('muted', muted);
            }
        }
        // autoplay
        if (auto != undefined) {
            if (auto == true) {
                au.CreateAttribute('autoplay', auto);
            }
        }
        // loop
        if (loop != undefined) {
            if (typeof loop == 'boolean') {
                au.CreateAttribute('loop', loop);
            }
        }
        return ele
    }
    else {
        console.error("The src property for Audio({}) is required");
    }
}
// the Video widget
function Video({ src, controls, muted, auto, loop, height, width, id, className }) {
    if (src != undefined) {
        let vid = new Widget();
        vid.type = 'video';
        vid.id = id;
        vid.className = className;
        let ele = vid.CreateWidget();
        vid.CreateAttribute('src', src);
        // Height
        if (height != undefined) {
            if (typeof height == 'number') {
                vid.CreateAttribute('height', height);
            }
        }
        // width
        if (width != undefined) {
            if (typeof width == 'number') {
                vid.CreateAttribute('width', width);
            }
        }
        // controls
        if (controls != undefined) {
            if (typeof controls == 'boolean') {
                vid.CreateAttribute('controls', controls);
            }
        }
        // muted
        if (muted != undefined) {
            if (typeof muted == 'boolean') {
                vid.CreateAttribute('muted', muted);
            }
        }
        // autoplay
        if (auto != undefined) {
            if (auto == true) {
                vid.CreateAttribute('autoplay', auto);
            }
        }
        // loop
        if (loop != undefined) {
            if (typeof loop == 'boolean') {
                vid.CreateAttribute('loop', loop);
            }
        }
        return ele
    }
    else {
        console.error("The src property for Video({}) is required");
    }
}
// The Iframe widget
function Iframe({ src, height, width, id, className }) {
    if (src != undefined) {
        let frame = new Widget();
        frame.type = 'iframe';
        frame.id = id;
        frame.className = className;
        let ele = frame.CreateWidget();
        // Height
        if (height != undefined) {
            if (typeof height == 'number') {
                frame.CreateAttribute('height', height);
            }
        }
        // width
        if (width != undefined) {
            if (typeof width == 'number') {
                frame.CreateAttribute('width', width);
            }
        }
        return ele;
    }
    else {
        console.error('The src property for Iframe({}) is required');
    }
}
// the Line widget
function Line({ width, id, className }) {
    let hr = new Widget();
    hr.type = 'hr';
    hr.id = id;
    hr.className = className;
    let ele = hr.CreateWidget();
    if (width != undefined) {
        hr.CreateAttribute('width', width);
    }
    return ele;
}
// the FormGroup widget
function FormGroup({ children, action, method, validate, name, id, className }) {
    let form = new Widget();
    form.type = 'form';
    form.id = id;
    form.className = className;
    let ele = form.CreateWidget();
    // validate
    if (validate != undefined) {
        if (validate == false) {
            form.CreateAttribute('novalidate', true);
        }
    }
    // action
    if (action != undefined) {
        form.CreateAttribute('action', action);
    }
    // action
    if (method != undefined) {
        form.CreateAttribute('method', method.toUpperCase());
    }
    form.CreateChildren(children);
    return ele;
}
// the TextField widget
function TextField({ type, value, autofocus, placeholder, required, id, className }) {
    let supportedTypes = ['button', 'checkbox', 'color', 'date', 'datetime-local', 'email', 'file', 'hidden', 'image', 'month', 'number', 'password', 'radio', 'range', 'reset', 'search', 'submit', 'tel', 'text', 'time', 'url', 'week',];
    if (type != undefined) {
        if (supportedTypes.includes(type)) {
            let field = new Widget();
            field.type = 'input';
            field.id = id;
            field.className = className;
            let ele = field.CreateWidget();
            field.CreateAttribute('type', type);
            if (value != undefined) {
                field.SetValue(value);
            }
            // autofucus
            if (autofocus != undefined) {
                if (autofocus == true) {
                    field.CreateAttribute('autofocus', '');
                }
            }
            // required
            if (required != undefined) {
                if (required == true) {
                    field.CreateAttribute('required', '');
                }
            }
            // placeholder
            if (placeholder != undefined) {
                field.CreateAttribute('placeholder', placeholder);
            }
            return ele;
        }
        else {
            console.error('The type property for TextField({}) must be a valid type');
        }
    }
    else {
        console.error('The type property for TextField({}) is required');
    }
}
// the Select widget
function Select({ required, multiple, data, id, className }) {
    let slc = new Widget();
    slc.type = 'select';
    slc.id = id;
    slc.className = className;
    let ele = slc.CreateWidget();
    // declare the children array so that you will produce the data and send it to the CreateChildren method
    let children = [];
    // required
    if (required != undefined) {
        if (required == true) {
            slc.CreateAttribute('required', '');
        }
    }
    // multiple
    if (multiple != undefined) {
        if (multiple == true) {
            slc.CreateAttribute('multiple', '');
        }
    }
    if (typeof data == 'object') {
        if (data.length > 0) {
            // lloping through the data array to get the data and create the option element from it
            for (let i = 0; i < data.length; i++) {
                let opt = document.createElement('option');
                opt.innerHTML = data[i];
                children.push(opt);
            }
            slc.CreateChildren(children);
        }
    }
    return ele;
}

// the Canvas widget
function Canvas({ width, height, id, script, className }) {
    // make sure you work on scripts property
    let cnv = new Widget();
    cnv.type = 'canvas';
    let element = cnv.CreateWidget();
    // Height
    if (height != undefined) {
        if (typeof height == 'number') {
            cnv.CreateAttribute('height', height);
        }
    }
    // width
    if (width != undefined) {
        if (typeof width == 'number') {
            cnv.CreateAttribute('width', width);
        }
    }
    cnv.id = id;
    cnv.className = className;
    console.log(script);
    return element;
};
// the Table widget
function Table({ headers, children, id, className }) {
    let tbl = new Widget();
    tbl.type = 'table';
    let ele = tbl.CreateWidget();
    let Headerchildren = [];
    // creating a new tr element
    let trr = new Widget();
    trr.type = 'tr';
    // setting tr to be the actual value of the return from the createWidget() method
    let tr = trr.CreateWidget();
    // auto filling the hearders for the user
    if (typeof headers == 'object') {
        if (headers.length > 0) {
            let elements = [];
            for (let i = 0; i < headers.length; i++) {
                // creating th elements
                let th = document.createElement('th');
                th.innerHTML = headers[i];
                // pushing the elements to the element array which would be used in the createChildren() method
                elements.push(th);
            }
            trr.CreateChildren(elements)
            console.log(tr)
            // the children method for the table widget
            Headerchildren.push(tr);
        }
        tbl.CreateChildren(Headerchildren);
    }
    tbl.CreateChildren(children);
    return ele;
}
// the TableRow widget
function TableRow({ children, id, className }) {
    let tr = new Widget();
    tr.type = 'tr';
    let ele = tr.CreateWidget();
    tr.CreateChildren(children);
    return ele;
}
// the TableCell()
function TableCell({ child, id, className }) {
    let td = new Widget();
    td.type = 'td';
    let ele = td.CreateWidget();
    if (child != undefined) {
        ele.innerHTML = child
    }
    return ele;
}
// the Code() widget
function Code({ child, id, className }) {
    let code = new Widget();
    code.type = 'code';
    let ele = code.CreateWidget();
    if (child != undefined) {
        ele.innerHTML = child;
    }
    return ele;
}
// the Pre({}) widget
function Pre({ child, id, className }) {
    let pre = new Widget();
    pre.type = 'pre';
    let ele = pre.CreateWidget();
    if (child != undefined) {
        ele.innerHTML = child;
    }
    return ele;
}

// the RenderApp Widget for redering
function RenderApp({ el, title, body }) {
    try {
        let element = document.querySelector(el);
        element.innerHTML = '';
        element.appendChild(body);
    }
    catch (err) {
        console.error(err)
    }
    if (title != undefined) {
        document.querySelector('title').innerHTML = title;
    }
}
// The condition Widget
function Condition({ data, child }) {
    if (data == true) {
        return child;
    }
}
// the loop Widget still working on it  
function Loop({ data, children }) {
    var value = 0;
    var index = 0;
    if (data != undefined) {
        if (typeof data == 'object') {
            data.forEach((value, index) => {
                value = value;
                index = index;
                console.log(value)
            })
        }
    }
    return value, index
}
// now we would use boostrap for easy styling of our widgets
// we will be using boostrap for easy styling
// #          #
// #          ##
// #          ###
// #          #####
// #          ######
// the navbar widget
function Navbar({ brand, toogle, controls, left, size, navbarNav, bgColor, color, dropdown, form }) {
    let toogleState;
    let brandState;
    let navbarNavState;
    let dropdownState;
    let formstate;
    // toggle state
    if (toogle != undefined) {
        if (typeof toogle == 'boolean') {
            toogleState = true;
        }
    }
    // navbar nav state
    function mapListToHref() {
        let children = [];
        if (navbarNav != undefined) {
            if (typeof navbarNav == 'object') {
                navbarNavState = true;
                for (i = 0; i < navbarNav.items.length; i++) {
                    console.log(typeof navbarNav.items[i])
                    children.push(ListItem({
                        className: ['nav-item'],
                        children: [
                            Anchor({
                                className: ['nav-link'],
                                href: navbarNav.hrefs[i],
                                child: navbarNav.items[i]
                            })
                        ]
                    }))
                }
            }
        }
        return children;
    }
    // dropdownData 
    function dropdowndata() {
        let children = [];
        if (dropdown != undefined) {
            if (typeof dropdown == 'object') {
                dropdownState = true;
                for (i = 0; i < dropdown.items.length; i++) {
                    console.log(typeof dropdown.items[i])
                    children.push(Anchor({
                        className: ['dropdown-item'],
                        href: dropdown.hrefs[i],
                        child: dropdown.items[i]
                    }))
                }
            }
        }
        let navdrop = ListItem({
            className: ['nav-item', 'dropdown'],
            children: [
                Anchor({
                    className: ['nav-link', 'dropdown-toggle'],
                    child: 'Dropdown',
                    id: 'navbarDropdown'
                }),
                Container({
                    className: ['dropdown-menu'],
                    tagtype: 'div',
                    children: children
                })
            ]
        })
        return navdrop

    }
    let maptolist = mapListToHref();
    let drop = dropdowndata()
    // inline form
    function inlineForm() {
        let child;
        if (form != undefined) {
            if (typeof form == 'object') {
                formstate = true;
                child = FormGroup({
                    className: ['form-inline', 'my-2', 'my-lg-0'],
                    children: [
                        TextField({
                            type: form.type,
                            className: ['form-control', 'mr-sm-2'],
                        }),
                        Btn({
                            click: () => { console.log('search clicked') },
                            child: form.text,
                            className: ['btn', 'btn-outline-success', 'my-2', 'my-sm-0']
                        })
                    ]
                })
            }
        }
        return child;
    }
    let inlineform = inlineForm();
    //brand state
    if (brand != undefined) {
        if (typeof brand == 'string') {
            brandState = true;
        }
    }
    return Container({
        className: ['navbar', 'navbar-expand-lg', 'navbar-light', 'bg-light'],
        tagtype: 'nav',
        children: [
            Condition({
                data: brandState,
                child: Anchor({
                    className: ['navbar-brand'],
                    href: '#',
                    child: brand
                }),
            }),
            Condition({
                data: toogleState,
                child: Btn({
                    className: ['navbar-toggler'],
                    child: Container({
                        children: [],
                        tagtype: 'span',
                        className: ['navbar-toggler-icon']
                    })
                })
            }),
            Condition({
                data: navbarNavState,
                child: Container({
                    className: ['collapse', 'navbar-collapse'],
                    id: 'navbarSupportedContent',
                    children: [
                        List({
                            type: 'ul',
                            className: ['navbar-nav', 'mr-auto'],
                            children: [maptolist, drop, inlineform].flat(2)
                        }),
                    ],
                    tagtype: 'div'
                })
            })
        ]
    })
}

function Card({ image, text, title, btn, children }) {
    let childrentoberendered = [];
    if (image != undefined) {
        childrentoberendered.push(Image({
            src: image,
            className: ['card-img-top']
        }))
    }
    var textWid = '';
    if (text != undefined) {
        textWid = Text({ text: text, tagtype: 'p', className: ['card-text'] });
    }
    var titleWid = ' ';
    if (title != undefined) {
        console.log(title)
        titleWid = Text({ text: title, tagtype: 'h5', className: ['card-title'] });
    }
    var cardBtn = '';
    if (btn != undefined) {
        btn.classList.add('btn');
        cardBtn = btn
    }

    childrentoberendered.push(Container({
        tagtype: 'div',
        className: ['card-body'],
        children: [
            titleWid,
            textWid,
            cardBtn

        ]
    }));
    if (children != undefined) {
        childrentoberendered = children
    }
    console.log(childrentoberendered)
    return Container({
        className: ['card'],
        tagtype: 'div',
        children: childrentoberendered
    })
}

// the Grid 
function Grid({ size, children }) {
    let columnChildren = []
    if (children != undefined) {
        if (typeof children == 'object') {
            // looping to get the children from the children array
            for (let i = 0; i < children.length; i++) {
                columnChildren.push(children[i]);
            }
        }
    }
    let sizeArray = [];
    if (size != undefined) {
        if (typeof size == 'object') {
            // looping throug the size array to get the styles and make a class from if
            for (let i = 0; i < size.length; i++) {
                sizeArray.push(Container({
                    tagtype: 'div',
                    className: [`col-sm-${size[i]}`],
                    // mapping the corresponding class to the coresponding widget
                    children: [columnChildren[i]]
                }));
            }
        }
    }
    return Container({
        tagtype: 'div',
        className: ['row'],
        children: sizeArray
    })
}

// the boostrap alert widget
class Alert {
    // the main default alert ,idclass
    static normalalert = (classname, children, id) => {
        let classes = [];
        if (classname[1] != undefined) {
            classes = classname;
            classes.push('alert');
        }
        else {
            classname.pop();
            classes = classname;
            classes.push('alert');
        }
        return Container({
            className: classes,
            tagtype: 'div',
            children: [children],
            id: id
        })
    }
    // primary alert
    static primary = ({ child, id, className }) => {
        return this.normalalert(['alert-primary'].concat(className), child, id)
    }
    // secondary alert
    static secondary = ({ child, id, className }) => {
        return this.normalalert(['alert-secondary'].concat(className), child, id)
    }
    // success alert
    static success = ({ child, id, className }) => {
        return this.normalalert(['alert-success'].concat(className), child, id)
    }
    // danger alert
    static danger = ({ child, id, className }) => {
        return this.normalalert(['alert-danger'].concat(className), child, id)
    }
    // warning alert
    static warning = ({ child, id, className }) => {
        return this.normalalert(['alert-warning'].concat(className), child, id)
    }
    // info alert
    static info = ({ child, id, className }) => {
        return this.normalalert(['alert-info'].concat(className), child, id)
    }
    // light alert
    static light = ({ child, id, className }) => {
        return this.normalalert(['alert-light'].concat(className), child, id)
    }
    // dark alert
    static dark = ({ child, id, className }) => {
        return this.normalalert(['alert-dark'].concat(className), child, id);
    }
}
// the boostrap badge Widget
//#############
// ####
//  ##
//   #########

class Badge {
    static normalBadge = (classname, child, id) => {
        let classes = [];
        if (classname[1] != undefined) {
            classes = classname;
            classes.push('badge');
        }
        else {
            classname.pop();
            classes = classname;
            classes.push('badge');
        }
        return Container({
            className: classes,
            tagtype: 'span',
            children: [child],
            id: id
        })
    }
    // primary badge
    static primary = ({ child, id, className }) => {
        return this.normalBadge(['badge-primary'].concat(className), child, id)
    }
    // secondary badge
    static secondary = ({ child, id, className }) => {
        return this.normalBadge(['badge-secondary'].concat(className), child, id)
    }
    // success badge
    static success = ({ child, id, className }) => {
        return this.normalBadge(['badge-success'].concat(className), child, id)
    }
    // danger badge
    static danger = ({ child, id, className }) => {
        return this.normalBadge(['badge-danger'].concat(className), child, id)
    }
    // warning badge
    static warning = ({ child, id, className }) => {
        return this.normalBadge(['badge-warning'].concat(className), child, id)
    }
    // info badge
    static info = ({ child, id, className }) => {
        return this.normalBadge(['badge-info'].concat(className), child, id)
    }
    // light badge
    static light = ({ child, id, className }) => {
        return this.normalBadge(['badge-light'].concat(className), child, id)
    }
    // dark badge
    static dark = ({ child, id, className }) => {
        return this.normalBadge(['badge-dark'].concat(className), child, id);
    }
}
// the boostrap button class
// do not mistake it for the Button function
class Button {
    static normalButton = (classname, child, id, click, hover) => {
        let classes = [];
        if (classname[1] != undefined) {
            classes = classname;
            classes.push('btn');
        }
        else {
            classname.pop();
            classes = classname;
            classes.push('btn');
        }
        return Btn({
            className: classes,
            child: child,
            id: id,
            click: click,
            hover: hover
        })
    }
    // primary Button
    static primary = ({ child, id, click, hover, classname }) => {
        return this.normalButton(['btn-primary'].concat(classname), child, id, click, hover)
    }
    // secondary Button
    static secondary = ({ child, id, click, hover, classname }) => {
        return this.normalButton(['btn-secondary'].concat(classname), child, id, click, hover)
    }
    // success Button
    static success = ({ child, id, click, hover, classname }) => {
        return this.normalButton(['btn-success'].concat(classname), child, id, click, hover)
    }
    // danger Button
    static danger = ({ child, id, click, hover, classname }) => {
        return this.normalButton(['btn-danger'].concat(classname), child, id, click, hover)
    }
    // warning Button
    static warning = ({ child, id, click, hover, classname }) => {
        return this.normalButton(['btn-warning'].concat(classname), child, id, click, hover)
    }
    // info Button
    static info = ({ child, id, click, hover, classname }) => {
        return this.normalButton(['btn-info'].concat(classname), child, id, click, hover)
    }
    // light Button
    static light = ({ child, id, click, hover, classname }) => {
        return this.normalButton(['btn-light'].concat(classname), child, id, click, hover)
    }
    // dark Button
    static dark = ({ child, id, click, hover, classname }) => {
        return this.normalButton(['btn-dark'].concat(classname), child, id, click, hover);
    }

    // the btn outline section
    // primary outline Button
    static outlinepPrimary = ({ child, id, click, hover, classname }) => {
        return this.normalButton(['btn-outline-primary'].concat(classname), child, id, click, hover)
    }
    // secondary outline Button
    static outlineSecondary = ({ child, id, click, hover, classname }) => {
        return this.normalButton(['btn-outline-secondary'].concat(classname), child, id, click, hover)
    }
    // success outline Button
    static outlineSuccess = ({ child, id, click, hover, classname }) => {
        return this.normalButton(['btn-outline-success'].concat(classname), child, id, click, hover)
    }
    // danger outline Button
    static outlineDanger = ({ child, id, click, hover, classname }) => {
        return this.normalButton(['btn-outline-danger'].concat(classname), child, id, click, hover)
    }
    // warning outline Button
    static outlineWarning = ({ child, id, click, hover, classname }) => {
        return this.normalButton(['btn-outline-warning'].concat(classname), child, id, click, hover)
    }
    // info outline Button
    static outlineInfo = ({ child, id, click, hover, classname }) => {
        return this.normalButton(['btn-outline-info'].concat(classname), child, id, click, hover)
    }
    // light outline Button
    static outlineLight = ({ child, id, click, hover, classname }) => {
        return this.normalButton(['btn-outline-light'].concat(classname), child, id, click, hover)
    }
    // dark outline Button
    static outlineDark = ({ child, id, click, hover, classname }) => {
        return this.normalButton(['btn-outline-dark'].concat(classname), child, id, click, hover);
    }
}

// the ButtonGroup Widget
//#####
//   #####
// ########

function ButtonGroup({ buttons, className, id, role }) {
    let classes = [];
    if (className != undefined) {
        classes = ['btn-group'].concat(className);
    }
    else {
        classes = ['btn-group']
    }
    // making sure and error should not be throwns
    let btns = [];
    if (buttons != undefined) {
        btns = buttons
    }
    else {
        btns = []
    }
    let element = Container({
        tagtype: 'div',
        children: btns,
        className: classes,
        id: id,
    });
    // setting the role of the button
    if (role != undefined) {
        element.setAttribute('role', role);
    }
    return element;
}
// the carousel widget
// ##########
// #        #
// #        #
// #        #
// ##########
function Carousel({ images, controls, indicators, id, className }) {
    // variables
    let classes = [];
    let indicate;
    let control;
    let imagesState;
    // setting the control t true or false
    if (controls != undefined) {
        if (typeof controls == 'boolean') {
            control = true;
        }
    }
    else {
        control = false;
    }
    // setting the indicate to true or false
    if (indicators != undefined) {
        if (indicators == true) {
            indicate = true;
        }

    }
    else {
        indicate = false;
    }
    if (className != undefined) {
        classes = ['carousel', 'slide'].concat(className);
    }
    else {
        classes = ['carousel', 'slide'];
    }
    // looping throug the images in a function to produce the required widgets
    function loopImages(imagesArr) {
        let elements = [];
        if (imagesArr != undefined) {
            imagesState = true;
            if (typeof imagesArr == 'object') {
                for (let i = 0; i < imagesArr.length; i++) {
                    // so that only the first slide should hav the active class
                    if (i == 0) {
                        elements.push(Container({
                            tagtype: 'div',
                            className: ['carousel-item', 'active'],
                            children: [
                                Image({
                                    src: imagesArr[i],
                                    className: ['d-block', 'w-100']
                                })
                            ]
                        }));
                    }
                    // all other elememts will not have the active class
                    else {
                        elements.push(Container({
                            tagtype: 'div',
                            className: ['carousel-item'],
                            children: [
                                Image({
                                    src: imagesArr[i],
                                    className: ['d-block', 'w-100']
                                })
                            ]
                        }));
                    }
                }
            }
        }
        console.log(elements)
        let innercaro = Container({
            tagtype: 'div',
            className: ['carousel-inner'],
            children: elements
        });
        return innercaro;
    }
    let inner = loopImages(images);
    // setting imagestate to false if the loopimages function did not run
    if (imagesState == undefined) {
        imagesState = false
    }
    // making the showControls function
    function showNext() {
        let nexticon = Text({ text: '', tagtype: 'span', className: ['carousel-control-next-icon'] });
        nexticon.setAttribute('aria-hidden', 'true');
        let next = Anchor({
            href: '#carouselExampleIndicators',
            className: ['carousel-control-next'],
            children: [
                nexticon,
                Text({ tagtype: 'span', className: ['src-only'], text: 'Next' })
            ]
        });
        next.setAttribute('role', 'button');
        next.setAttribute('data-slide', 'next');
        return next;
    }
    function showPrev() {
        let previcon = Text({ text: '', tagtype: 'span', className: ['carousel-control-prev-icon'] });

        previcon.setAttribute('aria-hidden', 'true');

        let prev = Anchor({
            href: '#carouselExampleIndicators',
            className: ['carousel-control-prev'],
            children: [
                previcon,
                Text({ tagtype: 'span', className: ['src-only'], text: 'Previous' })
            ]
        });
        prev.setAttribute('role', 'button');
        prev.setAttribute('data-slide', 'prev');
        return prev;
    }
    // preparing the indicators list to display according to the number of images present
    function indicatorList(images) {
        let elements = [];
        function carolist(dst) {
            let listI = ListItem({
                children: []
            })
            listI.setAttribute('data-target', '#carouselExampleIndicators');
            listI.setAttribute('data-slide-to', dst);
            return listI;
        }
        if (imagesState == true) {
            for (let i = 0; i < images.length; i++) {
                elements.push(carolist(i))
            }
        }
        return elements;
    }
    let caro = Container({
        tagtype: 'div',
        id: 'carouselExampleIndicators',
        className: classes,
        children: [
            // condition for indicators
            Condition({
                data: indicate,
                child: List({
                    type: 'ol',
                    className: ['carousel-indicators'],
                    children: indicatorList(images)
                }),
            }),
            // the carousell inner condition
            Condition({
                data: imagesState,
                child: inner
            }),
            // for carousel controls
            // for the first
            Condition({
                data: control,
                child: showPrev(),
            }),
            // for the second
            Condition({
                data: control,
                child: showNext(),
            })
        ]
    });
    caro.setAttribute('data-ride', "carousel");
    return caro;
}