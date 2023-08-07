import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import config from '~/config/routes';
import * as userService from '~/services/userService';
import {
    HomeIcon,
    HomeIconActive,
    FollowingIcon,
    FollowingIconActive,
    LiveIcon,
    LiveIconActive,
} from '~/components/Icons';
import SuggestAccounts from '~/components/SuggestAccounts';

const cx = classNames.bind(styles);

const INIT_PAGE = 1;
const PER_PAGE = 20;
function Sidebar() {
    const [page, setPage] = useState(INIT_PAGE);
    const [suggestedUser, setSuggestedUser] = useState([]);

    useEffect(() => {
        userService
            .getSuggested({ page, perPage: PER_PAGE })
            .then((data) => {
                setSuggestedUser((prevUser) => [...prevUser, ...data]);
            })
            .catch((errow) => console.log(errow));
    }, [page]);

    const handleSeeAll = () => {
        setPage(page + 1);
    };
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For You" to={config.home} icon={<HomeIcon />} activeIcon={<HomeIconActive />} />
                <MenuItem
                    title="Following"
                    to={config.following}
                    icon={<FollowingIcon />}
                    activeIcon={<FollowingIconActive />}
                />
                <MenuItem title="LIVE" to={config.live} icon={<LiveIcon />} activeIcon={<LiveIconActive />} />
            </Menu>
            <SuggestAccounts label="Suggest Accounts" data={suggestedUser} onSeeAll={handleSeeAll} />
            <SuggestAccounts label="Following Accounts" />
        </aside>
    );
}

export default Sidebar;
