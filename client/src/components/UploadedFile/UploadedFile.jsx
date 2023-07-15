import React from "react";
import classes from "./UploadedFile.module.scss";
import pdfFile from "../../images/pdfFile.png";
import jpgFile from "../../images/jpgFile.png";
import pptxFile from "../../images/pptxFile.png";
import docFile from "../../images/docFile.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { attachedFilesActions } from "../../store/attachedFiles";
import { Delete, Download } from "@mui/icons-material";

const UploadedFile = ({
  id,
  token,
  type,
  fileName,
  downloadOrDelete,
  courseId,
  path,
}) => {
  const dispatch = useDispatch();

  const deleteFile = async () => {
    console.log(courseId, id);
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_ADDRESS}courses/attachment/${courseId}/${id}`,
        {
          headers: {
            token: "Bearer " + token,
          },
        }
      );

      console.log(res);

      const fileDelRes = await axios.delete(
        `${process.env.REACT_APP_API_ADDRESS}uploadedFiles/${id}`,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(fileDelRes);
      dispatch(
        attachedFilesActions.deleteAttachedFiles({
          fileId: id,
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.deleteDownloadFile}>
        {downloadOrDelete === "download" && (
          <a
            href={`http://localhost:8800/${path}`}
            target="_blank"
            rel="noreferrer"
            download
          >
            <button className={classes.download}>
              <Download />
              Download
            </button>
          </a>
        )}
        {downloadOrDelete === "delete" && (
          <button className={classes.delete} onClick={deleteFile}>
            <Delete />
            Delete
          </button>
        )}
      </div>
      <div className={classes.uploadedFile}>
        {
          {
            pdf: <img src={pdfFile} alt="pdfFile" />,
            jpg: <img src={jpgFile} alt="jpgFile" />,
            gif: <img src={jpgFile} alt="jpgFile" />,
            jpeg: <img src={jpgFile} alt="jpgFile" />,
            png: <img src={jpgFile} alt="jpgFile" />,
            svg: <img src={jpgFile} alt="jpgFile" />,
            pptx: <img src={pptxFile} alt="pptxFile" />,
            doc: <img src={docFile} alt="docFile" />,
          }[type]
        }
        <h3>{fileName}</h3>
      </div>
    </div>
  );
};

export default UploadedFile;
