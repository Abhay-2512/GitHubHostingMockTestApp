import React, { Component } from 'react'

class ErrorBoundary extends Component {
    constructor(props){
        super(props);
        this.state={
            hasError:false
        }
    }
    static getDerivedStateFromError(){
        return{hasError:true};
    }
    render() {
        if(this.state.hasError){
            return(
                <div>
                    <h2>SomeThing Went Wrong !</h2>
                </div>
            )
        }else{
            return(
                <div>
                    {this.props.children}
                </div>
            )
        }
    }
}

export default ErrorBoundary;
