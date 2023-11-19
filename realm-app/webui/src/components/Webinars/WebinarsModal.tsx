/**
 * WebinarsModal Component
 *
 * Description:
 * This component renders a modal that displays a list of available webinars in the form of cards. 
 * It is triggered when the user clicks to select a webinar. Each card in the modal represents a 
 * single webinar with relevant information.
 *
 * The modal itself is initiated from the form.tsx page.
 * 
 * Usage:
 * This component is intended to be used within the form.tsx file.
 * 
 * Author:
 *  - Ayaz Shah (ayaz.shah@mongodb.com)
 */

import Modal from '@leafygreen-ui/modal';
import { useState } from "react";
import WebinarCards from '../WebinarCards/WebinarCard';
import webinarCardData from '../../utils/webinars.json';
import "../Webinars/WebinarsModel.css";
import Button from '@leafygreen-ui/button';


function WebinarModal() {
    const [open, setOpen] = useState(false);
  
    return (
      <>
        <Button onClick={() => setOpen(curr => !curr)}>Workshop Type</Button>
        <Modal className="modelStyle" size="large" open={open} setOpen={setOpen}>
            <WebinarCards cardData={webinarCardData} />
        </Modal>
      </>
    );
  }

  export default WebinarModal;

