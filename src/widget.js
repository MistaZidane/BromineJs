export { RenderApp,Btn,  Container, Button, Condition, Gesture, Navbar, Colors, Alert, Badge, ButtonGroup, Carousel, Line, Grid, Collapse, Text, Dropdown, Jumbotron, ListGroup, ListGroupItem, Modal, Attr, Nav, NavItem, Card, PageItem, Pagination, Popover, Progress, Spinner, Toast, Timer, Timeout, Icons };

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
    let supportedTextTags = ['h1', 'h2', 'h3', 'h3', 'h5', 'h6', 'b', 'i', 'em', 'small', 'p', 'pre', 's', 'span', 'strong'];
    if (supportedTextTags.includes(tagtype)) {
        let textWidget = new Widget();
        textWidget.type = tagtype;
        textWidget.bgColor = bgColor;
        textWidget.color = color;
        textWidget.id = id;
        textWidget.className = className;
        let ele = textWidget.CreateWidget();
        ele.append(text);
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
        console.error('The children property for Anchor({}) is required');
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
function RenderApp({ el, title, body, framework, style, links, script }) {
    try {
        let element = document.querySelector(el);
        element.innerHTML = '';
        element.appendChild(body);
    }
    catch (err) {
        console.error(err, 'i am the one')
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
                for (let i = 0; i < navbarNav.items.length; i++) {
                    children.push(ListItem({
                        className: ['nav-item'],
                        children: [
                            Anchor({
                                className: ['nav-link'],
                                href: navbarNav.hrefs[i],
                                children: [navbarNav.items[i]]
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
                for (let i = 0; i < dropdown.items.length; i++) {
                    children.push(Anchor({
                        className: ['dropdown-item'],
                        href: dropdown.hrefs[i],
                        children: [dropdown.items[i]]
                    }))
                }
            }
        }
        let navdrop = ListItem({
            className: ['nav-item', 'dropdown'],
            children: [
                Anchor({
                    className: ['nav-link', 'dropdown-toggle'],
                    children: ['Dropdown'],
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
                    children: [brand]
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
                            children: [maptolist, Condition({ data: dropdownState, child: drop }), inlineform].flat(2)
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
function Carousel({ images, controls, indicators, id, className, caption }) {
    // variables
    let classes = [];
    let indicate;
    let control;
    let imagesState;
    let captionState;
    // state of the caption
    if (caption != undefined) {
        if (typeof caption == 'object') {
            captionState = true;
        }
        else {
            captionState = false;
        }
    }
    else {
        captionState = false;
    }
    // loop through captions and prepare them
    function captionsTitle(caption, index) {
        let title = [];
        for (let i = 0; i < caption.length; i++) {
            title.push(Text({
                tagtype: 'h5',
                text: caption[i].title
            }))
        }
        return title[index]
    }
    function captionsSubTitle(caption, index) {
        let subtitle = [];
        for (let i = 0; i < caption.length; i++) {
            subtitle.push(Text({
                tagtype: 'p',
                text: caption[i].subtitle
            }))
        }
        return subtitle[index]
    }
    captionsSubTitle(caption, 0);
    captionsTitle(caption, 1);
    // setting the control t true or false
    if (controls != undefined) {
        if (controls == true) {
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
                                }),
                                Condition({
                                    data: captionState,
                                    child: Container({
                                        tagtype: 'div',
                                        children: [
                                            captionsTitle(caption, i),
                                            captionsSubTitle(caption, i)
                                        ],
                                        className: ['carousel-caption', 'd-none', 'd-md-block']
                                    }),
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
                                }),
                                Condition({
                                    data: captionState,
                                    child: Container({
                                        tagtype: 'div',
                                        children: [
                                            captionsTitle(caption, i),
                                            captionsSubTitle(caption, i)
                                        ],
                                        className: ['carousel-caption', 'd-none', 'd-md-block']
                                    }),
                                })
                            ]
                        }));
                    }
                }
            }
        }
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

// the Collapse widget
// ***
//  **
//   * 

// saturday
function Collapse({ button, child }) {
    // the controller button
    let btn;
    if (button != undefined) {
        btn = button;
        try {
            button.setAttribute('data-toggle', '#collapseExample');
            button.setAttribute('aria-expanded', 'false');
            button.setAttribute('aria-controls', "collapseExample");
        }
        catch (err) {
            console.error(err)
        }
    }
    child.classList.add('collapse')
    // the main container
    let div = Container({
        children: [
            btn,
            child
        ],
        tagtype: 'div',
    })
    if (child == undefined) {
        console.error('The child property must be set');
    }
    else {
        if (child.id == '') {
            child.id = 'collapseExample';
        }
        else {
            button.setAttribute('data-toggle', child.id);

        }
    }
    return div;
}
// the dropdown widget
function Dropdown({ button, data }) {
    let btn;
    let id;
    if (button != undefined) {
        try {
            button.setAttribute('data-toggle', 'dropdown');
            button.setAttribute('aria-haspopup', 'true');
            button.setAttribute('aria-expanded', 'false');
            if (button.id == '') {
                button.setAttribute('id', 'dropdownMenuButton');
                btn = button;
                id = 'dropdownMenuButton';
            }
            else {
                id = button.id;
            }
        }
        catch (err) {

        }
    }
    // function to produce the items
    function dropMenuItext(href, text) {
        return Anchor({
            href: href,
            children: [text],
            className: ['dropdown-item']
        })
    }
    // looping throug the data
    let items = [];
    if (data != undefined) {
        if (typeof data == 'object') {
            for (let i = 0; i < data.length; i++) {
                items.push(dropMenuItext(data[i].href, data[i].text))
            }
        }
    }
    let dropmenu = Container({
        tagtype: 'div',
        children: items,
        className: ['dropdown-menu']
    })
    dropmenu.setAttribute('aria-labelledby', id);

    let element = Container({
        tagtype: 'div',
        children: [
            btn,
            dropmenu
        ],
        className: ['dropdown']
    })
    return element
}
// the Jumbotron widget
function Jumbotron({ className, children, id, fluid }) {
    let classes = [];
    let content = [];
    let jumclass = ['jumbotron']
    if (className != undefined) {
        classes = className
    }
    if (children != undefined) {
        content = children
    }
    if (fluid == true) {
        jumclass = ['jumbotron', 'jumbotron-fluid']
    }
    return Container({
        children: content,
        tagtype: 'div',
        className: jumclass.concat(classes),
        id: id
    })
}
// the list group widget
// ############    ||
// *************** ||
// ############    ||\

function ListGroup({ children, className, id, itemClick = (index, ele) => { } }) {
    let classes = [];
    let content = [];

    if (className != undefined) {
        classes = ['list-group'].concat(className);
    }
    else {
        classes = ['list-group']
    }
    if (children != undefined) {
        content = children
    }
    let list = List({
        className: classes,
        children: content,
        id: id
    });
    // automaticticalyy adding event listeners to them passing the index to it
    for (let i = 0; i < list.children.length; i++) {
        console.log(list.children)
        list.children[i].addEventListener('click', () => {
            itemClick(i, list.children[i]);
        })
    }
    return list;
}

// the list group item widget
function ListGroupItem({ className, id, children }) {
    let classes = [];
    let content = [];
    if (className != undefined) {
        classes = ['list-group-item'].concat(className);
    }
    else {
        classes = ['list-group-item']
    }
    if (children != undefined) {
        content = children
    }
    let listitem = ListItem({
        children: content,
        id: id,
        className: classes
    })
    return listitem;
}

// the boostrap modal widget
function Modal({ doneText, body, footer, title, button }) {
    // checking the title
    if (title == undefined) {
        title = 'set your own title using the title property'
    }
    // setting up the button
    if (button != undefined) {
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#exampleModalScrollable');
    }
    let closeText = Text({ tagtype: 'span', text: '&times;' });
    closeText.setAttribute('aria-hidden', 'true');
    let closeBtn = Btn({
        child: closeText,
        className: ['close'],

    });
    closeBtn.setAttribute('data-dismiss', 'modal');
    closeBtn.setAttribute('arial-lable', 'close');
    let modalFooter = Container({
        children: footer,
        className: ['modal-footer'],
        tagtype: 'div'
    })
    let modalBody = Container({
        children: body,
        className: ['modal-body'],
        tagtype: 'div'
    });
    let modalHeader = Container({
        tagtype: 'div',
        children: [
            Text({ text: title, tagtype: 'h5', className: ['modal-title'], id: 'exampleModalScrollable' }),
            closeBtn
        ],
        className: ['modal-header']
    })
    let modalContent = Container({
        children: [modalHeader, modalBody, modalFooter],
        className: ['modal-content'],
        tagtype: 'div'
    })
    let modalDialog = Container({
        tagtype: 'div',
        children: [modalContent],
        className: ['modal-dialog', 'modal-dialog-scrollable']
    });
    modalDialog.setAttribute('role', 'document');
    let modal = Container({
        tagtype: 'div',
        children: [modalDialog],
        className: ['modal', 'fade'],
        id: 'exampleModalScrollable'
    });
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-hidden', 'true');
    return Container({
        tagtype: 'div',
        children: [
            button,
            modal
        ]
    })
}
// making the Attr widget used in setting attributes
function Attr({ prop, value, child }) {
    if (prop != undefined && value != undefined && child != undefined) {
        child.setAttribute(prop, value);
        return child;
    }
    else {
        console.error('make sure prop, value and child in the Attr widget was set');
    }
}
// the bootstrap Nav widget
function Nav({ items, id, className, center, right, vertical, tabs, pills }) {
    let children = [];
    let classes = [];
    if (className != undefined) {
        classes = ['nav'].concat(className)
    }
    else {
        classes = ['nav']
    }
    // checking if center is true so we can edit the classes
    if (center == true) {
        classes.push('justify-content-center')
    }
    // if right is true
    if (right == true) {
        classes.push('justify-content-end')
    }
    // if center and right is true it should align right
    // but the defalut alignment is left
    if (center == true && right == true) {
        classes.splice(classes.indexOf('justify-content-center'), classes.indexOf('justify-content-center'))
        classes.push('justify-content-end');
    }
    // checking for verticallity
    if (vertical == true) {
        classes.push('flex-column')
    }
    // checking if it tabs or pills
    if (tabs == true) {
        classes.push('nav-tabs')
    }
    if (pills == true) {
        classes.push('nav-pills')
    }
    // removing tabs so as to enable only one class
    if (pills == true && tabs == true) {
        classes.splice(classes.indexOf('nav-tabs'), classes.indexOf('nav-tabs'))
    }
    if (items != undefined) {
        children = items;
    }

    return Container({
        tagtype: 'nav',
        children: children,
        className: classes,
        id: id
    })
}
// the boostrap navItem widget
function NavItem({ href, text, active, className }) {
    let acti = ['nav-link'];
    if (active == true) {
        acti = ['nav-link', 'active'];
    }
    let classes = [];

    if (className != undefined) {
        classes = ['nav-item'].concat(className)
    }
    else {
        classes = ['nav-item']
    }
    return ListItem({
        children: [Anchor({
            href: href,
            children: [text],
            className: acti
        })],
        className: classes
    })
}
// the Pagination widget
function Pagination({ className, id, Items }) {
    let classes = ['pagination'];
    if (className != undefined) {
        classes.concat(className);
    }
    let element = Container({
        tagtype: 'nav',
        children: [
            List({
                type: 'ul',
                children: Items,
                className: classes
            })
        ]
    });
    element.setAttribute('arail-lable', 'page pagination');
    return element
}
// the PageItem widget
function PageItem({ id, className, href, text }) {
    let classes = ['page-item'];
    if (className != undefined) {
        classes.concat(className);
    }
    let element = ListItem({
        children: [
            Anchor({
                href: href,
                children: [text],
                className: ['page-link']
            })
        ],
        className: ['page-item']
    });
    return element
}
// the Popover widget
// ##################
//  """"""""""""""""""""
// -----++++++++#####$$$%%

class Popover {
    static popover({ title, text, content, click, placement }) {
        let element = Button.primary({
            child: text,
            click: click,
        });
        element.setAttribute('data-container', 'body');
        element.setAttribute('data-toggle', 'popover');
        element.setAttribute('data-placement', placement);
        element.setAttribute('data-content', content);
        element.setAttribute('title', title);
        return element;
    }
    static Top = ({ title, text, content, click }) => {
        return this.popover({ title: title, text: text, click: click, placement: 'top', content: content });
    }
    static Bottom = ({ title, text, content, click }) => {
        return this.popover({ title: title, text: text, click: click, placement: 'bottom', content: content });
    }
    static Right = ({ title, text, content, click }) => {
        return this.popover({ title: title, text: text, click: click, placement: 'right', content: content });
    }
    static Left = ({ title, text, content, click }) => {
        return this.popover({ title: title, text: text, click: click, placement: 'left', content: content });
    }
}
// the Progress widget
//####################
class Progress {
    static progr({ id, className, value, min, max, height, striped }) {
        className.push('progress-bar');
        if (striped == true) {
            className.push('progress-bar-striped');
        }
        let element = Container({
            tagtype: 'div',
            children: [],
            className: className
        });
        element.setAttribute('role', "progressbar");
        element.setAttribute('style', `width: ${value}%`);
        element.setAttribute('aria-valuenow', value);
        element.setAttribute('aria-valuemin', min);
        element.setAttribute('aria-valuemax', max);
        let contaner = Container({
            tagtype: 'div',
            className: ['progress'],
            children: [
                element,
            ]
        });
        if (typeof height == 'number') {
            contaner.style.height = height + 'px';
        }
        return contaner;
    }
    static info = ({ id, className, value, min, max, height, striped }) => {
        let classes = ['bg-info'];
        if (className != undefined) {
            classes.concat(className);
        }
        return this.progr({ id: id, className: classes, value: value, min: min, max: max, height: height, striped: striped });
    }
    static succes = ({ id, className, value, min, max, height, striped }) => {
        let classes = ['bg-success'];
        if (className != undefined) {
            classes.concat(className);
        }
        return this.progr({ id: id, className: classes, value: value, min: min, max: max, height: height, striped: striped });
    }
    static danger = ({ id, className, value, min, max, height, striped }) => {
        let classes = ['bg-danger'];
        if (className != undefined) {
            classes.concat(className);
        }
        return this.progr({ id: id, className: classes, value: value, min: min, max: max, height: height, striped: striped });
    }
    static warning = ({ id, className, value, min, max, height, striped }) => {
        let classes = ['bg-warning'];
        if (className != undefined) {
            classes.concat(className);
        }
        return this.progr({ id: id, className: classes, value: value, min: min, max: max, height: height, striped: striped });
    }

}
// the Spinner widget
class Spinner {
    static spin({ grow, className, id }) {

        let classes = ['spinner-border'];
        if (grow == true) {
            classes[0] = 'spinner-grow'
        }
        classes = classes.concat(className)
        let element = Container({
            children: [
                Container({
                    children: ['loading'],
                    tagtype: 'span',
                    className: ['sr-only']
                })
            ],
            tagtype: 'div',
            className: classes,
            id: id
        });
        return element;
    }
    static primary = ({ grow, className, id }) => {
        let classes = ['text-primary'];
        if (className != undefined) {
            classes.concat(className);
        }
        return this.spin({ grow: grow, className: classes, id: id });
    }
    static success = ({ grow, className, id }) => {
        let classes = ['text-success'];
        if (className != undefined) {
            classes.concat(className);
        }
        return this.spin({ grow: grow, className: classes, id: id });
    }
    static info = ({ grow, className, id }) => {
        let classes = ['text-info'];
        if (className != undefined) {
            classes.concat(className);
        }
        return this.spin({ grow: grow, className: classes, id: id });
    }
    static danger = ({ grow, className, id }) => {
        let classes = ['text-danger'];
        if (className != undefined) {
            classes.concat(className);
        }
        return this.spin({ grow: grow, className: classes, id: id });
    }
    static warning = ({ grow, className, id }) => {
        let classes = ['text-warning'];
        if (className != undefined) {
            classes.concat(className);
        }
        return this.spin({ grow: grow, className: classes, id: id });
    }
    static light = ({ grow, className, id }) => {
        let classes = ['text-light'];
        if (className != undefined) {
            classes.concat(className);
        }
        return this.spin({ grow: grow, className: classes, id: id });
    }
    static dark = ({ grow, className, id }) => {
        let classes = ['text-dark'];
        if (className != undefined) {
            classes.concat(className);
        }
        return this.spin({ grow: grow, className: classes, id: id });
    }
}
// the toast widget
function Toast({ id, className, title, text, subtitle, img }) {
    let titleState = false;
    let subtitleState = false;
    if (title != undefined) {
        titleState = true;
    }
    if (subtitle != undefined) {
        subtitleState = true;
    }
    let imgState = false;
    if (img != undefined) {
        imgState = true;
    }
    else {
        img = ''
    }
    console.log(imgState)
    let closeBtn = Btn({
        className: ['ml-2', 'mb-1', 'close'],
        child: Text({
            tagtype: 'span', text: '&times;'
        })
    });
    closeBtn.setAttribute('type', 'button');
    closeBtn.setAttribute('data-dismiss', 'toast');
    closeBtn.setAttribute('aria-lable', 'close');
    let toastHeader = Container({
        tagtype: 'div',
        className: ['toast-header'],
        children: [
            Condition({
                data: imgState,
                child: Image({
                    src: img,
                    className: ['rounded', 'mr-2']
                })
            }),
            Condition({
                data: titleState,
                child: Text({ text: title, tagtype: 'strong' }),
            }),
            Condition({
                data: subtitleState,
                child: Text({ text: subtitle, tagtype: 'small' })
            }),
            closeBtn
        ]
    })
    let classes = ['toast'];
    if (className != undefined) {
        classes.concat(className);
    }
    let toastBody = Container({
        tagtype: 'div',
        className: ['toast-body'],
        children: [text]
    })
    let element = Container({
        tagtype: 'div',
        children: [
            toastHeader,
            toastBody
        ],
        className: classes
    });
    element.setAttribute('role', 'alert');
    element.setAttribute('aria-alive', 'assertive');
    element.setAttribute('aria-atomic', 'true');
    return element;
}
// the Timer widget
function Timer({ milisecs, ondone = () => { }, child }) {
    if (typeof milisecs == 'number') {
        setInterval(() => {
            ondone()
        }, milisecs);
        return child;
    }
}
// the timeout widget
function Timeout({ milisecs, ondone = (child) => { }, child }) {
    if (typeof milisecs == 'number') {
        setTimeout(() => {
            ondone(child)
        }, milisecs);
        return child;
    }
}
// the Icons widget
// this widget will provide you with a quick way to have icons to you app
// we are using font awesome icons 
class Icons {
    // the setup for icons
    static icon({ classname }) {
        let i = new Widget();
        i.type = 'i';
        i.className = ['fa', `fa-${classname}`];
        let ele = i.CreateWidget();
        ele.setAttribute('aria-hidden', 'true');
        return ele;
    }
    // making the icons
    static home = this.icon({ classname: 'home' });
    static telegram = this.icon({ classname: 'telegram' });
    static glass = this.icon({ classname: 'glass' });
    static music = this.icon({ classname: 'music' });
    static search = this.icon({ classname: 'search' });
    static envelope = this.icon({ classname: 'envelope-o' });
    static heart = this.icon({ classname: 'heart' });
    static star = this.icon({ classname: 'star' });
    static user = this.icon({ classname: 'user' });
    static film = this.icon({ classname: 'film' });
    static check = this.icon({ classname: 'check' });
    static times = this.icon({ classname: 'times' });
    static zoomPlus = this.icon({ classname: 'search-plus' });
    static zoomMinus = this.icon({ classname: 'search-minus' });
    static power = this.icon({ classname: 'power-off' });
    static signal = this.icon({ classname: 'signal' });
    static settings = this.icon({ classname: 'cog' });
    static trash = this.icon({ classname: 'trash-o' });
    static file = this.icon({ classname: 'file-o' });
    static clock = this.icon({ classname: 'clock-o' });
    static road = this.icon({ classname: 'road' });
    static download = this.icon({ classname: 'download' });
    static circleArrowDown = this.icon({ classname: 'arrow-circle-down' });
    static circleArrowUp = this.icon({ classname: 'arrow-circle-down' });
    static inbox = this.icon({ classname: 'inbox' });
    static circlePlay = this.icon({ classname: '-play-circle-o' });
    static repeat = this.icon({ classname: 'repeat' });
    static refresh = this.icon({ classname: 'refresh' });
    static ListAlt = this.icon({ classname: 'list' });
    static lock = this.icon({ classname: 'lock' });
    static flag = this.icon({ classname: 'flag' });
    static headphones = this.icon({ classname: 'headphones' });
    static volumeOff = this.icon({ classname: 'volume-off' });
    static volumeOff = this.icon({ classname: 'volume-off' });
    static volumeOff = this.icon({ classname: 'volume-off' });
    static volumeDown = this.icon({ classname: 'volume-down' });
    static volumeUp = this.icon({ classname: 'qrcode' });
    static barcode = this.icon({ classname: 'barcode' });
    static tag = this.icon({ classname: 'tag' });
    static tags = this.icon({ classname: 'tags' });
    static book = this.icon({ classname: 'book' });
    static bookmark = this.icon({ classname: 'bookmark' });
    static print = this.icon({ classname: 'print' });
    static camera = this.icon({ classname: 'camera' });
    static font = this.icon({ classname: 'font' });
    static bold = this.icon({ classname: 'bold' });
    static italic = this.icon({ classname: 'italic' });
    static textHeight = this.icon({ classname: 'text-height' });
    static textWidth = this.icon({ classname: 'text-width' });
    static alignLeft = this.icon({ classname: 'align-left' });
    static alignCenter = this.icon({ classname: 'align-center' });
    static alignRight = this.icon({ classname: 'align-right' });
    static alignJustify = this.icon({ classname: 'align-justify' });
    static list = this.icon({ classname: 'list' });
    static outdent = this.icon({ classname: 'outdent' });
    static indent = this.icon({ classname: 'indent' });
    static videoCamera = this.icon({ classname: 'videa-camera' });
    static picture = this.icon({ classname: 'picture-o' });
    static pencil = this.icon({ classname: 'pencil' });
    static mapMarker = this.icon({ classname: 'map-marker' });
    static adjust = this.icon({ classname: 'adjust' });
    static tint = this.icon({ classname: 'tint' });
    static pencilSquare = this.icon({ classname: 'pencil-square-o' });
    static shareSquare = this.icon({ classname: 'share-square-o' });
    static checkSquare = this.icon({ classname: 'check-square-o' });
    static arrows = this.icon({ classname: 'arrows' });
    static stepBackward = this.icon({ classname: 'step-backward' });
    static fastBackward = this.icon({ classname: 'fast-backward' });
    static backward = this.icon({ classname: 'backward' });
    static play = this.icon({ classname: 'play' });
    static pause = this.icon({ classname: 'pause' });
    static stop = this.icon({ classname: 'stop' });
    static stepForward = this.icon({ classname: 'step-forward' });
    static fastForward = this.icon({ classname: 'fast-forward' });
    static forward = this.icon({ classname: 'forward' });
    static forward = this.icon({ classname: 'eject' });
    static chevronLeft = this.icon({ classname: 'chevron-left' });
    static chevronRight = this.icon({ classname: 'chevron-right' });
    static plusCircle = this.icon({ classname: 'plus-circle' });
    static minusCircle = this.icon({ classname: 'minus-circle' });
    static timesCircle = this.icon({ classname: 'times-circle' });
    static checkCircle = this.icon({ classname: 'check-circle' });
    static questionCircle = this.icon({ classname: 'question-circle' });
    static infoCircle = this.icon({ classname: 'info-circle' });
    static crosshairs = this.icon({ classname: 'crosshairs' });
    static checkCircle = this.icon({ classname: 'check-circle' });
    static ban = this.icon({ classname: 'ban' });
    static arrowLeft = this.icon({ classname: 'arrow-left' });
    static arrowRight = this.icon({ classname: 'arrow-right' });
    static arrowUp = this.icon({ classname: 'arrow-up' });
    static arrowDown = this.icon({ classname: 'arrow-down' });
    static share = this.icon({ classname: 'share' });
    static expand = this.icon({ classname: 'expand' });
    static compress = this.icon({ classname: 'compress' });
    static plus = this.icon({ classname: 'plus' });
    static minus = this.icon({ classname: 'minus' });
    static asterisk = this.icon({ classname: 'asterisk' });
    static exclamatonCircle = this.icon({ classname: 'exclamation-circle' });
    static gift = this.icon({ classname: 'gift' });
    static leaf = this.icon({ classname: 'leaf' });
    static fire = this.icon({ classname: 'fire' });
    static eye = this.icon({ classname: 'eye' });
    static eyeslash = this.icon({ classname: 'eye-slash' });
    static exclamatonTriangle = this.icon({ classname: 'exclamation-triangle' });
    static plane = this.icon({ classname: 'plane' });
    static eye = this.icon({ classname: 'calender' });
    static random = this.icon({ classname: 'random' });
    static comment = this.icon({ classname: 'comment' });
    static magnet = this.icon({ classname: 'magnet' });
    static chevronUp = this.icon({ classname: 'chevron-up' });
    static chevronDown = this.icon({ classname: 'chevron-down' });
    static retweet = this.icon({ classname: 'retweet' });
    static shoppinCart = this.icon({ classname: 'shopping-cart' });
    static folder = this.icon({ classname: 'folder' });
    static folderOpen = this.icon({ classname: 'folder-open' });
    static arrowsV = this.icon({ classname: 'arrows-v' });
    static arrowsH = this.icon({ classname: 'arrows-h' });
    static barChart = this.icon({ classname: 'bar-chart' });
    static twitterSquare = this.icon({ classname: 'twitter-square' });
    static facebookSquare = this.icon({ classname: 'facebook-square' });
    static cameraRetro = this.icon({ classname: 'camera-retro' });
    static key = this.icon({ classname: 'key' });
    static cogs = this.icon({ classname: 'cogs' });
    static thumbsUpO = this.icon({ classname: 'thumbs-o-up' });
    static thumbsDownO = this.icon({ classname: 'thumbs-o-down' });
    static startHalf = this.icon({ classname: 'start-half' });
    static heartO = this.icon({ classname: 'heart-o' });
    static signOut = this.icon({ classname: 'sign-out' });
    static linkedinSquare = this.icon({ classname: 'linkedin-square' });
    static externalLink = this.icon({ classname: 'external-link' });
    static signIn = this.icon({ classname: 'sign-in' });
    static trophy = this.icon({ classname: 'trophy' });
    static githubSquare = this.icon({ classname: 'github-square' });
    static upload = this.icon({ classname: 'upload' });
    static lemonO = this.icon({ classname: 'lemon-o' });
    static phone = this.icon({ classname: 'phone' });
    static squareO = this.icon({ classname: 'square-o' });
    static bookmarkO = this.icon({ classname: 'bookmark-o' });
    static phoneSquare = this.icon({ classname: 'phone-square' });
    static twitter = this.icon({ classname: 'twitter' });
    static facebook = this.icon({ classname: 'facebook' });
    static github = this.icon({ classname: 'github' });
    static unlock = this.icon({ classname: 'unlock' });
    static creditCard = this.icon({ classname: 'credit-card' });
    static rss = this.icon({ classname: 'rss' });
    static hddO = this.icon({ classname: 'hdd-o' });
    static bullhorn = this.icon({ classname: 'bullhorn' });
    static bell = this.icon({ classname: 'bell' });
    static certificate = this.icon({ classname: 'certificate' });
    static handRightO = this.icon({ classname: 'hand-o-right' });
    static handLeftO = this.icon({ classname: 'hand-o-right' });
    static handUpO = this.icon({ classname: 'hand-o-up' });
    static handdownO = this.icon({ classname: 'hand-o-down' });
    static globe = this.icon({ classname: 'globe' });
    static wrench = this.icon({ classname: 'wrench' });
    static task = this.icon({ classname: 'task' });
    static filter = this.icon({ classname: 'filter' });
    static briefcase = this.icon({ classname: 'briefcase' });
    static arrowsAlt = this.icon({ classname: 'arrows-alt' });
    static users = this.icon({ classname: 'users' });
    static link = this.icon({ classname: 'link' });
    static cloud = this.icon({ classname: 'cloud' });
    static flask = this.icon({ classname: 'flask' });
    static scissors = this.icon({ classname: 'scissors' });
    static filesO = this.icon({ classname: 'files-o' });
    static paperclip = this.icon({ classname: 'paperclip' });
    static floppyO = this.icon({ classname: 'floppy-o' });
    static square = this.icon({ classname: 'square' });
    static listUl = this.icon({ classname: 'list-ul' });
    static listOl = this.icon({ classname: 'list-ol' });
    static strikethrough = this.icon({ classname: 'strikethrough' });
    static underline = this.icon({ classname: 'underline' });
    static table = this.icon({ classname: 'table' });
    static magic = this.icon({ classname: 'magic' });
    static truck = this.icon({ classname: 'truck' });
    static pinterest = this.icon({ classname: 'pinterest' });
    static pinterestSquare = this.icon({ classname: 'pinterest-square' });
    static googlePlusSquare = this.icon({ classname: 'google-plus-square' });
    static googlePlus = this.icon({ classname: 'google-plus' });
    static money = this.icon({ classname: 'money' });
    static caretDown = this.icon({ classname: 'caret-down' });
    static caretUp = this.icon({ classname: 'caret-up' });
    static caretLeft = this.icon({ classname: 'caret-left' });
    static caretRight = this.icon({ classname: 'caret-right' });
    static columns = this.icon({ classname: 'columns' });
    static sort = this.icon({ classname: 'sort' });
    static sortDesc = this.icon({ classname: 'sort-desc' });
    static sortAsc = this.icon({ classname: 'sort-asc' });
    static sort = this.icon({ classname: 'envelope' });
    static linkedin = this.icon({ classname: 'linkedin' });
    static undo = this.icon({ classname: 'undo' });
    static gavel = this.icon({ classname: 'gavel' });
    static tachometer = this.icon({ classname: 'tachometer' });
    static commentO = this.icon({ classname: 'comment-o' });
    static commentsO = this.icon({ classname: 'comments-o' });
    static bolt = this.icon({ classname: 'bolt' });
    static sitemap = this.icon({ classname: 'sitemap' });
    static umbrella = this.icon({ classname: 'umbrella' });
    static clipboard = this.icon({ classname: 'clipboard' });
    static lightbulbO = this.icon({ classname: 'lightbulb-o' });
    static exchange = this.icon({ classname: 'exchange' });
    static cloudDownload = this.icon({ classname: 'cloud-download' });
    static cloudUpload = this.icon({ classname: 'cloud-upload' });
    static userMd = this.icon({ classname: 'user-md' });
    static stethoscope = this.icon({ classname: 'stethoscope' });
    static suitcase = this.icon({ classname: 'suitcase' });
    static bellO = this.icon({ classname: 'bell-o' });
    static coffee = this.icon({ classname: 'coffee' });
    static cutlery = this.icon({ classname: 'cutlery' });
    static fileTextO = this.icon({ classname: 'file-text-o' });
    static buildingO = this.icon({ classname: 'building-o' });
    static hospitalO = this.icon({ classname: 'hospital-o' });
    static ambulance = this.icon({ classname: 'ambulance' });
    static medkit = this.icon({ classname: 'medkit' });
    static fighterJet = this.icon({ classname: 'fighter-jet' });
    static beer = this.icon({ classname: 'beer' });
    static hSquare = this.icon({ classname: 'h-square' });
    static plusSquare = this.icon({ classname: 'plus-square' });
    static angleDoubleLeft = this.icon({ classname: 'angle-double-left' });
    static angleDoubleRight = this.icon({ classname: 'angle-double-right' });
    static angleLeft = this.icon({ classname: 'angle-left' });
    static angleRight = this.icon({ classname: 'angle-right' });
    static angleUp = this.icon({ classname: 'angle-up' });
    static angleDown = this.icon({ classname: 'angle-down' });
    static desktop = this.icon({ classname: 'desktop' });
    static laptop = this.icon({ classname: 'laptop' });
    static tablet = this.icon({ classname: 'tablet' });
    static mobile = this.icon({ classname: 'mobile' });
    static circleO = this.icon({ classname: 'circle-o' });
    static quoteLeft = this.icon({ classname: 'quote-left' });
    static quoteRight = this.icon({ classname: 'quote-right' });
    static spinner = this.icon({ classname: 'spinner' });
    static circle = this.icon({ classname: 'circle' });
    static reply = this.icon({ classname: 'reply' });
    static githubAlt = this.icon({ classname: 'github-alt' });
    static folderO = this.icon({ classname: 'folder-o' });
    static smileO = this.icon({ classname: 'smile-o' });
    static frownO = this.icon({ classname: 'frown-o' });
    static mehO = this.icon({ classname: 'meh-o' });
    static gamepad = this.icon({ classname: 'gamepad' });
    static keyboardO = this.icon({ classname: 'keyboard-o' });
    static flagO = this.icon({ classname: 'flag-o' });
    static flagCheckered = this.icon({ classname: 'flag-checkered' });
    static terminal = this.icon({ classname: 'terminal' });
    static code = this.icon({ classname: 'code' });
    static replyAll = this.icon({ classname: 'reply-all' });
    static startHalfO = this.icon({ classname: 'star-half-o' });
    static locationArrow = this.icon({ classname: 'location-arrow' });
    static crop = this.icon({ classname: 'crop' });
    static codeFork = this.icon({ classname: 'code-fork' });
    static chainBroken = this.icon({ classname: 'chain-broken' });
    static question = this.icon({ classname: 'question' });
    static info = this.icon({ classname: 'info' });
    static exclamation = this.icon({ classname: 'exclamation' });
    static superscript = this.icon({ classname: 'superscript' });
    static subscript = this.icon({ classname: 'subscript' });
    static eraser = this.icon({ classname: 'eraser' });
    static puzzlePiece = this.icon({ classname: 'puzzle-piece' });
    static microphone = this.icon({ classname: 'microphone' });
    static microphoneSlash = this.icon({ classname: 'microphone-slash' });
    static shield = this.icon({ classname: 'shield' });
    static calendarO = this.icon({ classname: 'calendar-o' });
    static fireExtinguisher = this.icon({ classname: 'fire-extinguisher' });
    static rocket = this.icon({ classname: 'rocket' });
    static maxcdn = this.icon({ classname: 'maxcdn' });
    static chevronCircleLeft = this.icon({ classname: 'chevron-circle-left' });
    static chevronCircleRight = this.icon({ classname: 'chevron-circle-right' });
    static chevronCircleUp = this.icon({ classname: 'chevron-circle-up' });
    static chevronCircleDown = this.icon({ classname: 'chevron-circle-down' });
    static html5 = this.icon({ classname: 'html5' });
    static css3 = this.icon({ classname: 'css3' });
    static anchor = this.icon({ classname: 'anchor' });
    static unloackAlt = this.icon({ classname: 'unloack-alt' });
    static bullseye = this.icon({ classname: 'bullseye' });
    static ellipsisH = this.icon({ classname: 'ellipsis-h' });
    static ellipsisV = this.icon({ classname: 'ellipsis-v' });
    static rssSquare = this.icon({ classname: 'rss-square' });
    static playCircle = this.icon({ classname: 'play-circle' });
    static ticket = this.icon({ classname: 'ticket' });
    static minusSquareO = this.icon({ classname: 'minus-square-o' });
    static minusSquare = this.icon({ classname: 'minus-square' });
    static levelUp = this.icon({ classname: 'level-up' });
    static checkSquare = this.icon({ classname: 'check-square' });
    static externalLinkSquare = this.icon({ classname: 'external-link-square' });
    static compass = this.icon({ classname: 'compass' });
    static caretSquareDownO = this.icon({ classname: 'caret-square-o-down' });
    static caretSquareUpO = this.icon({ classname: 'caret-square-o-up' });
    static caretSquareRightO = this.icon({ classname: 'caret-square-o-right' });
    static caretSquareLiftO = this.icon({ classname: 'caret-square-o-left' });
    static eur = this.icon({ classname: 'eur' });
    static gbp = this.icon({ classname: 'gbp' });
    static usd = this.icon({ classname: 'usd' });
    static inr = this.icon({ classname: 'inr' });
    static jpy = this.icon({ classname: 'jpy' });
    static rub = this.icon({ classname: 'rub' });
    static krw = this.icon({ classname: 'krw' });
    static btc = this.icon({ classname: 'btc' });
    static fileText = this.icon({ classname: 'file-text' });
    static sortAlphaAsc = this.icon({ classname: 'sort-alpha-asc' });
    static sortAlphadesc = this.icon({ classname: 'sort-alpha-desc' });
    static sortAmoutAsc = this.icon({ classname: 'sort-amout-asc' });
    static sortAmoutDesc = this.icon({ classname: 'sort-amount-desc' });
    static sortNumericDesc = this.icon({ classname: 'sort-numeric-desc' });
    static sortNumericAsc = this.icon({ classname: 'sort-numeric-asc' });
    static thumbsDown = this.icon({ classname: 'thumbs-down' });
    static thumbsUp = this.icon({ classname: 'thumbs-up' });
    static youtubeSquare = this.icon({ classname: 'youtube-square' });
    static youtube = this.icon({ classname: 'youtube' });
    static xing = this.icon({ classname: 'xing' });
    static xingSquare = this.icon({ classname: 'xing-square' });
    static youtubePlay = this.icon({ classname: 'youtube-play' });
    static dropbox = this.icon({ classname: 'dropbox' });
    static stackOverflow = this.icon({ classname: 'stack-overflow' });
    static instagram = this.icon({ classname: 'instagram' });
    static flickr = this.icon({ classname: 'flickr' });
    static adn = this.icon({ classname: 'adn' });
    static bitbuket = this.icon({ classname: 'bitbuket' });
    static bitbucketSquare = this.icon({ classname: 'bitbucket-square' });
    static tumblr = this.icon({ classname: 'tumblr' });
    static tumblrSquare = this.icon({ classname: 'tumblr-Square' });
    static longArrowDown = this.icon({ classname: 'long-arrow-down' });
    static longArrowUp = this.icon({ classname: 'long-arrow-up' });
    static longArrowLeft = this.icon({ classname: 'long-arrow-left' });
    static longArrowRight = this.icon({ classname: 'long-arrow-right' });
    static apple = this.icon({ classname: 'apple' });
    static windows = this.icon({ classname: 'windows' });
    static android = this.icon({ classname: 'android' });
    static linux = this.icon({ classname: 'linux' });
    static dribbble = this.icon({ classname: 'dribbble' });
    static skype = this.icon({ classname: 'skype' });
    static foursquare = this.icon({ classname: 'foursquare' });
    static trello = this.icon({ classname: 'trello' });
    static female = this.icon({ classname: 'female' });
    static male = this.icon({ classname: 'male' });
    static gratipay = this.icon({ classname: 'gratipay' });
    static sunO = this.icon({ classname: 'sun-o' });
    static moonO = this.icon({ classname: 'moon-o' });
    static archive = this.icon({ classname: 'archive' });
    static bug = this.icon({ classname: 'bug' });
    static vk = this.icon({ classname: 'vk' });
    static weibo = this.icon({ classname: 'weibo' });
    static renren = this.icon({ classname: 'renren' });
    static pagelines = this.icon({ classname: 'pagelines' });
    static stackExchange = this.icon({ classname: 'stack-exchange' });
    static arrowCircleRightO = this.icon({ classname: 'arrow-circle-o-right' });
    static arrowCircleLeftO = this.icon({ classname: 'arrow-circle-o-Left' });
    static caretSquareLeftO = this.icon({ classname: 'caret-square-o-left' });
    static dotCircleO = this.icon({ classname: 'dot-circle-o' });
    static wheelchair = this.icon({ classname: 'wheelchair' });
    static vimeoSquare = this.icon({ classname: 'vimeo-square' });
    static try = this.icon({ classname: 'try' });
    static plusSquareO = this.icon({ classname: 'plus-square-o' });
    static spaceShuttle = this.icon({ classname: 'space-shuttle' });
    static slack = this.icon({ classname: 'slack' });
    static envelopeSquare = this.icon({ classname: 'envelope-square' });
    static wordpress = this.icon({ classname: 'wordpress' });
    static openid = this.icon({ classname: 'openid' });
    static university = this.icon({ classname: 'university' });
    static graduationCap = this.icon({ classname: 'graduation-cap' });
    static yahoo = this.icon({ classname: 'yahoo' });
    static google = this.icon({ classname: 'google' });
    static reddit = this.icon({ classname: 'reddit' });
    static redditSquare = this.icon({ classname: 'reddit-square' });
    static stumbleuponCircle = this.icon({ classname: 'stumbleupon-circle' });
    static stumbleupon = this.icon({ classname: 'stumbleupon' });
    static digg = this.icon({ classname: 'digg' });
    static PiedPipper = this.icon({ classname: 'Pied-pipper-pp' });
    static PiedPipperAlt = this.icon({ classname: 'Pied-pipper-alt' });
    static drupal = this.icon({ classname: 'drupal' });
    static joomla = this.icon({ classname: 'joomla' });
    static language = this.icon({ classname: 'language' });
    static fax = this.icon({ classname: 'fax' });
    static building = this.icon({ classname: 'building' });
    static child = this.icon({ classname: 'child' });
    static paw = this.icon({ classname: 'paw' });
    static spoon = this.icon({ classname: 'spoon' });
    static cube = this.icon({ classname: 'cube' });
    static cubes = this.icon({ classname: 'cubes' });
    static behance = this.icon({ classname: 'behance' });
    static behanceSquare = this.icon({ classname: 'behance-square' });
    static steam = this.icon({ classname: 'steam' });
    static steamSquare = this.icon({ classname: 'steam-square' });
    static recycle = this.icon({ classname: 'recycle' });
    static car = this.icon({ classname: 'car' });
    static taxi = this.icon({ classname: 'taxi' });
    static tree = this.icon({ classname: 'tree' });
    static spotify = this.icon({ classname: 'spotify' });
    static deviantart = this.icon({ classname: 'deviantart' });
    static soundcloud = this.icon({ classname: 'soundcloud' });
    static database = this.icon({ classname: 'database' });
    static filePdfO = this.icon({ classname: 'file-pdf-o' });
    static fileWordO = this.icon({ classname: 'file-word-o' });
    static fileExcellO = this.icon({ classname: 'file-excell-o' });
    static filePowerpointO = this.icon({ classname: 'file-powerpoint-o' });
    static fileArchiveO = this.icon({ classname: 'file-archive-o' });
    static fileAudioO = this.icon({ classname: 'file-audio-o' });
    static fileVideoO = this.icon({ classname: 'file-video-o' });
    static fileCodeO = this.icon({ classname: 'file-code-o' });
    static vine = this.icon({ classname: 'vine' });
    static codepen = this.icon({ classname: 'codepen' });
    static jsfiddle = this.icon({ classname: 'jsfiddle' });
    static lifeRing = this.icon({ classname: 'life-ring' });
    static circleONotch = this.icon({ classname: 'circle-o-notch' });
    static rebel = this.icon({ classname: 'rebel' });
    static empire = this.icon({ classname: 'empire' });
    static gitSquare = this.icon({ classname: 'git-square' });
    static git = this.icon({ classname: 'git' });
    static hackerNews = this.icon({ classname: 'hacker-news' });
    static tencentWeibo = this.icon({ classname: 'tencent-weibo' });
    static qq = this.icon({ classname: 'qq' });
    static weixin = this.icon({ classname: 'weixin' });
    static paperPlane = this.icon({ classname: 'paper-plane' });
    static PaperPlaneO = this.icon({ classname: 'Paper-plane-o' });
    static history = this.icon({ classname: 'history' });
    static circleThin = this.icon({ classname: 'circle-thin' });
    static header = this.icon({ classname: 'header' });
    static paragraph = this.icon({ classname: 'paragraph' });
    static sliders = this.icon({ classname: 'sliders' });
    static shareAlt = this.icon({ classname: 'share-alt' });
    static shareAltSquare = this.icon({ classname: 'share-alt-square' });
    static bomb = this.icon({ classname: 'bomb' });
    static futbalO = this.icon({ classname: 'futbal-o' });
    static tty = this.icon({ classname: 'tty' });
    static binoculars = this.icon({ classname: 'binoculars' });
    static plug = this.icon({ classname: 'plug' });
    static slideshare = this.icon({ classname: 'slideshare' });
    static twitch = this.icon({ classname: 'twitch' });
    static yelp = this.icon({ classname: 'yelp' });
    static newspaperO = this.icon({ classname: 'newspaper-o' });
    static wifi = this.icon({ classname: 'wifi' });
    static calculator = this.icon({ classname: 'calculator' });
    static paypal = this.icon({ classname: 'paypal' });
    static googleWallet = this.icon({ classname: 'google-wallet' });
    static ccVisa = this.icon({ classname: 'cc-visa' });
    static ccMastercard = this.icon({ classname: 'cc-mastercard' });
    static ccDiscover = this.icon({ classname: 'cc-discover' });
    static ccAmex = this.icon({ classname: 'cc-amex' });
    static ccStripe = this.icon({ classname: 'cc-stripe' });
    static bellSlash = this.icon({ classname: 'bell-slash' });
    static bellSlashO = this.icon({ classname: 'bell-slash-o' });
    static trash = this.icon({ classname: 'trash' });
    static copyright = this.icon({ classname: 'copyright' });
    static at = this.icon({ classname: 'at' });
    static eyedropper = this.icon({ classname: 'eyedropper' });
    static paintBrush = this.icon({ classname: 'paint-brush' });
    static birthdayCake = this.icon({ classname: 'birthday-cake' });
    static areaChart = this.icon({ classname: 'area-chart' });
    static pieChart = this.icon({ classname: 'pie-chart' });
    static lineChart = this.icon({ classname: 'line-chart' });
    static lastfm = this.icon({ classname: 'lastfm' });
    static lastfmSquare = this.icon({ classname: 'lastfm-square' });
    static toggleOff = this.icon({ classname: 'toggle-off' });
    static toggleOn = this.icon({ classname: 'toggle-on' });
    static bicycle = this.icon({ classname: 'bicycle' });
    static bus = this.icon({ classname: 'bus' });
    static ioxhost = this.icon({ classname: 'ioxhost' });
    static angellist = this.icon({ classname: 'angellist' });
    static cc = this.icon({ classname: 'cc' });
    static ils = this.icon({ classname: 'ils' });
    static meanpath = this.icon({ classname: 'meanpath' });
    static buysellads = this.icon({ classname: 'buysellads' });
    static connecdevelope = this.icon({ classname: 'connecdevelope' });
    static dashcube = this.icon({ classname: 'dashcube' });
    static forumbee = this.icon({ classname: 'forumbee' });
    static leanpub = this.icon({ classname: 'leanpub' });
    static sellsy = this.icon({ classname: 'sellsy' });
    static shirtsinbulk = this.icon({ classname: 'shirtsinbulk' });
    static simplybuilt = this.icon({ classname: 'simplybuilt' });
    static skyatlas = this.icon({ classname: 'skyatlas' });
    static cartPlus = this.icon({ classname: 'cart-plus' });
    static diamond = this.icon({ classname: 'diamond' });
    static ship = this.icon({ classname: 'ship' });
    static userSecret = this.icon({ classname: 'user-secret' });
    static motorcycle = this.icon({ classname: 'motorcycle' });
    static streetView = this.icon({ classname: 'street-view' });
    static heartbeat = this.icon({ classname: 'heartbeat' });
    static venus = this.icon({ classname: 'venus' });
    static mars = this.icon({ classname: 'mars' });
    static mercury = this.icon({ classname: 'mercury' });
    static transgender = this.icon({ classname: 'transgender' });
    static transgenderAlt = this.icon({ classname: 'transgender-alt' });
    static venusDouble = this.icon({ classname: 'venus-double' });
    static marDouble = this.icon({ classname: 'mar-double' });
    static venusDouble = this.icon({ classname: 'venus-double' });
    static marsStoke = this.icon({ classname: 'mars-stroke' });
    static marsStokeV = this.icon({ classname: 'mars-stroke-v' });
    static marsStokeH = this.icon({ classname: 'mars-stroke-h' });
    static nueter = this.icon({ classname: 'nueter' });
    static genderless = this.icon({ classname: 'genderless' });
    static facebookOfficial = this.icon({ classname: 'facebook-official' });
    static pinterestO = this.icon({ classname: 'pinterest-o' });
    static whatsapp = this.icon({ classname: 'whatsapp' });
    static server = this.icon({ classname: 'server' });
    static userPlus = this.icon({ classname: 'user-plus' });
    static userTimes = this.icon({ classname: 'user-times' });
    static bed = this.icon({ classname: 'bed' });
    static viacoin = this.icon({ classname: 'viacoin' });
    static train = this.icon({ classname: 'train' });
    static subway = this.icon({ classname: 'subway' });
    static medium = this.icon({ classname: 'medium' });
    static yCombinator = this.icon({ classname: 'y-combinator' });
    static optinMonster = this.icon({ classname: 'optin-monster' });
    static opencart = this.icon({ classname: 'opencart' });
    static expeditedssl = this.icon({ classname: 'expeditedssl' });
    static batteryFull = this.icon({ classname: 'battery-full' });
    static batteryThreeQuarters = this.icon({ classname: 'battery-three-quarters' });
    static batteryHalf = this.icon({ classname: 'battery-half' });
    static batteryQuarter = this.icon({ classname: 'battery-quarter' });
    static batteryEmpty = this.icon({ classname: 'battery-empty' });
    static mousePointer = this.icon({ classname: 'mouse-pointer' });
    static iCursor = this.icon({ classname: 'i-cursor' });
    static objectGroup = this.icon({ classname: 'object-group' });
    static objectUngroup = this.icon({ classname: 'object-ungroup' });
    static stickyNote = this.icon({ classname: 'sticky-note' });
    static stickyNoteO = this.icon({ classname: 'sticky-note-o' });
    static ccJcb = this.icon({ classname: 'cc-jcb' });
    static ccDinnersClub = this.icon({ classname: 'cc-dinners-club' });
    static clone = this.icon({ classname: 'clone' });
    static balanceScale = this.icon({ classname: 'balance-scale' });
    static hourglassO = this.icon({ classname: 'hourglass-o' });
    static hourglassStart = this.icon({ classname: 'hourglass-start' });
    static hourglassHalf = this.icon({ classname: 'hourglass-half' });
    static hourglassEnd = this.icon({ classname: 'hourglass-end' });
    static hourglass = this.icon({ classname: 'hourglass' });
    static handRockO = this.icon({ classname: 'hand-rock-o' });
    static handPaperO = this.icon({ classname: 'hand-paper-o' });
    static handScissorsO = this.icon({ classname: 'hand-scissors-o' });
    static handLizard = this.icon({ classname: 'hand-lizard' });
    static handSpockO = this.icon({ classname: 'hand-spock-o' });
    static handPointerO = this.icon({ classname: 'hand-pointer-o' });
    static handPeaceO = this.icon({ classname: 'hand-peace-o' });
    static tradmark = this.icon({ classname: 'tradmark' });
    static registered = this.icon({ classname: 'registered' });
    static creativeCommons = this.icon({ classname: 'creative-commons' });
    static gg = this.icon({ classname: 'gg' });
    static ggCircle = this.icon({ classname: 'gg-circle' });
    static tripadvisor = this.icon({ classname: 'tripadvisor' });
    static odnoklassniki = this.icon({ classname: 'odnoklassniki' });
    static odnoklassnikiSquare = this.icon({ classname: 'odnoklassniki-square' });
    static getPocket = this.icon({ classname: 'get-pocket' });
    static wekipediaW = this.icon({ classname: 'wekipedia-w' });
    static safari = this.icon({ classname: 'safari' });
    static chrome = this.icon({ classname: 'chrome' });
    static firefox = this.icon({ classname: 'firefox' });
    static opera = this.icon({ classname: 'opera' });
    static internetExplorer = this.icon({ classname: 'internet-explorer' });
    static television = this.icon({ classname: 'television' });
    static contao = this.icon({ classname: 'contao' });
    static _500px = this.icon({ classname: '500px' });
    static amazon = this.icon({ classname: 'amazon' });
    static calendarPlusO = this.icon({ classname: 'calendar-plus-o' });
    static calendarMinusO = this.icon({ classname: 'calendar-minus-o' });
    static calendarTimesO = this.icon({ classname: 'calendar-times-o' });
    static calendarCheckO = this.icon({ classname: 'calendar-check-o' });
    static industry = this.icon({ classname: 'industry' });
    static mapPin = this.icon({ classname: 'map-pin' });
    static mapSigns = this.icon({ classname: 'map-signs' });
    static mapO = this.icon({ classname: 'map-o' });
    static map = this.icon({ classname: 'map' });
    static commenting = this.icon({ classname: 'commenting' });
    static commentingO = this.icon({ classname: 'commenting-o' });
    static houzz = this.icon({ classname: 'houzz' });
    static vimeo = this.icon({ classname: 'vimeo' });
    static blackTie = this.icon({ classname: 'black-tie' });
    static fonticons = this.icon({ classname: 'fonticons' });
    static redditAlien = this.icon({ classname: 'reddit-alien' });
    static edge = this.icon({ classname: 'edge' });
    static creditCardAlt = this.icon({ classname: 'credit-card-clt' });
    static codiepie = this.icon({ classname: 'codiepie' });
    static modx = this.icon({ classname: 'modx' });
    static fortAwesome = this.icon({ classname: 'fort-awesome' });
    static usb = this.icon({ classname: 'usb' });
    static productHunt = this.icon({ classname: 'product-hunt' });
    static mixcloud = this.icon({ classname: 'mixcloud' });
    static scribd = this.icon({ classname: 'scribd' });
    static pauseCircle = this.icon({ classname: 'pause-circle' });
    static pauseCircleO = this.icon({ classname: 'pause-circle-o' });
    static stopCircle = this.icon({ classname: 'stop-circle' });
    static stopCircleO = this.icon({ classname: 'stop-circle-o' });
    static shoopinBag = this.icon({ classname: 'shoopin-bag' });
    static shoppingBasket = this.icon({ classname: 'shopping-basket' });
    static hashtag = this.icon({ classname: 'hashtag' });
    static bluetooth = this.icon({ classname: 'bluetooth' });
    static bluetoothO = this.icon({ classname: 'bluetooth-o' });
    static percent = this.icon({ classname: 'percent' });
    static gitlab = this.icon({ classname: 'gitlab' });
    static wpbeginner = this.icon({ classname: 'wpbeginner' });
    static wpforms = this.icon({ classname: 'wpforms' });
    static envira = this.icon({ classname: 'envira' });
    static universalAccess = this.icon({ classname: 'universal-access' });
    static wheelchairAlt = this.icon({ classname: 'wheelchair-alt' });
    static questionCircleO = this.icon({ classname: 'question-circle-o' });
    static blind = this.icon({ classname: 'blind' });
    static audioDescription = this.icon({ classname: 'audio-description' });
    static volumeControlPhone = this.icon({ classname: 'volume-control-phone' });
    static braille = this.icon({ classname: 'braille' });
    static assistiveListerningSystems = this.icon({ classname: 'assistive-listerning-systems' });
    static americanSignLanguage = this.icon({ classname: 'american-sign-language-interpreting' });
    static deaf = this.icon({ classname: 'deaf' });
    static glide = this.icon({ classname: 'glide' });
    static glideG = this.icon({ classname: 'glide-g' });
    static signLanguage = this.icon({ classname: 'sign-language' });
    static lowVision = this.icon({ classname: 'low-vision' });
    static viadeo = this.icon({ classname: 'viadeo' });
    static viadeoSquare = this.icon({ classname: 'viadeo-square' });
    static snapchat = this.icon({ classname: 'snapchat' });
    static snapchatGhost = this.icon({ classname: 'snapchat-ghost' });
    static snapchatSquare = this.icon({ classname: 'snapchat-square' });
    static firstOrder = this.icon({ classname: 'first-order' });
    static yoast = this.icon({ classname: 'yoast' });
    static themeisle = this.icon({ classname: 'themeisle' });
    static googlePlusOfficial = this.icon({ classname: 'google-plus-official' });
    static fontAwesome = this.icon({ classname: 'font-awesome' });
    static handshkeO = this.icon({ classname: 'handshke-o' });
    static envelopeOpen = this.icon({ classname: 'envelope-open' });
    static envelopeOpenO = this.icon({ classname: 'envelope-open-o' });
    static linode = this.icon({ classname: 'linode' });
    static addressBook = this.icon({ classname: 'address-book' });
    static addressBookO = this.icon({ classname: 'address-book-o' });
    static addressCard = this.icon({ classname: 'address-card' });
    static addressCardO = this.icon({ classname: 'address-card-o' });
    static userCircle = this.icon({ classname: 'userCircle' });
    static userCircleO = this.icon({ classname: 'user-circle-o' });
    static userO = this.icon({ classname: 'user-0' });
    static idBadge = this.icon({ classname: 'id-badge' });
    static idCard = this.icon({ classname: 'id-card' });
    static idCardo = this.icon({ classname: 'id-card-o' });
    static quora = this.icon({ classname: 'quora' });
    static freeCodeCamp = this.icon({ classname: 'free-code-camp' });
    static thermometerFull = this.icon({ classname: 'thermometer-full' });
    static thermometerThreeQuaters = this.icon({ classname: 'thermometer-three-quaters' });
    static thermometerHalf = this.icon({ classname: 'thermometer-half' });
    static thermometerQuater = this.icon({ classname: 'thermometerEmpty-quater' });
    static thermometerEmpty = this.icon({ classname: 'thermometer-empty' });
    static shower = this.icon({ classname: 'shower' });
    static bath = this.icon({ classname: 'bath' });
    static podcast = this.icon({ classname: 'podcast' });
    static windowMaximize = this.icon({ classname: 'window-maximize' });
    static windowMinimize = this.icon({ classname: 'window-minimize' });
    static windowRestore = this.icon({ classname: 'window-restore' });
    static windowClose = this.icon({ classname: 'window-close' });
    static windowCloseO = this.icon({ classname: 'window-close-o' });
    static bandcamp = this.icon({ classname: 'bandcamp' });
    static grav = this.icon({ classname: 'grav' });
    static etsy = this.icon({ classname: 'etsy' });
    static imdb = this.icon({ classname: 'imdb' });
    static ravelry = this.icon({ classname: 'ravelry' });
    static eercast = this.icon({ classname: 'eercast' });
    static microchip = this.icon({ classname: 'microchip' });
    static snowflakeO = this.icon({ classname: 'snowflake-o' });
    static superpowers = this.icon({ classname: 'superpowers' });
    static wpexplorer = this.icon({ classname: 'wpexplorer' });
    static meetup = this.icon({ classname: 'meetup' });
    static modx = this.icon({ classname: 'modx' });
    static modx = this.icon({ classname: 'modx' });
    static modx = this.icon({ classname: 'modx' });
    static modx = this.icon({ classname: 'modx' });
}
