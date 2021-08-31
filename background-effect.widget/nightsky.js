command: "echo 'ubersicht snowflakes dummy process'",

refreshFrequency: false,

style: `
    #nightskyContainer {
        position:fixed;
        width:100vw;
        height:50vh;
        left:0;
        top:0;
        pointer-events: none;
    }
    .star {
        position: absolute;
        width: 6px;
        height: 6px;
        background: rgba(255,255,255,0.0);
        border-radius: 50%;
    }
    
    @keyframes twinkle {
        0% {
            transform: scale(0.5, 0.5);
            background: rgba(255,255,255,0.0);
            animation-timing-function: ease-in;
        }
        50% {
            transform: scale(1, 1);
            background: rgba(255,255,255,1);
            animation-timing-function: ease-out;
        }
        100% {
            background: rgba(255,255,255,0.0);
            transform: scale(0.5, 0.5);
        }
    }
`,

render: function() {
    const el = document.createElement("div");
    for (var i = 0; i < 25; i++) {
        var star = '<div class="star" style="animation: twinkle '+((Math.random()*2) + 3)+'s linear '+((Math.random()*5) + 5)+'s infinite; top: '+Math.random()*$(window).height()/2.5+'px; left: '+Math.random()*$(window).width()+'px;"></div>';
        $(el).append(star);
    }
    return `<div id= "nightskyContainer">${el.innerHTML}</div>`;
},

update: function(str,domEl){
    
}