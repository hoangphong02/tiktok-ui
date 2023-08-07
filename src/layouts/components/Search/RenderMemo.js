import AccountItem from '~/components/AccountItem/AccountItem';
import { memo } from 'react';
function RenderMemo({ searchResult }) {
    // dùng Memo để tránh re-render những thứ không cần thiết
    return searchResult.map((result) => <AccountItem key={result.id} data={result} />);
}

export default memo(RenderMemo);
