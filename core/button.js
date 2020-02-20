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
            }),
            Gesture.dblClick(Text({
                id: 'r',
                className: ['ddd'],
                text: 'zidane',
                tagtype: 'p',
                color: Colors.fromRGB(105,110,100)
            }),()=>{
                console.log('text clicked')
            })
            
        ],
        bgColor: Colors.red
    });
}

