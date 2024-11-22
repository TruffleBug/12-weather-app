import './styles.css'
import { greeting } from './greeting.js'

console.log(greeting)

//to add a local image to js file
import odinImage from './odin.png'

const image = document.createElement('img')
image.src = odinImage

document.body.appendChild(image)
