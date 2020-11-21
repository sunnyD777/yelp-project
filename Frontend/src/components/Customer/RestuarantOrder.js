import React from 'react';

export default function RestuarantOrder(props) {
  const { menu } = props;
  return (
    <div id="orderFromTable">
      <h1>Menu</h1>
      <table>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Ingredients</th>
          <th>Description</th>
          <th>Category</th>
          <th>Image</th>
          <th>Type</th>
          <th>Quantity</th>
          <th>Order Item</th>
        </tr>
        {menu.map((item, i) => {
          return (
            <tr>
              <td className="menuItem">
                {item.food_name}
              </td>
              <td className="menuItem">
                {`$${item.price}`}
              </td>
              <td className="menuItem">
                {item.ingredients}
              </td>
              <td className="menuItem">
                {item.dscr}
              </td>
              <td className="menuItem">
                {item.category}
              </td>
              <td>
                <img style={{ width: '6vw' }} src={item.img} />
              </td>
              <td className="menuItem">
                <select index={i} onChange={props.typeChangeHandler}>
                  <option>Delivery</option>
                  <option>Pickup</option>
                </select>
              </td>
              <td className="menuItem">
                <input index={i} onChange={props.quantityChangeHandler} className="quantity" min="1" type="number" value={item.quantity ? item.quantity : 1} />
              </td>
              <td className={`menuItem ${item.submitted ? 'submitted' : ''}`}>
                {item.submitted ? 'Sent ✔' : <button index={i} onClick={props.submitOrder} className="ybtn ybtn--primary">Order</button>}
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
