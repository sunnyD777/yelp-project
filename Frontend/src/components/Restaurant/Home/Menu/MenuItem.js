import React from 'react';

export default function MenuItem(props) {
  const { update, index, keyname, val, changeHandler } = props;
  return (
    update ? <input index={index} keyname={keyname} onChange={changeHandler} value={val} /> : keyname === 'price' ? `$${val}` : val
  );
}
