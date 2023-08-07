import classNames from 'classnames/bind';
import styles from './SuggestAccounts.module.scss';
import AccountItem from './AccountItem';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);
function SuggestAccounts({ label, data = [], onSeeAll }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {data.map((account) => (
                <AccountItem key={account.id} data={account} />
            ))}
            <p className={cx('more-btn')} onClick={onSeeAll}>
                See All
            </p>
        </div>
    );
}

SuggestAccounts.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array,
};
export default SuggestAccounts;
