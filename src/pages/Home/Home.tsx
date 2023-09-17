import './sections/HomeSection1.scss'
import './sections/HomeSection2.scss'
import './sections/HomeSection3.scss'
import './sections/HomeSection4.scss'
import HomeSection1 from './sections/HomeSection1'
import HomeSection2 from './sections/HomeSection2'
import HomeSection3 from './sections/HomeSection3'
import HomeSection4 from './sections/HomeSection4'
import './Home.scss'
export default function Home () {
    
    return (
        <main>
            <HomeSection1 />
            <HomeSection2 />
            <HomeSection3 />
            <HomeSection4 />
        </main>
    )
}