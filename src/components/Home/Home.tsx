
import cactus from '/assets/home-page/cactus.png'
import alocasia from '/assets/home-page/alocasia.png'
import alocasia2 from '/assets/home-page/alocasia2.png'
import alocasiazebrina from '/assets/home-page/alocasiazebrina.png'
import monsteraleaf from '/assets/home-page/monsteraleaf.png'
export default function Home () {
    return (
        <>
            <div className="page-container">
                <div className="page-content">
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
                           <span className='rotating-trajectory'><img className='rotating-img' id="img1" src={cactus} style={{height: '50px'}}/></span>
                           <span className='rotating-trajectory'><img className='rotating-img' id="img2" src={alocasia} style={{height: '50px'}}/></span>
                           <span className='rotating-trajectory'><img className='rotating-img' id="img3" src={monsteraleaf} style={{height: '60px'}}/></span>
                           <span className='rotating-trajectory'><img className='rotating-img' id="img4" src={alocasiazebrina} style={{height: '40px'}}/></span>
                           <span className='rotating-trajectory'><img className='rotating-img' id="img5" src={alocasia2} style={{height: '55px'}}/></span>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}