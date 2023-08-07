import classNames from 'classnames/bind';
import styles from './SuggestAccounts.module.scss';
import PropTypes from 'prop-types';
import Image from '../Image/Image';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import AccountPreview from './AccountPreview';
// import Image from '~/components/Image';

const cx = classNames.bind(styles);
function AccountItem({ data }) {
    const renderPreview = (props) => (
        <div className={cx('preview')} tabIndex="-1" {...props}>
            <PopperWrapper className={cx('menu-popper')}>
                <AccountPreview data={data} />
            </PopperWrapper>
        </div>
    );
    return (
        <div>
            <Tippy
                offset={[-12, 4]} //Lệch xuống 8 qua phải 12
                interactive
                delay={[500, 0]}
                placement="bottom-start"
                render={renderPreview}
            >
                <div className={cx('account-item')}>
                    <Image className={cx('avatar')} src={data.avatar} alt={data.nickname} />
                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>
                            <strong>{data.nickname}</strong>
                            {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                        </p>
                        <p className={cx('name')}>{`${data.first_name} ${data.last_name}`}</p>
                    </div>
                </div>
            </Tippy>
        </div>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};
export default AccountItem;
