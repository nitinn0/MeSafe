import { NavLink } from 'react-router-dom';


export const Footer = () => {
  return (
<>
    <div className=" section-footer container">
      <footer > <hr />
      <div className="footer-links flex">
        <NavLink to="/about"> Terms & Conditions </NavLink>
        <NavLink to="/home"> Help </NavLink>
      </div>
       </footer>
    </div>
    </>
  );
};
