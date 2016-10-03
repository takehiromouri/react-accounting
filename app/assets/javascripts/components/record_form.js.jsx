let RecordForm = React.createClass({
  getInitialState() {
      return {
          title: '',
          date: '',
          amount: ''  
      };
  },

  render() {
    return(
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input type="date"
                 className="form-control"
                 placeholder='Date'
                 name="date"
                 value={this.state.date}
                 onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <input type="text"
                 className="form-control"
                 placeholder='Title'
                 name="title"
                 value={this.state.title}
                 onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <input type="number"
                 className="form-control"
                 placeholder='Amount'
                 name="amount"
                 value={this.state.amount}
                 onChange={this.handleChange}
          />
        </div>
        <button type="submit"
                className="btn btn-primary"
                disabled={!this.valid()}>
          Create Record
        </button>
      </form>
    )
  },

  handleChange(e) {
    let name = e.target.name;
    this.setState({[name]: e.target.value});
  },

  valid() {
    return this.state.title && this.state.date && this.state.amount;
  },

  handleSubmit(e) {
    e.preventDefault();
    $.ajax({
      url: '/records',
      type: 'POST',
      data: { record: this.state },
      context: this,
      success(data) {
        this.props.handleNewRecord(data);
        this.setState(this.getInitialState());
      }
    });
  }
})






