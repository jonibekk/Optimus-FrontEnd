import Header from '../UI/AuthHeader'
import SideBar from '../UI/SideBar'
import PrivateRoute from './PrivateRoute'
import './style.css'

const WithSidebar = ({ path, component: Component, location, ...rest }) => {

    const PageView = (
        <main className='with-sidebar-container'>
            <section className='with-sidebar-section-sidebar'>
                <SideBar />
            </section>
            <section className='with-sidebar-section-body'>
                <Header />
                <div className='with-sidebar-body-wrapper'>
                    <PrivateRoute {...rest} location={location} path={path} component={Component} />
                </div>
            </section>
        </main>
    );

    return PageView;
}

export default WithSidebar;
