import { RenderApp,Image, Break, Button, ButtonGroup, Container, Condition, Gesture, Colors, Alert, Badge, Carousel, Line, Grid, Collapse, Text, Dropdown, Jumbotron, ListGroup, ListGroupItem, Modal, Attr, Nav, NavItem, Card, PageItem, Pagination, Popover, Progress, Spinner, Toast, Timer, Timeout, Icons, Navbar } from './widget.js';

RenderApp({
    el: '#el',
    body: Body(),
    title: 'BromineJS',
    style: [],
    links: [],
    script: [],
    framework: 'bootstrap'
})
function intro() {
    return Container({
        className: ['container-fluid', 'pt-5', 'pb-5', 'myBody'],
        children: [
            Grid({
                size: [3, 6, 1],
                children: [
                    '',
                    Container({
                        className: ['text-center'],
                        children: [
                            Text({ tagtype: 'h1', text: 'BromineJS', className: ['display-2'] }),
                            Text({ text: 'BromineJS is a JS framework that uses a JS-only and widget based approach to building web applications' }),
                            Button.primary({ child: 'Get Started', classname:['btn-lg'] }),
                            Break(),
                            ButtonGroup({
                                className: ['mt-2'],
                                buttons: [
                                    Button.primary({ child: Icons.twitter }),
                                    Button.secondary({ child: Icons.github })
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    })
}
function nav() {
    return Navbar({
        brand: 'BromineJs',
        navbarNav: {
            items: ['Home', 'Documentation', 'Expo', 'Blog'],
            hrefs: ['#', '#', '#', '#']
        }
    })
}
function Cards() {
    let eles = [];
    let data = ['Quick Start','Components','FAQs','Quick Start','Components','FAQs']
    for(let i = 0; i<3; i++){
        eles.push(Card({
            image:'https://i.ytimg.com/vi/kIoJnMT3yUI/maxresdefault.jpg',
            text:`Working with ${data[i]}`,
            title:data[i]
        }))
    }
    return eles;
}
function content() {
    return Container({
        className:['pt-3','text-center','container'],
        children:[
            Text({text:'Getting started is easy!',className:['display-4']}),
            
            Break(),
            Container({className:'', children:[
              Grid({
                size:[4,4,4],
                children: Cards()
            })  
            ]})
        ]
    })
}
function footer() {
    return Container({
        className:['container-fluid','back','pt-2','pb-2','mt-4'],
        children:[
            Container({children:[Text({text:'Made with love by BromineJs Core'})],className:['container']})
            
        ]
    })
}
function Body() {
    return Container({
        children: [
            nav(),
            intro(),
            content(),
            footer()
        ]
    })
}

