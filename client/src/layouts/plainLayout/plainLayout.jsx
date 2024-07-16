// IMPORT IF THIS IS PARENT ELEMENT HOSTING CHILD ELEMENT ON ROUTER
import { Outlet } from 'react-router-dom';

import { useState } from 'react';

// IMPORT COMPONENTS
import Header from '../../components/header/header';
import Content from '../../components/content/content';
import Footer from '../../components/footer/footer';
// import { Menubtn, Sidebar } from '../../components/sidebar/sidebar';

// IMPORT CONTEXTS TO CONSUME
import { MyContext } from '../../contexts/myContexts';

// IMPORT MAIN CSS TO LAYOUT
import '../../assets/styles/global.css';
import '../../assets/styles/reset.css';

// IMPORT EXTERNAL CSS
import './plainLayout.css';

export default function PlainLayout() {
  const [selected, setSelected] = useState(MyContext);

  return (
    <>
      <Header />
      <div className="buttonContainer">
        <button type="button" onClick={() => setSelected(0)} className={selected === 0 ? `selected` : ''}>Categoties</button>
        <button type="button" onClick={() => setSelected(1)} className={selected === 1 ? `selected` : ''}>Items</button>
        {/* <div>{selected}</div> */}
      </div>
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </>
  );
}
