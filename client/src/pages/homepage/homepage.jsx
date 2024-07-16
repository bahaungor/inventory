import { useEffect, useState } from 'react';

// IMPORT CONTEXTS TO CONSUME
import { MyContext } from '../../contexts/myContexts';

export default function Homepage() {
  const [selected, setSelected] = useState(MyContext);
  console.log(selected);

  return (
    <>

      <div>Homepage</div>
      <div>
      </div>
    </>
  );
}
