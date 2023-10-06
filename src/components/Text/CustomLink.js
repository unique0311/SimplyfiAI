const { default: Link } = require("next/link")

const CustomLink =({active,children, href, onClick})=>{
    return (
        <Link 
            href={href} 
            onClick={onClick}
            className={`cursor-pointer flex items-center gap-3.5 justify-start py-2.5 px-3 font-inter font-semibold ${active?"active":""}`}>
         {children}
        </Link>
    )
}

export default CustomLink;