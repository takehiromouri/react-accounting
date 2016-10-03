let Record = React.createClass({
  render(){
    return (
      <tr>
        <td>{this.props.record.date}</td>
        <td>{this.props.record.title}</td>
        <td>{amountFormat(this.props.record.amount)}</td>
        <td><a className="btn btn-danger" onClick={this.handleDelete}>Delete</a></td>
      </tr>
    )
  },

  handleDelete(e){
    e.preventDefault();
    $.ajax({
      url: `/records/${this.props.record.id}`,
      dataType: 'JSON',
      type: 'DELETE',
      context: this,
      success(data) {
        this.props.handleDelete(this.props.record);        
      }
    })
  }
})