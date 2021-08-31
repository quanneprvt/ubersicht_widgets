stylingOptions =
  # background color
  background: 'rgba(#000, 0.5)'
  # show fullscreen -> true
  fullscreen: false
  # display position 'top', 'middle', 'bottom'
  vertical: 'custom'
  # display position 'left, 'right'
  horizontal: 'right'

dateOptions =
  # display not only 'time' also 'date'
  showDate: false
  # format of 'date'
  date: '%d/%m/%Y %a'
  # format of 'time'
  time: '%H:%M %p'

format = (->
  if dateOptions.showDate
    dateOptions.date + '\n' +dateOptions.time
  else
    dateOptions.time
)()

command: "date +\"#{format}\""

# the refresh frequency in milliseconds
refreshFrequency: 30000

# for update function
dateOptions: dateOptions

render: (output) ->
  bounds = null
  el = document.getElementById 'simple-time-widget-index-coffee'
  el.onmouseenter = (e) ->
    bounds = el.getBoundingClientRect()
  el.onmousemove = (e) ->
    mouseX = e.clientX;
    mouseY = e.clientY;
    leftX = mouseX - bounds.x;
    topY = mouseY - bounds.y;
    center = {
      x: leftX - bounds.width / 2,
      y: topY - bounds.height / 2
    }
    distance = Math.sqrt(center.x**2 + center.y**2);
  
    el.style.transform = """
      scale3d(1.27, 1.27, 1.27)
      rotateX(#{-center.y / 5}deg)
      rotateY(#{-center.x / 5}deg)
    """;
  el.onmouseleave = (e) ->
    el.style.transform = """rotateX(0deg) rotateY(0deg)""";
  """
  <div>
    <div id='background'></div>
    <div id='simpleClock'>#{output}</div>
  </div>
"""

update: (output) ->
  if this.dateOptions.showDate
    data = output.split('\n')

    html = data[1]
    html += '<span class="date">'
    html += data[0]
    html += '</span>'

  else
    html = output

  $(simpleClock).html(html)

style: (->
  fontSize = '4em'
  width = 'auto'
  transform = 'auto'
  bottom = '3%'
  top = 'auto'
  left = '3%'
  right = 'auto'

  if stylingOptions.fullscreen
    fontSize = '10em'
    width = '94%'

  if stylingOptions.vertical is 'middle'
    transform = 'translateY(50%)'
    bottom = '50%'
  else if stylingOptions.vertical is 'top'
    bottom = 'auto'
    top = '3%'
  else
    bottom = 'auto'
    top = '32%'

  if stylingOptions.horizontal is 'right'
    left = 'auto'
    right = '2%'

  return """
    color: #FFFFFF
    font-family: Helvetica Neue
    left: #{left}
    right: #{right}
    top: #{top}
    bottom: #{bottom}
    transform: #{transform}
    width: #{width}
    transition: all 0.25s linear
    border: 1px solid #585858
    border-radius: 30px
    transform-style: preserve-3d
    
    #background
      background: #{stylingOptions.background}
      position: absolute
      width: 100%
      height: 100%
      top: 0
      left: 0
      border-radius: 30px
      z-index: -1

    #simpleClock
      font-size: #{fontSize}
      font-weight: 300
      margin: 0
      text-align: center
      padding: 10px 30px
      -webkit-touch-callout: none
      -webkit-user-select: none
      -khtml-user-select: none
      -moz-user-select: none
      -ms-user-select: none
      user-select: none
      transform: translateZ(50px)

    #simpleClock .date
      margin-left: .5em
      font-size: .5em
  """
)()
