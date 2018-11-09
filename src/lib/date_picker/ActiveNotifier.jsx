import React from 'react';
import '../style/DateTimeRange.css'

class ActiveNotifier extends React.Component {
  render(){
    return(
        <div className="activeNotifier">
            Selecting From <span className="dot"/>
        </div>
    );
  }
}
export default ActiveNotifier