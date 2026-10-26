import React from 'react';
import "./Header.css"

const Header: React.FC = () => {
    return(
        <>
            <div className="header-main">
                <div className="app-logo">
                    <div className="logo-image">🔵</div>
                    <div className="app-name">RightAi</div>
                </div>
                <div className="search-bar">
                    <div className="search-logo">🔍</div>
                    <input type="text" className="dashboard-input" />
                </div>
                <div className="user-info">
                    <div className="name">Umesh</div>
                    <div className="user-logo">👤</div>
                </div>
            </div>
        </>
    )
}

export default Header;