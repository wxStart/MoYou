import * as React from 'react';
import type {StackScreenProps} from '../../env';
import {useAppSelector} from '../../hooks/store';

function Redirect(props: object) {
  const tem = props as StackScreenProps;
  tem.navigation.replace('login', {...tem.route});
  return <React.Fragment />;
}

function WithAuth<T extends object>(WrappedComponent: React.ComponentType<T>) {
  function WithAuthCom(props: T) {
    const {token} = useAppSelector(state => state.user);

    if (token) {
      return <WrappedComponent {...props} />;
    } else {
      return <Redirect {...props} />;
    }
  }

  WithAuthCom.displayName = WrappedComponent.name
    ? WrappedComponent.name + 'HOC'
    : WrappedComponent.displayName
    ? WrappedComponent.displayName + 'HOC'
    : 'WithAuth';

  return WithAuthCom;
}

export default WithAuth;
