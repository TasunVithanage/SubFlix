import React, { useState } from "react";
// import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

// OpenSubtitle API
const SUB_SEARCH_API = process.env.REACT_APP_SUB_SEARCH_API_KEY;
const SUB_DOWNLOAD_API = "IK9j3r8hqeGISPyGcwnkojLt7AgftdfP";

function Details() {
  const [subs, setSubs] = useState([]);
  const [subFiles, setSubFiles] = useState([]);

  const { state } = useLocation();
  const { id, overview, title, posterPath } = state;

  console.log(id);
  console.log(overview);

  const searchTerm = id;

  // fetch(SUB_SEARCH_API + searchTerm, {
  //   "method": "GET",
  //   "headers": {
  //     "Content-Type": "application/json",
  //     "Api-Key": SUB_DOWNLOAD_API
  //   }
  // })
  // .then((res) => res.json())
  // .then((data) => {
  //   // for (let i = 1; i <= data.total_pages; i++) {
  //   //   getSubs(SUB_SEARCH_API + searchTerm + "&page=" + i);
  //   // }
  //   getSubs(SUB_SEARCH_API + searchTerm);
  // });

  var API = SUB_SEARCH_API + searchTerm;

  getSubs(API);

  function getSubs(API) {
    console.log(API);
    fetch(API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": SUB_DOWNLOAD_API,
        languages: "en",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        const subtitles = data.data.map((e) => {
          return e.attributes.files[0].file_id;
        });
        function callSub() {
          if (subs.length < 1) {
            setSubs(subtitles);
          }
        }

        callSub();
        console.log(subs);
      });
  }

  if (subFiles <= subs.length) {
    subs.forEach((fileId) => {
      fetch("https://api.opensubtitles.com/api/v1/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Api-Key": SUB_DOWNLOAD_API,
        },
        body: '{"file_id":' + fileId + ',"force_download":1}',
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.link) {
            if (data.file_name) {
              changeSubFile(data);
            }
          }
        });
    });
  }

  function changeSubFile(file) {
    if (subFiles <= subs.length)
      setSubFiles((prevSubFiles) => {
        return [...prevSubFiles, file];
      });
  }

  console.log(subFiles);

  const name = subFiles[0];
  console.log(name);

  return (
    <div className="details">
      <div className="preview-cover">
        <div className="preview">
          <h1 className="details-title">{title}</h1>
          <div className="preview-movie">
            <div className="details-movie">
              <img src={posterPath} alt={title} />
            </div>
            <p>{overview}</p>
          </div>
        </div>
      </div>
      <div className="download">
        {subFiles.map((file) => {
          return (
            <div className="subtitle">
              <p>{file.file_name}</p>
              <button class="button-37">
                <a href={file.link} className="link" download>
                  download
                </a>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Details;
