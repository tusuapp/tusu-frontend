import React from "react";

const Container: React.FC<{ children: React.ReactNode, header?: React.ReactNode }> = ({ children, header }) => {
   return (
      <div className="content-wrapper" style={{marginTop: 45}}>
         <div className="container">
            {header}
            <div>{children}</div>
         </div>
      </div>
   );
};

export default Container;
