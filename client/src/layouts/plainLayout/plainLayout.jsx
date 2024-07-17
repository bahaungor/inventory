// IMPORT IF THIS IS PARENT ELEMENT HOSTING CHILD ELEMENT ON ROUTER
import { Outlet } from 'react-router-dom';

import { useState } from 'react';

// IMPORT COMPONENTS
import Header from '../../components/header/header';
import Content from '../../components/content/content';
import Footer from '../../components/footer/footer';
// import { Menubtn, Sidebar } from '../../components/sidebar/sidebar';

// IMPORT MAIN CSS TO LAYOUT
import '../../assets/styles/global.css';
import '../../assets/styles/reset.css';

export default function PlainLayout() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <Header selected={selected} setSelected={setSelected} />
      <Content>
        <Outlet context={[selected, setSelected]} />
      </Content>
      <Footer />
    </>
  );
}
