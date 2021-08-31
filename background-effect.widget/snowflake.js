command: "echo 'ubersicht snowflakes dummy process'",

refreshFrequency: 2000000,

style: `#snowflakeContainer {
    position:fixed;
    width:100vw;
    height:100vh;
    left:0;
    top:0;
}`,

render: function() {
    var interval = setInterval(function() {
        if (window.Snowflakes) {
            var sf = new Snowflakes({
                color: "#ffffff",
                container: document.querySelector("#snowflakeContainer"),
                count: 50,
                minOpacity: 0.4,
                maxOpacity: 1
              });
            clearInterval(interval)
        }
    },100)
    return `<script src="https://unpkg.com/magic-snowflakes/dist/snowflakes.min.js"></script>
    
    <div id="snowflakeContainer"></div>`
},

update: function(str,domEl){
    
}