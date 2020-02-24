import { RenderApp, Container, Button, Condition, Gesture, Colors, Alert, Badge, ButtonGroup, Carousel, Line, Grid, Collapse, Text, Dropdown, Jumbotron, ListGroup, ListGroupItem, Modal, Attr, Nav, NavItem, Card, PageItem, Pagination, Popover, Progress, Spinner, Toast, Timer, Timeout, Icons } from './widget.js'

RenderApp({
    el: '#el',
    body: Body(),
    title: 'Mista Zidane',
    style: [],
    links: [],
    script: [],
    framework: ''
})

function name() {
    let data = [];
    for (let i = 0; i < 8; i++) {
        data.push(Gesture.click( Card({
            image: 'https://picjumbo.com/wp-content/uploads/free-stock-images-1080x720.jpg',
            text: 'How are you',
            title: 'Testing',
        }),()=>{
            console.log('how are you', i)
        }))
    }
    return data;
}

function Body() {
    return Grid({
        size: [4, 4, 4],
        children: name()
    })
    // return Popover.Top({
    //     text: 'how are you',
    //     title: 'popover',
    //     content:'my content',
    //     click: ()=>{
    //         console.log('how are uuuuu');
    //     }
    // })
}

