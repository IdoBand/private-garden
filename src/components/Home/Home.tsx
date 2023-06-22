
import { GlobeAmericasIcon, GlobeAsiaAustraliaIcon, GlobeEuropeAfricaIcon } from '@heroicons/react/24/solid'
import { ReactNode } from 'react'
interface SentenceProps {
    text: string
    svg: ReactNode
}
const Sentence = ({text, svg}: SentenceProps) => {
    return (
        <div className='sentence-container'>
            {svg}<div className='sentence-text'>{text}</div> 
        </div>
    )
}

export default function Home () {
    return (
        <>
            <div id="home-container">
                <div className='secondary-home-container'>
                    <div className="home-text">
                        <div className='here-you-can'>
                            Here you can:
                        </div>
                        <Sentence text="Keep track of your own garden." svg={<GlobeAmericasIcon className='sentence-svg' />} />
                        <Sentence text="Create a timeline for each plant." svg={<GlobeAsiaAustraliaIcon className='sentence-svg' />} />
                        <Sentence text="Identify plants species, names and more." svg={<GlobeEuropeAfricaIcon className='sentence-svg' />} />
                        <div className='discover-button-container'>
                            <button className='discover-button'>Discover</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}