import './UserStatusButton.css'

const UserStatusButton = (props) => {
    const { status, currentStatus, statusOnClick } = props;

    return (
        <div className={status === currentStatus ? "user-status-button selected" : 'user-status-button'} onClick={() => {statusOnClick(status)}}>
            {status}
        </div>
    );
}

export default UserStatusButton;