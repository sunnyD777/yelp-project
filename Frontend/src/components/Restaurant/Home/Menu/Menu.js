import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { newMenuItemChangeHandler, menuItemChangeHandler, pictureChangeHandler, addToMenu, initMenuItem, showUpdate, hideUpdate } from '../../../../actions/actions';

import MenuItem from './MenuItem';

class Menu extends Component {
  componentDidMount() {
    this.props.initMenuItem();
  }

  updateMenu = () => {
    if (this.props.update) {
      axios.post('/restaurant/updateMenu', { menu: this.props.menu })
        .then((response) => {
          console.log(response);
        });
      this.props.hideUpdate();
    } else this.props.showUpdate();
  }

  addMenuItem = (e) => {
    const { menuItem, file } = this.props;
    e.preventDefault();
    if (file !== null) {
      const data = new FormData();
      data.append('file', file);
      axios.post('/restaurant/menu/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        } })
        .then((res) => { // then print response status
          console.log(res.data);
          menuItem.img = res.data;
          axios.post('/restaurant/addToMenu', menuItem)
            .then((res) => { // then print response status
              console.log(res);
              this.props.addToMenu(menuItem);
            });
        });
    }
  }

  handleClick = (e) => {
    e.preventDefault();
    this.inputElement.click();
  }

  render() {
    const { menuItem } = this.props;
    console.log(menuItem);
    return (
      <div id="menu">
        <div id="table">
          <h1>Menu</h1>
          <button id="menuUpdate" onClick={this.updateMenu}>{this.props.update ? 'Save Updates' : 'Update Menu'}</button>
          <table>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Ingredients</th>
              <th>Description</th>
              <th>Category</th>
              <th>Image</th>
            </tr>
            {this.props.menu.map((item, i) => {
              return (
                <tr>
                  <td>
                    <MenuItem index={i} changeHandler={this.props.menuItemChangeHandler} keyname="food_name" update={this.props.update} val={item.food_name} />
                  </td>
                  <td>
                    <MenuItem index={i} changeHandler={this.props.menuItemChangeHandler} keyname="price" update={this.props.update} val={item.price} />
                  </td>
                  <td>
                    <MenuItem index={i} changeHandler={this.props.menuItemChangeHandler} keyname="ingredients" update={this.props.update} val={item.ingredients} />
                  </td>
                  <td>
                    <MenuItem index={i} changeHandler={this.props.menuItemChangeHandler} keyname="dscr" update={this.props.update} val={item.dscr} />
                  </td>
                  <td>
                    <MenuItem index={i} changeHandler={this.props.menuItemChangeHandler} keyname="category" update={this.props.update} val={item.category} />
                  </td>
                  <td>
                    <img style={{ width: '10vw' }} src={item.img} />
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
        <div id="addItem">
          <h1>Add Item to Menu</h1>
          <form>
            <input onChange={this.props.newMenuItemChangeHandler} keyname="food_name" className="menuAdd" placeholder="Name..." value={!menuItem ? '' : menuItem.food_name} />
            <input onChange={this.props.newMenuItemChangeHandler} keyname="price" className="menuAdd" placeholder="Price..." value={!menuItem ? '' : menuItem.price} />
            <input onChange={this.props.newMenuItemChangeHandler} keyname="ingredients" className="menuAdd" placeholder="Ingredients..." value={!menuItem ? '' : menuItem.ingredients} />
            <input onChange={this.props.newMenuItemChangeHandler} keyname="category" className="menuAdd" placeholder="Category..." value={!menuItem ? '' : menuItem.category} />
            <textarea onChange={this.props.newMenuItemChangeHandler} keyname="dscr" id="food_dscr" placeholder="Description..." rows="10" cols="50" value={!menuItem ? '' : menuItem.dscr} />
            <button className="ybtn ybtn--small ybtn--blue" onClick={this.handleClick}>Upload Item Image</button>
            <input onChange={this.props.pictureChangeHandler} type="file" style={{ display: 'none' }} ref={(input) => this.inputElement = input} />
            <br />
            <br />
            <button className="ybtn ybtn--primary" onClick={this.addMenuItem}>Add Item</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.id,
    file: state.file,
    update: state.update,
    menu: state.user.menu,
    menuItem: state.menuItem
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    newMenuItemChangeHandler: (e) => dispatch(newMenuItemChangeHandler(e)),
    menuItemChangeHandler: (e) => dispatch(menuItemChangeHandler(e)),
    pictureChangeHandler: (e) => dispatch(pictureChangeHandler(e)),
    addToMenu: (menuItem) => dispatch(addToMenu(menuItem)),
    initMenuItem: () => dispatch(initMenuItem()),
    showUpdate: () => dispatch(showUpdate()),
    hideUpdate: () => dispatch(hideUpdate())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
