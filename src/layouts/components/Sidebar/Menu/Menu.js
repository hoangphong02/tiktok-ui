import PropsType from 'prop-types';

function Menu({ children }) {
    return <nav>{children}</nav>;
}

Menu.propTypes = {
    children: PropsType.node.isRequired,
};
export default Menu;
