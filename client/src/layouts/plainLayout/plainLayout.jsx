// IMPORT IF THIS IS PARENT ELEMENT HOSTING CHILD ELEMENT ON ROUTER
import { Outlet } from 'react-router-dom';

// IF YOU'LL CREATE STATES TO ACCESS/UPDATE IN COMPONENTS & OUTLETS
import { useState } from 'react';

// IMPORT COMPONENTS
import Header from '../../components/header/header';
import Content from '../../components/content/content';
import Footer from '../../components/footer/footer';

// IMPORT MAIN CSS TO LAYOUT
import '../../assets/styles/global.css';
import '../../assets/styles/reset.css';

export default function PlainLayout() {
  // CREATE STATES TO ACCESS & UPDATE IN COMPONENTS & OUTLETS
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
