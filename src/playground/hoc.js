
import React from "react";
import ReactDOM from "react-dom";

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is : {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => { 
    return (props) => ( //higher order component. Takes in a component to be wrapped and renders it wil some additional info
        <div>
            {props.isAdmin && <p>This is private info. Do not share.</p>}
            <WrappedComponent {...props} />
        </div>
    );
};

const requireAuthentication = (WrappedComponent) => {
    return (props) => (//higher order component. 
        <div>
            {props.isAuthenticated ? <WrappedComponent {...props} /> : <p>Please log in</p>}
        </div>
    )
};

const AdminInfo = withAdminWarning(Info); //will return an alternative version of Info
const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(<AdminInfo isAdmin={true} info="These are the details"/>, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info="These are the details"/>, document.getElementById('app'));
