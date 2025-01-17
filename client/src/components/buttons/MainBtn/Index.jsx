import "./MainBtn.scss";

export default function MainBtn(props){
   const { type, text, onClick } = props;

   return (
      <button
         type={type ? type : "button"}
         onClick={onClick}
         className="main_btn">
            {text}
      </button>
   );
}