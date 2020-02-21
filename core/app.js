import { RenderApp, Container, Button, Condition, Gesture, Colors, Alert } from './widget.js'


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
    return Badge.warning({
        child: 'me',
        id: 'idd'
    })
}

