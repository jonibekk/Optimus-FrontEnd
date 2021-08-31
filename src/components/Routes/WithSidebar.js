
import { useEffect } from 'react'
import Header from '../UI/AuthHeader'
import MobileToolBar from '../UI/MobileToolBar'
import SideBar from '../UI/SideBar'
import PrivateRoute from './PrivateRoute'
import './style.css'

const WithSidebar = ({ path, component: Component, location, ...rest }) => {

    useEffect(() => {
    }, []);

    const PageView = (
        <div className='with-sidebar-container'>
            <Header logo />
            <main className='with-sidebar-wrapper'>
                <section className='with-sidebar-section-sidebar'>
                    <SideBar />
                </section>
                <section className='with-sidebar-section-body'>
                    <div className='with-sidebar-body-wrapper'>
                        <PrivateRoute {...rest} location={location} path={path} component={Component} />
                    </div>
                </section>
                <section className="with-sidebar-section-mobile-toolbar">
                    <MobileToolBar />
                </section>
            </main>
        </div>
    );

    return PageView;
}

export default WithSidebar;
