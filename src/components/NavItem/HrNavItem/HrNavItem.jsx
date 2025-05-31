import NavItem from '../../../layouts/shared/Navbar/NavItem';

const HrNavItem = () => {
  return (
    <>
      <NavItem label={'Home'} address={'/'} />
      <NavItem label={'Asset List'} address={'/asset-list'} />
      <NavItem label={'Add an Asset'} address={'/add-asset'} />
      <NavItem label={'All Requests'} address={'/all-requests'} />
      <NavItem label={'My Employee List'} address={'/my-employee-list'} />
      <NavItem label={'Add an Employee'} address={'/add-an-employee'} />
      <NavItem label={'Profile'} address={'/Profile'} />
      {/* <NavItem label={'Home'} address={'/'} /> */}
    </>
  );
};

export default HrNavItem;
