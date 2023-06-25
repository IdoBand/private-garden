
import { GlobeAmericasIcon, GlobeAsiaAustraliaIcon, GlobeEuropeAfricaIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import a from '/assets/home-page/22.png'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
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
                        <div className='main-purpose'>Manage your own garden.</div>
                        <div className='sentences-container'>
                            <div className='here-you-can'>
                                Here you can:
                            </div>
                            <Sentence text="Identify plants species, names and more." svg={<GlobeEuropeAfricaIcon className='sentence-svg' />} />
                            <Sentence text="Create a timeline for each plant." svg={<GlobeAsiaAustraliaIcon className='sentence-svg' />} />
                            <Sentence text="Monitor irrigations and various actions." svg={<GlobeAmericasIcon className='sentence-svg' />} />
                        </div>
                        <div className='discover-button-container'>
                            <Link to={'/MyGarden'} >
                                <button className='discover-button'>Discover <ChevronRightIcon className='chevron-right' /></button>
                            </Link>
                        </div>
                    </div>
                    <div id="decorative-container-1">
                    </div>
                    <div id="decorative-container-2">
                    </div>
                    <div id="decorative-container-3">
                        <img src={a} alt="monstera"/>
                    </div>
                </div>
            </div>
        </>
    )
}