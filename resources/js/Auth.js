import React from 'react';
import {Route, Redirect} from 'react-router-dom';

export default function Auth() {
    const [isSession, setIsSession] = React.setState();

    React.useEffect(() => {
        if(sessionStorage.getItem('template')) {
            setIsSession(true);
        } else {
            setIsSession(false);
        }
    }, []);

    return (
        isSession ? (
            <Route children={this.props.children} />
        ) : (
            <Redirect to={'/'} />
        )
    );
}