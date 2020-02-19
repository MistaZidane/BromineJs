class Widget {
    constructor(type, child, color, bgColor, children) {
        this.child = child;
        this.children = children;
        this.type = type;
        this.bgColor = bgColor;
        this.color = color
    }
    // a method used to create Widgets
    CreateWidget() {
        this.element = document.createElement(this.type);
        if (this.child != undefined) {
            if (typeof this.child == 'string') {
                this.element.innerHTML = this.child;
            }
            else {
                this.element.appendChild(this.child);
            }
        }
        if (this.color != undefined) {
            this.element.style.color = this.color;
        }
        if (this.bgColor != undefined) {
            this.element.style.backgroundColor = this.bgColor;
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
                        this.element.appendChild(children[i]);
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
// Text widget
function Text({ text, tagtype, color, bgColor }) {
    // listing all the posible tags
    let supportedTextTags = ['h1', 'h2', 'h3', 'h3', 'h5', 'h6', 'b', 'i', 'em', 'small', 'p', 'pre', 's', 'span'];
    if (supportedTextTags.includes(tagtype)) {
        let textWidget = new Widget();
        textWidget.type = tagtype;
        textWidget.bgColor = bgColor;
        textWidget.color = color;
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
function Button({ child, color, bgColor }) {
    let btn = new Widget();
    btn.type = 'Button';
    btn.child = child;
    btn.color = color;
    btn.bgColor = bgColor;
    let ele = btn.CreateWidget();
    return ele;
}
// Container widget
function container({ children, color, bgColor, tagtype }) {
    // supported tags
    // make sure you create the element before creating the children
    let supportedTags = ['div', 'span', 'nav', 'aside', 'section'];
    if (supportedTags.includes(tagtype)) {
        let ctn = new Widget();
        ctn.type = tagtype;
        ctn.children = children;
        ctn.bgColor = bgColor;
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

function Anchor({ href, child, download, target, color, bgColor }) {
    if (child != undefined && child != '') {
        let ach = new Widget();
        ach.type = 'a';
        ach.child = child;
        ach.color = color;
        ach.bgColor = bgColor;
        ach.CreateWidget();
        // setting the attributes
        let ele = ach.CreateAttribute('href', href);
        // making sure the download properties value is always a boolean
        if (typeof download == 'boolean') {
            ele = ach.CreateAttribute('download', download);
        }
        else {
            console.error('The download prperty for Anchor({}) requires a boolean');
        }
        ele = ach.CreateAttribute('target', target);
        return ele;
    }
    else {
        console.error('The child property for Anchor({}) is required');
    }
}
// List widget
function List({ type, data, children }) {
    // setting the default list type to UL
    if (type == undefined) {
        type = 'ul';
    }
    let lst = new Widget();
    lst.type = type;
    lst.children = children;
    let ele = lst.CreateWidget();
    lst.CreateChildren(children);
    return ele;
}
// the ListItem widget
function ListItem({ children }) {
    let li = new Widget();
    li.type = 'li';
    let ele = li.CreateWidget();
    li.children = children;
    li.CreateChildren(children);
    return ele;
}
// Image Widget
function Image({ src, alt, height, width }) {
    // making sure src is set
    if (src != undefined) {
        let img = new Widget();
        img.type = 'img';
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
function Audio({ src, controls, muted, auto, loop }) {
    if (src != undefined) {
        let au = new Widget();
        au.type = 'audio';
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
function Video({ src, controls, muted, auto, loop, height, width }) {
    if (src != undefined) {
        let vid = new Widget();
        vid.type = 'video';
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
function Iframe({ src, height, width }) {
    if (src != undefined) {
        let frame = new Widget();
        frame.type = 'iframe';
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
function Line({ width }) {
    let hr = new Widget();
    hr.type = 'hr';
    let ele = hr.CreateWidget();
    if (width != undefined) {
        hr.CreateAttribute('width', width);
    }
    return ele;
}
// the FormGroup widget
function FormGroup({ children, action, method, validate, name }) {
    let form = new Widget();
    form.type = 'form';
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
function TextField({ type, value, autofocus, placeholder, required }) {
    let supportedTypes = ['button', 'checkbox', 'color', 'date', 'datetime-local', 'email', 'file', 'hidden', 'image', 'month', 'number', 'password', 'radio', 'range', 'reset', 'search', 'submit', 'tel', 'text', 'time', 'url', 'week',];
    if (type != undefined) {
        if (supportedTypes.includes(type)) {
            let field = new Widget();
            field.type = 'input';
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
function Select({ required, multiple, data }) {
    let slc = new Widget();
    slc.type = 'select';
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
function Canvas({ width, height, id, script }) {
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
    // id
    if (id != undefined) {
        cnv.CreateAttribute('id', id);
    }
    console.log(script);
    return element;
};
// the Table widget
function Table({ headers, data, colspan, rowspan, children }) {
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

// the table
let dd = [2, 3, 4, 5, 6, 7, 7, 8];
document.body.appendChild(
    container({
        tagtype: 'div',
        children: [
            Text({
                text: 'how are you',
                tagtype: 'p'
            }),
            Button({
                child: 'click me',
            }),
            TextField({
                type: 'text',
                autofocus: true
            })
        ]
    })
);
