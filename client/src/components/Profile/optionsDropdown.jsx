import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
const OptionsDropdown = props => {
	const { task } = props;
	const [state, setState] = React.useState({parent:false,child:false});

	React.useEffect(()=>{
		const tag = "is-active"
		const dropdown = document.getElementById(`${task.id}-dropdown`);
		if(state.parent){
			dropdown.classList.add(tag)
			dropdown.addEventListener("click",handleIsActive,true)
		}
		else{
			dropdown.classList.remove(tag)
			dropdown.removeEventListener("click",handleIsActive,true)
		}
		return () => {
			dropdown.removeEventListener("click",handleIsActive,true)
		}
		


	},[state.parent])
	const handleOnDropdown = () => {
		setState({...state,parent:!state.parent});	
	}
	const handleOnCancle = () => {
		const modal = document.querySelector("#options-modal");
		modal.classList.remove("is-active")
	}

	return(
		<div id={task.id+"-dropdown"} class="dropdown is-pulled-right is-right">
  <div class="dropdown-trigger">
		<a className="icon" style={{margin:"10px"}} onClick={handleOnDropdown}>
                <FontAwesomeIcon icon={faEllipsisH} />
                </a>
  </div>
  <div class="dropdown-menu" id="dropdown-menu" role="menu">
    <div class="dropdown-content">
      <a href="#" class="dropdown-item">
        Dropdown item
      </a>
      <a class="dropdown-item">
        Other dropdown item
      </a>
      <a href="#" class="dropdown-item">
        Active dropdown item
      </a>
      <a href="#" class="dropdown-item">
        Other dropdown item
      </a>
      <hr class="dropdown-divider" />
      <a href="#" class="dropdown-item">
        With a divider
      </a>
    </div>
  </div>
</div>
	);
}
export default OptionsDropdown;

function handleIsActive(e){
	const tag = "is-active"
	const {target} = e;
	const old = document.querySelectorAll(".dropdown-item")
	old.forEach(o=>o.classList.remove(tag))
	target.classList.add(tag)
}
