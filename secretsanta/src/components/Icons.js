export default function Icons(props){

    function openModal(title, displayIcons = true){
        props.setShow(true);
        props.setTitle(title)
        if(!displayIcons){
            props.setDisplayInputs(false);
            setTimeout(() => {
                props.setShow(false);
                props.setDisplayInputs(true);
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
