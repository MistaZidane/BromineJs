import { RenderApp, Container, Button, Condition, Gesture, Colors } from './widget.js'


RenderApp({
    el: '#el',
    body:Body(),
    title: 'Mista Zidane'
})


function Body(){
    return Container({
        tagtype: 'div',
        children: [
            Button({
                id: 'sssss',
                className: ['ssss','ffff'],
                child: 'me',
                click: ()=>{
                    console.log('click me very well');
                }
            }),
            Button({
                child: 'we we',
                click: ()=>{
                    console.log('na we we');
                },
                hover: ()=>{
                    console.log("we are just testing")
                }
            }),
            Condition({
                data: true,
                child: Button({
                    
                    child: 'click',
                    click: ()=>{
                        console.log('My own custom event');
                    }
                })
            })
            
        ],
        bgColor: Colors.red
    });
}

