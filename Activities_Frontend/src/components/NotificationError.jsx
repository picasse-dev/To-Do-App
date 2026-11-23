const NotificationError = ({ msgError }) => {
    const errorStyle = {
        "color": 'red',
        "fontSize": '16px',
        "fontWeight": 'bold',
        "textAlign": 'center',
        "padding": '10px 0',
        "margin": '10px 0',
        "backgroundColor": '#000000',
        "border": '1px solid #ff0015',
        "borderRadius": '5px',
        "fontFamily": 'Arial, sans-serif',
    }

    if(msgError===null) return
    return(
        <>
            <p style = {errorStyle}>{msgError}</p>
        </>
    )
}
export default NotificationError