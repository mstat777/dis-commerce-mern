import { useNavigate } from "react-router-dom";

export default function withRouter(Component) {
   function Wrapper(props) {
      const history = useNavigate();
      return <Component history={history} {...props} />
   }
   return Wrapper;
}