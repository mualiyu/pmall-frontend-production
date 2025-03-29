import React, { useState } from 'react'
import {
  CButton,
  CCloseButton,
  COffcanvas,
  COffcanvasBody,
  COffcanvasHeader,
  COffcanvasTitle,
} from '@coreui/react'

const NetworkDetails = () => {
  const [visible, setVisible] = useState(false)
  const handleShow = () => setVisible(true);
  const handleClose = () => setVisible(true);

  return (
        <>
          <CButton color="primary" onClick={handleShow} className="dsgjfhsd">
            Toggle top offcanvas
          </CButton>
          <COffcanvas className="off___canvas__menu" placement="top" visible={visible} onClick={() => handleClose()}>
            <COffcanvasHeader>
              <COffcanvasTitle>Offcanvas</COffcanvasTitle>
              <CCloseButton className="text-reset" onClick={() => setVisible(false)} />
            </COffcanvasHeader>
            <COffcanvasBody>
              Content for the offcanvas goes here. You can place just about any React component or custom elements
              here.
            </COffcanvasBody>
          </COffcanvas>
        </>
  )
}

export default NetworkDetails;
