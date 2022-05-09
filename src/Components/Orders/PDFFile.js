import React, { Component } from 'react';
import jsPDF from 'jspdf';
import { Button } from 'react-bootstrap'
import { useStateValue } from '../StateProvider';
import "./Order.css"

function PDFFile({order}) {

    const [{ user, orders, ipaddress }, dispatch] = useStateValue();

    const download = () => {
      var doc = new jsPDF({
          encryption: {
            userPassword: "pass",
            ownerPassword: `admin`,
            userPermissions: ["print", "copy"],
            adminPermissions: ["print", "modify", "copy", "annot-forms"]
          }
        });
        doc.text(`Digital reciept`, 40, 25)
        doc.setFontSize(40);
        doc.addImage("examples/images/Octonyan.jpg", "JPEG", 15, 40, 180, 180);
      doc.save(`${order.firstName}_${order.lastname}`)
      alert(" PRESS OK TO DOWNLOAD \n\n PDF PASSWORD 'pass'\nALTERNATIVELY, USE PASSWORD 'admin'\n TO HAVE MORE PERMISSIONS SUCH AS EDIT\n\nSHOULD BE CHANGED TO SOMETHING MORE SECURE\n LIKE ACCOUNT PASSWORD\n(BUT THIS MISSES FOR GUEST USERS)")
    }

    const print = () => {
        var doc = new jsPDF({
            encryption: {
              userPassword: "pass",
              ownerPassword: `admin`,
              userPermissions: ["print","copy"],
              adminPermissions: ["print", "modify", "copy", "annot-forms"]
            }
          });
  
          doc.text(`Digital reciept will go in here`, 40, 25)
          doc.setFontSize(40);
        doc.autoPrint();    
        window.open(doc.output('bloburl'), '_blank');
      }

  return (
    <div className="download">
    <Button variant="outline-info" className="downloadbutton shadow" onClick={print}>Autoprint PDF</Button>
    <Button variant="outline-success" className="downloadbutton shadow" onClick={download}>Download PDF</Button>
    </div>
  )
}

export default PDFFile

