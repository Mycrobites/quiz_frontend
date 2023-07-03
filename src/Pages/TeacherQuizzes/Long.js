import React , {useState} from 'react'
import "./AddQuestions.css";
import close from "../Images/close.png"
import down from '../Images/down.png'
import down1 from '../Images/down1.png'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Linear from './Linear';
import { FastForward } from '@material-ui/icons';
import Sheet from './Sheet';
import Multiple from './Multiple';
import Grid from './Grid';
import Short from './Short';
const Long = () => {
  return (
    <div id="short">
      <input
        type="text"
        placeholder="Write your question"
        className="input-que "
      />
      <CKEditor editor={ClassicEditor} data="" />
    </div>
  );
}

export default Long