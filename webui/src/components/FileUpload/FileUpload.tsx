import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import "./FileUpload.css"; // Import the CSS file

function FileUpload({ onDrop }) {
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({ 
    accept: {'image/*': []},
    onDrop // Use the onDrop callback
  });

  const className = useMemo(() => {
    let classNames = ['baseStyle'];
    if (isFocused) classNames.push('focusedStyle');
    if (isDragAccept) classNames.push('acceptStyle');
    if (isDragReject) classNames.push('rejectStyle');
    return classNames.join(' ');
  }, [isFocused, isDragAccept, isDragReject]);

  return (
    <div className="container">
      <div {...getRootProps({className})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </div>
  );
}

export default FileUpload;
