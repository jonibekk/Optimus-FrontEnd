
import { useSelector } from 'react-redux';
import CenterWrapper from './CenterWrapper';
import LeftWrapper from './LeftWrapper';
// import RightWrapper from './RightWrapper';
import './style.css';

const Home = () => {

    const auth = useSelector(state => state.auth);

    return auth.meData && auth.meData.current_team_id && (
        <div className='home-container'>
            <section className='home-left-wrapper'>
                <LeftWrapper />
            </section>
            <section className='home-center-wrapper'>
                <CenterWrapper />
            </section>
            {/*<section className='home-right-wrapper'>
                <RightWrapper />
            </section>*/}
        </div>
    )
}

export default Home;
