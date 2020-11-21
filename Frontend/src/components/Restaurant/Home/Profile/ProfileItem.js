import React from 'react';

export default function ProfileItem(props) {
  const profileContent = props.update ? (
    <div>
      <label>{`${props.label}:`}</label>
      <input className="form-group" id={props.keyName} value={props.val} onChange={props.handleChange} />
    </div>
  ) : (
    <div>
      <label>{`${props.label}:`}</label>
      <li>{props.val}</li>
    </div>
  );
  return (
    <div>
      {profileContent}
    </div>
  );
}
