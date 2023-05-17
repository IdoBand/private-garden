
import cactus from '/assets/home-page/cactus.png'
import alocasia from '/assets/home-page/alocasia.png'
import alocasia2 from '/assets/home-page/alocasia2.png'
import alocasiazebrina from '/assets/home-page/alocasiazebrina.png'
import monsteraleaf from '/assets/home-page/monsteraleaf.png'
export default function Home () {
    return (
        <>
            <div id="home-container">
                <div className="home-text">
                    <div className='here-you-can'>
                        Here you can:
                    </div>
                    Keep track of your own garden.<br />
                    Create a timeline for each plant.<br />
                    Identify plants species, names and more.
                </div>
                <div className="rotary">
                    <span className='sun'></span>
                    <span className='rotating-trajectory'><img className='rotating-img' id="img1" src={cactus} /></span>
                    <span className='rotating-trajectory'><img className='rotating-img' id="img2" src={alocasia} /></span>
                    <span className='rotating-trajectory'><img className='rotating-img' id="img3" src={monsteraleaf} /></span>
                    <span className='rotating-trajectory'><img className='rotating-img' id="img4" src={alocasiazebrina} /></span>
                    <span className='rotating-trajectory'><img className='rotating-img' id="img5" src={alocasia2} /></span>
                </div>
            </div>
        </>
    )
}