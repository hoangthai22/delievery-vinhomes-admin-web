import React from "react";
// react library for routing
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import AdminNavbar from "../components/Navbars/AdminNavbar.js";
// core components
// import AdminFooter from "../components/Footers/AdminFooter.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
import { NewCategory } from "../views/pages/categories/NewCategory.jsx";
import { NewDriver } from "../views/pages/drivers/NewDriver.jsx";
import { NewMenu } from "../views/pages/menus/NewMenu.jsx";
import { NewStore } from "../views/pages/stores/NewStore.jsx";
// import AdminNavbar from "../components/Navbars/AdminNavbar";
import routes from "./../routes.js";

function Admin() {
    const [sidenavOpen, setSidenavOpen] = React.useState(true);
    const location = useLocation();
    const mainContentRef = React.useRef(null);
    React.useEffect(() => {
        // document.documentElement.scrollTop = 0;
        // document.scrollingElement.scrollTop = 0;
        // mainContentRef.current.scrollTop = 0;
    }, [location]);
    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.collapse) {
                return getRoutes(prop.views);
            }
            if (prop.layout === "/admin") {
                return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
            } else {
                return null;
            }
        });
    };
    const getBrandText = (path) => {
        for (let i = 0; i < routes.length; i++) {
            if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
                return routes[i].name;
            }
        }
        return "Brand";
    };
    // toggles collapse between mini sidenav and normal
    const toggleSidenav = (e) => {
        if (document.body.classList.contains("g-sidenav-pinned")) {
            document.body.classList.remove("g-sidenav-pinned");
            document.body.classList.add("g-sidenav-hidden");
        } else {
            document.body.classList.add("g-sidenav-pinned");
            document.body.classList.remove("g-sidenav-hidden");
        }
        setSidenavOpen(!sidenavOpen);
    };
    const getNavbarTheme = () => {
        return location.pathname.indexOf("admin/alternative-dashboard") === -1 ? "dark" : "light";
    };

    return (
        <>
            <Sidebar
                routes={routes}
                toggleSidenav={toggleSidenav}
                sidenavOpen={sidenavOpen}
                logo={{
                    innerLink: "/",
                    imgSrc: "/images/logo.jpg",
                    imgAlt: "...",
                }}
            />
            <div className="main-content" ref={mainContentRef}>
                <AdminNavbar theme={getNavbarTheme()} toggleSidenav={toggleSidenav} sidenavOpen={sidenavOpen} brandText={getBrandText(location.pathname)} />

                <Switch>
                    {getRoutes(routes)}
                    <Route path="/admin/store" render={() => <NewStore />} />
                    <Route path="/admin/category" render={() => <NewCategory />} />
                    <Route path="/admin/menu" render={() => <NewMenu />} />
                    <Route path="/admin/driver" render={() => <NewDriver />} />
                    <Redirect from="*" to="/admin/dashboard" />
                </Switch>
                {/* <AdminFooter /> */}
            </div>
            {sidenavOpen ? <div className="backdrop d-xl-none" onClick={toggleSidenav} /> : null}
        </>
    );
}

export default Admin;
