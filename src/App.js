import {Component} from "react";
import './App.css';
import './components/card-list/card-list.component';
import CardList from "./components/card-list/card-list.component";
import {SearchBoxComponent} from "./components/search-box/search-box.component";

class App extends Component {

    constructor() {
        super();

        this.state = {
            monsters: [],
            searchField: ''
        };
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json()).then((users) => this.setState(() => {
                return {monsters: users}
            },
            () => {
                console.log(this.state);
            }));
    }

    onSearchChange = (event) =>{
        const searchField = event.target.value.toLocaleLowerCase();
        this.setState(()=>{
           return {searchField};
        });
    }

    render() {
        const { onSearchChange } = this;

        const filteredMonsters = this.state.monsters.filter((monster)=>{
           return monster.name.toLocaleLowerCase().includes(this.state.searchField);
        });
        return (
            <div className="App">
                <h1 className='app-title'>Monsters Rolodex</h1>
                <SearchBoxComponent onChangeHandler={onSearchChange} placeHolder={'Search for monsters'} className={'monsters-search-box'}/>
                <CardList monsters={filteredMonsters}/>
            </div>
        );
    }
}

export default App;
