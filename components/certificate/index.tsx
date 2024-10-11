import React from "react";
import {toast} from "react-toastify";

interface ICert {
    data: IDataCert;
}

interface IDataCert {
    image: string;
    id:string;
    booking:Object;
}


const download=(id:string)=>{
    let token = localStorage.getItem("accessToken") || ""

    fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/student/certificates/download/` + id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/pdf',
            "Authorization":"bearer "+token

        },
    })
        .then((response) => {
            if(response.status==200){
                return response.blob()
            }else {
                throw new Error("Failed to download attachment")
            }

        })
        .then((blob) => {
            // Create blob link to download
            const url = window.URL.createObjectURL(
                new Blob([blob]),
            );
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute(
                'download',
                `FileName.pdf`,
            );

            // Append to html link element page
            document.body.appendChild(link);

            // Start download
            link.click();

            // Clean up and remove the link
            // @ts-ignore
            link.parentNode.removeChild(link);
        }).catch((err)=>{
        toast.error(err.message);

    });
}

const Certicate: React.FC<ICert> = ({data}) => {
    const booking = data.booking
    // @ts-ignore
    return (
        <div className="certificate" onClick={() => {
            download(data.id)
        }}>
            <div className="cert-card">
                <img src="/image/certificate.png" alt=""/>
            </div>
            <div className="cert-info">
                {/*// @ts-ignore*/}
                <p className="mb-1">{booking["subject"]} - {booking.booking_no}</p>
            </div>
        </div>
    );
};

export default Certicate;
