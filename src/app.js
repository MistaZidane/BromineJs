import { RenderApp, Image, Test, Break, Button, ButtonGroup, Container, Condition, Gesture, Colors, Alert, Badge, Carousel, Line, Grid, Collapse, Text, Dropdown, Jumbotron, ListGroup, ListGroupItem, Modal, Attr, Nav, NavItem, Card, PageItem, Pagination, Popover, Progress, Spinner, Toast, Timer, Timeout, Icons, Navbar } from './widget.js';

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
                            Text({ tagtype: 'h1', text: 'BromineJS', className: ['display-2'], color:Test.blue }),
                            Text({ text: 'BromineJS is a JS framework that uses a JS-only and widget based approach to building web applications' }),
                            Button.primary({ child: 'Get Started', classname: ['btn-lg'] }),
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
    let images = ['https://cnet2.cbsistatic.com/img/0Xs1538GKxnkShcUMzlaiF-h4Sc=/2018/03/26/2d2c776a-fe46-498e-9271-178d6f993563/far-cryr-5-20180325113636.jpg',
'https://i.ytimg.com/vi/kIoJnMT3yUI/maxresdefault.jpg',
'https://i.ytimg.com/vi/4-jo-AX_7V4/maxresdefault.jpg'
];
    let eles = [];
    let data = ['Quick Start', 'Components', 'FAQs', 'Quick Start', 'Components', 'FAQs']
    for (let i = 0; i < 3; i++) {
        eles.push(Card({
            image:images[i],
            text: `Working with ${data[i]}`,
            title: data[i],
            btn: Button.danger({child:'Testing'})
        }))
    }
    return eles;
}
function content() {
    return Container({
        className: ['pt-3', 'text-center', 'container'],
        children: [
            Text({ text: 'Getting started is easy!', className: ['display-4'] }),

            Break(),
            Container({
                className: '', children: [
                    Grid({
                        size: [4, 4, 4],
                        children: Cards()
                    })
                ]
            })
        ]
    })
}
function footer() {
    return Container({
        className: ['container-fluid', 'back', 'pt-2', 'pb-2', 'mt-4'],
        children: [
            Container({ children: [Text({ text: 'Made with love by BromineJs Core' })], className: ['container'] })

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

