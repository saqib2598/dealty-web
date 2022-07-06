import React, { Fragment, useState, useEffect  } from 'react'
import { Alert, Button } from 'reactstrap'
import { saveChanges } from '../../components/styles/SaveChangesStyles'
import { Field } from 'react-final-form'
import InputAdapter from '../InputAdapter'


const ImageLaterUploadForm = ({ handleSubmit, submitError, submitting, submitSucceeded, existingImage, imageFlag, uploading }) => {

  const [alert, setAlert] = useState(false)
  
  const messageAlert =()=>{
    setAlert(true)
    console.log(setAlert, 'before')
    setTimeout(() => {
      setAlert(false);
    }, 3000);

    console.log(setAlert, 'after')
  }  
  
return(
  <Fragment>
    {!existingImage && !imageFlag &&
      <Fragment>
        <p className="mt-4 text-muted text-center">
          OR
        </p>
        <form onSubmit={handleSubmit} id="update-image-status-form">
          {submitError &&
          <Alert color="danger">{submitError}</Alert>
          }
          <div className="actions">
            <Button
              color="info"
              block
              type="submit"
              disabled={submitting || uploading}
            >Upload photos later and list now</Button>
          </div>
        </form>
      </Fragment>
    }
    {
      <Button
        style={saveChanges}
        disabled={!existingImage || submitting || uploading }
        onClick={messageAlert}
      >
        SAVE CHANGES
      </Button>
    }
    {
       alert &&
      <Alert color="primary" style={{marginTop:'4px'}}>
        Your recent changes have been saved
      </Alert>
    }
    <p className="mt-4 mb-0 text-muted">
      -minimum of 1080px wide<br />
      -16:9 aspect ratio<br />
      -maximum size of 5MB per image<br />
      -first image is the primary image
      -drag images to change the position
    </p>
  </Fragment>
)}

export default ImageLaterUploadForm
