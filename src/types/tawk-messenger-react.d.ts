declare module '@tawk.to/tawk-messenger-react' {
  import { Component } from 'react';

  interface TawkMessengerReactProps {
    propertyId: string;
    widgetId: string;
    // Add other props if needed based on the library's documentation
  }

  export default class TawkMessengerReact extends Component<TawkMessengerReactProps> {}
}