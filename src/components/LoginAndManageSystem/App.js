import React, {Component} from 'react';
import Admin from './pages/admin/admin'
import Login from './login/login'
import {HashRouter,Switch,Route,Redirect} from "react-router-dom";
class App extends Component {
    render() {
        return (
           <HashRouter>
               <Switch>
                   {/*login*/}
                   <Route path="/login" component={Login}/>
                   <Route path="/" component={Admin}/>
                   <Redirect to="/admin"/>
               </Switch>
           </HashRouter>
        );
    }
}

export default App;