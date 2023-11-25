import React ,{useContext} from 'react';
import {useNavigate} from 'react-router-dom'
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { UserContext } from '../../store/UserContext';
import {signOut} from 'firebase/auth'
import { auth } from '../../firebase/config';

function Header() {
  const {user} = useContext(UserContext);
  const sell = ()=>{
    navigate('/create')
  }
  const navigate = useNavigate();
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName" onClick={()=>{navigate('/')}}>
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span onClick={()=>{
            navigate('/login')
          }}>{user ? user.displayName : 'Login'}</span>
          <hr />
        </div>
          <span type='button' onClick={()=>{
            signOut(auth).then(()=>{
              navigate('/login')
            })
          }}>{user && 'Logout'}</span>

        <div className="sellMenu" onClick={sell}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span onClick={sell}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
