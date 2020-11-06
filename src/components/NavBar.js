import React, {  useState } from 'react';

export default function NavBar() {
    const [value] = useState('Useless Placeholder');
    // value is the variable you can use and onChangeText() can be used to update that variable.

  return (
    <div style={{position:'fixed', height: 20 + 'px', width: '100%', background: 'red'}}>
      {{value}}
    </div>
    //This needs to be a bar thats stuck to the top of the screen. Its
  );
}
