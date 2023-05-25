import fetchData from "../utils/fetchData";

export default function Icons(props){

    function openModal(title, displayIcons = true){
        props.setShow(true);
        props.setTitle(title)
        if(!displayIcons){
            props.setInputs([]);
            setTimeout(() => {
                props.setShow(false);
                try{
                    fetchData('/generateSecretSanta/' + props.group.id, 'GET',);
                } catch(e){
                    props.setInputs([]);
                    props.setTitle(e);
                }
            }, 2000);

        }
    }

    return(
        <div className='icons'>
            <i className='fas fa-sync' onClick={() => openModal("Thank you! You sent the emails with the Secret Santa!", false)}></i>
            <i className="fa fa-plus-circle" onClick={() => openModal("Add")}></i>
       </div>
    )
}
