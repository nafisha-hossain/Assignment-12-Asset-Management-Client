import NavItem from '../../../layouts/shared/Navbar/NavItem';

const EmployeeNavItem = () => {
  return (
    <>
      <NavItem label={'Home'} address={'/'} />
      <NavItem label={'My Assets'} address={'/my-assets'} />
      <NavItem label={'My Team'} address={'/my-team'} />
      <NavItem label={'Request for an Asset'} address={'/request-for-asset'} />
      <NavItem label={'Profile'} address={'/profile'} />
    </>
  );
};

export default EmployeeNavItem;
