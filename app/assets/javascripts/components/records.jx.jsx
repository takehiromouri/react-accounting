let Records = React.createClass({
  getInitialState() {
      return {
          records: this.props.records  
      };
  },

  getDefaultProps() {
      return {
          records: []  
      };
  },

  addRecord(record) {
    let records = this.state.records.slice();
    records.push(record);
    this.setState({records: records});
  },

  credits() {
    let credits = this.state.records.filter(function(val) {
      return val.amount >= 0
    });

    return credits.reduce((function(prev, curr) {
      return prev + parseFloat(curr.amount);
    }), 0);
  },

  debits(){
    let debits = this.state.records.filter((val) =>{
      return val.amount < 0;
    });

    return debits.reduce((prev, curr) => {
      return prev + parseFloat(curr.amount);
    }, 0);
  },

  balance() {
    return this.debits() + this.credits();
  },

  handleDelete(record) {
    let records = this.state.records.slice();
    let index = records.indexOf(record);
    records.splice(index, 1);
    this.replaceState({records: records});
  },

  render() {
    let records = this.state.records.map((record) => {
      return (     
        <Record key={record.id} 
                record={record}
                handleDelete={this.handleDelete} />        
      )
    });

    return (
      <div>
        <div className='records'>
          <h2 className='title'>Records</h2>
        </div>

        <div className="row">
          <AmountBox type="success" amount={this.credits()} text="Credit" />
          <AmountBox type="danger" amount={this.debits()} text="Debit" />
          <AmountBox type="info" amount={this.balance()} text="Balance" />
        </div>

        <RecordForm handleNewRecord={this.addRecord} />
        <hr />
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>          
            {records}
          </tbody>
        </table>
      </div>
    )
  }
});