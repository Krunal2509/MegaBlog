import React from "react";

// children means text 
function Button({
    children ,
    type = "button" ,
    bgColor = "bg-blue-500" ,
    textColor = "text-white" ,
    className ="",
    ...props
    // this above className and props because 
}) {
    return (  
        <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor}  ${className} `} {...props}    >  
            {children}
        </button>
    );
}

export default Button;