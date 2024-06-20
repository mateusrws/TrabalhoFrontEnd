import { FaArrowLeft } from "react-icons/fa6";

type PropsType = {
    text: string;
    func?: () => void;
};


export function Header(props:PropsType){
    return(
        <header className='bg-slate-700 mx-auto flex h-12 w-96'>
            <h2 className='text-left my-auto ml-3 text-2xl'>{props.text}</h2>
            {props.func && (<FaArrowLeft onClick={() => props.func()} className="cursor-pointer hover:text-3xl ease-in-out duration-300  ml-60 my-auto text-2xl"/>)}
        </header>
    )
}