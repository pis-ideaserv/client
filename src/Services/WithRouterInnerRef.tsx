import React from 'react';
import {withRouter} from 'react-router-dom';


const withRouterInnRef = (WrappedComponent:any) => {

    const InnerComponentWithRef = (props:any) => {
        const {forwardRef, ...rest} = props;
        return <WrappedComponent {...rest} ref={forwardRef} />;
    }

    const ComponentWithRef = withRouter(InnerComponentWithRef);

    return React.forwardRef((props:any,ref:any)=>{
        return <ComponentWithRef {...props} forwardRef={ref} />;
    })

}

export default withRouterInnRef;