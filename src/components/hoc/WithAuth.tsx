import * as React from 'react';
import type {StackScreenProps} from '../../env';
import {useAppSelector} from '../../hooks/store';

const WithAuth = (WrappedComponent: React.ComponentType<StackScreenProps>) => {
  WithAuth.displayName = WrappedComponent.name
    ? WrappedComponent.name + 'HOC'
    : WrappedComponent.displayName
    ? WrappedComponent.displayName + 'HOC'
    : WithAuth.displayName;
  return (props: StackScreenProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {token} = useAppSelector(state => state.user);
    if (token) {
      return <WrappedComponent {...props} />;
    } else {
      return props.navigation.replace('login', {...props.route});
    }
  };
};
WithAuth.displayName = 'AuthCom';

export default WithAuth;
