import { RenderApp, Container, Button, Condition, Gesture, Colors, Alert, Badge, ButtonGroup, Carousel, Line, Grid } from './widget.js'


RenderApp({
    el: '#el',
    body: Body(),
    title: 'Mista Zidane'
})

function name() {
    let data = [];
    for (let i = 0; i < 3; i++) {
        data.push(Card({
            image: 'https://picjumbo.com/wp-content/uploads/free-stock-images-1080x720.jpg',
            text: 'How are you',
            title: 'Testing'
        }))
    }
    return data;
}

function Body() {
    return Grid({
        size: [2,8,2],
        children: [
            Line({}),
            Carousel({
                indicators: true,
                images:['https://picjumbo.com/wp-content/uploads/free-stock-images-1080x720.jpg','https://picjumbo.com/wp-content/uploads/free-stock-images-1080x720.jpg'],
                controls: true
            })
        ]
    })
}

