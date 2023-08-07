import { HeaderOnly } from '~/layouts';
import routesConfig from '~/config/routes';
import Home from '~/pages/Home';
import Following from '~/pages/following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import Live from '~/pages/Live';

const publicRoutes = [
    { path: routesConfig.home, component: Home },
    { path: routesConfig.following, component: Following },
    { path: routesConfig.profile, component: Profile }, // không còn dùng  path: '/@:nickname' được vì react-router-dom 6.6.0 không còn dùng @:nickname
    { path: routesConfig.upload, component: Upload, layout: HeaderOnly },
    { path: routesConfig.search, component: Search, layout: null },
    { path: routesConfig.live, component: Live },
];
const privateRoutes = [];
export { privateRoutes, publicRoutes };
