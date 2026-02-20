
export default function Notification({message, error}){
    let notificationClass = ""
    notificationClass = error === "" ? "" : error ? "unsuccessful" : "successful"
    return (
      <div>
        <h2 className={`${notificationClass}`}>
          {message}
        </h2>
      </div>
    );
}
