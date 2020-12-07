import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { menuItemChangeHandler, addToMenu } from '../../../../actions/actions';
import MenuItem from './MenuItem';
import { updateRestaurantMenuMutation, addMenuItemMutation } from '../../../../mutations';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false,
      newItem: { food_name: '', price: '', ingredients: '', dscr: '', category: '', img: '' },
      selectedFile: null,
      currentPage: 0,
      pages: 1
    };
    this.itemsPerPage = 3;
  }

  componentDidMount() {
    const { menu } = this.props;
    const numItems = menu.length;
    this.setState({ pages: Math.ceil(numItems / this.itemsPerPage) });
  }

  setPageNumber = (e) => {
    e.preventDefault();
    const { className } = e.target.parentNode;
    if (className.includes('disabled') || className.includes('active')) { return; }
    const key = e.target.getAttribute('keyValue');
    let { currentPage } = this.state;
    if (key === 'previous') {
      currentPage--;
    } else if (key === 'next') {
      currentPage++;
    } else currentPage = parseInt(key);
    this.setState({ currentPage });
  }

  updateMenu = () => {
    const update = !this.state.update;
    if (!update) {
      // axios.post('/restaurant/updateMenu', { menu: this.props.menu })
      //   .then((response) => {
      //     console.log(response);
      //   });
      this.props.updateRestaurantMenuMutation({
        variables: { menu: JSON.stringify(this.props.menu), id: this.props.id
        }
      }).then((data) => {
        console.log(data);
      });
    }
    this.setState({ update });
  }

  newItemChangeHandler = (e) => {
    const newItem = { ...this.state.newItem };
    newItem[e.target.getAttribute('keyname')] = e.target.value;
    this.setState({ newItem });
  }

  addMenuItem = (e) => {
    const { newItem, selectedFile } = this.state;
    e.preventDefault();
    if (selectedFile !== null) {
      const data = new FormData();
      data.append('file', selectedFile);
      axios.post('/restaurant/menu/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        } })
        .then((res) => { // then print response status
          console.log(res.data);
          newItem.img = res.data;
          // axios.post('/restaurant/addToMenu', newItem)
          //   .then((res) => { // then print response status
          //     console.log(res);
          //     const { menu, addToMenu } = this.props;
          //     const numItems = menu.length + 1;
          //     this.setState({ pages: Math.ceil(numItems / this.itemsPerPage) });
          //     addToMenu(newItem);
          //   });
          this.props.addMenuItemMutation({
            variables: { newItem: JSON.stringify(newItem), id: this.props.id
            }
          }).then((data) => {
            console.log(data);
            const { menu, addToMenu } = this.props;
            const numItems = menu.length + 1;
            this.setState({ pages: Math.ceil(numItems / this.itemsPerPage) });
            addToMenu(newItem);
          });
        });
    }
  }

  handleClick = (e) => {
    e.preventDefault();
    this.inputElement.click();
  }

  pictureChangeHandler = (e) => {
    this.setState({ selectedFile: e.target.files[0], upload: true });
  }

  render() {
    const { menu, menuItemChangeHandler } = this.props;
    const { pages, currentPage, update, newItem } = this.state;
    const { itemsPerPage } = this;
    const pagination = pages > 1 ? (
      <nav aria-label="...">
        <ul className="pagination">
          <li onClick={this.setPageNumber} keyValue="previous" className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
            <a keyValue="previous" className="page-link" href="#" tabIndex="-1">Previous</a>
          </li>
          {[...Array(pages)].map((e, i) => {
            return <li onClick={this.setPageNumber} keyValue={i} className={`page-item ${currentPage === i ? 'active' : ''}`}><a keyValue={i} className="page-link" href="#">{i + 1}</a></li>;
          })}
          <li onClick={this.setPageNumber} keyValue="next" className={`page-item  ${(currentPage + 1) === pages ? 'disabled' : ''}`}>
            <a keyValue="next" className="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
    ) : null;
    const menuView = [];
    for (let i = 0; i < itemsPerPage; i++) {
      const index = (currentPage * itemsPerPage) + i;
      if (index === menu.length) { break; }
      const item = menu[index];
      const menuRow = (
        <tr>
          <td>
            <MenuItem index={index} changeHandler={menuItemChangeHandler} keyname="food_name" update={update} val={item.food_name} />
          </td>
          <td>
            <MenuItem index={index} changeHandler={menuItemChangeHandler} keyname="price" update={update} val={item.price} />
          </td>
          <td>
            <MenuItem index={index} changeHandler={menuItemChangeHandler} keyname="ingredients" update={update} val={item.ingredients} />
          </td>
          <td>
            <MenuItem index={index} changeHandler={menuItemChangeHandler} keyname="dscr" update={update} val={item.dscr} />
          </td>
          <td>
            <MenuItem index={index} changeHandler={menuItemChangeHandler} keyname="category" update={update} val={item.category} />
          </td>
          <td>
            <img style={{ width: '10vw' }} src={item.img} />
          </td>
        </tr>
      );
      menuView.push(menuRow);
    }
    return (
      <div id="menu">
        <div id="table">
          <h1>Menu</h1>
          <button id="menuUpdate" onClick={this.updateMenu}>{update ? 'Save Updates' : 'Update Menu'}</button>
          <table>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Ingredients</th>
              <th>Description</th>
              <th>Category</th>
              <th>Image</th>
            </tr>
            {menuView}
          </table>
          {pagination}
        </div>
        <div id="addItem">
          <h1>Add Item to Menu</h1>
          <form>
            <input onChange={this.newItemChangeHandler} keyname="food_name" className="menuAdd" placeholder="Name..." value={newItem.food_name} />
            <input onChange={this.newItemChangeHandler} keyname="price" className="menuAdd" placeholder="Price..." value={newItem.price} />
            <input onChange={this.newItemChangeHandler} keyname="ingredients" className="menuAdd" placeholder="Ingredients..." value={newItem.ingredients} />
            <input onChange={this.newItemChangeHandler} keyname="category" className="menuAdd" placeholder="Category..." value={newItem.category} />
            <textarea onChange={this.newItemChangeHandler} keyname="dscr" id="food_dscr" placeholder="Description..." rows="10" cols="50" value={newItem.dscr} />
            <button className="ybtn ybtn--small ybtn--blue" onClick={this.handleClick}>Upload Item Image</button>
            <input onChange={this.pictureChangeHandler} type="file" style={{ display: 'none' }} ref={(input) => this.inputElement = input} />
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
    menu: state.user.menu,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    menuItemChangeHandler: (e) => dispatch(menuItemChangeHandler(e)),
    addToMenu: (menuItem) => dispatch(addToMenu(menuItem)),
  };
};
export default compose(
  graphql(updateRestaurantMenuMutation, { name: 'updateRestaurantMenuMutation' }),
  graphql(addMenuItemMutation, { name: 'addMenuItemMutation' }),
  connect(mapStateToProps, mapDispatchToProps)
)(Menu);
