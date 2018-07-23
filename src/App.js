import React, { Component } from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import _ from "lodash";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "edit",
      items: []
    };
  }

  renderEditor = () => {
    this.setState({ status: "edit" });
  };

  renderPreview = () => {
    this.setState({ status: "preview" });
  };

  removeFormItem = index => {
    const items = this.state.items;
    _.remove(items, (item, i) => i === index);
    this.setState({ items });
  };

  addFormItem = item => {
    this.setState({
      items: [...this.state.items, item]
    });
  };

  changeValue = (index, value) => {
    const items = this.state.items;
    items.find(item => items.indexOf(item) === index).value = value;
    this.setState({ items });
  };

  render() {
    if (this.state.status === "edit") {
      return (
        <div className="container text-center">
          <button className="btn btn-primary mb-3" onClick={this.renderPreview}>
            PREVIEW
          </button>
          <AddItemDialogButton addItem={this.addFormItem} />
          <Editor
            items={this.state.items}
            removeFormItem={this.removeFormItem}
            changeItem={this.changeValue}
          />
          <div id="dialog" />
        </div>
      );
    }

    return (
      <div className="container text-center">
        <button className="btn btn-info mb-3" onClick={this.renderEditor}>
          EDIT
        </button>
        <Previewer items={this.state.items} />
      </div>
    );
  }
}

class Previewer extends Component {
  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-6">
          {this.props.items.map(item => (
            <div className="input-group mb-4">
              <input
                className="form-control"
                type={item.type}
                readOnly="true"
                value={item.value}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

class Editor extends Component {
  removeItem = event => {
    const index = $(event.currentTarget).data("item-index");
    this.props.removeFormItem(index);
  };

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-6">
          {this.props.items.map((item, index) => {
            return (
              <div className="input-group mb-4">
                <input className="form-control" type={item.type} />
                <div class="input-group-append">
                  <button
                    class="btn btn-danger"
                    onClick={this.removeItem}
                    // onChange={this.changeValue}
                    data-item-index={index}
                  >
                    -
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

class AddItemDialogButton extends Component {
  openDialog = () => {
    ReactDOM.render(
      <AddItemDialog addItem={this.props.addItem} />,
      document.getElementById("dialog")
    );
  };

  render() {
    return (
      <button className="btn btn-success mb-3" onClick={this.openDialog}>
        +
      </button>
    );
  }
}

class AddItemDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "text"
    };
  }

  onTypeChange = e => {
    this.setState({
      type: e.currentTarget.value
    });
  };

  onSubmit = () => {
    this.props.addItem({ type: this.state.type, value: "" });
    this.onClose();
  };

  onClose = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById("dialog"));
  };

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-4 form-control">
          <label className="font-weight-bold text-lg-left">
            Select Field Type
          </label>
          <div className="form-group">
            <input
              type="radio"
              name="dialogType"
              className="form-check-input"
              checked={this.state.type === "text"}
              onChange={this.onTypeChange}
              value="text"
            />
            <label class="form-check-label" for="">
              Text Input
            </label>
            <br />
            <input
              type="radio"
              name="dialogType"
              className="form-check-input"
              checked={this.state.type === "date"}
              onChange={this.onTypeChange}
              value="date"
            />
            <label class="form-check-label" for="">
              Date Picker
            </label>
            <br />
            <br />
            <button className="btn btn-info" onClick={this.onSubmit}>
              Add
            </button>
            <button className="btn btn-outline-danger" onClick={this.onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
