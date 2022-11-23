import './Buttons.scss'
import { buttons } from '../../../data/buttons'

const Buttons = () => {
    const clickHandler = (e) => {
        const url = `http://localhost:8080/api/device/1/button/${e.currentTarget.id}`
        // const url = 'https://jsonplaceholder.typicode.com/todos/1'
        console.log(e.currentTarget.id)
        fetch(url, {
            method: 'GET',
            mode: 'no-cors'
        }).then(res => console.log(res))
    }

    const renderButtons = (buttons) => {
        let button_list = []
        let sections = []
        Object.keys(buttons).forEach((section) => {
            sections.push(buttons[section])
            buttons[section].forEach(button => {
                button_list.push(button)
            })
        })
        
        const rendered = sections.map((section, index) => {
            return (
                <div key={`section_${index}`} className={`section${index + 1}`} >
                    {section.map((button, i) => 
                        <button className={`device__button section${index + 1}__button${button.classname ? ` ${button.classname}` : ''}`} 
                                key={button.id + i} 
                                id={button.id}
                                onClick={clickHandler}>

                                {button.placeholder}

                        </button>)}
                </div>
            )
        })
        return rendered
    }
    

    return (
        <div className='buttons__container'>
            {renderButtons(buttons)}
        </div>
    )
}
export default Buttons