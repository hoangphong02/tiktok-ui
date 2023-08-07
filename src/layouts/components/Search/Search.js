import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
// import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import { useDebounce } from '~/Hooks';
import * as searchService from '~/services/searchService';
import RenderMemo from './RenderMemo';

const cx = classNames.bind(styles);
function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();
    const deBoundledValue = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!deBoundledValue.trim()) {
            setSearchResult([]);
            return;
        }
        setLoading(true);
        // fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(deBoundled)Value}&type=less`) // encodeURIComponent là chuyển các ký tự không hợp lệ thành hợp lệ
        //     .then((res) => res.json())
        // .then((res) => {
        //     // setSearchResult(res.data); dùng cho khi sd fecth
        //     setLoading(false);
        // });

        const fecthApi = async () => {
            setLoading(true);
            const result = await searchService.search(deBoundledValue);
            setSearchResult(result);
            setLoading(false);
        };
        fecthApi();
    }, [deBoundledValue]);
    const handleClear = () => {
        setSearchValue('');
        inputRef.current.focus();
        setSearchResult([]);
    };
    const handleHideResult = () => {
        setShowResult(false);
    };
    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    return (
        //Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context.
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            {<h4 className={cx('search-title')}>Accounts</h4>}
                            {/* {searchResult.map((result) => (
                                <AccountItem key={result.id} data={result} />
                            ))} */}
                            <RenderMemo searchResult={searchResult} />
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={() => handleClear()}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}

                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
