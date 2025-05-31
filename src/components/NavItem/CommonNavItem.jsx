import NavItem from '../../layouts/shared/Navbar/NavItem';

const CommonNavItem = () => {
  return (
    <>
      <NavItem label={'Home'} address={'/'} />
      <NavItem label={'Join As Employee'} address={'/employee'} />
      <NavItem label={'Join As HR Manager'} address={'/hr-manager'} />
    </>
  );
};

export default CommonNavItem;
