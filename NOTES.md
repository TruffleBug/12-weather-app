TO RUN:
- 'npm install'
- 'npm run dev'
- open localhost:8080 on browser


TO ADD A LOCAL IMAGE TO JS FILE:
import odinImage from './images/odin.png'

const image = document.createElement('img')
image.src = odinImage

document.body.appendChild(image)