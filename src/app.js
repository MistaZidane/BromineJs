import { RenderApp,Button, Container, Condition, Gesture, Colors, Alert, Badge, Carousel, Line, Grid, Collapse, Text, Dropdown, Jumbotron, ListGroup, ListGroupItem, Modal, Attr, Nav, NavItem, Card, PageItem, Pagination, Popover, Progress, Spinner, Toast, Timer, Timeout, Icons } from './widget.js';



RenderApp({
    el: '#el',
    body: Body(),
    title: 'BromineJS',
    style: [],
    links: [],
    script: [],
    framework: 'bootstrap'
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
    return Container({
        tagtype:'div',
        children:[
            Alert.info({
                child: Text({text:'how are you', tagtype:'p'})
            }),
            Button.secondary({child:'how'})
        ]
    })
}

