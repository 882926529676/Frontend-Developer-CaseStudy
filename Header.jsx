

function Header({headerinfo,c, children}){
    
    
    return(
        <div>
            {c}{children}
            <h1>"Header part"</h1>
            <h1> {headerinfo.email } </h1>
            
        </div>
       
    )
}
export  { Header };