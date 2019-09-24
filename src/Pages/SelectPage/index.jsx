import React, {Component} from 'react';
import './index.css';
import ResultsTable from "../../Components/ResultsTable";


export default class SelectPage extends Component {
  //sources = ['SINGLEVIEW', 'UHT', 'UHW', 'Academy', 'Comino', 'Jigsaw'];
  sources = ['SINGLEVIEW', 'UHT', 'UHW', 'JIGSAW'];

  constructor(props) {
    super(props);
    
    let resultsState = {};
    this.sources.forEach(source => {
      resultsState[source] = {}
    })

    this.state = {results: resultsState, selected: {}};
  }

  processResults(results){
    let resultsState = this.state.results;
    results.forEach(result => {
      resultsState[result.source][result.id] = result;
    })
    this.setState({results: resultsState})
  }

  updateSelection = (data) => {
    this.setState(state => {
      let selected = this.state.selected;
      for(const key of Object.keys(data)){
        selected[key] = data[key];
      }
      return {selected: selected}
    })
  }

  componentDidMount(){
    this.processResults(this.props.searchResults)
  }

  submit = () => {
    let selected = Object.values(this.state.selected).map(Object.values).flat();
    this.props.onSelect(selected);
  }

  selectExisting = (data) => {
    if(data.SINGLEVIEW && Object.keys(data.SINGLEVIEW).length === 1){
      let selected = Object.values(data.SINGLEVIEW);
      console.log(selected);
      this.props.onSelect(selected);
    }
  }

  prevSelected(){
    if(Object.values(this.state.results.SINGLEVIEW).length > 0){
      return [
        <h2>Previously selected</h2>,
        <ResultsTable results={Object.values(this.state.results.SINGLEVIEW)} selectable={false} onChange={this.selectExisting} />
      ]
    }
  }

  newSelection(){
    return this.sources.map(source => {
      if(source !== 'SINGLEVIEW'){
        if(Object.keys(this.state.results[source]).length > 0){
          return <div key={source}>
            <h3>Results from {source}</h3>
            <ResultsTable results={Object.values(this.state.results[source])} selectable={true} onChange={this.updateSelection}/>
          </div>
        }else{
          return <div key={source}>
            <h3>Results from {source}</h3>
            <p>No results found</p>
          </div>
        }
      }
      return null;
    })
  }

  render(){
    return(
      <div className="selectPage">
        <h1>Select a customer</h1>
        { this.prevSelected() }
        <h2>New Selection</h2>
        { this.newSelection() }

        <button onClick={this.submit}>Select</button>
      </div>
    );
  }
}
