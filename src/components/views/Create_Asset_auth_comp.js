import React from 'react';

class CreateAsset extends React.Component {
  render() {
    return(
      <div className="column--12">
        <form className="form--sml grid--nested">
          <h1 className="column--12">Upload Assets</h1>
          <fieldset className="column--12 form__field">
            <p>Upload any acceptable files you like. Current acceptable files are:</p>
            <ul>
              <li>PNG</li>
              <li>JPeg</li>
              <li>Gif</li>
            </ul>
          </fieldset>
          <fieldset className="column--12 form__field">
            <label className="btn full action" htmlFor="asset-upload">Choose Asset To Upload</label>
            <input className="input--checkbox" type="file" id="asset-upload" accept="image/*" multiple/>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default CreateAsset;