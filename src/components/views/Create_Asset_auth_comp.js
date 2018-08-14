import React from 'react';
import Globals from '../../services/global_service';
const Global = new Globals();

class CreateAsset extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      hasImages: false,
      images: [],
    }

    this.previewFile = this.previewFile.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.highlight = this.highlight.bind(this);
    this.dropHandle = this.dropHandle.bind(this);
    this.enterHandle = this.enterHandle.bind(this);
    this.leaveHandle = this.leaveHandle.bind(this);
    this.overHandle = this.overHandle.bind(this);
    this.fileHandle = this.fileHandle.bind(this);
  }

  highlight (e) {
    e.target.classList.add('highlight');
  }

  previewFile (file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      console.log(this.state.images);
      let images = this.state.images;
      images.push(reader.result);
      this.setState((prevState) => ({
        images: images,
      }));
    }
  }

  uploadFile(file) {
    console.log(file);
    let fileData = new FormData();
    
    fileData.append('controller', 'asset');
    fileData.append('action', 'createAsset');
    fileData.append('userId', this.props.userData.userId);
    fileData.append('assetStatus', 'saved');
    fileData.append('apiToken', this.props.userData.apiToken);
    // fileData.append('apiToken', 'myRandomToken');
    fileData.append('fileUpload', file);
    const req = {
      method: 'POST',
      body: fileData,
    };
    fetch(Global.url, req)
    .then(response => response.json())
    .then(data => console.log(data));
  }

  fileHandle(e) {
    let files = e.target.files;
    let filesArr = [...files];
    filesArr.forEach(this.previewFile);
    filesArr.forEach(this.uploadFile);
  }

  dropHandle (e) {
    e.preventDefault(); 
    e.stopPropagation();
    e.target.classList.remove('highlight');
    let dt = e.dataTransfer;
    let files = dt.files;
    let filesArr = [...files];
    filesArr.forEach(this.previewFile);
    filesArr.forEach(this.uploadFile);
  }

  enterHandle (e) {
    e.preventDefault(); 
    e.stopPropagation();
    e.target.classList.remove('highlight');
  }
  leaveHandle (e) {
    e.preventDefault(); 
    e.stopPropagation();
    e.target.classList.add('highlight');
  }
  overHandle (e) {
    e.preventDefault(); 
    e.stopPropagation();
    e.target.classList.add('highlight');
  }

  render() {
    return(
      <div className="column--12">
        <form className="form--mdm grid--nested create">
          <h1 className="column--12">Upload Assets</h1>
          <fieldset onDrop={this.dropHandle} 
                    onDragLeave={this.leaveHandle} 
                    onDragEnter={this.enterHandle} 
                    onDragOver={this.overHandle} 
                    className="column--12 form__field img__drag-area">
            <p className="mid">Upload multiple files with the file dialog or by dragging and dropping images onto the dashed region.</p>
            <br/>
            <label className="btn action main breath" htmlFor="asset-upload">Choose Asset To Upload</label>
            <input className="input--checkbox" 
                   onChange={this.fileHandle}
                   type="file" 
                   id="asset-upload" 
                   accept="image/*" 
                   multiple/>
            <button type="button" className="btn primary main breath">Upload</button>
            <div className="img__list">
              {this.state.images.map((imgUrl, i) => { 
                  return <img className="img__list-item" src={imgUrl} key={i} alt="Rendered File Upload"/>;
                })
              }
            </div>
          </fieldset>
        </form>
        
      </div>
    );
  }
}

export default CreateAsset;