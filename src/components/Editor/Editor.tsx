// import React, { useState, useRef } from "react";
// import JoditEditor from "jodit-react";
// import "./Editor.css";
// import { useTranslation } from "react-i18next";

import { useEffect } from "react"

// type Props = {
//     content: string;
//     setContent: (arg: string) => void;
// }

// const Editor: React.FC<Props> = ({ content, setContent }) => {

//     const { t } = useTranslation()

//     const editor = useRef(null);

//     const config = {
//         readonly: false,
//         placeholder: t("createLab.contentPlaceholder"),
//         uploader: { insertImageAsBase64URI: true },
//         height: '100%',
//         width: "704px"
//     };


//     return (
//         <JoditEditor
//             ref={editor}
//             value={content}
//             config={config}
//             onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
//             onChange={(newContent) => { }}
//         />
//     );
// };

// export default React.memo(Editor);

export const Editor = () => {

    useEffect(() => {
        ($('#summernote') as any).summernote({
            lang: "ru-RU",
            height: 300,
            minHeight: 300,
            width: 747,

        });

        (document.querySelector(".note-editable") as any).style.backgroundColor = "white";
    }, [])


    return (
        <>
            <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
                integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
                crossOrigin="anonymous" />
            <div id="summernote">
            </div>
        </>
    )
}